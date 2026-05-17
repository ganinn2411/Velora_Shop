// ============================================================
//  VELORA — script.js
//  velora-data.js'den SONRA yüklenmelidir.
// ============================================================

// =====================
// ÜRÜNLER — admin panelinden localStorage'a kaydedilen ürünleri oku
// =====================
var products = (typeof vGetProducts === "function") ? vGetProducts() : [];

// localStorage değiştiğinde (admin panelinde ürün eklenince) sayfayı güncelle
window.addEventListener("storage", function(e) {
  if (e.key === "velora_products") {
    products = (typeof vGetProducts === "function") ? vGetProducts() : [];
    if (document.getElementById("products") && !document.getElementById("category-title")) {
      renderTopProducts(getNewCollection(products));
    }
    if (document.getElementById("products-bottom")) {
      renderBottomProducts(getRandomCollection(products));
    }
    if (document.getElementById("category-title")) {
      loadCategoryPage();
    }
    if (document.getElementById("favorites-list")) {
      renderFavoritesPage();
    }
  }
});

// =====================
// SEPET
// =====================
var cart = JSON.parse(localStorage.getItem("cart")) || [];
var selectedSize = "";
var selectedColor = "";

function requireLogin() {
  var user = JSON.parse(localStorage.getItem("activeUser"));
  if (!user) {
    if (confirm("Bu işlem için giriş yapmanız gerekiyor.\nGiriş sayfasına gitmek ister misiniz?")) {
      window.location.href = "profile.html";
    }
    return false;
  }
  return true;
}

function addToCart(id) {
  if (!requireLogin()) return;
  var product = products.find(function(p) { return p.id === id; });
  if (!product) return;
  if (!selectedSize)  { alert("Lütfen beden seçiniz!"); return; }
  if (!selectedColor) { alert("Lütfen renk seçiniz!"); return; }

  var existingItem = cart.find(function(item) {
    return item.id === id && item.size === selectedSize && item.color === selectedColor;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCenterToast(product.name);
}

function showCenterToast(productName) {
  const el  = document.getElementById('centerToast');
  const msg = document.getElementById('centerToastMsg');
  if (!el) return;
  if (msg) msg.textContent = productName;

  el.style.width      = '';
  el.style.left       = '';
  el.style.top        = '';
  el.style.marginLeft = '';
  el.style.marginTop  = '';

  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { el.classList.remove('show'); }, 2200);
}

function updateCartCount() {
  var el = document.getElementById("cart-count");
  if (el) {
    var total = cart.reduce(function(sum, i) { return sum + (i.quantity || 0); }, 0);
    el.innerText = total;
  }
}

function updateHeaderCount() {
  var cartData = JSON.parse(localStorage.getItem("cart")) || [];
  var total = cartData.reduce(function(s, i) { return s + (i.quantity || 0); }, 0);
  var el = document.getElementById("header-item-count");
  if (el) el.textContent = total > 0 ? total + " ürün" : "";
}

function checkCouponVisibility() {
  var cartData = JSON.parse(localStorage.getItem("cart")) || [];
  var box = document.getElementById("coupon-box");
  if (box) box.style.display = cartData.length > 0 ? "block" : "none";
}

updateCartCount();

window.addEventListener("load", function() {
  updateHeaderCount();
  checkCouponVisibility();
});

// =====================
// ÜRÜN KARTI
// =====================
function productCard(p) {
  return '<div class="product-card" onclick="goToProduct(' + p.id + ')">' +
    '<div class="product-card__img-wrap">' +
      '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.src=\'https://placehold.co/300x400/f0f0f0/aaa?text=Görsel+Yok\'">' +
      '<span class="product-card__fav save-icon" data-id="' + p.id + '" onclick="toggleFavorite(event,' + p.id + ')">☆</span>' +
    '</div>' +
    '<div class="product-card__info">' +
      '<h3>' + p.name + '</h3>' +
      '<p>' + p.price.toLocaleString("tr-TR") + ' TL</p>' +
      '<button onclick="event.stopPropagation();goToProduct(' + p.id + ')">SEPETE EKLE</button>' +
    '</div>' +
  '</div>';
}

function goToProduct(id) {
  window.location.href = "product.html?id=" + id;
}

// =====================
// ANA SAYFA SLIDER'LARI
// =====================
function renderTopProducts(list) {
  var container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = list.map(productCard).join("");
  updateSaveIcons();
}

function renderBottomProducts(list) {
  var container = document.getElementById("products-bottom");
  if (!container) return;
  container.innerHTML = list.map(productCard).join("");
  updateSaveIcons();
}

function getNewCollection(list) {
  return list.slice().sort(function(a,b) { return b.id - a.id; }).slice(0, 12);
}

function getRandomCollection(list) {
  return list.slice().sort(function() { return 0.5 - Math.random(); }).slice(0, 12);
}

// =====================
// KATEGORİ SAYFASI
// =====================
function renderProducts(list) {
  var container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = list.map(productCard).join("");
  updateSaveIcons();
}

function loadCategoryPage() {
  var titleEl = document.getElementById("category-title");
  if (!titleEl) return;

  var params   = new URLSearchParams(window.location.search);
  var main     = params.get("category");
  var sub      = params.get("type");
  if (!main || !sub) return;

  var filtered = products.filter(function(p) { return p.category === main && p.type === sub; });

  var catLabel  = { erkek:"Erkek", kadin:"Kadın", cocuk:"Çocuk" };
  var typeLabel = { tisort:"Tişört", pantalon:"Pantolon", ceket:"Ceket", sapka:"Şapka" };

  titleEl.innerText = (catLabel[main] || main) + " / " + (typeLabel[sub] || sub);
  renderProducts(filtered);
}

// =====================
// ARAMA & FİLTRE
// =====================
var searchInput  = document.getElementById("searchInput");
var filterSelect = document.getElementById("filterSelect");

function applyFilters() {
  var params = new URLSearchParams(window.location.search);
  var main   = params.get("category");
  var sub    = params.get("type");

  var filtered = (main && sub)
    ? products.filter(function(p) { return p.category === main && p.type === sub; })
    : products.slice();

  var searchValue = searchInput  ? searchInput.value.toLowerCase()  : "";
  var filterValue = filterSelect ? filterSelect.value               : "all";

  if (searchValue) {
    filtered = filtered.filter(function(p) { return p.name.toLowerCase().includes(searchValue); });
  }
  if (filterValue === "cheapest") {
    filtered = filtered.sort(function(a,b) { return a.price - b.price; });
  } else if (filterValue === "expensive") {
    filtered = filtered.sort(function(a,b) { return b.price - a.price; });
  }

  if (document.getElementById("category-title")) {
    renderProducts(filtered);
  } else {
    renderTopProducts(filtered);
  }
}

if (searchInput)  searchInput.addEventListener("input",  applyFilters);
if (filterSelect) filterSelect.addEventListener("change", applyFilters);

// =====================
// ÜRÜN DETAY SAYFASI
// =====================
document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById("productDetail");
  if (!container) return;

  var id      = Number(new URLSearchParams(window.location.search).get("id"));
  var product = products.find(function(p) { return p.id === id; });

  if (!product) {
    container.innerHTML = "<h2 style='padding:40px'>Ürün bulunamadı</h2>";
    return;
  }

  container.innerHTML =
    '<div class="product-image">' +
      '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.src=\'https://placehold.co/450x560/f0f0f0/aaa?text=Görsel+Yok\'">' +
    '</div>' +
    '<div class="product-info">' +
      '<h1>' + product.name + '</h1>' +
      '<p class="price">' + product.price.toLocaleString("tr-TR") + ' TL</p>' +
      '<p class="desc">Bu ürün modern tasarım, yüksek kalite kumaş ile üretilmiştir. Günlük kullanım için uygundur ve rahat kesime sahiptir.</p>' +
      '<label>Beden</label>' +
      '<div class="sizes">' +
        '<button onclick="selectSize(this)">S</button>' +
        '<button onclick="selectSize(this)">M</button>' +
        '<button onclick="selectSize(this)">L</button>' +
        '<button onclick="selectSize(this)">XL</button>' +
      '</div>' +
      '<label>Renk</label>' +
      '<div class="colors">' +
        '<div class="color black" onclick="selectColor(\'Siyah\',this)"></div>' +
        '<div class="color white" onclick="selectColor(\'Beyaz\',this)"></div>' +
        '<div class="color blue"  onclick="selectColor(\'Mavi\',this)"></div>' +
      '</div>' +
      '<button class="btn-add-to-cart" onclick="addToCart(' + product.id + ')">' +
        '<span><span class="btn-icon">🛒</span> SEPETE EKLE</span>' +
      '</button>' +
    '</div>';

  // Benzer ürünler
  var similar = products
    .filter(function(p) { return p.id !== product.id; })
    .sort(function() { return 0.5 - Math.random(); })
    .slice(0, 4);

  if (similar.length > 0) {
    var sec = document.createElement("section");
    sec.className = "similar-products";
    sec.innerHTML =
      '<h2 class="similar-title">Benzer Ürünler</h2>' +
      '<div class="similar-grid">' +
        similar.map(function(p) {
          return '<div class="product-card" onclick="goToProduct(' + p.id + ')">' +
            '<div class="product-card__img-wrap">' +
              '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy">' +
              '<span class="product-card__fav save-icon" data-id="' + p.id + '" onclick="toggleFavorite(event,' + p.id + ')">☆</span>' +
            '</div>' +
            '<div class="product-card__info">' +
              '<h3>' + p.name + '</h3>' +
              '<p>' + p.price.toLocaleString("tr-TR") + ' TL</p>' +
              '<button onclick="event.stopPropagation();goToProduct(' + p.id + ')">İNCELE</button>' +
            '</div>' +
          '</div>';
        }).join("") +
      '</div>';
    var productPage = document.querySelector(".product-page");
    if (productPage) productPage.insertAdjacentElement("afterend", sec);
    updateSaveIcons();
  }
});

function selectSize(btn) {
  document.querySelectorAll(".sizes button").forEach(function(b) { b.classList.remove("active"); });
  btn.classList.add("active");
  selectedSize = btn.innerText;
}

function selectColor(color, el) {
  selectedColor = color;
  document.querySelectorAll(".color").forEach(function(c) { c.classList.remove("active"); });
  el.classList.add("active");
}

// =====================
// KUPON SİSTEMİ (vValidateCoupon kullanır)
// =====================
var aktifKupon = null;

function applyCoupon() {
  var input = document.getElementById("couponInput");
  var msg   = document.getElementById("couponMsg");
  var kod   = input ? input.value.trim() : "";

  if (msg) { msg.className = "coupon-msg"; msg.textContent = ""; }
  if (aktifKupon) {
    if (msg) { msg.textContent = "Zaten bir kupon uygulandı. Önce kaldırın."; msg.className = "coupon-msg error"; }
    return;
  }

  // vValidateCoupon kullan (admin panelinden eklenen kuponları destekler)
  var result = (typeof vValidateCoupon === "function")
    ? vValidateCoupon(kod)
    : { valid:false, discount:0, message:"Geçersiz kupon." };

  if (!result.valid) {
    if (msg) { msg.textContent = result.message; msg.className = "coupon-msg error"; }
    return;
  }

  aktifKupon = { kod: kod.trim().toUpperCase(), yuzde: result.discount };
  if (input) input.disabled = true;

  var appliedCodeText = document.getElementById("appliedCodeText");
  var couponApplied   = document.getElementById("couponApplied");
  if (appliedCodeText) appliedCodeText.textContent = aktifKupon.kod + " (%" + aktifKupon.yuzde + " indirim)";
  if (couponApplied)   couponApplied.style.display  = "flex";
  if (msg) { msg.textContent = result.message; msg.className = "coupon-msg success"; }

  renderCart();
}

function removeCoupon() {
  aktifKupon = null;
  var input = document.getElementById("couponInput");
  if (input) { input.value = ""; input.disabled = false; }
  var couponApplied = document.getElementById("couponApplied");
  if (couponApplied) couponApplied.style.display = "none";
  var discountRow = document.getElementById("discountRow");
  if (discountRow) discountRow.style.display = "none";
  var couponMsg = document.getElementById("couponMsg");
  if (couponMsg) couponMsg.className = "coupon-msg";
  renderCart();
}

// =====================
// SEPET SAYFASI
// =====================
if (document.getElementById("cart-items")) { renderCart(); }

function renderCart() {
  var container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  var araToplamTL = 0;

  var couponBox = document.getElementById("coupon-box");
  if (couponBox) couponBox.style.display = cart.length > 0 ? "block" : "none";
  updateHeaderCount();

  cart.forEach(function(item) {
    var itemTotal = item.price * item.quantity;
    araToplamTL += itemTotal;
    container.innerHTML +=
      '<div class="cart-item">' +
        '<a href="product.html?id=' + item.id + '">' +
          '<img src="' + item.image + '" class="product-img" alt="' + item.name + '">' +
        '</a>' +
        '<div>' +
          '<h4><a href="product.html?id=' + item.id + '" class="product-link">' + item.name + '</a></h4>' +
          '<p>Beden: <strong>' + item.size + '</strong></p>' +
          '<p>Renk: <strong>' + item.color + '</strong></p>' +
        '</div>' +
        '<div class="cart-price">' + item.price.toLocaleString("tr-TR") + ' TL</div>' +
        '<div class="quantity">' +
          '<button onclick="changeQty(' + item.id + ',\'' + item.size + '\',\'' + item.color + '\',-1)">−</button>' +
          '<span>' + item.quantity + '</span>' +
          '<button onclick="changeQty(' + item.id + ',\'' + item.size + '\',\'' + item.color + '\',1)">+</button>' +
        '</div>' +
        '<div class="remove" onclick="removeItem(' + item.id + ',\'' + item.size + '\',\'' + item.color + '\')">❌</div>' +
      '</div>';
  });

  var discountRow     = document.getElementById("discountRow");
  var discountDisplay = document.getElementById("discountDisplay");
  var totalEl         = document.getElementById("total");

  if (aktifKupon && araToplamTL > 0) {
    var indirimMiktar = Math.round(araToplamTL * aktifKupon.yuzde / 100);
    var sonToplamTL   = araToplamTL - indirimMiktar;
    if (discountDisplay) discountDisplay.textContent = "-" + indirimMiktar.toLocaleString("tr-TR") + " TL";
    if (discountRow)     discountRow.style.display   = "flex";
    if (totalEl)         totalEl.innerText           = sonToplamTL.toLocaleString("tr-TR");
  } else {
    if (discountRow) discountRow.style.display = "none";
    if (totalEl)     totalEl.innerText         = araToplamTL.toLocaleString("tr-TR");
  }
}

function changeQty(id, size, color, delta) {
  var item = cart.find(function(i) { return i.id === id && i.size === size && i.color === color; });
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(function(i) { return !(i.id === id && i.size === size && i.color === color); });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeItem(id, size, color) {
  cart = cart.filter(function(i) { return !(i.id === id && i.size === size && i.color === color); });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// =====================
// FAVORİLER
// =====================
function toggleFavorite(e, id) {
  e.stopPropagation();
  if (!requireLogin()) return;
  var saved = JSON.parse(localStorage.getItem("saved")) || [];
  if (saved.includes(id)) {
    saved = saved.filter(function(s) { return s !== id; });
  } else {
    saved.push(id);
  }
  localStorage.setItem("saved", JSON.stringify(saved));
  updateSaveIcons();
}

function updateSaveIcons() {
  var saved = JSON.parse(localStorage.getItem("saved")) || [];
  document.querySelectorAll(".save-icon").forEach(function(icon) {
    icon.innerText = saved.includes(Number(icon.dataset.id)) ? "★" : "☆";
  });
}

setTimeout(updateSaveIcons, 100);

document.addEventListener("DOMContentLoaded", function() {
  if (document.getElementById("favorites-list")) {
    var saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number);
    var valid = saved.filter(function(id) { return products.find(function(p) { return p.id === id; }); });
    if (valid.length !== saved.length) {
      localStorage.setItem("saved", JSON.stringify(valid));
    }
    renderFavoritesPage();
  }
});

function renderFavoritesPage() {
  var container = document.getElementById("favorites-list");
  if (!container) return;
  container.innerHTML = "";

  var saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number);

  if (saved.length === 0) {
    container.innerHTML = "<p style='color:#999;font-size:14px;letter-spacing:1px;'>Henüz favori ürün eklemediniz.</p>";
    return;
  }

  saved.forEach(function(id) {
    var product = products.find(function(p) { return p.id === id; });
    if (!product) return;
    container.innerHTML +=
      '<div class="product-card" style="position:relative">' +
        '<div class="remove-btn" onclick="removeSaved(' + product.id + ')">✕</div>' +
        '<div class="product-card__img-wrap">' +
          '<img src="' + product.image + '" onclick="goToProduct(' + product.id + ')" style="cursor:pointer" alt="' + product.name + '">' +
        '</div>' +
        '<div class="product-card__info">' +
          '<h3 onclick="goToProduct(' + product.id + ')" style="cursor:pointer">' + product.name + '</h3>' +
          '<p>' + product.price.toLocaleString("tr-TR") + ' TL</p>' +
          '<button onclick="goToProduct(' + product.id + ')">ÜRÜNE GİT</button>' +
        '</div>' +
      '</div>';
  });
}

function removeSaved(id) {
  var saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number).filter(function(i) { return i !== Number(id); });
  localStorage.setItem("saved", JSON.stringify(saved));
  renderFavoritesPage();
}

// =====================
// SLIDER OKLAR
// =====================
function slideRight() {
  var el = document.getElementById("products");
  if (el) el.scrollBy({ left:280, behavior:"smooth" });
}
function slideLeft() {
  var el = document.getElementById("products");
  if (el) el.scrollBy({ left:-280, behavior:"smooth" });
}
function scrollBottom(dir) {
  var el = document.getElementById("products-bottom");
  if (el) el.scrollBy({ left:dir*280, behavior:"smooth" });
}

var topSlider = document.getElementById("products");
var topLeft   = document.querySelectorAll(".arrow.left")[0];
var topRight  = document.querySelectorAll(".arrow.right")[0];

function updateTopButtons() {
  if (!topSlider) return;
  if (topLeft)  topLeft.style.display  = topSlider.scrollLeft <= 10 ? "none" : "flex";
  if (topRight) topRight.style.display = (topSlider.scrollLeft + topSlider.clientWidth >= topSlider.scrollWidth - 10) ? "none" : "flex";
}

if (topSlider) {
  topSlider.addEventListener("scroll", updateTopButtons);
  window.addEventListener("load", updateTopButtons);
}

var bottomSlider = document.getElementById("products-bottom");
var bottomLeft   = document.querySelectorAll(".arrow.left")[1];
var bottomRight  = document.querySelectorAll(".arrow.right")[1];

function updateBottomButtons() {
  if (!bottomSlider) return;
  if (bottomLeft)  bottomLeft.style.display  = bottomSlider.scrollLeft <= 10 ? "none" : "flex";
  if (bottomRight) bottomRight.style.display = (bottomSlider.scrollLeft + bottomSlider.clientWidth >= bottomSlider.scrollWidth - 10) ? "none" : "flex";
}

if (bottomSlider) {
  bottomSlider.addEventListener("scroll", updateBottomButtons);
  window.addEventListener("load", updateBottomButtons);
}

// =====================
// WHATSAPP ÖDEME
// =====================
function sendWhatsApp() {
  if (cart.length === 0) { alert("Sepetiniz boş!"); return; }

  var message = "🛒 Sipariş Detayı:%0A%0A";
  var araToplamTL = 0;

  cart.forEach(function(item) {
    var itemTL = item.price * item.quantity;
    araToplamTL += itemTL;
    message += "Ürün: " + item.name + "%0A";
    message += "Beden: " + item.size + "%0A";
    message += "Renk: " + item.color + "%0A";
    message += "Adet: " + item.quantity + "%0A";
    message += "Fiyat: " + itemTL.toLocaleString("tr-TR") + " TL%0A%0A";
  });

  var sonToplamTL = araToplamTL;
  if (aktifKupon && araToplamTL > 0) {
    var indirimMiktar = Math.round(araToplamTL * aktifKupon.yuzde / 100);
    sonToplamTL = araToplamTL - indirimMiktar;
    message += "🏷️ Kupon: " + aktifKupon.kod + " (-%" + aktifKupon.yuzde + ")%0A";
    message += "İndirim: -" + indirimMiktar.toLocaleString("tr-TR") + " TL%0A";
  }

  // WhatsApp numarasını ayarlardan al
  var contact = (typeof vGetContact === "function") ? vGetContact() : {};
  var waNumber = contact.waNumber || "905550066123";
  if (contact.waActive === false) { alert("WhatsApp ile sipariş şu an aktif değil."); return; }

  message += "💰 TOPLAM: " + sonToplamTL.toLocaleString("tr-TR") + " TL";
  window.open("https://wa.me/" + waNumber + "?text=" + message, "_blank");
}

// =====================
// NAV MEGA MENU (mobil toggle)
// =====================
document.querySelectorAll(".nav-item").forEach(function(item) {
  item.addEventListener("click", function() { item.classList.toggle("active"); });
});

// =====================
// TOAST
// =====================
function showToast(msg, type) {
  type = type || "";
  var t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show " + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(function() { t.className = "toast"; }, 3000);
}

// =====================
// ANA SAYFA BAŞLAT
// =====================
(function init() {
  if (document.getElementById("products") && !document.getElementById("category-title")) {
    renderTopProducts(getNewCollection(products));
  }
  if (document.getElementById("products-bottom")) {
    renderBottomProducts(getRandomCollection(products));
  }
  if (document.getElementById("category-title")) {
    loadCategoryPage();
  }
})();

// =====================
// DARK MODE
// =====================
(function initTheme() {
  var saved = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.body.classList.add("dark");
  }
  updateThemeBtn();
})();

function toggleTheme() {
  document.body.classList.toggle("dark");
  var isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeBtn();
}

function updateThemeBtn() {
  var isDark = document.body.classList.contains("dark");
  document.querySelectorAll(".theme-toggle").forEach(function(btn) {
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.title = isDark ? "Aydınlık Mod" : "Karanlık Mod";
  });
}

// =====================
// HAMBURGer MENÜ
// =====================
function toggleMenu() {
  var nav    = document.getElementById("navMenu");
  var search = document.querySelector(".search-box");
  if (!nav) return;
  nav.classList.toggle("open");
  if (search) search.classList.toggle("open");
}

// =====================
// BANNER ANİMASYON
// =====================
function animateBanner() {
  var banner = document.querySelector(".mero");
  if (!banner) return;
  if (banner.getBoundingClientRect().top < window.innerHeight - 100) {
    banner.classList.add("show");
  }
}
window.addEventListener("scroll", animateBanner);
window.addEventListener("load", animateBanner);

// =====================
// SCROLL REVEAL
// =====================
document.addEventListener("DOMContentLoaded", function() {
  function revealOnScroll() {
    document.querySelectorAll(".about-reveal-left, .about-reveal-right").forEach(function(el) {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add("revealed");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// =====================
// PROFİL İKONU GÜNCELLE
// =====================
(function updateProfileIcon() {
  var user = JSON.parse(localStorage.getItem("activeUser"));
  var icon = document.getElementById("profile-icon");
  if (!icon) return;
  if (user) {
    var initials = user.name.split(" ").map(function(n) { return n[0]; }).join("").slice(0, 2).toUpperCase();
    icon.innerHTML = initials;
    icon.classList.add("logged-in");
    icon.title = user.name;
  }
})();

// =====================
// AUTH FONKSİYONLARI
// =====================
function showSection(id) {
  ["register-section","verify-section","login-section","profile-section"].forEach(function(s) {
    var el = document.getElementById(s);
    if (el) el.classList.add("hidden");
  });
  var target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

function showLogin()    { showSection("login-section"); }
function showRegister() { showSection("register-section"); }

function setError(fgId, show) {
  var fg = document.getElementById(fgId);
  if (!fg) return;
  show ? fg.classList.add("has-error") : fg.classList.remove("has-error");
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

var PW_RULES = {
  length:  { regex:/.{8,}/,         ruleId:"rule-length"  },
  upper:   { regex:/[A-Z]/,         ruleId:"rule-upper"   },
  number:  { regex:/[0-9]/,         ruleId:"rule-number"  },
  special: { regex:/[^a-zA-Z0-9]/, ruleId:"rule-special" }
};

function checkPasswordStrength(value) {
  var passed = 0;
  Object.keys(PW_RULES).forEach(function(key) {
    var rule = PW_RULES[key];
    var ok   = rule.regex.test(value);
    var el   = document.getElementById(rule.ruleId);
    if (el) {
      el.classList.toggle("rule-ok",   ok);
      el.classList.toggle("rule-fail", !ok && value.length > 0);
      el.textContent = (ok ? "✓ " : "✗ ") + el.textContent.slice(2);
    }
    if (ok) passed++;
  });
  var fill = document.getElementById("pw-strength-fill");
  if (!fill) return;
  fill.style.width = (passed / 4 * 100) + "%";
  fill.className = "pw-strength-fill";
  if (passed <= 1)      fill.classList.add("pw-weak");
  else if (passed === 2) fill.classList.add("pw-fair");
  else if (passed === 3) fill.classList.add("pw-good");
  else                   fill.classList.add("pw-strong");
}

function isPasswordValid(value) {
  return Object.values(PW_RULES).every(function(r) { return r.regex.test(value); });
}

function togglePw(inputId, btn) {
  var inp = document.getElementById(inputId);
  if (!inp) return;
  var isText = inp.type === "text";
  inp.type = isText ? "password" : "text";
  btn.innerHTML = isText
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
}

async function hashPassword(password) {
  var msgBuffer  = new TextEncoder().encode(password);
  var hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  return Array.from(new Uint8Array(hashBuffer)).map(function(b) { return b.toString(16).padStart(2,"0"); }).join("");
}

var tempUser = {};

async function handleRegister() {
  var name      = document.getElementById("reg-name").value.trim();
  var email     = document.getElementById("reg-email").value.trim();
  var password  = document.getElementById("reg-password").value;
  var password2 = document.getElementById("reg-password2").value;
  var termsCheck = document.getElementById("termsCheck");
  var ok = true;

  if (!name)                              { setError("fg-name",  true);  ok = false; } else { setError("fg-name",  false); }
  if (!email || !isValidEmail(email))     { setError("fg-email", true);  ok = false; document.getElementById("email-error-msg").textContent = !email ? "E-posta zorunludur." : "Geçerli e-posta girin."; } else { setError("fg-email", false); }
  if (!isPasswordValid(password))         { setError("fg-password",  true);  ok = false; document.getElementById("password-error-msg").textContent = "Şifre gereksinimleri karşılanmıyor."; } else { setError("fg-password",  false); }
  if (password !== password2)             { setError("fg-password2", true);  ok = false; document.getElementById("password2-error-msg").textContent = "Şifreler eşleşmiyor."; } else { setError("fg-password2", false); }
  if (termsCheck && !termsCheck.checked)  { setError("fg-terms",    true);  ok = false; } else { setError("fg-terms", false); }
  if (!ok) return;

  var allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  if (allUsers.find(function(u) { return u.email.toLowerCase() === email.toLowerCase(); })) {
    document.getElementById("email-error-msg").textContent = "Bu e-posta zaten kayıtlı.";
    setError("fg-email", true); return;
  }

  var hashedPw = await hashPassword(password);
  tempUser = { name:name, email:email, passwordHash:hashedPw };
  var labelEl = document.getElementById("verify-email-label");
  if (labelEl) labelEl.textContent = email;

  var verifyCode = String(Math.floor(1000 + Math.random() * 9000));
  tempUser.code = verifyCode;

  var btn = document.getElementById("register-btn");
  if (btn) { btn.disabled = true; btn.textContent = "Gönderiliyor..."; }

  if (typeof emailjs !== "undefined") {
    emailjs.send("service_u871hgw", "template_nnfkcc3", { to_email:email, to_name:name, code:verifyCode })
      .then(function() {
        showToast("Doğrulama kodu gönderildi!", "success");
        startCountdown();
        showSection("verify-section");
        var d1 = document.getElementById("d1");
        if (d1) setTimeout(function() { d1.focus(); }, 100);
      })
      .catch(function(err) { console.error(err); showToast("Mail gönderilemedi.", "error"); })
      .finally(function() { if (btn) { btn.disabled = false; btn.textContent = "Üye Ol ve Doğrulama Kodu Gönder"; } });
  } else {
    // EmailJS yüklü değilse kodu console'a yaz (geliştirme)
    console.log("Doğrulama kodu:", verifyCode);
    showToast("Kod: " + verifyCode + " (EmailJS yüklü değil)", "");
    startCountdown();
    showSection("verify-section");
    if (btn) { btn.disabled = false; btn.textContent = "Üye Ol ve Doğrulama Kodu Gönder"; }
  }
}

["d1","d2","d3","d4"].forEach(function(id, i, arr) {
  var input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("input", function(e) {
    var val = e.target.value.replace(/\D/g, "");
    e.target.value = val;
    if (val && i < arr.length - 1) {
      var next = document.getElementById(arr[i+1]);
      if (next) next.focus();
    }
    e.target.classList.toggle("filled", !!val);
    var full = arr.map(function(a) { var el = document.getElementById(a); return el ? el.value : ""; }).join("");
    if (full.length === 4) setTimeout(handleVerify, 200);
  });
  input.addEventListener("keydown", function(e) {
    if (e.key === "Backspace" && !input.value && i > 0) {
      var prev = document.getElementById(arr[i-1]);
      if (prev) prev.focus();
    }
  });
  input.addEventListener("paste", function(e) {
    e.preventDefault();
    var text = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g,"").slice(0,4);
    arr.forEach(function(a, j) {
      var el = document.getElementById(a);
      if (el) { el.value = text[j] || ""; el.classList.toggle("filled", !!el.value); }
    });
    if (text.length === 4) setTimeout(handleVerify, 200);
  });
});

function getCode() {
  return ["d1","d2","d3","d4"].map(function(id) { var el = document.getElementById(id); return el ? el.value : ""; }).join("");
}

function handleVerify() {
  var code = getCode();
  if (code.length < 4) { showToast("Lütfen 4 haneli kodu girin.", "error"); return; }
  if (code === tempUser.code) {
    var allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
    var saveUser = { name:tempUser.name, email:tempUser.email, passwordHash:tempUser.passwordHash };
    if (!allUsers.find(function(u) { return u.email.toLowerCase() === tempUser.email.toLowerCase(); })) {
      allUsers.push(saveUser);
      localStorage.setItem("velora_users", JSON.stringify(allUsers));
    }
    localStorage.setItem("activeUser", JSON.stringify({ name:saveUser.name, email:saveUser.email }));
    showToast("Üyeliğiniz tamamlandı! Hoş geldiniz 🎉", "success");
    setTimeout(function() { window.location.href = "index.html"; }, 1200);
  } else {
    showToast("Hatalı kod.", "error");
    ["d1","d2","d3","d4"].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.value = ""; el.classList.remove("filled");
      el.style.borderColor = "#cc0000";
      setTimeout(function() { el.style.borderColor = ""; }, 1500);
    });
    var d1 = document.getElementById("d1");
    if (d1) d1.focus();
  }
}

async function handleLogin() {
  var email    = document.getElementById("login-email").value.trim();
  var password = document.getElementById("login-password").value;
  var ok = true;

  if (!email || !isValidEmail(email)) { document.getElementById("login-email-error-msg").textContent = "Geçerli e-posta girin."; setError("fg-login-email", true); ok = false; } else { setError("fg-login-email", false); }
  if (!password)                      { document.getElementById("login-password-error-msg").textContent = "Şifre zorunludur."; setError("fg-login-password", true); ok = false; } else { setError("fg-login-password", false); }
  if (!ok) return;

  var allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  var user = allUsers.find(function(u) { return u.email.toLowerCase() === email.toLowerCase(); });

  if (!user) { document.getElementById("login-email-error-msg").textContent = "Bu e-posta kayıtlı değil."; setError("fg-login-email", true); return; }

  var hashedPw = await hashPassword(password);
  if (user.passwordHash && hashedPw !== user.passwordHash) {
    document.getElementById("login-password-error-msg").textContent = "Şifre hatalı.";
    setError("fg-login-password", true); return;
  }

  var rememberMe   = document.getElementById("rememberMe");
  var sessionUser  = { name:user.name, email:user.email };
  localStorage.setItem("activeUser", JSON.stringify(sessionUser));
  if (rememberMe && rememberMe.checked) { localStorage.setItem("velora_remember", "true"); }
  else { localStorage.removeItem("velora_remember"); }

  setError("fg-login-email", false);
  setError("fg-login-password", false);
  showToast("Hoş geldiniz, " + user.name + "!", "success");
  setTimeout(function() { window.location.href = "index.html"; }, 1200);
}

var PW_RULES2 = {
  length:  { regex:/.{8,}/,         ruleId:"rule2-length"  },
  upper:   { regex:/[A-Z]/,         ruleId:"rule2-upper"   },
  number:  { regex:/[0-9]/,         ruleId:"rule2-number"  },
  special: { regex:/[^a-zA-Z0-9]/, ruleId:"rule2-special" }
};

function checkPasswordStrength2(value) {
  var passed = 0;
  Object.keys(PW_RULES2).forEach(function(key) {
    var rule = PW_RULES2[key]; var ok = rule.regex.test(value);
    var el = document.getElementById(rule.ruleId);
    if (el) { el.classList.toggle("rule-ok",ok); el.classList.toggle("rule-fail",!ok&&value.length>0); el.textContent=(ok?"✓ ":"✗ ")+el.textContent.slice(2); }
    if (ok) passed++;
  });
  var fill = document.getElementById("pw-strength-fill2");
  if (!fill) return;
  fill.style.width = (passed/4*100)+"%"; fill.className="pw-strength-fill";
  if (passed<=1) fill.classList.add("pw-weak"); else if(passed===2) fill.classList.add("pw-fair"); else if(passed===3) fill.classList.add("pw-good"); else fill.classList.add("pw-strong");
}

function togglePwChangeForm() {
  var form   = document.getElementById("pw-change-form");
  var toggle = document.getElementById("pw-change-toggle");
  if (!form) return;
  var isHidden = form.classList.contains("hidden");
  form.classList.toggle("hidden");
  if (toggle) toggle.textContent = isHidden ? "İptal" : "Değiştir";
}

async function handleChangePassword() {
  var currentPw = document.getElementById("current-pw").value;
  var newPw     = document.getElementById("new-pw").value;
  var newPw2    = document.getElementById("new-pw2").value;
  var ok = true;
  if (!currentPw)           { document.getElementById("current-pw-error-msg").textContent="Mevcut şifrenizi girin."; setError("fg-current-pw",true); ok=false; } else { setError("fg-current-pw",false); }
  if (!isPasswordValid(newPw)) { document.getElementById("new-pw-error-msg").textContent="Şifre gereksinimleri karşılanmıyor."; setError("fg-new-pw",true); ok=false; } else { setError("fg-new-pw",false); }
  if (newPw !== newPw2)     { document.getElementById("new-pw2-error-msg").textContent="Şifreler eşleşmiyor."; setError("fg-new-pw2",true); ok=false; } else { setError("fg-new-pw2",false); }
  if (!ok) return;
  var activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) { showToast("Oturum bulunamadı.", "error"); return; }
  var allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  var userIdx  = allUsers.findIndex(function(u) { return u.email.toLowerCase() === activeUser.email.toLowerCase(); });
  if (userIdx === -1) { showToast("Kullanıcı bulunamadı.", "error"); return; }
  var currentHash = await hashPassword(currentPw);
  if (allUsers[userIdx].passwordHash && currentHash !== allUsers[userIdx].passwordHash) {
    document.getElementById("current-pw-error-msg").textContent = "Mevcut şifre hatalı.";
    setError("fg-current-pw", true); return;
  }
  allUsers[userIdx].passwordHash = await hashPassword(newPw);
  localStorage.setItem("velora_users", JSON.stringify(allUsers));
  showToast("Şifreniz güncellendi! ✅", "success");
  togglePwChangeForm();
}

function handleLogout() {
  if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("velora_remember");
    sessionStorage.removeItem("activeUser");
    showToast("Çıkış yapıldı.", "");
    setTimeout(function() { showSection("login-section"); }, 600);
  }
}

function openTermsModal(e) { if (e) e.preventDefault(); var m = document.getElementById("termsModal"); if (m) m.classList.add("active"); }
function closeTermsModal(e) { if (e.target === document.getElementById("termsModal")) { document.getElementById("termsModal").classList.remove("active"); } }
function acceptTerms() { var cb = document.getElementById("termsCheck"); if (cb) { cb.checked=true; setError("fg-terms",false); } var m = document.getElementById("termsModal"); if (m) m.classList.remove("active"); }

function showProfile(user) {
  var initials = user.name.split(" ").map(function(n) { return n[0]; }).join("").slice(0,2).toUpperCase();
  var av = document.getElementById("profile-avatar"); if (av) av.textContent = initials;
  var pn = document.getElementById("profile-name"); if (pn) pn.textContent = user.name;
  var pe = document.getElementById("profile-email"); if (pe) pe.textContent = user.email;
  var pnd = document.getElementById("profile-name-detail"); if (pnd) pnd.textContent = user.name;
  var ped = document.getElementById("profile-email-detail"); if (ped) ped.textContent = user.email;
  showSection("profile-section");
}

var countdownInterval;
function startCountdown() {
  var btn = document.getElementById("resend-btn");
  var txt = document.getElementById("countdown-text");
  var sec = 60;
  if (btn) btn.classList.add("counting");
  if (txt) txt.textContent = " (" + sec + "s)";
  clearInterval(countdownInterval);
  countdownInterval = setInterval(function() {
    sec--;
    if (sec <= 0) { clearInterval(countdownInterval); if (btn) btn.classList.remove("counting"); if (txt) txt.textContent = ""; }
    else { if (txt) txt.textContent = " (" + sec + "s)"; }
  }, 1000);
}

function resendCode() {
  var btn = document.getElementById("resend-btn");
  if (btn && btn.classList.contains("counting")) return;
  var newCode = String(Math.floor(1000 + Math.random() * 9000));
  tempUser.code = newCode;
  if (typeof emailjs !== "undefined") {
    emailjs.send("service_u871hgw","template_nnfkcc3",{to_email:tempUser.email,to_name:tempUser.name,code:newCode})
      .then(function() { showToast("Yeni kod gönderildi!", "success"); })
      .catch(function() { showToast("Mail gönderilemedi.", "error"); });
  }
  startCountdown();
}

document.addEventListener("DOMContentLoaded", function() {
  var user = JSON.parse(localStorage.getItem("activeUser"));
  if (user && document.getElementById("profile-section")) { showProfile(user); }
  var remember = localStorage.getItem("velora_remember");
  var loginEmailEl = document.getElementById("login-email");
  if (remember === "true" && user && loginEmailEl) { loginEmailEl.value = user.email; var cb = document.getElementById("rememberMe"); if (cb) cb.checked = true; }
  var regEmail   = document.getElementById("reg-email");
  var loginEmail = document.getElementById("login-email");
  var loginPw    = document.getElementById("login-password");
  if (regEmail)   regEmail.addEventListener("keydown",   function(e) { if(e.key==="Enter") handleRegister(); });
  if (loginEmail) loginEmail.addEventListener("keydown", function(e) { if(e.key==="Enter") handleLogin(); });
  if (loginPw)    loginPw.addEventListener("keydown",    function(e) { if(e.key==="Enter") handleLogin(); });
});
