// ============================================================
//  VELORA — velora-appearance.js
//  Admin panelinden kaydedilen görünüm ve site ayarlarını
//  siteye uygular. Tüm HTML sayfalarında <head> içine,
//  style.css'den SONRA ekleyin:
//  <script src="velora-appearance.js"></script>
// ============================================================

(function applyAppearance() {
  var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return;

  // ── 1. CSS Renk Değişkenleri ──────────────────────────────
  // style.css'deki :root değişkenlerinin üzerine doğrudan yazar.
  if (app.colors) {
    var r = document.documentElement.style;

    if (app.colors.primary) {
      // Buton arka planı — btn-bg tüm butonları etkiler
      r.setProperty('--btn-bg',    app.colors.primary);
      r.setProperty('--btn-color', isLightColor(app.colors.primary) ? '#111111' : '#f5ede0');
    }

    if (app.colors.bg) {
      r.setProperty('--bg',           app.colors.bg);
      r.setProperty('--bg-secondary', shadeColor(app.colors.bg, -5));
      r.setProperty('--bg-card',      shadeColor(app.colors.bg, 3));
      r.setProperty('--header-bg',    app.colors.bg);
    }

    if (app.colors.text) {
      r.setProperty('--text',       app.colors.text);
      r.setProperty('--text-muted', shadeColor(app.colors.text, 40));
      r.setProperty('--text-light', shadeColor(app.colors.text, 60));
    }
  }

  // ── 2. Duyuru Bandı ───────────────────────────────────────
  function applyAnnounceBar() {
    var bar = document.getElementById('velora-announce-bar');

    if (app.announcebar === false) {
      if (bar) bar.style.display = 'none';
      return;
    }

    var text  = app.announcetext  || '';
    var color = app.announcecolor || '#111111';
    if (!text) return;

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'velora-announce-bar';
      bar.style.cssText = [
        'width:100%',
        'text-align:center',
        'padding:10px 16px',
        'font-size:12px',
        'font-weight:500',
        'letter-spacing:1.5px',
        'font-family:Montserrat,sans-serif',
        'position:fixed',
        'top:0',
        'left:0',
        'z-index:1002',
      ].join(';');
      document.body.insertBefore(bar, document.body.firstChild);
      // Header ve body padding'i bant yüksekliği kadar aşağı kaydır
      var barH = 40; // Yaklaşık yükseklik (offsetHeight henüz 0 olabilir)
      var header = document.querySelector('.header, .cart-header, .fav-header, .profile-header');
      if (header) header.style.top = barH + 'px';
      var currentPT = parseInt(getComputedStyle(document.body).paddingTop) || 0;
      document.body.style.paddingTop = (currentPT + barH) + 'px';
    }

    bar.style.backgroundColor = color;
    bar.style.color           = isLightColor(color) ? '#111111' : '#ffffff';
    bar.textContent           = text;
  }

  // ── 3. Favicon ────────────────────────────────────────────
  function applyFavicon() {
    if (!app.favicon) return;
    var link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.href = app.favicon;
  }

  // ── 4. Logo ───────────────────────────────────────────────
  function applyLogo() {
    if (!app.logo) return;
    var logoEl = document.querySelector('.logo');
    if (!logoEl) return;
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

  // ── 5. Ana Banner ─────────────────────────────────────────
  function applyBanner() {
    if (!app.banner) return;
    var heroImg = document.querySelector('.hero .hero-img');
    if (heroImg) heroImg.src = app.banner;
  }

  // ── 6. Fontlar ────────────────────────────────────────────
  function applyFonts() {
    var families = [];
    if (app.headfont) families.push(app.headfont.replace(/ /g, '+') + ':wght@400;600;700');
    if (app.bodyfont && app.bodyfont !== app.headfont)
      families.push(app.bodyfont.replace(/ /g, '+') + ':wght@400;500');
    if (families.length) {
      var lnk = document.createElement('link');
      lnk.rel  = 'stylesheet';
      lnk.href = 'https://fonts.googleapis.com/css2?family=' + families.join('&family=') + '&display=swap';
      document.head.appendChild(lnk);
    }
    if (app.bodyfont) document.body.style.fontFamily = "'" + app.bodyfont + "', sans-serif";
    if (app.headfont) {
      document.querySelectorAll('h1,h2,h3,h4,.logo').forEach(function(el) {
        el.style.fontFamily = "'" + app.headfont + "', serif";
      });
    }
  }

  // ── Yardımcılar ───────────────────────────────────────────
  function isLightColor(hex) {
    if (!hex || hex[0] !== '#') return true;
    var c = hex.replace('#','');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
  }

  function shadeColor(hex, pct) {
    if (!hex || hex[0] !== '#') return hex;
    var c = hex.replace('#','');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    return '#' + ['0','2','4'].map(function(o,i){ return Math.min(255,Math.max(0,parseInt(c.substr(i*2,2),16)+Math.round(255*pct/100))).toString(16).padStart(2,'0'); }).join('');
  }

  // ── Çalıştır ──────────────────────────────────────────────
  applyFavicon();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyAnnounceBar(); applyLogo(); applyBanner(); applyFonts();
    });
  } else {
    applyAnnounceBar(); applyLogo(); applyBanner(); applyFonts();
  }
})();

// ── Site Ayarları ─────────────────────────────────────────────────────
(function applySettings() {
  var s = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!s) return;

  if (s.title && s.title.trim()) document.title = s.title;

  if (s.features && s.features.maintenance) {
    var isAdmin = window.location.pathname.indexOf('admin') !== -1;
    if (!isAdmin) {
      var maintenanceHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;' +
        'min-height:100vh;background:#f5ede0;color:#1a1008;font-family:Montserrat,sans-serif;text-align:center;gap:20px;padding:20px">' +
        '<div style="font-size:52px">🔧</div>' +
        '<h1 style="font-size:24px;letter-spacing:4px;font-weight:300">BAKIM MODU</h1>' +
        '<p style="color:#6b5744;font-size:13px;max-width:400px;line-height:1.8">' +
        'Sitemiz kısa süreliğine bakımda.<br>En kısa sürede geri döneceğiz.</p>' +
        '</div>';

      var showMaintenance = function() {
        // Tüm sayfa içeriğini gizle, bakım ekranı göster
        document.body.innerHTML = maintenanceHTML;
        // Scroll'u devre dışı bırak
        document.documentElement.style.overflow = 'hidden';
      };

      // Script <head>'de yüklendiğinde body henüz hazır olmayabilir
      if (document.body) {
        showMaintenance();
      } else {
        // Body hazır olur olmaz çalıştır — DOMContentLoaded beklemeden
        document.addEventListener('DOMContentLoaded', showMaintenance);
        // Alternatif: body parse edilir edilmez yakala
        var observer = new MutationObserver(function() {
          if (document.body) {
            observer.disconnect();
            showMaintenance();
          }
        });
        observer.observe(document.documentElement, { childList: true });
      }
    }
  }

  if (s.storeName) {
    var updateLogo = function() {
      var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
      if (app && app.logo) return;
      var logoEl = document.querySelector('.logo');
      if (logoEl && !logoEl.querySelector('img')) logoEl.textContent = s.storeName;
    };
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', updateLogo) : updateLogo();
  }
})();
