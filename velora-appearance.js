// ============================================================
//  VELORA — velora-appearance.js  (v2)
//  Duyuru bandı BURADAN KALDIRILDI — velora-realtime.js yapar.
//  Bu dosya sadece: renkler, favicon, logo, banner, fontlar.
// ============================================================

// Verilen hex renk kodunun "açık renk mi?" olduğunu kontrol eder.
// Parlaklık hesabı için ITU-R BT.601 katsayılarını (299/587/114) kullanır.
// 128'in üzerindeyse açık renk sayılır ve true döner.
function vaIsLight(hex) {
  if (!hex || hex[0] !== '#') return true; // Geçersiz renk gelirse açık kabul et
  var c = hex.replace('#', ''); // Başındaki # işaretini kaldır
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2]; // 3 karakterli kısa hex'i 6'ya genişlet (#abc → aabbcc)
  return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
}

// Hex renk kodunu belirtilen yüzde kadar aydınlatır (pozitif pct) veya koyulaştırır (negatif pct).
// Her R, G, B kanalına pct/100 * 255 değeri eklenir; 0-255 aralığına sıkıştırılır.
function vaShade(hex, pct) {
  if (!hex || hex[0] !== '#') return hex; // Geçersiz renk gelirse olduğu gibi döndür
  var c = hex.replace('#', ''); // Başındaki # işaretini kaldır
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2]; // 3 karakterli kısa hex'i 6'ya genişlet
  var res = '';
  for (var i = 0; i < 3; i++) { // R, G, B kanallarını sırayla işle
    // Kanalı oku, yüzde kadar kaydır, 0-255 arasına sabitle, hex'e çevir
    var val = Math.min(255, Math.max(0, parseInt(c.substr(i*2, 2), 16) + Math.round(255 * pct / 100)));
    res += val.toString(16).padStart(2, '0'); // 2 basamaklı hex olarak birleştir
  }
  return '#' + res; // Sonucu #rrggbb formatında döndür
}

// ── BÖLÜM 1: Renkler & Favicon (DOM gerekmez) ────────────────
// Bu IIFE (hemen çalışan fonksiyon) sayfa yüklenir yüklenmez çalışır;
// localStorage'dan görünüm ayarlarını okuyup CSS değişkenlerini ve favicon'u ayarlar.
(function() {
  // localStorage'dan 'velora_appearance' anahtarını oku; yoksa null döner
  var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return; // Hiç ayar kaydedilmemişse işlem yapma

  if (app.colors) {
    var root = document.documentElement.style; // :root'a CSS değişkeni eklemek için

    if (app.colors.primary) {
      // Birincil rengi buton arka planı olarak ata
      root.setProperty('--btn-bg', app.colors.primary);
      // Birincil renk açıksa koyu metin, koyuysa açık metin rengi seç (kontrast için)
      root.setProperty('--btn-color', vaIsLight(app.colors.primary) ? '#111111' : '#f5ede0');
    }

    if (app.colors.bg) {
      // Arka plan rengini ve türevlerini CSS değişkenlerine yaz
      root.setProperty('--bg',           app.colors.bg);                    // Ana arka plan
      root.setProperty('--bg-secondary', vaShade(app.colors.bg, -5));       // %5 koyulaştırılmış ikincil arka plan
      root.setProperty('--bg-card',      vaShade(app.colors.bg, 3));        // %3 aydınlatılmış kart arka planı
      root.setProperty('--header-bg',    app.colors.bg);                    // Header arka planı (aynı renk)
    }

    if (app.colors.text) {
      // Metin rengini ve soluk tonlarını CSS değişkenlerine yaz
      root.setProperty('--text',       app.colors.text);                    // Ana metin rengi
      root.setProperty('--text-muted', vaShade(app.colors.text, 40));       // %40 aydınlatılmış soluk metin
      root.setProperty('--text-light', vaShade(app.colors.text, 60));       // %60 aydınlatılmış çok açık metin
    }
  }

  if (app.favicon) {
    // Mevcut <link rel="icon"> etiketini bul; yoksa yeni oluştur
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link); // Head'e ekle
    }
    link.href = app.favicon; // Favicon URL'sini güncelle
  }

  // ── DOM gerektiren işlemler ───────────────────────────────
  // Logo, banner ve font ayarları DOM'a ihtiyaç duyduğundan
  // DOMContentLoaded sonrasına ertelenir.
  function onReady() {

    // Logo resmi: .logo elementini bulup içine <img> yerleştir
    if (app.logo) {
      var logoEl = document.querySelector('.logo');
      if (logoEl) {
        // Daha önce oluşturulmamışsa yeni bir <img> oluştur
        var img = logoEl.querySelector('img.velora-logo-img');
        if (!img) {
          img = document.createElement('img');
          img.className = 'velora-logo-img';
          // Logo görselini hizalamak için satır içi stil
          img.style.cssText = 'height:32px;width:auto;object-fit:contain;vertical-align:middle';
          img.alt = 'VELORA';
          logoEl.textContent = ''; // Var olan metin (mağaza adı) temizle
          logoEl.appendChild(img); // Resmi ekle
        }
        img.src = app.logo; // Logo URL'sini ata
      }
    }

    // Ana banner: .hero .hero-img elementinin src'sini güncelle
    if (app.banner) {
      var heroImg = document.querySelector('.hero .hero-img');
      if (heroImg) heroImg.src = app.banner;
    }

    // Fontlar: Google Fonts'tan başlık ve gövde fontu yükle
    if (app.headfont || app.bodyfont) {
      var families = [];

      if (app.headfont)
        // Boşlukları "+" ile değiştir (URL uyumlu), ağırlıkları ekle
        families.push(app.headfont.replace(/ /g,'+') + ':wght@400;600;700');

      if (app.bodyfont && app.bodyfont !== app.headfont)
        // Başlık fontuyla aynı değilse gövde fontunu da listeye ekle
        families.push(app.bodyfont.replace(/ /g,'+') + ':wght@400;500');

      if (families.length) {
        // Google Fonts stylesheet bağlantısını dinamik olarak head'e ekle
        var fl = document.createElement('link');
        fl.rel  = 'stylesheet';
        fl.href = 'https://fonts.googleapis.com/css2?family=' + families.join('&family=') + '&display=swap';
        document.head.appendChild(fl);
      }

      // Gövde fontunu tüm sayfaya uygula
      if (app.bodyfont) document.body.style.fontFamily = "'" + app.bodyfont + "', sans-serif";

      // Başlık fontunu h1-h4 ve logo elementlerine uygula
      if (app.headfont) {
        document.querySelectorAll('h1,h2,h3,h4,.logo').forEach(function(el) {
          el.style.fontFamily = "'" + app.headfont + "', serif";
        });
      }
    }
  }

  // DOM henüz yüklenmediyse DOMContentLoaded bekle, hazırsa hemen çalıştır
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }
})();

// ── BÖLÜM 2: Site Ayarları ────────────────────────────────────
// localStorage'dan genel site ayarlarını okuyup sayfa başlığını
// ve logo metnini (resim yoksa) günceller.
(function() {
  // 'velora_settings' anahtarından site ayarlarını oku; yoksa null döner
  var s = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!s) return; // Hiç ayar kaydedilmemişse işlem yapma

  // Sayfa başlığını (browser sekmesi) güncelle
  if (s.title && s.title.trim()) document.title = s.title;

  if (s.storeName) {
    // Mağaza adını logo alanına yazma işlemi; logo resmi varsa bunu yapma
    var applyName = function() {
      var app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
      if (app && app.logo) return; // Logo resmi tanımlıysa metin yazma

      var logoEl = document.querySelector('.logo');
      // Logo elementinde zaten bir <img> yoksa mağaza adını metin olarak yaz
      if (logoEl && !logoEl.querySelector('img')) logoEl.textContent = s.storeName;
    };

    // DOM henüz hazır değilse bekle, hazırsa hemen uygula
    document.readyState === 'loading'
      ? document.addEventListener('DOMContentLoaded', applyName)
      : applyName();
  }
})();
