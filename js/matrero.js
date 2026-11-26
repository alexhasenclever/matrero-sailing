import PhotoSwipeLightbox from '../vendor/photoswipe/photoswipe-lightbox.esm.min.js';

const M = window.MDATA;
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const src = (u) => u ? u.replace('/_blob/', 'images/') + '.jpg' : '';
const id = (u) => u.replace('/_blob/', '');

// Image sizes (needed for the justified grid and the lightbox)
const SIZE = {"48274c4fed13638ae9729d420ea9fdfc":[1500,1000],"5aa81dc0d3587001116d270aabd9ea27":[480,640],"b2c065d528a9dee15c8636dd7544851e":[1599,1066],"a4a9b1fd22d68b065b9e0682026a4155":[1500,1181],"6de06b42d763adb27c5aeb67738439db":[1272,1500],"ef2c19b7e2264c86167d2d6e11fee708":[640,423],"4400406a8a2d63df4a22a80df9836b56":[640,428],"8e96cdbb06e7ee3c9dae7d214cdca6cb":[1350,1800],"40c361abf0501a76357511c7d17ca94f":[1800,1201],"3adddfb80a578fd81fdea354b195ebeb":[1800,1350],"a26ee4c9593af178449b83b515506368":[1800,1458],"cc7eaf684a11bd85e9b4b2240761621b":[1800,1201],"d740ee51c9be484b9c1ac48b23f8292e":[1500,1000],"826089c7f0218c211769962e6a89981e":[1500,1500],"cfd28e4801b171ccfaff953ab17e00f9":[1800,1201],"325cfc84e2b25e4f15ab2c8a8918c5e2":[640,640],"6163ade697be9f51522c02e06229ac45":[1800,1201],"386ea29bb8e6a409e6e94e1732de2880":[1800,1201],"25cc2f6c07103ec802fac2f090e3697b":[360,640],"0b832b090f823c45c31c4b9215a262d3":[1800,1201],"04cf0389fddc4413f8133f6934947a4b":[480,640],"68672b9c3a587f7c8ba3743b70befb1d":[1500,1000],"f27d5c32f09266dc630ce4eeafd4179b":[1800,1201],"aee802c4d045cd333b32e829857f0c5d":[1500,1000],"9e3ee7791e7cf028897d06f486dcd26b":[640,442],"23c86a6f66cbd8d24cf7c50eb4894f51":[725,470],"be668c3393c53aff973984095d7e7b89":[2560,1707],"fff398e243f4a5aaad1bf8435b1a0ac7":[1489,993],"5475f374b6966eb36e86dd0a50f0edc7":[360,640],"28675b116ad2d80f6c0af1dbd70a3cd3":[1800,1201],"1cb37a7fc9389fd820d1494e34b9b225":[1350,1800],"5faf0453b4eba9e55339bbb476428beb":[480,640],"01e9b9437d0eeab544e10407d59bd049":[480,640],"8ee178b1a237205b1540d06414593e41":[480,640],"d724fff0c7e3687bf9ad89e3becf2f84":[1201,1800],"71d34bedbd631852d313a85a7fab8327":[536,280],"8942f400e0ef67bd1603d033e6a000ac":[1070,1500],"a1d174e771fbe25ae38864d4098132be":[2560,1707],"a4a7be26ca969509988f9f572a203ea1":[2560,1707],"a8d97ee3b07350c79c5f19503921b3d0":[1800,1201]};

const EXTRA = {
  en: { menu: 'Menu', scroll: 'Scroll down', galleryKicker: 'On the water', resultsKicker: 'Results', historyKicker: 'Since 1970',
    honoursTitle: 'South American honours', honoursSub: 'Wins in South America, 1995 – 2016',
    all: 'All', other: 'More', showAll: 'Show all photos', showLess: 'Show fewer',
    sWins: 'wins', sPodiums: 'podiums', sSud: 'South American titles', sYears: 'years racing',
    regattas: (n) => n + (n === 1 ? ' regatta' : ' regattas'), winsN: (n) => n + (n === 1 ? ' win' : ' wins'), podN: (n) => n + (n === 1 ? ' podium' : ' podiums'),
    chapter: ['Chapter I', 'Chapter II', 'Chapter III'], times: '×', close: 'Close' },
  es: { menu: 'Menú', scroll: 'Bajar', galleryKicker: 'En el agua', resultsKicker: 'Resultados', historyKicker: 'Desde 1970',
    honoursTitle: 'Palmarés sudamericano', honoursSub: 'Victorias en Sudamérica, 1995 – 2016',
    all: 'Todas', other: 'Más', showAll: 'Ver todas las fotos', showLess: 'Ver menos',
    sWins: 'victorias', sPodiums: 'podios', sSud: 'títulos sudamericanos', sYears: 'años compitiendo',
    regattas: (n) => n + (n === 1 ? ' regata' : ' regatas'), winsN: (n) => n + (n === 1 ? ' victoria' : ' victorias'), podN: (n) => n + (n === 1 ? ' podio' : ' podios'),
    chapter: ['Capítulo I', 'Capítulo II', 'Capítulo III'], times: '×', close: 'Cerrar' }
};

let lang = 'en';
const L = (o) => (o && typeof o === 'object') ? o[lang] : o;
const T = () => { M.state.lang = lang; return Object.assign({}, M.renderVals().t, EXTRA[lang]); };
window.getT = (l) => { lang = l; return T(); };

/* ---------------- header ---------------- */
const top = $('#top');
const onScroll = () => top.classList.toggle('solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
$('#burger').addEventListener('click', () => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  $('#burger').setAttribute('aria-expanded', open);
});
$('#menu').addEventListener('click', (e) => { if (e.target.closest('a')) { document.body.classList.remove('menu-open'); $('#burger').setAttribute('aria-expanded', 'false'); } });

/* ---------------- stats ---------------- */
function renderStats(t) {
  let wins = 0, pods = 0, sud = 0;
  M.resultsData().forEach((y) => {
    (y.big || []).forEach((r) => { if (r.k === 1) wins++; if ([1, 2, 3].includes(r.k)) pods++; });
    (y.small || []).forEach((r) => { wins++; pods++; if (r.title.en === 'South American Offshore Championship') sud++; });
  });
  const items = [[wins, t.sWins], [pods, t.sPodiums], [sud, t.sSud], [new Date().getFullYear() - 1971, t.sYears]];
  $('#stats-grid').innerHTML = items.map(([n, l]) => `<div class="stat"><b data-n="${n}">${n}</b><span>${esc(l)}</span></div>`).join('');
}

/* ---------------- gallery ---------------- */
const G = { filter: 'all', expanded: false, lightbox: null };
function galleryGroups(t) {
  const ps = M.photos();
  const groups = [{ key: 'all', label: t.all, n: ps.length }];
  const seen = {};
  ps.forEach((p) => { if (/2024$/.test(p.en)) seen[p.en] = (seen[p.en] || 0) + 1; });
  Object.keys(seen).forEach((k) => groups.push({ key: k, label: k, n: seen[k] }));
  groups.push({ key: 'other', label: t.other, n: ps.filter((p) => !seen[p.en]).length });
  return { ps, groups, seen };
}
function renderGallery(t) {
  const { ps, groups, seen } = galleryGroups(t);
  $('#g-filters').innerHTML = groups.map((g) => `<button type="button" class="chip" role="tab" data-f="${esc(g.key)}" aria-selected="${G.filter === g.key}">${esc(g.label)}<small>${g.n}</small></button>`).join('');
  let list = ps.filter((p) => G.filter === 'all' || (G.filter === 'other' ? !seen[p.en] : p.en === G.filter));
  const limit = 12, more = G.filter === 'all' && list.length > limit;
  if (more && !G.expanded) list = list.slice(0, limit);
  $('#g-grid').innerHTML = list.map((p) => {
    const [w, h] = SIZE[id(p.src)] || [1500, 1000], ar = w / h, cap = L(p);
    return `<a href="${src(p.src)}" data-pswp-width="${w}" data-pswp-height="${h}" data-cap="${esc(cap)}" style="flex-grow:${(ar * 100).toFixed(1)};width:calc(var(--rh) * ${ar.toFixed(3)})"><i style="padding-bottom:${(100 / ar).toFixed(2)}%"></i><img src="${src(p.src)}" alt="${esc(cap)}" loading="lazy"></a>`;
  }).join('');
  const btn = $('#g-more');
  btn.parentNode.style.display = more ? '' : 'none';
  btn.textContent = G.expanded ? t.showLess : t.showAll + ' (' + ps.length + ')';
}
$('#g-filters').addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (!b) return; G.filter = b.dataset.f; G.expanded = false; renderGallery(T()); });
$('#g-more').addEventListener('click', () => { G.expanded = !G.expanded; renderGallery(T()); if (!G.expanded) $('#gallery').scrollIntoView(); });

G.lightbox = new PhotoSwipeLightbox({
  gallery: '#g-grid', children: 'a', pswpModule: () => import('../vendor/photoswipe/photoswipe.esm.min.js'),
  bgOpacity: 0.96, showHideAnimationType: 'zoom', wheelToZoom: true, padding: { top: 48, bottom: 64, left: 0, right: 0 }
});
G.lightbox.on('uiRegister', () => {
  G.lightbox.pswp.ui.registerElement({
    name: 'custom-caption', order: 9, isButton: false, appendTo: 'root',
    onInit: (el, pswp) => { pswp.on('change', () => { el.textContent = pswp.currSlide.data.element?.dataset.cap || ''; }); }
  });
});
G.lightbox.init();

/* ---------------- results ---------------- */
const R = { year: null };
const MEDAL = { 1: 'p1', 2: 'p2', 3: 'p3', s: 'ps' };
const TROPHY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M8 4h8v5a4 4 0 0 1-8 0V4z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9 17h6"/></svg>';
function placeHTML(r) {
  const p = L(r.place), m = /^(\d+)(.*)$/.exec(p);
  return `<span class="place ${MEDAL[r.k] || 'p0'}"><i></i>${m ? `<b>${m[1]}</b>${esc(m[2])}` : esc(p)}</span>`;
}
function renderResults(t) {
  const data = M.resultsData();
  const recent = data.filter((y) => y.big);
  if (!R.year) R.year = recent[0].year;
  $('#r-tabs').innerHTML = recent.map((y) => {
    const w = y.big.filter((r) => r.k === 1).length;
    return `<button type="button" class="season" role="tab" data-y="${y.year}" aria-selected="${R.year === y.year}"><b>${y.year}</b><span>${w ? t.winsN(w) : t.regattas(y.big.length)}</span></button>`;
  }).join('');
  const season = recent.find((y) => y.year === R.year);
  const wins = season.big.filter((r) => r.k === 1).length, pods = season.big.filter((r) => [1, 2, 3].includes(r.k)).length;
  $('#r-sum').textContent = [t.regattas(season.big.length), t.winsN(wins), t.podN(pods)].join(' · ');
  $('#r-cards').innerHTML = season.big.map((r) => `<article class="rcard">
      <div class="rmedia${r.img ? '' : ' empty'}">${r.img ? `<img src="${src(r.img)}" alt="${esc(L(r.title))}" loading="lazy">` : TROPHY}${placeHTML(r)}</div>
      <div class="rbody"><span class="rwhen">${esc(L(r.when))}</span><h4>${esc(L(r.title))}</h4><p>${esc(L(r.note))}</p></div>
    </article>`).join('');

  // Honours board: older wins grouped by race
  const by = {};
  data.filter((y) => y.small).forEach((y) => y.small.forEach((r) => {
    const k = r.title.en; (by[k] = by[k] || { title: r.title, years: [], cls: new Set() });
    by[k].years.push(y.year); if (r.note.en) by[k].cls.add(r.note.en);
  }));
  const rows = Object.values(by).sort((a, b) => b.years.length - a.years.length || b.years[0] - a.years[0]);
  $('#r-honours').innerHTML = rows.map((h) => `<div class="hrow">
      <div class="hcount"><small>${t.times}</small>${h.years.length}</div>
      <div><h4>${esc(L(h.title))}</h4><p class="hcls">${esc([...h.cls].join(' · ') || '—')}</p>
      <div class="hyears">${h.years.slice().sort().map((y) => `<span>${y}</span>`).join('')}</div></div>
    </div>`).join('');
}
$('#r-tabs').addEventListener('click', (e) => { const b = e.target.closest('.season'); if (!b) return; R.year = b.dataset.y; renderResults(T()); });

/* ---------------- history timeline ---------------- */
let io;
function renderHistory(t) {
  const eras = M.erasData();
  $('#era-nav').innerHTML = eras.map((e, i) => `<li><a href="#era-${i}"><small>${esc(e.span)}</small><b>${esc(e.name)}</b></a></li>`).join('');
  $('#timeline').innerHTML = eras.map((e, i) => `<div class="era" id="era-${i}">
      <aside class="era-side"><div class="era-stick">
        <div class="era-num">${esc(t.chapter[i] || '')}</div>
        <div class="era-span">${esc(e.span)}</div>
        <h3>${esc(e.name)}</h3>
        <p>${esc(L(e.text))}</p>
        ${e.img ? `<img src="${src(e.img)}" alt="${esc(e.alt)}" loading="lazy">` : ''}
      </div></aside>
      <ol class="tl"><span class="tl-fill"></span>${e.years.map((h) => `<li><div class="tl-in">
        <div class="tl-year">${h.year}</div><h4>${esc(L(h.title))}</h4><p>${esc(L(h.text))}</p>
        ${h.img ? `<div class="tl-img"><img src="${src(h.img)}" alt="${esc(L(h.title))}" loading="lazy"></div>` : ''}
      </div></li>`).join('')}</ol>
    </div>`).join('');
  if (io) io.disconnect();
  io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('seen'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -15% 0px' });
  document.querySelectorAll('.tl li').forEach((li) => io.observe(li));
  fillLines();
}
function fillLines() {
  const mark = window.innerHeight * 0.7;
  document.querySelectorAll('.tl').forEach((tl) => {
    const r = tl.getBoundingClientRect(), max = tl.offsetHeight - 20;
    tl.querySelector('.tl-fill').style.height = Math.max(0, Math.min(max, mark - r.top)) + 'px';
  });
  const navs = document.querySelectorAll('.era-nav a');
  document.querySelectorAll('.era').forEach((e, i) => { const r = e.getBoundingClientRect(); navs[i] && navs[i].classList.toggle('on', r.top < mark && r.bottom > mark); });
}
window.addEventListener('scroll', () => requestAnimationFrame(fillLines), { passive: true });
window.addEventListener('resize', fillLines);

/* ---------------- render ---------------- */
function renderAll() { const t = T(); renderStats(t); renderGallery(t); renderResults(t); renderHistory(t); }
document.addEventListener('langchange', (e) => { lang = e.detail; renderAll(); });
