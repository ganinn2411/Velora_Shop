// ============================================================
//  VELORA — velora-appearance.js
//  Bu dosyayı velora-data.js ve script.js'den ÖNCE,
//  </body> kapanmadan hemen önce ekleyin:
//
//  <script src="velora-appearance.js"></script>
//  <script src="velora-data.js"></script>
//  <script src="script.js"></script>
//  </body>
//
//  admin.html'e EKLEMEYIN.
// ============================================================

// ── Yardımcı: renk açık mı koyu mu? ─────────────────────────
function vaIsLight(hex) {
  if (!hex || hex[0] !== '#') return true;
  var c = hex.replace('#', '');
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
}

// ── Yardımcı: rengi açık/koyu tona çek ───────────────────────
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

// ════════════════════════════════════════════════════════════
//  BÖLÜM 1 — GÖRÜNÜM (velora_appearance)
// ════════════════════════════════════════════════════════════
(function() {
  var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return;

  // 1a. CSS değişkenleri — DOM hazır olmadan da çalışır
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

  // 1b. Favicon — DOM hazır olmadan da çalışır
  if (app.favicon) {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = app.favicon;
  }

  // 1c. DOM gerektiren işlemler — body yüklendikten sonra
  function onReady() {

    // Duyuru bandı
    if (app.announcetext && app.announcebar !== false) {
      var bar = document.getElementById('velora-announce-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'velora-announce-bar';
        bar.style.cssText =
          'width:100%;text-align:center;padding:10px 16px;font-size:12px;' +
          'font-weight:500;letter-spacing:1.5px;font-family:Montserrat,sans-serif;' +
          'position:fixed;top:0;left:0;z-index:1002;';
        document.body.insertBefore(bar, document.body.firstChild);
        // Header'ı aşağı kaydır
        var header = document.querySelector('.header,.cart-header,.fav-header,.profile-header');
        if (header) header.style.top = '40px';
        // Body boşluğunu artır
        var pt = parseInt(getComputedStyle(document.body).paddingTop) || 0;
        document.body.style.paddingTop = (pt + 40) + 'px';
      }
      var bc = app.announcecolor || '#111111';
      bar.style.backgroundColor = bc;
      bar.style.color = vaIsLight(bc) ? '#111111' : '#ffffff';
      bar.textContent = app.announcetext;
    } else {
      var existBar = document.getElementById('velora-announce-bar');
      if (existBar) existBar.style.display = 'none';
    }

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

    // Ana banner görseli
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

  // Bu script </body>'den önce yüklendiği için DOM zaten hazır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

// ════════════════════════════════════════════════════════════
//  BÖLÜM 2 — SİTE AYARLARI (velora_settings)
// ════════════════════════════════════════════════════════════
(function() {
  var s = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!s) return;

  // Sayfa başlığı
  if (s.title && s.title.trim()) document.title = s.title;

  // Bakım modu
  if (s.features && s.features.maintenance) {
    var path = window.location.pathname;
    var isAdmin = path.indexOf('admin') !== -1;

    if (!isAdmin) {
      var html =
        '<div style="display:flex;flex-direction:column;align-items:center;' +
        'justify-content:center;min-height:100vh;background:#f5ede0;color:#1a1008;' +
        'font-family:Montserrat,sans-serif;text-align:center;gap:20px;padding:20px">' +
        '<div style="font-size:52px">🔧</div>' +
        '<h1 style="font-size:24px;letter-spacing:4px;font-weight:300">BAKIM MODU</h1>' +
        '<p style="color:#6b5744;font-size:13px;max-width:400px;line-height:1.8">' +
        'Sitemiz kısa süreliğine bakımda.<br>En kısa sürede geri döneceğiz.</p>' +
        '</div>';

      // Bu script body'den önce değil, </body>'den önce yükleniyor
      // yani document.body kesinlikle hazır
      document.body.innerHTML = html;
      document.documentElement.style.overflow = 'hidden';
    }
  }

  // Mağaza adı (logo URL yoksa)
  if (s.storeName) {
    var applyName = function() {
      var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
      if (app && app.logo) return;
      var logoEl = document.querySelector('.logo');
      if (logoEl && !logoEl.querySelector('img')) {
        logoEl.textContent = s.storeName;
      }
    };
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', applyName)
      : applyName();
  }
})();
