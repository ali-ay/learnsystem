/**
 * Small builders for English lesson HTML. They emit only plain elements and the
 * classes styled in src/styles/design.css (lesson-goal, grammar-table, examples,
 * tr-note, dialog, mistakes), so lessons look the same at every level.
 */

export const goal = (text) => `<p class="lesson-goal"><strong>Bu dersin sonunda:</strong> ${text}</p>`;
export const h = (text) => `<h3>${text}</h3>`;
export const p = (text) => `<p>${text}</p>`;
export const table = (head, rows) => `<table class="grammar-table"><thead><tr>${head.map(c => `<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
export const examples = (pairs) => `<ul class="examples">${pairs.map(([en, tr]) => `<li><span class="en">${en}</span><span class="tr">${tr}</span></li>`).join('')}</ul>`;
export const trNote = (html) => `<div class="tr-note"><strong>Türkçeyle karşılaştır:</strong> ${html}</div>`;
export const dialog = (lines) => `<div class="dialog">${lines.map(([who, text]) => `<p><strong>${who}:</strong> ${text}</p>`).join('')}</div>`;
export const mistakes = (items) => `<ul class="mistakes">${items.map(([wrong, right, why]) => `<li><span class="wrong">${wrong}</span><span class="right">${right}</span>${why ? `<span class="why">${why}</span>` : ''}</li>`).join('')}</ul>`;

/** Question: q(category, question, options, correctIndex, explanation, tip?) */
export const q = (category, question, options, correct, explanation, tip = '') => ({ category, question, options, correct, explanation, tip });

const escapeCode = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Code block; the source is escaped, so it can contain <, > and &. */
export const code = (src, label = '') =>
  `<pre class="code-block"${label ? ` data-label="${label}"` : ''}><code>${escapeCode(src.replace(/^\n+|\s+$/g, ''))}</code></pre>`;

/** Hands-on task at the end of a technical lesson. */
export const task = (html) => `<div class="lesson-task"><strong>Uygulama görevi:</strong> ${html}</div>`;

/** Why this lesson matters for the target job. */
export const why = (html) => `<div class="tr-note"><strong>İşte neden önemli:</strong> ${html}</div>`;

/** Question with a code snippet: qc(category, question, code, options, correctIndex, explanation) */
export const qc = (category, question, snippet, options, correct, explanation, tip = '') =>
  ({ category, question, code: snippet.replace(/^\n+|\s+$/g, ''), options, correct, explanation, tip });
