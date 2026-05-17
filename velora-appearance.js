// ============================================================
//  VELORA — velora-appearance.js
//  Admin panelinden kaydedilen görünüm ayarlarını siteye uygular.
//  HTML'de <head> içinde, style.css'den SONRA yükleyin:
//  <script src="velora-appearance.js"></script>
// ============================================================

(function applyAppearance() {
  var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return;

  // ── 1. CSS Renk Değişkenleri ──────────────────────────────
  // Admin'den gelen renkler CSS custom property olarak root'a yazılır.
  // style.css'deki tüm var(--primary) vb. kullanımlar anında güncellenir.
  if (app.colors) {
    var root = document.documentElement.style;
    if (app.colors.primary) {
      root.setProperty('--primary',      app.colors.primary);
      root.setProperty('--accent',       app.colors.primary);
      root.setProperty('--gold',         app.colors.primary);
      root.setProperty('--btn-bg',       app.colors.primary);
    }
    if (app.colors.bg) {
      root.setProperty('--bg',           app.colors.bg);
      root.setProperty('--body-bg',      app.colors.bg);
      root.setProperty('--background',   app.colors.bg);
    }
    if (app.colors.text) {
      root.setProperty('--text',         app.colors.text);
      root.setProperty('--text-color',   app.colors.text);
      root.setProperty('--foreground',   app.colors.text);
    }
  }

  // ── 2. Duyuru Bandı ───────────────────────────────────────
  // DOM yüklendikten sonra çalışır; eğer sayfa zaten yüklendiyse hemen çalışır.
  function applyAnnounceBar() {
    // Mevcut bant varsa güncelle, yoksa oluştur
    var bar = document.getElementById('velora-announce-bar');

    if (app.announcebar === false) {
      // Kapalıysa gizle/kaldır
      if (bar) bar.style.display = 'none';
      return;
    }

    var text  = app.announcetext  || '';
    var color = app.announcecolor || '#111111';

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'velora-announce-bar';
      bar.style.cssText = [
        'width:100%',
        'text-align:center',
        'padding:9px 16px',
        'font-size:13px',
        'font-weight:500',
        'letter-spacing:0.5px',
        'position:relative',
        'z-index:200',
      ].join(';');
      // Header'ın hemen üstüne ekle
      var header = document.querySelector('header') || document.body.firstElementChild;
      document.body.insertBefore(bar, header);
    }

    bar.style.display         = 'block';
    bar.style.backgroundColor = color;
    // Arka plan rengine göre yazı rengini otomatik belirle (açık/koyu)
    bar.style.color = isLightColor(color) ? '#111111' : '#ffffff';
    bar.textContent = text;
  }

  // ── 3. Favicon ────────────────────────────────────────────
  function applyFavicon() {
    if (!app.favicon) return;
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = app.favicon;
  }

  // ── 4. Logo URL ───────────────────────────────────────────
  function applyLogo() {
    if (!app.logo) return;
    // .logo sınıflı elementi bul; metin yerine resim göster
    var logoEl = document.querySelector('.logo');
    if (!logoEl) return;
    // Zaten img varsa src'yi güncelle, yoksa oluştur
    var img = logoEl.querySelector('img.velora-logo-img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'velora-logo-img';
      img.style.cssText = 'height:36px;width:auto;object-fit:contain;vertical-align:middle';
      img.alt = 'VELORA';
      logoEl.textContent = ''; // Eski metin içeriği temizle
      logoEl.appendChild(img);
    }
    img.src = app.logo;
  }

  // ── 5. Ana Banner ─────────────────────────────────────────
  function applyBanner() {
    if (!app.banner) return;
    // İlk .hero-img görselini değiştir
    var heroImg = document.querySelector('.hero .hero-img');
    if (heroImg) heroImg.src = app.banner;
  }

  // ── 6. Fontlar ────────────────────────────────────────────
  function applyFonts() {
    // Google Fonts URL oluştur
    var fonts = [];
    if (app.headfont) fonts.push(app.headfont.replace(/ /g, '+') + ':wght@400;600;700');
    if (app.bodyfont) fonts.push(app.bodyfont.replace(/ /g, '+') + ':wght@400;500');
    if (fonts.length === 0) return;

    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=' + fonts.join('&family=') + '&display=swap';
    document.head.appendChild(link);

    var root = document.documentElement.style;
    if (app.headfont) root.setProperty('--font-heading', "'" + app.headfont + "', serif");
    if (app.bodyfont) root.setProperty('--font-body',    "'" + app.bodyfont + "', sans-serif");

    // Doğrudan body ve başlıklara da uygula (CSS değişkeni yoksa)
    if (app.bodyfont) document.body.style.fontFamily = "'" + app.bodyfont + "', sans-serif";
    if (app.headfont) {
      document.querySelectorAll('h1,h2,h3,h4,.logo,.nav-link').forEach(function(el) {
        el.style.fontFamily = "'" + app.headfont + "', serif";
      });
    }
  }

  // ── Yardımcı: Renk açık mı koyu mu? ──────────────────────
  // hex rengi RGB'ye çevirip parlaklık hesaplar (W3C formülü).
  function isLightColor(hex) {
    var c = hex.replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r = parseInt(c.substr(0,2),16);
    var g = parseInt(c.substr(2,2),16);
    var b = parseInt(c.substr(4,2),16);
    // Görece parlaklık
    return (r*299 + g*587 + b*114) / 1000 > 128;
  }

  // ── Uygulama sırası ───────────────────────────────────────
  // Renkler ve favicon hemen (DOM hazır olmadan) uygulanabilir.
  applyFavicon();

  // Geri kalanlar DOM hazır olduktan sonra
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      applyAnnounceBar();
      applyLogo();
      applyBanner();
      applyFonts();
    });
  } else {
    // DOM zaten hazır
    applyAnnounceBar();
    applyLogo();
    applyBanner();
    applyFonts();
  }

})();

// ── Site Ayarları (velora_settings) ──────────────────────────────────
// Bakım modu, para birimi gibi ayarları uygular.
(function applySettings() {
  var settings = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!settings) return;

  // Bakım modu açıksa — admin paneli dışındaki sayfaları engelle
  if (settings.features && settings.features.maintenance) {
    var isAdmin = window.location.pathname.indexOf('admin') !== -1;
    if (!isAdmin) {
      document.addEventListener('DOMContentLoaded', function() {
        document.body.innerHTML =
          '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#0c0c0e;color:#ede9e0;font-family:sans-serif;text-align:center;gap:16px">' +
            '<div style="font-size:48px">🔧</div>' +
            '<h1 style="font-size:28px;letter-spacing:4px;color:#c9b97a">BAKIM MODU</h1>' +
            '<p style="color:#666;font-size:14px">Sitemiz şu an bakımda. Kısa süre içinde geri döneceğiz.</p>' +
          '</div>';
      });
    }
  }

  // Sayfa başlığını güncelle
  if (settings.title && settings.title.trim()) {
    document.title = settings.title;
  }

  // Mağaza adını logo alanında güncelle (logo URL yoksa)
  if (settings.storeName) {
    document.addEventListener('DOMContentLoaded', function() {
      var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
      var hasLogoUrl = app && app.logo;
      if (!hasLogoUrl) {
        var logoEl = document.querySelector('.logo');
        if (logoEl && !logoEl.querySelector('img')) {
          logoEl.textContent = settings.storeName;
        }
      }
    });
  }

})();
