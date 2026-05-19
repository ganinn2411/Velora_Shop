// ============================================================
//  VELORA — velora-realtime.js  (v5)
//  Firestore'u gerçek zamanlı dinler; ayarlar, görünüm ve
//  iletişim değişikliklerini anında sayfaya uygular.
// ============================================================

// DOMContentLoaded sonrasında çalışır; admin sayfalarında hiçbir şey yapmaz.
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href.includes('admin')) return; // Admin panelinde realtime dinleme başlatma

  // Firestore dinleyicilerini başlatan iç fonksiyon.
  // DB henüz hazır değilse 400ms sonra kendini tekrar çağırır (polling döngüsü).
  function startSync() {
    var db = getDB();
    if (!db) { setTimeout(startSync, 400); return; } // DB hazır değil, bekle

    // 'settings/main' dokümanını gerçek zamanlı dinle.
    // Belge değiştiğinde applyFeatures ile özellik toggle'ları güncellenir.
    db.collection('settings').doc('main').onSnapshot(function (doc) {
      if (!doc.exists) return; // Doküman yoksa işlem yapma
      applyFeatures(doc.data().features);
    }, function(){}); // Snapshot hatalarını sessizce yut

    // 'settings/appearance' dokümanını gerçek zamanlı dinle.
    // Renk, font, favicon, banner, duyuru bandı buradan güncellenir.
    db.collection('settings').doc('appearance').onSnapshot(function (doc) {
      if (!doc.exists) return;
      applyAppearance(doc.data());
    }, function(){});

    // 'settings/contact' dokümanını gerçek zamanlı dinle.
    // Değişiklikler localStorage'a yazılır; sayfanın iletişim bölümleri buradan okur.
    db.collection('settings').doc('contact').onSnapshot(function (doc) {
      if (!doc.exists) return;
      localStorage.setItem('velora_contact', JSON.stringify(doc.data()));
    }, function(){});
  }

  // Firebase hazırsa hemen başlat, değilse 'veloraFirebaseReady' event'ini bekle
  if (window._veloraFirebaseReady) startSync();
  else document.addEventListener('veloraFirebaseReady', startSync, { once: true });
});

// ============================================================
//  ÖZELLİK TOGGLE'LARI
// ============================================================
// Firestore'dan gelen 'features' nesnesine göre UI bileşenlerini
// göster ya da gizle. Bakım modu aktifse hemen showMaintenance çağrılır.
function applyFeatures(f) {
  if (!f) return; // Özellik nesnesi yoksa işlem yapma

  // BAKIM MODU — diğer tüm toggle'lardan önce kontrol edilmeli
  if (f.maintenance) { showMaintenance(); return; }

  // ARAMA ÇUBUĞU — f.search === false ise gizle
  var searchBox = document.querySelector('.search-box');
  if (searchBox) searchBox.style.display = f.search === false ? 'none' : '';

  // FAVORİLER — header'daki favori linki göster/gizle
  var favLink = document.querySelector('.fav-link');
  if (favLink) favLink.style.display = f.favorites === false ? 'none' : '';

  // Ürün kartlarındaki favori (yıldız) butonlarını göster/gizle
  document.querySelectorAll('.product-card__fav').forEach(function(el) {
    el.style.display = f.favorites === false ? 'none' : '';
  });

  // DARK MODE TOGGLE — tema değiştirme butonunu göster/gizle
  var themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) themeToggle.style.display = f.darkmode === false ? 'none' : '';

  // KUPON SİSTEMİ — sepet sayfasındaki kupon giriş alanını göster/gizle
  var couponSection = document.querySelector('.coupon-section');
  if (couponSection) couponSection.style.display = f.coupon === false ? 'none' : '';

  // ÜYELİK SİSTEMİ — profil ikonunu (giriş/kayıt) göster/gizle
  var profileIcon = document.querySelector('.profile-icon');
  if (profileIcon) profileIcon.style.display = f.auth === false ? 'none' : '';
}

// ============================================================
//  GÖRÜNÜM
// ============================================================
// Firestore 'settings/appearance' verisini alıp renk, font,
// favicon, banner ve duyuru bandını sayfaya uygular.
function applyAppearance(a) {
  if (!a) return;
  var root = document.documentElement; // CSS değişkenlerini :root'a yaz

  if (a.colors) {
    if (a.colors.primary) {
      // Birincil rengi buton arka planı olarak ata
      root.style.setProperty('--btn-bg',    a.colors.primary);
      // Açık renklerde koyu metin, koyu renklerde açık metin (kontrast)
      root.style.setProperty('--btn-color', isColorLight(a.colors.primary) ? '#111' : '#f5f0e8');
    }
    if (a.colors.bg) {
      root.style.setProperty('--bg',           a.colors.bg);
      root.style.setProperty('--header-bg',    a.colors.bg);
      root.style.setProperty('--bg-secondary', shadeColor(a.colors.bg, -8)); // %8 koyulaştır
      root.style.setProperty('--bg-card',      shadeColor(a.colors.bg, 5));  // %5 aydınlat
    }
    if (a.colors.text) root.style.setProperty('--text', a.colors.text);
  }

  // Google Fonts'tan başlık ve gövde fontunu yükle
  if (a.headfont) loadGoogleFont(a.headfont, 'velora-head-font');
  if (a.bodyfont) {
    loadGoogleFont(a.bodyfont, 'velora-body-font');
    document.body.style.fontFamily = "'" + a.bodyfont + "', sans-serif"; // Body'ye uygula
  }

  // Favicon URL'sini güncelle; link etiketi yoksa yeni oluştur
  if (a.favicon) {
    var fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = a.favicon;
  }

  // Hero banner görselini değiştir
  if (a.banner) {
    var heroImg = document.querySelector('.hero-img');
    if (heroImg) heroImg.src = a.banner;
  }

  // Duyuru bandını ayrı fonksiyonla uygula
  applyBand(a);
}

// ── Duyuru Bandı ─────────────────────────────────────────────
// Sayfanın üstünde sabit konumlu (fixed) bir duyuru şeridi oluşturur.
// Eski bandı kaldırır, yeni bandı ekler ve body'nin padding-top'ını
// band yüksekliğine göre ayarlar; header da aşağı kaydırılır.
function applyBand(a) {
  var BAND_ID = 'velora-announce-band';

  // Mevcut bant elementlerini temizle (eski + eski ID'li varyantlar)
  document.querySelectorAll('#' + BAND_ID + ', #velora-announce-bar').forEach(function(el) {
    el.parentNode.removeChild(el);
  });

  // announcebar false ise veya metin yoksa bandı kaldır, padding'i sıfırla
  if (a.announcebar === false || !a.announcetext) {
    resetBodyPadding(0);
    return;
  }

  // Yeni bant elementi oluştur
  var band = document.createElement('div');
  band.id = BAND_ID;
  // Sabit konumlu, tam genişlik, üstte sabitlenmiş stil
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
    'z-index:1002',                            // Header'ın üstünde olacak şekilde z-index
    'transition:background 0.3s,color 0.3s'   // Renk değişimlerinde yumuşak geçiş
  ].join(';');

  band.textContent      = a.announcetext;                       // Duyuru metni
  band.style.background = a.announcecolor || '#111111';         // Arka plan rengi (varsayılan koyu)
  band.style.color      = a.announcetextcolor
    ? a.announcetextcolor                                        // Açıkça belirtilmişse onu kullan
    : (isColorLight(a.announcecolor || '#000') ? '#111' : '#fff'); // Yoksa kontrasta göre seç

  document.body.appendChild(band); // Bandı sayfaya ekle

  // Band yüksekliğini DOM'a ekledikten sonra ölç (layout tamamlanana kadar bekle)
  setTimeout(function() {
    var h = band.offsetHeight;      // Gerçek piksel yüksekliği
    resetBodyPadding(h);            // Body padding-top'ını güncelle
    // Header'ı da band yüksekliği kadar aşağıya kaydır
    var header = document.querySelector('.header,.cart-header,.fav-header,.profile-header');
    if (header) header.style.top = h + 'px';
  }, 30); // 30ms → tarayıcının layout hesaplamasını tamamlaması için yeterli
}

// Body'nin padding-top'ını hesaplar ve günceller.
// Header yüksekliği ekran genişliğine göre değiştiğinden (responsive),
// bant yüksekliğine header yüksekliği de eklenerek toplam padding hesaplanır.
function resetBodyPadding(bandHeight) {
  var base = window.innerWidth <= 480 ? 60     // Mobil: 60px
           : window.innerWidth <= 768 ? 64     // Tablet: 64px
           : 74;                               // Desktop: 74px (header yüksekliği)
  document.body.style.paddingTop = (base + bandHeight) + 'px';
}

// Google Fonts'tan belirtilen fontu dinamik olarak yükler.
// Aynı ID'li link zaten varsa sadece href'i günceller (çift yüklemeyi önler).
function loadGoogleFont(fontName, linkId) {
  var href = 'https://fonts.googleapis.com/css2?family=' +
    fontName.replace(/ /g, '+') + ':wght@400;500;600;700&display=swap';
  var el = document.getElementById(linkId);
  if (el) { el.href = href; return; } // Zaten yüklü → sadece güncelle
  // Yeni link etiketi oluştur ve head'e ekle
  el = document.createElement('link');
  el.id  = linkId;
  el.rel = 'stylesheet';
  el.href = href;
  document.head.appendChild(el);
}

// Hex renk kodunun "açık renk mi?" olduğunu kontrol eden yardımcı fonksiyon.
// ITU-R BT.601 parlaklık formülü kullanılır; 128 eşiği üzeri açık renk.
// try-catch ile hatalı renk kodlarına karşı güvence altına alınmıştır.
function isColorLight(hex) {
  try {
    var c = (hex || '#000').replace('#', '');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2]; // Kısa hex'i genişlet
    return (parseInt(c.substr(0,2),16)*299 + parseInt(c.substr(2,2),16)*587 + parseInt(c.substr(4,2),16)*114) / 1000 > 128;
  } catch(e) { return false; } // Hata durumunda koyu renk kabul et
}

// Hex renk kodunu belirtilen miktar (pct) kadar aydınlatır veya koyulaştırır.
// Bit kaydırma ile R, G, B kanallarını ayrıştırır; her birine pct ekler.
// 0-255 aralığına sabitleme (Math.min/max) taşmayı önler.
function shadeColor(hex, pct) {
  try {
    var c = (hex||'#fff').replace('#','');
    if (c.length===3) c=c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var n = parseInt(c, 16);                             // 24 bitlik tam sayıya çevir
    var r = Math.min(255, Math.max(0, (n>>16)       + pct)); // Kırmızı kanalı kaydır
    var g = Math.min(255, Math.max(0, ((n>>8)&0xff) + pct)); // Yeşil kanalı kaydır
    var b = Math.min(255, Math.max(0, (n&0xff)      + pct)); // Mavi kanalı kaydır
    // R, G, B'yi 2 basamaklı hex'e çevirerek birleştir
    return '#' + [r,g,b].map(function(x){ return x.toString(16).padStart(2,'0'); }).join('');
  } catch(e){ return hex; } // Hata olursa orijinal rengi döndür
}

// Sayfanın tüm içeriğini silerek bakım modu ekranını gösterir.
// Siyah arka plan üzerinde ortalanmış, altın rengi metin ve 🔧 ikonu içerir.
function showMaintenance() {
  document.body.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;' +
    'background:#111;color:#c9b97a;font-family:serif;text-align:center;padding:20px">' +
    '<div><div style="font-size:48px;margin-bottom:20px">🔧</div>' +
    '<h1 style="font-size:2rem;margin-bottom:10px">Bakım Modu</h1>' +
    '<p style="color:#888;font-family:sans-serif">Sitemiz şu an bakımda. Lütfen daha sonra tekrar deneyin.</p>' +
    '</div></div>';
}
