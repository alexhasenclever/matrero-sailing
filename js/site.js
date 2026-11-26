(function () {
  function getLang() {
    try { return localStorage.getItem('me-lang') === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; }
  }
  function apply() {
    var lang = getLang();
    var t = window.getT ? window.getT(lang) : (window.T ? window.T[lang] : {});
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-t]').forEach(function (el) {
      var k = el.getAttribute('data-t'); if (t[k] != null) el.textContent = t[k];
    });
    document.querySelectorAll('[data-t-aria]').forEach(function (el) {
      var k = el.getAttribute('data-t-aria'); if (t[k] != null) el.setAttribute('aria-label', t[k]);
    });
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }
  window.siteLang = getLang;
  window.applyLang = apply;
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang-btn'); if (!b) return;
    try { localStorage.setItem('me-lang', b.getAttribute('data-lang')); } catch (err) {}
    apply();
  });
  document.addEventListener('DOMContentLoaded', apply);
})();
