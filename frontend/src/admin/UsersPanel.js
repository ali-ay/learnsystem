/**
 * UsersPanel: account approval for administrators.
 * Lists accounts by status and lets an admin approve, reject or disable them.
 */
import { admin, getCurrentUser } from '../core/session.js';
import { escapeHtml } from '../core/sanitize.js';

const FILTERS = [
  ['pending', 'Bekleyenler'],
  ['approved', 'Onaylılar'],
  ['rejected', 'Reddedilenler'],
  ['disabled', 'Devre dışı'],
  ['', 'Hepsi']
];

const STATUS_LABEL = {
  pending: '⏳ Beklemede',
  approved: '✅ Onaylı',
  rejected: '❌ Reddedildi',
  disabled: '🚫 Devre dışı'
};

export class UsersPanel {
  constructor(mountEl, trackId = 'js') {
    this.mountEl = mountEl;
    this.trackId = trackId;
    this.status = 'pending';
    this.message = '';
  }

  async mount() {
    this.mountEl.innerHTML = `
      <div class="admin-users">
        <div class="admin-users-head">
          <h2>Kullanıcılar</h2>
          <a class="btn btn-secondary btn-sm" href="#/${this.trackId}/admin">← Yönetim paneli</a>
        </div>
        <div class="admin-users-filters">
          ${FILTERS.map(([value, label]) => `
            <button class="btn btn-sm ${value === this.status ? 'btn-primary' : 'btn-secondary'}" data-filter="${value}">${label}</button>
          `).join('')}
        </div>
        <p class="admin-users-message" id="users-message" role="status">${escapeHtml(this.message)}</p>
        <div id="users-list"><p>Yükleniyor…</p></div>
      </div>`;

    this.mountEl.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.status = btn.dataset.filter;
        this.message = '';
        this.mount();
      });
    });
    await this.load();
  }

  async load() {
    const listEl = this.mountEl.querySelector('#users-list');
    try {
      const users = await admin.listUsers(this.status);
      this.renderList(listEl, users);
    } catch (err) {
      listEl.innerHTML = `<p class="admin-users-error">Liste yüklenemedi: ${escapeHtml(err.message)}</p>`;
    }
  }

  renderList(listEl, users) {
    if (users.length === 0) {
      listEl.innerHTML = `<p>Bu filtrede kullanıcı yok.</p>`;
      return;
    }
    const me = getCurrentUser();
    listEl.innerHTML = `
      <table class="admin-users-table">
        <thead><tr><th>E-posta</th><th>Ad</th><th>Rol</th><th>Durum</th><th>Başvuru</th><th></th></tr></thead>
        <tbody>
          ${users.map(u => {
            const isMe = me && Number(me.id) === Number(u.id);
            const actions = [];
            if (u.status !== 'approved') actions.push(['approve', 'Onayla']);
            if (u.status === 'pending' || u.status === 'rejected') actions.push(['reject', 'Reddet']);
            if (u.status === 'approved' && !isMe) actions.push(['disable', 'Devre dışı bırak']);
            return `
              <tr>
                <td>${escapeHtml(u.email)}${isMe ? ' <em>(sen)</em>' : ''}</td>
                <td>${escapeHtml(u.displayName || '')}</td>
                <td>${escapeHtml(u.role)}</td>
                <td>${escapeHtml(STATUS_LABEL[u.status] || u.status)}</td>
                <td>${escapeHtml(u.createdAt ? new Date(u.createdAt).toLocaleDateString('tr-TR') : '')}</td>
                <td class="admin-users-actions">
                  ${actions.map(([action, label]) => `
                    <button class="btn btn-sm ${action === 'approve' ? 'btn-primary' : 'btn-secondary'}" data-action="${action}" data-id="${Number(u.id)}" data-email="${escapeHtml(u.email)}">${label}</button>
                  `).join('')}
                </td>
              </tr>`;
          }).join('')}
        </tbody>
      </table>`;

    listEl.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => this.act(btn.dataset.action, btn.dataset.id, btn.dataset.email));
    });
  }

  async act(action, id, email) {
    if (action === 'disable' && !confirm(`${email} hesabı devre dışı bırakılsın mı? Bu kişi giriş yapamaz.`)) return;
    try {
      await admin[action](id);
      this.message = `${email}: ${{ approve: 'onaylandı', reject: 'reddedildi', disable: 'devre dışı bırakıldı' }[action]}.`;
    } catch (err) {
      this.message = `Hata: ${err.message}`;
    }
    this.mount();
  }
}
