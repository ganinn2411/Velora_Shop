// ============================================================
//  VELORA — velora-realtime.js
//  Bu dosyayı projenize ekleyin ve sitenizin her sayfasında
//  velora-firebase.js'den SONRA yükleyin:
//  <script src="velora-realtime.js"></script>
//
//  velora-firebase.js içindeki eski "applySettings" bloğunu
//  SİLİN — bu dosya onun yerine geçiyor.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  if (window.location.href.includes('admin')) return;

  function startRealtimeSync() {
    var db = getDB();
    if (!db) { setTimeout(startRealtimeSync, 500); return; }

    // Bakım modu
    db.collection('settings').doc('main').onSnapshot(function (doc) {
      if (!doc.exists) return;
      var s = doc.data();
      if (s.features && s.features.maintenance) {
        showMaintenancePage();
      }
    });

    // Görünüm — değişince ANINDA uygula
    db.collection('settings').doc('appearance').onSnapshot(function (doc) {
      if (!doc.exists) return;
      applyAppearance(doc.data());
    });
  }

  if (window._veloraFirebaseReady) startRealtimeSync();
  else document.addEventListener('veloraFirebaseReady', startRealtimeSync, { once: true });
});

function applyAppearance(a) {
  if (!a) return;

  // ── Renkler ───────────────────────────────────────────────
  if (a.colors) {
    if (a.colors.primary) document.documentElement.style.setProperty('--accent', a.colors.primary);
    if (a.colors.bg)      document.documentElement.style.setProperty('--bg', a.colors.bg);
    if (a.colors.text)    document.documentElement.style.setProperty('--text', a.colors.text);
  }

  // ── Fontlar ───────────────────────────────────────────────
  if (a.headfont) loadGoogleFont(a.headfont, 'velora-head-font');
  if (a.bodyfont) loadGoogleFont(a.bodyfont, 'velora-body-font');

  // ── Favicon ───────────────────────────────────────────────
  if (a.favicon) {
    var fav = document.querySelector("link[rel='icon']");
    if (!fav) { fav = document.createElement('link'); fav.rel = 'icon'; document.head.appendChild(fav); }
    fav.href = a.favicon;
  }

  // ── Duyuru Bandı ──────────────────────────────────────────
  var band = document.querySelector('.announcement-bar, .announce-bar, #velora-announce-band, [class*="announce"]');
  if (!band) {
    band = document.createElement('div');
    band.id = 'velora-announce-band';
    band.style.cssText = 'width:100%;text-align:center;padding:8px 16px;font-size:13px;font-weight:500;z-index:999;position:relative';
    document.body.insertBefore(band, document.body.firstChild);
  }

  if (a.announcebar === false) {
    band.style.display = 'none';
  } else {
    band.style.display = 'block';
    if (a.announcetext)  band.textContent      = a.announcetext;
    if (a.announcecolor) band.style.background = a.announcecolor;
    band.style.color = a.announcetextcolor || (isColorLight(a.announcecolor) ? '#111' : '#fff');
  }
}

function loadGoogleFont(fontName, linkId) {
  var existing = document.getElementById(linkId);
  var href = 'https://fonts.googleapis.com/css2?family=' + fontName.replace(/ /g, '+') + ':wght@400;500;600;700&display=swap';
  if (existing) { existing.href = href; return; }
  var link = document.createElement('link');
  link.id = linkId; link.rel = 'stylesheet'; link.href = href;
  document.head.appendChild(link);
}

function isColorLight(hex) {
  try {
    var c = (hex || '').replace('#','');
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
    var r=parseInt(c.substr(0,2),16), g=parseInt(c.substr(2,2),16), b=parseInt(c.substr(4,2),16);
    return (r*299+g*587+b*114)/1000 > 128;
  } catch(e) { return false; }
}

function showMaintenancePage() {
  document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#111;color:#c9b97a;font-family:serif;text-align:center;padding:20px"><div><div style="font-size:48px;margin-bottom:20px">🔧</div><h1 style="font-size:2rem;margin-bottom:10px">Bakım Modu</h1><p style="color:#888;font-family:sans-serif">Sitemiz şu an bakımda. Kısa süre içinde geri döneceğiz.</p></div></div>';
}
