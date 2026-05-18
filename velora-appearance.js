// ============================================================
//  VELORA — velora-appearance.js  (v2)
//  Duyuru bandı BURADAN KALDIRILDI — velora-realtime.js yapar.
//  Bu dosya sadece: renkler, favicon, logo, banner, fontlar.
// ============================================================

function vaIsLight(hex) {
  if (!hex || hex[0] !== '#') return true;
  var c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
}

function vaShade(hex, pct) {
  if (!hex || hex[0] !== '#') return hex;
  var c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  var res = '';
  for (var i = 0; i < 3; i++) {
    var val = Math.min(255, Math.max(0, parseInt(c.substr(i*2, 2), 16) + Math.round(255 * pct / 100)));
    res += val.toString(16).padStart(2, '0');
  }
  return '#' + res;
}

// ── BÖLÜM 1: Renkler & Favicon (DOM gerekmez) ────────────────
(function() {
  var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return;

  if (app.colors) {
    var root = document.documentElement.style;
    if (app.colors.primary) {
      root.setProperty('--btn-bg',    app.colors.primary);
      root.setProperty('--btn-color', vaIsLight(app.colors.primary) ? '#111111' : '#f5ede0');
    }
    if (app.colors.bg) {
      root.setProperty('--bg',           app.colors.bg);
      root.setProperty('--bg-secondary', vaShade(app.colors.bg, -5));
      root.setProperty('--bg-card',      vaShade(app.colors.bg, 3));
      root.setProperty('--header-bg',    app.colors.bg);
    }
    if (app.colors.text) {
      root.setProperty('--text',       app.colors.text);
      root.setProperty('--text-muted', vaShade(app.colors.text, 40));
      root.setProperty('--text-light', vaShade(app.colors.text, 60));
    }
  }

  if (app.favicon) {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = app.favicon;
  }

  // ── DOM gerektiren işlemler ───────────────────────────────
  function onReady() {
    // Logo resmi
    if (app.logo) {
      var logoEl = document.querySelector('.logo');
      if (logoEl) {
        var img = logoEl.querySelector('img.velora-logo-img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'velora-logo-img';
          img.style.cssText = 'height:32px;width:auto;object-fit:contain;vertical-align:middle';
          img.alt = 'VELORA';
          logoEl.textContent = '';
          logoEl.appendChild(img);
        }
        img.src = app.logo;
      }
    }

    // Ana banner
    if (app.banner) {
      var heroImg = document.querySelector('.hero .hero-img');
      if (heroImg) heroImg.src = app.banner;
    }

    // Fontlar
    if (app.headfont || app.bodyfont) {
      var families = [];
      if (app.headfont) families.push(app.headfont.replace(/ /g,'+') + ':wght@400;600;700');
      if (app.bodyfont && app.bodyfont !== app.headfont)
        families.push(app.bodyfont.replace(/ /g,'+') + ':wght@400;500');
      if (families.length) {
        var fl = document.createElement('link');
        fl.rel  = 'stylesheet';
        fl.href = 'https://fonts.googleapis.com/css2?family=' + families.join('&family=') + '&display=swap';
        document.head.appendChild(fl);
      }
      if (app.bodyfont) document.body.style.fontFamily = "'" + app.bodyfont + "', sans-serif";
      if (app.headfont) {
        document.querySelectorAll('h1,h2,h3,h4,.logo').forEach(function(el) {
          el.style.fontFamily = "'" + app.headfont + "', serif";
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

// ── BÖLÜM 2: Site Ayarları ────────────────────────────────────
(function() {
  var s = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!s) return;

  if (s.title && s.title.trim()) document.title = s.title;

  if (s.storeName) {
    var applyName = function() {
      var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
      if (app && app.logo) return;
      var logoEl = document.querySelector('.logo');
      if (logoEl && !logoEl.querySelector('img')) logoEl.textContent = s.storeName;
    };
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', applyName)
      : applyName();
  }
})();
