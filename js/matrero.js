
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function img(u){return u ? u.replace('/_blob/','images/') + '.jpg' : '';}
var comp;
function renderAll(){
  var v = comp.renderVals();
  // slideshow
  var si=document.getElementById('slide-img'); si.src=img(v.slide.src); si.alt=v.slide.caption;
  document.getElementById('slide-cap').textContent=v.slide.caption;
  document.getElementById('slide-count').textContent=v.counter;
  document.getElementById('grid').innerHTML = v.grid.map(function(g,i){
    return '<button type="button" class="thumb" data-i="'+i+'" aria-label="'+esc(g.caption)+'" style="'+g.style+'"><img src="'+img(g.src)+'" alt="" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block"></button>';
  }).join('');
  if (renderAll.lang === v.isEn) return; renderAll.lang = v.isEn;
  // results
  document.getElementById('results-list').innerHTML = v.results.map(function(y){
    var big = y.big.map(function(r){
      var media = r.img ? '<img src="'+img(r.img)+'" alt="'+esc(r.title)+'" loading="lazy" style="flex: 1 1 300px; width: 300px; max-width: 420px; height: 260px; object-fit: cover; border-radius: 4px">'
        : '<div style="flex: 1 1 300px; max-width: 420px; height: 260px; border-radius: 4px; border: 1px dashed #9FB3C4; background: #F2F6F9; display: flex; align-items: center; justify-content: center; color: #3A4B5C; font-size: 14px">'+esc(v.t.photoPh)+'</div>';
      return '<article style="display: flex; flex-wrap: wrap; gap: 28px; align-items: center">'+media+
        '<div style="flex: 1 1 320px; display: flex; flex-direction: column; gap: 10px"><div style="display: flex; flex-wrap: wrap; align-items: center; gap: 12px"><span style="'+r.badgeStyle+'">'+esc(r.place)+'</span><span style="font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: #3A4B5C">'+esc(r.when)+'</span></div>'+
        '<h3 style="margin: 0; font-size: 26px; font-weight: 600">'+esc(r.title)+'</h3><p style="margin: 0; font-size: 16px; line-height: 1.6; color: #3A4B5C">'+esc(r.note)+'</p></div></article>';
    }).join('');
    var small = y.hasSmall ? '<ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; border-top: 1px solid #DCE6EE">'+y.small.map(function(r){
      return '<li style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px 16px; padding: 16px 0; border-bottom: 1px solid #DCE6EE"><span style="'+r.badgeStyle+'">'+esc(r.place)+'</span><span style="font-size: 18px; font-weight: 600; flex: 1 1 280px">'+esc(r.title)+'</span><span style="font-size: 14px; color: #3A4B5C">'+esc(r.note)+'</span></li>';
    }).join('')+'</ul>' : '';
    return '<div style="display: flex; flex-direction: column; gap: 28px"><div style="font-family: \'Cormorant Garamond\', serif; font-size: 52px; font-weight: 600; color: #0F4C75; line-height: 1">'+y.year+'</div>'+big+small+'</div>';
  }).join('');
  // history
  document.getElementById('eras').innerHTML = v.eras.map(function(e){
    var bg = e.img ? '<img src="'+img(e.img)+'" alt="'+esc(e.alt)+'" loading="lazy" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: '+e.pos+'">' : '';
    var years = e.years.map(function(h){
      var media = h.img ? '<img src="'+img(h.img)+'" alt="'+esc(h.title)+'" loading="lazy" style="margin-top: 12px; width: 100%; max-width: 760px; height: 420px; object-fit: cover; border-radius: 4px">'
        : (h.ph ? '<div style="margin-top: 12px; width: 100%; max-width: 760px; height: 300px; border-radius: 4px; border: 1px dashed rgba(191,227,247,0.5); display: flex; align-items: center; justify-content: center; color: #BFE3F7; font-size: 14px">'+esc(v.t.archivePh)+'</div>' : '');
      return '<article style="display: flex; flex-wrap: wrap; gap: 8px 48px; padding: 48px 0; border-bottom: 1px solid rgba(255,255,255,0.12)"><div style="flex: 0 0 200px"><div class="yr" style="font-family: \'Cormorant Garamond\', serif; font-size: 80px; font-weight: 600; line-height: 0.9; color: #BFE3F7">'+h.year+'</div></div>'+
        '<div style="flex: 1 1 520px; min-width: 0; display: flex; flex-direction: column; gap: 14px"><h4 style="margin: 0; font-size: 28px; font-weight: 600; line-height: 1.25">'+esc(h.title)+'</h4><p style="margin: 0; font-size: 18px; line-height: 1.7; color: rgba(255,255,255,0.82); max-width: 720px">'+esc(h.text)+'</p>'+media+'</div></article>';
    }).join('');
    return '<div style="margin-top: 96px"><div style="position: relative; min-height: '+e.minH+'; display: flex; align-items: flex-end; overflow: hidden; background: #06101A">'+bg+
      '<div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,22,34,0.1) 0%, rgba(10,22,34,0.35) 50%, #0A1622 100%)"></div>'+
      '<div style="position: relative; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 72px) 48px; box-sizing: border-box; display: flex; flex-direction: column; gap: 12px"><div style="font-size: 14px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: #BFE3F7">'+e.span+'</div>'+
      '<h3 style="margin: 0; font-family: \'Cormorant Garamond\', serif; font-weight: 600; font-size: clamp(48px, 7vw, 96px); line-height: 0.95">'+esc(e.name)+'</h3><p style="margin: 0; max-width: 680px; font-size: 18px; line-height: 1.6; color: rgba(255,255,255,0.86)">'+esc(e.text)+'</p></div></div>'+
      '<div style="max-width: 1200px; margin: 0 auto; padding: 24px clamp(20px, 5vw, 72px) 0; display: flex; flex-direction: column">'+years+'</div></div>';
  }).join('');
}
class DCLogic { constructor(props){ this.props = props || {}; } setState(u){ var p = typeof u === 'function' ? u(this.state) : u; Object.assign(this.state, p); renderAll(); } }

class Component extends DCLogic {
constructor(props) {
super(props);
let lang = 'en';
try { lang = window.localStorage.getItem('me-lang') || 'en'; } catch (e) {}
this.state = { idx: 0, lang: lang === 'es' ? 'es' : 'en' };
}
setLang(l) {
this.setState({ lang: l });
try { window.localStorage.setItem('me-lang', l); } catch (e) {}
}
photos() {
const A = 'Argentario Sailing Week 2024', C = 'Cannes – Saint-Tropez 2024';
const b = (id, en, es) => ({ src: '/_blob/' + id, en: en, es: es || en });
return [
b('a4a7be26ca969509988f9f572a203ea1', C), b('d724fff0c7e3687bf9ad89e3becf2f84', C), b('48274c4fed13638ae9729d420ea9fdfc', A), b('8942f400e0ef67bd1603d033e6a000ac', A),
b('cc7eaf684a11bd85e9b4b2240761621b', C), b('28675b116ad2d80f6c0af1dbd70a3cd3', C), b('68672b9c3a587f7c8ba3743b70befb1d', A), b('cfd28e4801b171ccfaff953ab17e00f9', C),
b('6de06b42d763adb27c5aeb67738439db', A), b('a26ee4c9593af178449b83b515506368', C), b('aee802c4d045cd333b32e829857f0c5d', A), b('8e96cdbb06e7ee3c9dae7d214cdca6cb', C),
b('be668c3393c53aff973984095d7e7b89', C), b('f27d5c32f09266dc630ce4eeafd4179b', C), b('40c361abf0501a76357511c7d17ca94f', C), b('a1d174e771fbe25ae38864d4098132be', C),
b('386ea29bb8e6a409e6e94e1732de2880', C), b('6163ade697be9f51522c02e06229ac45', C), b('0b832b090f823c45c31c4b9215a262d3', C), b('a8d97ee3b07350c79c5f19503921b3d0', C),
b('d740ee51c9be484b9c1ac48b23f8292e', A), b('a4a9b1fd22d68b065b9e0682026a4155', A), b('826089c7f0218c211769962e6a89981e', A), b('1cb37a7fc9389fd820d1494e34b9b225', C),
b('3adddfb80a578fd81fdea354b195ebeb', C),
b('5475f374b6966eb36e86dd0a50f0edc7', 'Les Voiles de Saint-Tropez 2025'),
b('5faf0453b4eba9e55339bbb476428beb', 'Crew on the rail, 2026', 'Tripulación en la banda, 2026'),
b('4400406a8a2d63df4a22a80df9836b56', 'Rolex Giraglia 2022'),
b('fff398e243f4a5aaad1bf8435b1a0ac7', 'Rebuild in Buenos Aires', 'Reconstrucción en Buenos Aires'),
b('b2c065d528a9dee15c8636dd7544851e', 'Restored cockpit', 'Cockpit restaurado')
];
}
componentDidMount() {
this.timer = setInterval(() => {
if ((this.props.autoplay ?? true) && !this.paused) {
this.setState((s) => ({ idx: (s.idx + 1) % this.photos().length }));
}
}, 6000);
}
componentWillUnmount() {
clearInterval(this.timer);
}
go(i) {
const n = this.photos().length;
this.paused = true;
this.setState({ idx: ((i % n) + n) % n });
}
badge(kind) {
const base = 'font-weight: 600; font-size: 13px; padding: 6px 12px; border-radius: 20px; white-space: nowrap; ';
if (kind === 1) return base + 'background: #D4AF37; color: #0A1622;';
if (kind === 2) return base + 'background: #C9D1DA; color: #0A1622;';
if (kind === 3) return base + 'background: #C08457; color: #0A1622;';
if (kind === 's') return base + 'background: #0F4C75; color: #FFFFFF;';
return base + 'background: #EEF3F7; color: #0A1622; border: 1px solid #C9D1DA;';
}
resultsData() {
const B = '/_blob/';
const PDE = { en: 'Buenos Aires – Punta del Este', es: 'Buenos Aires – Punta del Este' };
const CAS = { en: 'Circuito Atlántico Sur', es: 'Circuito Atlántico Sur' };
const SUD = { en: 'South American Offshore Championship', es: 'Campeonato Sudamericano Oceánico' };
const s = (title, cls, kind) => ({ title: title, k: kind || 1, place: { en: '1st', es: '1°' }, note: { en: cls, es: cls } });
return [
{ year: '2026', big: [
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'June · Porquerolles', es: 'Junio · Porquerolles' }, title: { en: 'Porquerolles Classic', es: 'Porquerolles Classic' }, img: B + '5faf0453b4eba9e55339bbb476428beb', note: { en: 'Win to close the first stage of 2026, with Martín Busch on the helm and Miguel Saubidet on tactics.', es: 'Victoria para cerrar la primera etapa de 2026, con Martín Busch al timón y Miguel Saubidet como táctico.' } },
{ k: 2, place: { en: '2nd', es: '2°' }, when: { en: 'May · Antibes', es: 'Mayo · Antibes' }, title: { en: "Les Voiles d'Antibes", es: "Les Voiles d'Antibes" }, img: B + '5aa81dc0d3587001116d270aabd9ea27', note: { en: 'Second overall after a light-wind series, reached via a Sanremo–Monaco–Antibes delivery escorted by dolphins.', es: 'Segundo en la general tras una serie con poco viento, después de un traslado Sanremo–Mónaco–Antibes escoltado por delfines.' } },
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'May · Sanremo', es: 'Mayo · Sanremo' }, title: { en: 'Grandi Regate Internazionali di Sanremo', es: 'Grandi Regate Internazionali di Sanremo' }, img: '', note: { en: 'Season-opening win at Yacht Club Sanremo.', es: 'Victoria en la apertura de la temporada en el Yacht Club Sanremo.' } },
{ k: 0, place: { en: '6th', es: '6°' }, when: { en: 'February · South Atlantic', es: 'Febrero · Atlántico Sur' }, title: { en: 'Circuito Rolex Atlántico Sur', es: 'Circuito Rolex Atlántico Sur' }, img: B + 'ef2c19b7e2264c86167d2d6e11fee708', note: { en: "Matrero's crew raced aboard Patagonia, finishing sixth overall.", es: 'La tripulación del Matrero corrió a bordo del Patagonia y terminó sexta en la general.' } }
] },
{ year: '2025', big: [
{ k: 2, place: { en: '2nd', es: '2°' }, when: { en: 'October · Saint-Tropez', es: 'Octubre · Saint-Tropez' }, title: { en: 'Les Voiles de Saint-Tropez', es: 'Les Voiles de Saint-Tropez' }, img: B + '8ee178b1a237205b1540d06414593e41', note: { en: 'Tied on points with Il Moro di Venezia going into the final day; second overall in Classic IOR.', es: 'Empatados en puntos con Il Moro di Venezia antes del último día; segundos en la general de Classic IOR.' } },
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'September · Cannes → Saint-Tropez', es: 'Septiembre · Cannes → Saint-Tropez' }, title: { en: 'YCF Autumn Cup', es: 'YCF Autumn Cup' }, img: B + '5475f374b6966eb36e86dd0a50f0edc7', note: { en: 'Yacht Club de France passage race from Cannes to Saint-Tropez.', es: 'Regata de traslado del Yacht Club de France entre Cannes y Saint-Tropez.' } },
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'September · Cannes', es: 'Septiembre · Cannes' }, title: { en: 'Régates Royales de Cannes', es: 'Régates Royales de Cannes' }, img: B + '01e9b9437d0eeab544e10407d59bd049', note: { en: "Champions of Cannes' classic yacht festival, one year after finishing second.", es: 'Campeones del festival de veleros clásicos de Cannes, un año después de terminar segundos.' } },
{ k: 2, place: { en: '2nd', es: '2°' }, when: { en: 'June · Antibes', es: 'Junio · Antibes' }, title: { en: "Les Voiles d'Antibes", es: "Les Voiles d'Antibes" }, img: B + '9e3ee7791e7cf028897d06f486dcd26b', note: { en: 'Runner-up in the Classic IOR fleet.', es: 'Subcampeones en la flota Classic IOR.' } },
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'June · Porto Santo Stefano', es: 'Junio · Porto Santo Stefano' }, title: { en: 'Argentario Sailing Week', es: 'Argentario Sailing Week' }, img: '', note: { en: 'Second consecutive title at Argentario.', es: 'Segundo título consecutivo en Argentario.' } },
{ k: 3, place: { en: '3rd', es: '3°' }, when: { en: 'May · Sanremo', es: 'Mayo · Sanremo' }, title: { en: 'Grandi Regate Internazionali di Sanremo', es: 'Grandi Regate Internazionali di Sanremo' }, img: B + '04cf0389fddc4413f8133f6934947a4b', note: { en: 'Third to open the 2025 Mediterranean season.', es: 'Tercero en la apertura de la temporada mediterránea 2025.' } },
{ k: 's', place: { en: 'Season', es: 'Temporada' }, when: { en: 'Annual rankings', es: 'Rankings anuales' }, title: { en: 'CIM champion & Charles Holland Trophy', es: 'Campeón CIM y Trofeo Charles Holland' }, img: B + '25cc2f6c07103ec802fac2f090e3697b', note: { en: '1st in the CIM (Comité International de la Méditerranée) annual ranking; 2nd in the Yacht Club de France and AIVE annual rankings. Michele Frova presented the Charles Holland Trophy.', es: '1° en el ranking anual del CIM (Comité International de la Méditerranée); 2° en los rankings anuales del Yacht Club de France y de la AIVE. Michele Frova entregó el Trofeo Charles Holland.' } }
] },
{ year: '2024', big: [
{ k: 2, place: { en: '2nd', es: '2°' }, when: { en: 'September · Cannes', es: 'Septiembre · Cannes' }, title: { en: 'Régates Royales de Cannes', es: 'Régates Royales de Cannes' }, img: B + '3adddfb80a578fd81fdea354b195ebeb', note: { en: 'Runner-up in Cannes, then Les Voiles de Saint-Tropez to close the season.', es: 'Subcampeones en Cannes, y luego Les Voiles de Saint-Tropez para cerrar la temporada.' } },
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'June · Porto Santo Stefano', es: 'Junio · Porto Santo Stefano' }, title: { en: 'Argentario Sailing Week', es: 'Argentario Sailing Week' }, img: B + '68672b9c3a587f7c8ba3743b70befb1d', note: { en: 'First place, IOR Classic.', es: 'Primer puesto, IOR Classic.' } }
] },
{ year: '2023', big: [
{ k: 3, place: { en: '3rd', es: '3°' }, when: { en: 'June · Antibes', es: 'Junio · Antibes' }, title: { en: "Les Voiles d'Antibes", es: "Les Voiles d'Antibes" }, img: B + '325cfc84e2b25e4f15ab2c8a8918c5e2', note: { en: 'Third in the Classic IOR class.', es: 'Tercero en la clase Classic IOR.' } }
] },
{ year: '2022', big: [
{ k: 2, place: { en: '2nd', es: '2°' }, when: { en: 'June · Saint-Tropez → Genoa', es: 'Junio · Saint-Tropez → Génova' }, title: { en: 'Rolex Giraglia', es: 'Rolex Giraglia' }, img: B + '4400406a8a2d63df4a22a80df9836b56', note: { en: 'Second overall in ORC 1 against modern boats, after 57 hours on the 240-mile long race. An all-Argentine podium with From Now On and Lady.', es: 'Segundo en la general de ORC 1 frente a barcos modernos, tras 57 horas en la regata larga de 240 millas. Podio 100% argentino junto a From Now On y Lady.' } }
] },
{ year: '2020', big: [
{ k: 1, place: { en: '1st', es: '1°' }, when: { en: 'February · South Atlantic', es: 'Febrero · Atlántico Sur' }, title: { en: 'Buenos Aires – Rio de Janeiro', es: 'Buenos Aires – Río de Janeiro' }, img: B + '71d34bedbd631852d313a85a7fab8327', note: { en: 'First in ORC Club at the 26th edition, 1,200 miles in 8 days, 42 minutes and 7 seconds: the first Rio win in her history.', es: 'Primero en ORC Club en la 26ª edición, 1.200 millas en 8 días, 42 minutos y 7 segundos: la primera victoria a Río de su historia.' } }
] },
{ year: '2016', small: [s({ en: 'Buenos Aires – Mar del Plata', es: 'Buenos Aires – Mar del Plata' }, 'ORC Club'), s(PDE, 'ORC Club')] },
{ year: '2014', small: [s(PDE, 'ORC Club')] },
{ year: '2013', small: [s(PDE, 'ORC Club'), s(CAS, 'ORC Club')] },
{ year: '2011', small: [s(SUD, 'ORC Club 600'), s(CAS, 'ORC Club')] },
{ year: '2010', small: [s(SUD, 'ORC Club 600'), s(CAS, 'ORC Club')] },
{ year: '2009', small: [s(SUD, 'ORC Club 600'), s(CAS, 'ORC Club'), s(PDE, 'ORC Club')] },
{ year: '2008', small: [s(SUD, 'ORC Club 600'), s(CAS, 'ORC Club'), s(PDE, 'ORC Club')] },
{ year: '2007', small: [s(SUD, 'ORC Club 600'), s(CAS, 'ORC Club')] },
{ year: '2006', small: [s(SUD, 'IMS 600'), s(PDE, 'IMS 600')] },
{ year: '2005', small: [s(PDE, 'IMS')] },
{ year: '2004', small: [s(PDE, 'IMS Crucero')] },
{ year: '2001', small: [s(SUD, 'ORC Club'), s(CAS, 'ORC Club'), s({ en: 'Buenos Aires – Mar del Plata · Copa Cabo Corrientes', es: 'Buenos Aires – Mar del Plata · Copa Cabo Corrientes' }, 'ORC'), s({ en: 'Mar del Plata – Punta del Este · Copa Isla de Lobos', es: 'Mar del Plata – Punta del Este · Copa Isla de Lobos' }, 'ORC Club')] },
{ year: '2000', small: [s(PDE, 'IMS Crucero')] },
{ year: '1999', small: [s({ en: 'Buenos Aires – Florianópolis', es: 'Buenos Aires – Florianópolis' }, '')] },
{ year: '1995', small: [s(CAS, 'IMS Crucero')] }
];
}
erasData() {
const B = '/_blob/';
return [
{ span: '1970 – 1976', name: 'Estanislao Kocourek', img: '', pos: '50% 50%', alt: '',
text: { en: 'A young Germán Frers returns from New York to take over his father’s studio. His first commission comes from entrepreneur Estanislao Kocourek: a 50-foot ocean racer named Matrero.', es: 'Un joven Germán Frers vuelve de Nueva York para hacerse cargo del estudio de su padre. Su primer encargo llega del emprendedor Estanislao Kocourek: un velero oceánico de 50 pies llamado Matrero.' },
years: [
{ year: '1970', ph: true, title: { en: 'Frers’ first design', es: 'El primer diseño de Frers' }, text: { en: 'Matrero is the first project Germán Frers draws after taking over the family studio, founded by his father in 1925. Her lines would mark a turning point in yacht design.', es: 'Matrero es el primer proyecto que dibuja Germán Frers al frente del estudio familiar, fundado por su padre en 1925. Sus líneas marcarían un antes y un después en el diseño náutico.' } },
{ year: '1971', title: { en: 'Debut at the Admiral’s Cup', es: 'Debut en la Admiral’s Cup' }, text: { en: 'In her first season Matrero crosses to England and makes a brilliant debut at the Admiral’s Cup. She becomes known as “the fastest 50-footer in the world” and puts Frers’ name on the international map. Back home, Kocourek wins the Copa Arturo C. Llosa on the River Plate.', es: 'En su primera temporada el Matrero viaja a Inglaterra y hace un debut brillante en la Admiral’s Cup. Lo llaman “el 50 pies más rápido del mundo” y pone el nombre de Frers en el mapa internacional. En casa, Kocourek gana la Copa Arturo C. Llosa en el Río de la Plata.' } },
{ year: '1972', title: { en: 'Circuito Rio 72', es: 'Circuito Rio 72' }, text: { en: 'Matrero represents Argentina at the Circuito Rio alongside Atrevido and Recluta II, racing against Brazil’s Pluft, Wa Wa Too and Saga.', es: 'El Matrero representa a la Argentina en el Circuito Rio junto al Atrevido y el Recluta II, frente a los brasileños Pluft, Wa Wa Too y Saga.' } },
{ year: '1973', title: { en: 'River Plate trophies', es: 'Copas en el Río de la Plata' }, text: { en: 'Helmed by Carlos Vilar Castex, she wins the Copa Noruega and, for the second time, the Copa Arturo C. Llosa.', es: 'Con Carlos Vilar Castex al timón, gana la Copa Noruega y, por segunda vez, la Copa Arturo C. Llosa.' } }
] },
{ span: '1977 – 2018', name: 'Toribio de Achával', img: '', pos: '50% 50%', alt: '',
text: { en: 'For 41 years Matrero has one captain. Toribio de Achával races her across Europe, the Caribbean and South America: seven races to Rio, four Sardinia Cups, four Copas del Rey, Punta del Este, Florianópolis and Ilhabela.', es: 'Durante 41 años el Matrero tiene un solo capitán. Toribio de Achával lo corre por Europa, el Caribe y Sudamérica: siete regatas a Río, cuatro Copas Cerdeña, cuatro Copas del Rey, Punta del Este, Florianópolis e Ilhabela.' },
years: [
{ year: '1977', ph: true, title: { en: 'A new captain', es: 'Un nuevo capitán' }, text: { en: 'Toribio de Achával, who came to yachting at 43, buys Matrero. She will be his boat for the rest of his sailing life.', es: 'Toribio de Achával, que llegó al yachting a los 43 años, compra el Matrero. Será su barco por el resto de su vida deportiva.' } },
{ year: '1979', title: { en: 'Fastnet Race', es: 'Regata Fastnet' }, text: { en: 'Matrero sails the 1979 Fastnet, the storm-struck edition in which 15 sailors lost their lives and which changed offshore racing for good. The same year she wins the Copa Pablo Suárez on the River Plate.', es: 'El Matrero corre el Fastnet de 1979, la edición de la tormenta en la que murieron 15 navegantes y que cambió para siempre la vela oceánica. Ese mismo año gana la Copa Pablo Suárez en el Río de la Plata.' } },
{ year: '1990', title: { en: 'Konex Award', es: 'Premio Konex' }, text: { en: 'Toribio de Achával receives the Konex Diploma of Merit for yachting, recognising his career aboard Matrero.', es: 'Toribio de Achával recibe el Diploma al Mérito Konex en yachting, en reconocimiento a su trayectoria a bordo del Matrero.' } },
{ year: '1995', title: { en: 'Circuito Atlántico Sur', es: 'Circuito Atlántico Sur' }, text: { en: 'With Martín Achával at the helm, Matrero wins the Circuito Atlántico Sur in IMS Crucero.', es: 'Con Martín Achával al timón, el Matrero gana el Circuito Atlántico Sur en IMS Crucero.' } },
{ year: '1999', title: { en: 'Back on top in Florianópolis', es: 'De nuevo primeros en Florianópolis' }, text: { en: 'In January Matrero wins the Buenos Aires – Florianópolis race, 17 years after her previous victory there. That August, Toribio organises the Regata de Colón.', es: 'En enero el Matrero gana la Buenos Aires – Florianópolis, 17 años después de su victoria anterior. En agosto, Toribio organiza la Regata de Colón.' } },
{ year: '2000', title: { en: 'Punta del Este', es: 'Punta del Este' }, text: { en: 'First of nine wins in the Buenos Aires – Punta del Este race, in IMS Crucero.', es: 'Primera de nueve victorias en la Buenos Aires – Punta del Este, en IMS Crucero.' } },
{ year: '2001', title: { en: 'South American champion', es: 'Campeón sudamericano' }, text: { en: 'Matrero wins the South American Offshore Championship, the Circuito Atlántico Sur, the Copa Cabo Corrientes to Mar del Plata and the Copa Isla de Lobos to Punta del Este.', es: 'El Matrero gana el Campeonato Sudamericano Oceánico, el Circuito Atlántico Sur, la Copa Cabo Corrientes a Mar del Plata y la Copa Isla de Lobos a Punta del Este.' } },
{ year: '2006', title: { en: 'Six titles in a row begin', es: 'Comienzan seis títulos seguidos' }, text: { en: 'Winner of the South American Offshore Championship in IMS 600, the first of six consecutive South American titles through 2011.', es: 'Gana el Campeonato Sudamericano Oceánico en IMS 600, el primero de seis títulos sudamericanos consecutivos hasta 2011.' } },
{ year: '2013', title: { en: 'Atlántico Sur, again', es: 'Otra vez Atlántico Sur' }, text: { en: 'Seventh Circuito Atlántico Sur win in ORC Club, plus the Buenos Aires – Punta del Este.', es: 'Séptima victoria en el Circuito Atlántico Sur en ORC Club, además de la Buenos Aires – Punta del Este.' } },
{ year: '2016', title: { en: 'Last season under Toribio', es: 'Última temporada con Toribio' }, text: { en: 'Matrero wins the Buenos Aires – Mar del Plata and the Buenos Aires – Punta del Este, closing four decades with her captain.', es: 'El Matrero gana la Buenos Aires – Mar del Plata y la Buenos Aires – Punta del Este, cerrando cuatro décadas junto a su capitán.' } }
] },
{ span: '2018 – 2026', name: 'Rafael Pereira Aragón', img: B + 'a4a7be26ca969509988f9f572a203ea1', pos: '50% 45%', alt: 'Aerial view of Matrero under spinnaker',
text: { en: 'A new owner rebuilds Matrero to her original Frers lines, wins the race to Rio she had never won, and takes her to the Mediterranean, where she races against the best classic yachts in Europe.', es: 'Un nuevo dueño reconstruye el Matrero según los planos originales de Frers, gana la regata a Río que nunca había ganado y lo lleva al Mediterráneo a competir contra los mejores clásicos de Europa.' },
years: [
{ year: '2018', img: B + 'fff398e243f4a5aaad1bf8435b1a0ac7', title: { en: 'A complete rebuild', es: 'Una reconstrucción completa' }, text: { en: 'Rafael Pereira Aragón buys Matrero and has her fully taken apart. Over two years, following Frers’ original plans, the keel is lowered and the mast, engine, electronics and sails are all replaced.', es: 'Rafael Pereira Aragón compra el Matrero y lo desarma por completo. Durante dos años, siguiendo los planos originales de Frers, se baja la quilla y se renuevan el mástil, el motor, la electrónica y las velas.' } },
{ year: '2020', img: B + '71d34bedbd631852d313a85a7fab8327', title: { en: 'Finally, Rio', es: 'Por fin, Río' }, text: { en: 'On her return to racing, Matrero wins ORC Club in the 26th Buenos Aires – Rio de Janeiro: the one great race that had always escaped her. In July, Toribio de Achával passes away.', es: 'En su vuelta a las regatas, el Matrero gana ORC Club en la 26ª Buenos Aires – Río de Janeiro: la gran regata que siempre se le había escapado. En julio fallece Toribio de Achával.' } },
{ year: '2022', img: B + '4400406a8a2d63df4a22a80df9836b56', title: { en: 'To the Mediterranean', es: 'Rumbo al Mediterráneo' }, text: { en: 'Shipped to Europe via Juan Lacaze and Montevideo. A strong debut at Les Voiles d’Antibes, second at the Rolex Giraglia, and in July she joins the Vintage & Classic Yacht Club.', es: 'Viaja a Europa vía Juan Lacaze y Montevideo. Buen debut en Les Voiles d’Antibes, segundo en la Rolex Giraglia y, en julio, se suma al Vintage & Classic Yacht Club.' } },
{ year: '2023', title: { en: 'Classic IOR podium', es: 'Podio en Classic IOR' }, text: { en: 'Third in Classic IOR at Les Voiles d’Antibes, and racing at Argentario Sailing Week.', es: 'Tercero en Classic IOR en Les Voiles d’Antibes y presente en la Argentario Sailing Week.' } },
{ year: '2024', img: B + '6de06b42d763adb27c5aeb67738439db', title: { en: 'Champion at Argentario', es: 'Campeón en Argentario' }, text: { en: 'Winner of IOR Classic at Argentario Sailing Week, then second at the Régates Royales de Cannes.', es: 'Gana IOR Classic en la Argentario Sailing Week y luego es segundo en las Régates Royales de Cannes.' } },
{ year: '2025', img: B + '8ee178b1a237205b1540d06414593e41', title: { en: 'The best season yet', es: 'La mejor temporada' }, text: { en: 'Nine podiums and four wins: Argentario, Cannes, the YCF Autumn Cup and the CIM annual title. Michele Frova presents the Charles Holland Trophy.', es: 'Nueve podios y cuatro victorias: Argentario, Cannes, la YCF Autumn Cup y el título anual del CIM. Michele Frova entrega el Trofeo Charles Holland.' } },
{ year: '2026', img: B + '5faf0453b4eba9e55339bbb476428beb', title: { en: 'Still winning', es: 'Siguen las victorias' }, text: { en: 'Wins at Sanremo and Porquerolles, second at Antibes, and a call to everyone who has ever crewed on Matrero to keep her legacy alive.', es: 'Victorias en Sanremo y Porquerolles, segundo en Antibes, y una convocatoria a todos los que alguna vez navegaron en el Matrero para mantener vivo su legado.' } }
] }
];
}
renderVals() {
const lang = this.state.lang;
const L = (o) => (o && typeof o === 'object') ? o[lang] : o;
const T = {
en: { home: 'Home', contact: 'Contact', gallery: 'Gallery', regatta: 'Regatta', history: 'History', resultsMenu: 'Regatta results',
intro: 'The first design Germán Frers drew after taking over his father’s studio, commissioned by Estanislao Kocourek in 1970. More than fifty years on, she still races against the best classic yachts in Europe.',
sDesign: 'Design', sLaunch: 'Launched', sLength: 'Length', sBeam: 'Beam', sClass: 'Class', sOwner: 'Owner',
prev: 'Previous photo', next: 'Next photo', photoPh: '[Podium photo]', archivePh: '[Archive photo]' },
es: { home: 'Inicio', contact: 'Contacto', gallery: 'Galería', regatta: 'Regatas', history: 'Historia', resultsMenu: 'Resultados de regatas',
intro: 'El primer diseño que dibujó Germán Frers al frente del estudio de su padre, encargado por Estanislao Kocourek en 1970. Más de cincuenta años después, sigue compitiendo contra los mejores clásicos de Europa.',
sDesign: 'Diseño', sLaunch: 'Botadura', sLength: 'Eslora', sBeam: 'Manga', sClass: 'Clase', sOwner: 'Armador',
prev: 'Foto anterior', next: 'Foto siguiente', photoPh: '[Foto del podio]', archivePh: '[Foto de archivo]' }
};
const ps = this.photos();
const idx = this.state.idx;
const base = 'aspect-ratio: 1 / 1; padding: 0; border: 0; border-radius: 3px; overflow: hidden; cursor: pointer; background: #06101A; outline-offset: 3px; ';
const on = 'padding: 10px 14px; min-width: 44px; border: 0; cursor: pointer; background: #FFFFFF; color: #0A1622; font: inherit; letter-spacing: inherit;';
const off = 'padding: 10px 14px; min-width: 44px; border: 0; cursor: pointer; background: transparent; color: #FFFFFF; font: inherit; letter-spacing: inherit;';
const mapR = (r) => ({ place: L(r.place), when: L(r.when), title: L(r.title), note: L(r.note), img: r.img || '', noImg: r.img === '', badgeStyle: this.badge(r.k) });
return {
t: T[lang],
isEn: lang === 'en', isEs: lang === 'es',
enStyle: lang === 'en' ? on : off,
esStyle: lang === 'es' ? on : off,
setEn: () => this.setLang('en'),
setEs: () => this.setLang('es'),
slide: { src: ps[idx].src, caption: ps[idx][lang] },
counter: (idx + 1) + ' / ' + ps.length,
prev: () => this.go(idx - 1),
next: () => this.go(idx + 1),
grid: ps.slice(0, 12).map((p, i) => ({
src: p.src,
caption: p[lang],
pick: () => this.go(i),
style: base + (i === idx ? 'outline: 2px solid #BFE3F7;' : 'outline: 2px solid transparent;')
})),
results: this.resultsData().map((y) => ({
year: y.year,
big: (y.big || []).map(mapR),
small: (y.small || []).map(mapR),
hasSmall: !!(y.small && y.small.length)
})),
eras: this.erasData().map((e) => ({
span: e.span, name: e.name, minH: e.img ? '560px' : '300px', img: e.img, pos: e.pos, alt: e.alt, text: L(e.text),
years: e.years.map((h) => ({ year: h.year, title: L(h.title), text: L(h.text), img: h.img || '', ph: !!h.ph }))
}))
};
}
}

comp = new Component({ autoplay: true });
window.getT = function(lang){ comp.state.lang = lang; return comp.renderVals().t; };
document.addEventListener('langchange', function(e){ comp.state.lang = e.detail; renderAll(); });
document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('prev').addEventListener('click', function(){ comp.go(comp.state.idx - 1); });
  document.getElementById('next').addEventListener('click', function(){ comp.go(comp.state.idx + 1); });
  document.getElementById('grid').addEventListener('click', function(e){ var b = e.target.closest('.thumb'); if (b) comp.go(+b.getAttribute('data-i')); });
  comp.state.lang = window.siteLang(); renderAll(); comp.componentDidMount();
});
