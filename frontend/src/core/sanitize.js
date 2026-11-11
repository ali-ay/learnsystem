/**
 * sanitize.js
 * HTML escaping and allow-list sanitization for content that is rendered
 * with innerHTML. Module content (deep dives, quiz texts, best practices)
 * is editable from the admin panel and stored in the database, so it must
 * never be trusted as raw HTML.
 */

const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

/**
 * Escape a value so it can be safely placed in HTML text or a quoted attribute.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
}

// Elements that can execute code, load foreign content or change the document.
const FORBIDDEN_TAGS = new Set([
  'script', 'style', 'iframe', 'frame', 'frameset', 'object', 'embed',
  'link', 'meta', 'base', 'form', 'input', 'button', 'select', 'textarea',
  'noscript', 'template', 'animate', 'set', 'foreignobject', 'handler', 'listener'
]);

const URL_ATTRS = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'srcset', 'background', 'poster']);

// Normalise a URL value (strip whitespace and control chars) before checking its scheme.
function normalizeUrl(value) {
  return String(value).replace(/[\u0000- \u007F-\u009F]/g, '').toLowerCase();
}

function isDangerousUrl(value, tagName) {
  const url = normalizeUrl(value);
  if (url.startsWith('javascript:') || url.startsWith('vbscript:')) return true;
  // data: URLs are only tolerated as images
  if (url.startsWith('data:') && !(tagName === 'img' && url.startsWith('data:image/'))) return true;
  return false;
}

function sanitizeNode(node) {
  // Iterate over a static copy because we mutate the tree while walking it.
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === 8) { // comments
      child.remove();
      continue;
    }
    if (child.nodeType !== 1) { // only elements and text survive
      if (child.nodeType !== 3) child.remove();
      continue;
    }

    const tag = child.tagName.toLowerCase();
    if (FORBIDDEN_TAGS.has(tag)) {
      child.remove();
      continue;
    }

    for (const attr of Array.from(child.attributes)) {
      const name = attr.name.toLowerCase();
      const value = attr.value;

      if (name.startsWith('on')) {
        child.removeAttribute(attr.name);
      } else if (URL_ATTRS.has(name) && isDangerousUrl(value, tag)) {
        child.removeAttribute(attr.name);
      } else if (name === 'style' && /expression\s*\(|javascript:|url\s*\(\s*['"]?\s*(javascript|data):/i.test(value)) {
        child.removeAttribute(attr.name);
      } else if (name === 'target') {
        child.removeAttribute(attr.name);
      }
    }

    sanitizeNode(child);
  }
}

/**
 * Return an HTML string that keeps the author's markup (formatting, inline
 * styles, code blocks, lists) but removes scripts, event handlers,
 * dangerous URLs and embedded/active elements.
 * Falls back to fully escaped text when DOMParser is unavailable.
 * @param {unknown} html
 * @returns {string}
 */
export function sanitizeRichHtml(html) {
  if (html === null || html === undefined) return '';
  const source = String(html);

  if (typeof DOMParser === 'undefined') {
    return escapeHtml(source);
  }

  const doc = new DOMParser().parseFromString(`<body>${source}</body>`, 'text/html');
  const body = doc.body;
  sanitizeNode(body);
  return body.innerHTML;
}
