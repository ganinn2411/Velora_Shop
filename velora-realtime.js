// ============================================================
//  VELORA — velora-realtime.js  (v3 — CSS yapısına uygun)
//  velora-firebase.js'den SONRA her sayfaya ekleyin.
//  Eski applySettings bloğunu velora-firebase.js'den silin.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href.includes('admin')) return;

  function startSync() {
    var db = getDB();
    if (!db) { setTimeout(startSync, 400); return; }

    // ── Bakım modu ────────────────────────────────────────────
    db.collection('settings').doc('main').onSnapshot(function (doc) {
      if (!doc.exists) return;
      var s = doc.data();
      if (s.features && s.features.maintenance) showMaintenance();
    }, function(){});

    // ── Görünüm — değişince ANINDA uygula ────────────────────
    db.collection('settings').doc('appearance').onSnapshot(function (doc) {
      if (!doc.exists) return;
      applyAppearance(doc.data());
    }, function(){});

    // ── İletişim ──────────────────────────────────────────────
    db.collection('settings').doc('contact').onSnapshot(function (doc) {
      if (!doc.exists) return;
      localStorage.setItem('velora_contact', JSON.stringify(doc.data()));
    }, function(){});
  }

  if (window._veloraFirebaseReady) startSync();
  else document.addEventListener('veloraFirebaseReady', startSync, { once: true });
});

// ── Görünüm uygula ────────────────────────────────────────────────────
function applyAppearance(a) {
  if (!a) return;

  var root = document.documentElement;

  // ── Renkler ───────────────────────────────────────────────
  if (a.colors) {
    if (a.colors.primary) {
      root.style.setProperty('--btn-bg',    a.colors.primary);
      root.style.setProperty('--btn-color', isColorLight(a.colors.primary) ? '#111' : '#f5f0e8');
    }
    if (a.colors.bg) {
      root.style.setProperty('--bg',           a.colors.bg);
      root.style.setProperty('--header-bg',    a.colors.bg);
      root.style.setProperty('--bg-secondary', shadeColor(a.colors.bg, -8));
      root.style.setProperty('--bg-card',      shadeColor(a.colors.bg, 5));
    }
    if (a.colors.text) {
      root.style.setProperty('--text', a.colors.text);
    }
  }

  // ── Fontlar ───────────────────────────────────────────────
  if (a.headfont) loadGoogleFont(a.headfont, 'velora-head-font');
  if (a.bodyfont) {
    loadGoogleFont(a.bodyfont, 'velora-body-font');
    document.body.style.fontFamily = "'" + a.bodyfont + "', sans-serif";
  }

  // ── Favicon ───────────────────────────────────────────────
  if (a.favicon) {
    var fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = a.favicon;
  }

  // ── Banner (hero görseli) ─────────────────────────────────
  if (a.banner) {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg) heroImg.src = a.banner;
  }

  // ── Logo resmi (varsa) ────────────────────────────────────
  if (a.logo) {
    var logoImg = document.querySelector('.hero-text img');
    if (logoImg) logoImg.src = a.logo;
  }

  // ── Duyuru Bandı ──────────────────────────────────────────
  applyBand(a);
}

// ── Duyuru bandı yönetimi ─────────────────────────────────────────────
function applyBand(a) {
  var BAND_ID = 'velora-announce-band';
  var band = document.getElementById(BAND_ID);

  if (!band) {
    band = document.createElement('div');
    band.id = BAND_ID;
    band.style.cssText = [
      'width:100%',
      'text-align:center',
      'padding:9px 16px',
      'font-size:12px',
      'font-family:Montserrat,sans-serif',
      'letter-spacing:1px',
      'position:relative',
      'z-index:1001',
      'transition:background 0.3s,color 0.3s'
    ].join(';');
    document.body.insertBefore(band, document.body.firstChild);
  }

  if (a.announcebar === false) {
    band.style.display = 'none';
    resetBodyPadding(0);
    return;
  }

  band.style.display = 'block';
  if (a.announcetext)  band.textContent      = a.announcetext;
  if (a.announcecolor) band.style.background = a.announcecolor;
  band.style.color = a.announcetextcolor
    ? a.announcetextcolor
    : (isColorLight(a.announcecolor || '#000') ? '#111' : '#fff');

  setTimeout(function() { resetBodyPadding(band.offsetHeight); }, 50);
}

function resetBodyPadding(bandHeight) {
  var base = window.innerWidth <= 768 ? 64 : 74;
  document.body.style.paddingTop = (base + bandHeight) + 'px';
}

// ── Yardımcı fonksiyonlar ─────────────────────────────────────────────
function loadGoogleFont(fontName, linkId) {
  var href = 'https://fonts.googleapis.com/css2?family=' +
    fontName.replace(/ /g, '+') + ':wght@400;500;600;700&display=swap';
  var el = document.getElementById(linkId);
  if (el) { el.href = href; return; }
  el = document.createElement('link');
  el.id = linkId; el.rel = 'stylesheet'; el.href = href;
  document.head.appendChild(el);
}

function isColorLight(hex) {
  try {
    var c = (hex || '#000').replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r = parseInt(c.substr(0,2),16);
    var g = parseInt(c.substr(2,2),16);
    var b = parseInt(c.substr(4,2),16);
    return (r*299 + g*587 + b*114) / 1000 > 128;
  } catch(e) { return false; }
}

function shadeColor(hex, pct) {
  try {
    var c = (hex || '#ffffff').replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var num = parseInt(c, 16);
    var r = Math.min(255, Math.max(0, (num >> 16) + pct));
    var g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + pct));
    var b = Math.min(255, Math.max(0, (num & 0xff) + pct));
    return '#' + [r,g,b].map(function(x){ return x.toString(16).padStart(2,'0'); }).join('');
  } catch(e) { return hex; }
}

function showMaintenance() {
  document.body.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;' +
    'min-height:100vh;background:#111;color:#c9b97a;font-family:serif;' +
    'text-align:center;padding:20px">' +
    '<div><div style="font-size:48px;margin-bottom:20px">🔧</div>' +
    '<h1 style="font-size:2rem;margin-bottom:10px">Bakım Modu</h1>' +
    '<p style="color:#888;font-family:sans-serif">Sitemiz şu an bakımda. Kısa süre içinde geri döneceğiz.</p>' +
    '</div></div>';
}
