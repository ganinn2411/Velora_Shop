// ============================================================
//  VELORA — velora-realtime.js  (v5)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href.includes('admin')) return;

  function startSync() {
    var db = getDB();
    if (!db) { setTimeout(startSync, 400); return; }

    db.collection('settings').doc('main').onSnapshot(function (doc) {
      if (!doc.exists) return;
      applyFeatures(doc.data().features);
    }, function(){});

    db.collection('settings').doc('appearance').onSnapshot(function (doc) {
      if (!doc.exists) return;
      applyAppearance(doc.data());
    }, function(){});

    db.collection('settings').doc('contact').onSnapshot(function (doc) {
      if (!doc.exists) return;
      localStorage.setItem('velora_contact', JSON.stringify(doc.data()));
    }, function(){});
  }

  if (window._veloraFirebaseReady) startSync();
  else document.addEventListener('veloraFirebaseReady', startSync, { once: true });
});

// ============================================================
//  ÖZELLİK TOGGLE'LARI
// ============================================================
function applyFeatures(f) {
  if (!f) return;

  // BAKIM MODU — hepsinden önce kontrol et
  if (f.maintenance) { showMaintenance(); return; }

  // ARAMA ÇUBUĞU
  var searchBox = document.querySelector('.search-box');
  if (searchBox) searchBox.style.display = f.search === false ? 'none' : '';

  // FAVORİLER — header link + ürün kartlarındaki yıldız
  var favLink = document.querySelector('.fav-link');
  if (favLink) favLink.style.display = f.favorites === false ? 'none' : '';

  document.querySelectorAll('.product-card__fav').forEach(function(el) {
    el.style.display = f.favorites === false ? 'none' : '';
  });

  // DARK MODE TOGGLE
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) themeToggle.style.display = f.darkmode === false ? 'none' : '';

  // KUPON SİSTEMİ — sepet sayfasındaki kupon alanı
  var couponSection = document.querySelector('.coupon-section');
  if (couponSection) couponSection.style.display = f.coupon === false ? 'none' : '';

  // ÜYELİK SİSTEMİ — profil ikonu
  var profileIcon = document.querySelector('.profile-icon');
  if (profileIcon) profileIcon.style.display = f.auth === false ? 'none' : '';
}

// ============================================================
//  GÖRÜNÜM
// ============================================================
function applyAppearance(a) {
  if (!a) return;
  var root = document.documentElement;

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
    if (a.colors.text) root.style.setProperty('--text', a.colors.text);
  }

  if (a.headfont) loadGoogleFont(a.headfont, 'velora-head-font');
  if (a.bodyfont) {
    loadGoogleFont(a.bodyfont, 'velora-body-font');
    document.body.style.fontFamily = "'" + a.bodyfont + "', sans-serif";
  }

  if (a.favicon) {
    var fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = a.favicon;
  }

  if (a.banner) {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg) heroImg.src = a.banner;
  }

  applyBand(a);
}

// ── Duyuru Bandı ─────────────────────────────────────────────
function applyBand(a) {
  var BAND_ID = 'velora-announce-band';

  document.querySelectorAll('#' + BAND_ID + ', #velora-announce-bar').forEach(function(el) {
    el.parentNode.removeChild(el);
  });

  if (a.announcebar === false || !a.announcetext) {
    resetBodyPadding(0);
    return;
  }

  var band = document.createElement('div');
  band.id = BAND_ID;
  band.style.cssText = [
    'width:100%',
    'text-align:center',
    'padding:9px 16px',
    'font-size:12px',
    'font-family:Montserrat,sans-serif',
    'letter-spacing:1px',
    'position:fixed',
    'top:0',
    'left:0',
    'z-index:1002',
    'transition:background 0.3s,color 0.3s'
  ].join(';');

  band.textContent      = a.announcetext;
  band.style.background = a.announcecolor || '#111111';
  band.style.color      = a.announcetextcolor
    ? a.announcetextcolor
    : (isColorLight(a.announcecolor || '#000') ? '#111' : '#fff');

  document.body.appendChild(band);

  setTimeout(function() {
    var h = band.offsetHeight;
    resetBodyPadding(h);
    var header = document.querySelector('.header,.cart-header,.fav-header,.profile-header');
    if (header) header.style.top = h + 'px';
  }, 30);
}

function resetBodyPadding(bandHeight) {
  var base = window.innerWidth <= 480 ? 60 : window.innerWidth <= 768 ? 64 : 74;
  document.body.style.paddingTop = (base + bandHeight) + 'px';
}

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
    return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
  } catch(e) { return false; }
}

function shadeColor(hex, pct) {
  try {
    var c = (hex||'#fff').replace('#','');
    if (c.length===3) c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var n=parseInt(c,16);
    var r=Math.min(255,Math.max(0,(n>>16)+pct));
    var g=Math.min(255,Math.max(0,((n>>8)&0xff)+pct));
    var b=Math.min(255,Math.max(0,(n&0xff)+pct));
    return '#'+[r,g,b].map(function(x){return x.toString(16).padStart(2,'0');}).join('');
  } catch(e){return hex;}
}

function showMaintenance() {
  document.body.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;' +
    'background:#111;color:#c9b97a;font-family:serif;text-align:center;padding:20px">' +
    '<div><div style="font-size:48px;margin-bottom:20px">🔧</div>' +
    '<h1 style="font-size:2rem;margin-bottom:10px">Bakım Modu</h1>' +
    '<p style="color:#888;font-family:sans-serif">Sitemiz şu an bakımda. Lütfen daha sonra tekrar deneyin.</p>' +
    '</div></div>';
}
