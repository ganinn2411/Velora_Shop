const CDN = "https://res.cloudinary.com/dy2dvpbit/image/upload";

const products = [
  { id: 1,  name: "Erkek Tişört",    price: 1200, image: `${CDN}/haryo-setyadi-acn5ERAeSb4-unsplash_svhjqz.jpg`,               category: "erkek", type: "tisort"   },
  { id: 2,  name: "Erkek Tişört",    price: 300,  image: `${CDN}/pexels-david-fowora-2160297192-36801391_hfunqe.jpg`,           category: "erkek", type: "tisort"   },
  { id: 3,  name: "Erkek Tişört",    price: 800,  image: `${CDN}/sven-ciupka-x8Vg7Up6TUc-unsplash_fyrbqs.jpg`,                 category: "erkek", type: "tisort"   },
  { id: 4,  name: "Erkek Tişört",    price: 950,  image: `${CDN}/faith-yarn-Wr0TpKqf26s-unsplash_j2qqmb.jpg`,                  category: "erkek", type: "tisort"   },
  { id: 5,  name: "Erkek Pantolon",  price: 800,  image: `${CDN}/tuananh-blue-fB9Ex6Q5L_g-unsplash_ogcpzj.jpg`,                category: "erkek", type: "pantalon" },
  { id: 6,  name: "Erkek Pantolon",  price: 300,  image: `${CDN}/tuananh-blue-j_3IlDX-6uQ-unsplash_i2sbm4.jpg`,                category: "erkek", type: "pantalon" },
  { id: 7,  name: "Erkek Pantolon",  price: 150,  image: `${CDN}/tuananh-blue-rJQCoHb8XxA-unsplash_tgtnxn.jpg`,                category: "erkek", type: "pantalon" },
  { id: 8,  name: "Erkek Pantolon",  price: 1500, image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,                category: "erkek", type: "pantalon" },
  { id: 9,  name: "Erkek Şapka",     price: 1500, image: `${CDN}/fatmanur-simsek-yILrYgG322s-unsplash_r4bhpq.jpg`,             category: "erkek", type: "sapka"    },
  { id: 10, name: "Erkek Şapka",     price: 1500, image: `${CDN}/mateus-jud-s-gRaxKXUio-unsplash_om2buz.jpg`,                  category: "erkek", type: "sapka"    },
  { id: 11, name: "Erkek Şapka",     price: 1500, image: `${CDN}/mathias-reding-dWFaMnAX49Q-unsplash_zulbnu.jpg`,              category: "erkek", type: "sapka"    },
  { id: 12, name: "Erkek Şapka",     price: 1500, image: `${CDN}/soroush-alavi-PVvoEQH6cOI-unsplash_zu7zmz.jpg`,               category: "erkek", type: "sapka"    },
  { id: 13, name: "Erkek Ceket",     price: 1500, image: `${CDN}/adrian-ordonez-P0W27GRvyww-unsplash_jsodmg.jpg`,              category: "erkek", type: "ceket"    },
  { id: 14, name: "Erkek Ceket",     price: 1500, image: `${CDN}/caio-coelho-QRN47la37gw-unsplash_fh7biy.jpg`,                 category: "erkek", type: "ceket"    },
  { id: 15, name: "Erkek Ceket",     price: 1500, image: `${CDN}/colton-sturgeon-oB7lLU9dwLc-unsplash_meuzv2.jpg`,             category: "erkek", type: "ceket"    },
  { id: 16, name: "Erkek Ceket",     price: 1500, image: `${CDN}/mike-montgomery-JNizejfX4B8-unsplash_d0pql3.jpg`,             category: "erkek", type: "ceket"    },
  { id: 17, name: "Kadın Tişört",    price: 1200, image: `${CDN}/charlesdeluvio-kPKFdPQTz9Y-unsplash_ulpc0v.jpg`,              category: "kadin", type: "tisort"   },
  { id: 18, name: "Kadın Tişört",    price: 300,  image: `${CDN}/feey-3fM186uPnZQ-unsplash_yrpqo0.jpg`,                        category: "kadin", type: "tisort"   },
  { id: 19, name: "Kadın Tişört",    price: 800,  image: `${CDN}/ronan-furuta-tt9hFR4aEKY-unsplash_lcdnvc.jpg`,                category: "kadin", type: "tisort"   },
  { id: 20, name: "Kadın Tişört",    price: 950,  image: `${CDN}/tuananh-blue-PvI3uWqDfTo-unsplash_gi8ei4.jpg`,                category: "kadin", type: "tisort"   },
  { id: 21, name: "Kadın Pantolon",  price: 800,  image: `${CDN}/tamara-bellis-zDyJOj8ZXG0-unsplash_iuvn83.jpg`,               category: "kadin", type: "pantalon" },
  { id: 22, name: "Kadın Pantolon",  price: 300,  image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_mh2ook.jpg`,                category: "kadin", type: "pantalon" },
  { id: 24, name: "Kadın Pantolon",  price: 1500, image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,                category: "kadin", type: "pantalon" },
  { id: 49, name: "Kadın Pantolon",  price: 950,  image: `${CDN}/tuananh-blue-2QSK4kFoVZE-unsplash_ivazfe.jpg`,                category: "kadin", type: "pantalon" },
  { id: 25, name: "Kadın Şapka",     price: 1500, image: `${CDN}/omar-sabra-V5yIyQ2m-bo-unsplash_cmq5g7.jpg`,                  category: "kadin", type: "sapka"    },
  { id: 26, name: "Kadın Şapka",     price: 1500, image: `${CDN}/nathan-dumlao-Y8hAxuKgP8g-unsplash_rr4mzr.jpg`,               category: "kadin", type: "sapka"    },
  { id: 27, name: "Kadın Şapka",     price: 1500, image: `${CDN}/kajetan-sumila-U8CyGLw2-ek-unsplash_xewyl5.jpg`,              category: "kadin", type: "sapka"    },
  { id: 28, name: "Kadın Şapka",     price: 1500, image: `${CDN}/elena-golubeva-rISh07SbuV4-unsplash_a4clvj.jpg`,              category: "kadin", type: "sapka"    },
  { id: 29, name: "Kadın Ceket",     price: 1500, image: `${CDN}/anna-evans-eELIrBJXBPk-unsplash_rtml0f.jpg`,                  category: "kadin", type: "ceket"    },
  { id: 30, name: "Kadın Ceket",     price: 1500, image: `${CDN}/donald-teel--J7OdbfiZ1o-unsplash_sr2e7y.jpg`,                 category: "kadin", type: "ceket"    },
  { id: 31, name: "Kadın Ceket",     price: 1500, image: `${CDN}/lea-ochel-nsRBbE6-YLs-unsplash_eklemz.jpg`,                   category: "kadin", type: "ceket"    },
  { id: 32, name: "Kadın Ceket",     price: 1500, image: `${CDN}/noelle-rebekah-PNCXp2Uh6WM-unsplash_mqx4v8.jpg`,              category: "kadin", type: "ceket"    },
  { id: 33, name: "Çocuk Tişört",    price: 1200, image: `${CDN}/fabio-alves-eAUE_FmclYE-unsplash_nt2rlg.jpg`,                 category: "cocuk", type: "tisort"   },
  { id: 34, name: "Çocuk Tişört",    price: 300,  image: `${CDN}/md-salman-tWOz2_EK5EQ-unsplash_tzznsh.jpg`,                   category: "cocuk", type: "tisort"   },
  { id: 35, name: "Çocuk Tişört",    price: 800,  image: `${CDN}/ryan-hoffman-u6n1HrW0sdQ-unsplash_xfyvkg.jpg`,                category: "cocuk", type: "tisort"   },
  { id: 36, name: "Çocuk Tişört",    price: 950,  image: `${CDN}/tuananh-blue-20wx7IY7Ggk-unsplash_dulwe5.jpg`,                category: "cocuk", type: "tisort"   },
  { id: 37, name: "Çocuk Pantolon",  price: 800,  image: `${CDN}/christopher-luther-gwOLhTqWcaA-unsplash_kgfzef.jpg`,          category: "cocuk", type: "pantalon" },
  { id: 38, name: "Çocuk Pantolon",  price: 300,  image: `${CDN}/pexels-amina-filkins-5560028_ib5oqv.jpg`,                     category: "cocuk", type: "pantalon" },
  { id: 39, name: "Çocuk Pantolon",  price: 150,  image: `${CDN}/pexels-dmitriy-steinke-559643503-30683064_gmi9fs.jpg`,         category: "cocuk", type: "pantalon" },
  { id: 40, name: "Çocuk Pantolon",  price: 1500, image: `${CDN}/pexels-dmitriy-steinke-559643503-30683099_eeqlgb.jpg`,         category: "cocuk", type: "pantalon" },
  { id: 41, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/ahmed-syed-6NVrH0HB_DE-unsplash_eow23i.jpg`,                  category: "cocuk", type: "sapka"    },
  { id: 42, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/angel-monsanto-iii-0wzyDMY8gCo-unsplash_gi7yc2.jpg`,          category: "cocuk", type: "sapka"    },
  { id: 43, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/markus-spiske--rlShVn1_U8-unsplash_ybzneb.jpg`,               category: "cocuk", type: "sapka"    },
  { id: 44, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/yang-deng-2loKxdi6Hmo-unsplash_sqvn1x.jpg`,                   category: "cocuk", type: "sapka"    },
  { id: 45, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/2-bro-s-media-LV_ZrBEGupE-unsplash_ovmfbe.jpg`,               category: "cocuk", type: "ceket"    },
  { id: 46, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/christopher-campbell--h_cufTEtcg-unsplash_cehfnl.jpg`,        category: "cocuk", type: "ceket"    },
  { id: 47, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/nathan-dumlao-QqLuSb0sypY-unsplash_gs4zul.jpg`,               category: "cocuk", type: "ceket"    },
  { id: 48, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/phat-tr-ng-UbJ2Q_HInuU-unsplash_sbwzvv.jpg`,                  category: "cocuk", type: "ceket"    },

  // ── YENİ ÜRÜNLER ──
  { id: 50, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_9_mqf5za.jpg`,          category: "erkek", type: "tisort"   },
  { id: 51, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.27_4_rawlcg.jpg`,          category: "erkek", type: "tisort"   },
  { id: 52, name: "Erkek Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.24_sp3epo.jpg`,            category: "erkek", type: "pantalon" },
  { id: 53, name: "Erkek Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.24_1_yc6cwo.jpg`,          category: "erkek", type: "pantalon" },
  { id: 54, name: "Erkek Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.25_hh47wc.jpg`,            category: "erkek", type: "pantalon" },
  { id: 55, name: "Erkek Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.25_1_xwrwcp.jpg`,          category: "erkek", type: "pantalon" },
  { id: 56, name: "Erkek Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.27_3_m5guz6.jpg`,          category: "erkek", type: "pantalon" },
  { id: 57, name: "Kadın Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_2_ldvaix.jpg`,          category: "kadin", type: "tisort"   },
  { id: 58, name: "Kadın Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_5_oq4aof.jpg`,          category: "kadin", type: "tisort"   },
  { id: 59, name: "Kadın Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_4_rufgco.jpg`,          category: "kadin", type: "pantalon" },
  { id: 60, name: "Kadın Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_3_ebs2mm.jpg`,          category: "kadin", type: "tisort"   },
  { id: 61, name: "Kadın Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_7_tulz7e.jpg`,          category: "kadin", type: "ceket"    },
  { id: 62, name: "Kadın Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_8_apnfjd.jpg`,          category: "kadin", type: "ceket"    },
  { id: 63, name: "Kadın Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_6_m5xtbh.jpg`,          category: "kadin", type: "ceket"    },
  { id: 64, name: "Erkek Tişört",    price: 800,  image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_5_otfdbd.jpg`,          category: "erkek", type: "tisort"   },
  { id: 65, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_4_njzedf.jpg`,          category: "erkek", type: "tisort"   },
  { id: 66, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_ht6gbg.jpg`,            category: "erkek", type: "tisort"   },
  { id: 67, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_1_vwhdwk.jpg`,          category: "erkek", type: "tisort"   },
  { id: 68, name: "Kadın Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_5_bqgwxm.jpg`,          category: "kadin", type: "ceket"    },
  { id: 69, name: "Kadın Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_4_nz0ryf.jpg`,          category: "kadin", type: "ceket"    },
  { id: 70, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_2_cpdvlf.jpg`,          category: "erkek", type: "tisort"   },
  { id: 71, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_3_oy9e4t.jpg`,          category: "erkek", type: "tisort"   },
  { id: 72, name: "Kadın Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_7_ybynva.jpg`,          category: "kadin", type: "tisort"   },
  { id: 73, name: "Kadın Pantolon",  price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_6_nenaz9.jpg`,          category: "kadin", type: "pantalon" },
  { id: 74, name: "Erkek Ceket",     price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_rnoweq.jpg`,            category: "erkek", type: "ceket"    },
  { id: 75, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_1_sp0k6g.jpg`,          category: "erkek", type: "tisort"   },
  { id: 76, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_3_yv7jdx.jpg`,          category: "erkek", type: "tisort"   },
  { id: 77, name: "Erkek Tişört",    price: 1200, image: `${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_2_k9kdyj.jpg`,          category: "erkek", type: "tisort"   },
];


// =====================
// SEPET
// =====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedSize = "";
let selectedColor = "";

function requireLogin() {
  const user = JSON.parse(localStorage.getItem("activeUser"));
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
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (!selectedSize) { alert("Lütfen beden seçiniz!"); return; }
  if (!selectedColor) { alert("Lütfen renk seçiniz!"); return; }

  const existingItem = cart.find(item =>
    item.id === id && item.size === selectedSize && item.color === selectedColor
  );

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
  alert("Ürün sepete eklendi ✅");
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) {
    const total = cart.reduce((sum, i) => sum + (i.quantity || 0), 0);
    el.innerText = total;
  }
}

function updateHeaderCount() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cartData.reduce((s, i) => s + (i.quantity || 0), 0);
  const el = document.getElementById("header-item-count");
  if (el) el.textContent = total > 0 ? `${total} ürün` : "";
}

function checkCouponVisibility() {
  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const box = document.getElementById("coupon-box");
  if (box) box.style.display = cartData.length > 0 ? "block" : "none";
}

updateCartCount();

window.addEventListener("load", function () {
  updateHeaderCount();
  checkCouponVisibility();
});

// =====================
// ÜRÜN KARTI
// =====================
function productCard(p) {
  return `
    <div class="product-card" onclick="goToProduct(${p.id})">
      <div class="product-card__img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-card__fav save-icon" data-id="${p.id}" onclick="toggleFavorite(event, ${p.id})">☆</span>
      </div>
      <div class="product-card__info">
        <h3>${p.name}</h3>
        <p>${p.price.toLocaleString("tr-TR")} TL</p>
        <button onclick="event.stopPropagation(); goToProduct(${p.id})">SEPETE EKLE</button>
      </div>
    </div>
  `;
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

// =====================
// ANA SAYFA ÜRÜNLERİ (SLIDER)
// =====================
function renderTopProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  container.innerHTML = shuffled.map(productCard).join("");
  updateSaveIcons();
}

function renderBottomProducts(list) {
  const container = document.getElementById("products-bottom");
  if (!container) return;
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  container.innerHTML = shuffled.map(productCard).join("");
  updateSaveIcons();
}

function getNewCollection(list) {
  return [...list].sort((a, b) => b.id - a.id).slice(0, 12);
}

function getRandomCollection(list) {
  return [...list].sort(() => 0.5 - Math.random()).slice(0, 12);
}

// =====================
// KATEGORİ SAYFASI
// =====================
function renderProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = list.map(productCard).join("");
  updateSaveIcons();
}

function loadCategoryPage() {
  if (!document.getElementById("category-title")) return;

  const params = new URLSearchParams(window.location.search);
  const main = params.get("category");
  const sub  = params.get("type");
  if (!main || !sub) return;

  const filtered = products.filter(p => p.category === main && p.type === sub);
  document.getElementById("category-title").innerText =
    main.toUpperCase() + " / " + sub.toUpperCase();
  renderProducts(filtered);
}

loadCategoryPage();

// =====================
// ARAMA & FİLTRE
// =====================
const searchInput  = document.getElementById("searchInput");
const filterSelect = document.getElementById("filterSelect");

function applyFilters() {
  const params = new URLSearchParams(window.location.search);
  const main = params.get("category");
  const sub  = params.get("type");

  let filtered = (main && sub)
    ? products.filter(p => p.category === main && p.type === sub)
    : [...products];

  const searchValue = searchInput  ? searchInput.value.toLowerCase()  : "";
  const filterValue = filterSelect ? filterSelect.value               : "all";

  if (searchValue) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchValue));
  }
  if (filterValue === "cheapest") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (filterValue === "expensive") {
    filtered = filtered.sort((a, b) => b.price - a.price);
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
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("productDetail");
  if (!container) return;

  const id      = Number(new URLSearchParams(window.location.search).get("id"));
  const product = products.find(p => p.id === id);

  if (!product) {
    container.innerHTML = "<h2>Ürün bulunamadı</h2>";
    return;
  }

  container.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-info">
      <h1>${product.name}</h1>
      <p class="price">${product.price.toLocaleString("tr-TR")} TL</p>
      <p class="desc">
        Bu ürün modern tasarım, yüksek kalite kumaş ile üretilmiştir.
        Günlük kullanım için uygundur ve rahat kesime sahiptir.
      </p>
      <label>Beden</label>
      <div class="sizes">
        <button onclick="selectSize(this)">S</button>
        <button onclick="selectSize(this)">M</button>
        <button onclick="selectSize(this)">L</button>
        <button onclick="selectSize(this)">XL</button>
      </div>
      <label>Renk</label>
      <div class="colors">
        <div class="color black" onclick="selectColor('Siyah', this)"></div>
        <div class="color white" onclick="selectColor('Beyaz', this)"></div>
        <div class="color blue"  onclick="selectColor('Mavi',  this)"></div>
      </div>
      <button class="btn-add-to-cart" onclick="addToCart(${product.id})">
        <span><span class="btn-icon">🛒</span> SEPETE EKLE</span>
      </button>
    </div>
  `;

  const similar = products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  if (similar.length > 0) {
    const sec = document.createElement("section");
    sec.className = "similar-products";
    sec.innerHTML = `
      <h2 class="similar-title">Benzer Ürünler</h2>
      <div class="similar-grid">
        ${similar.map(p => `
          <div class="product-card" onclick="goToProduct(${p.id})">
            <div class="product-card__img-wrap">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
              <span class="product-card__fav save-icon" data-id="${p.id}" onclick="toggleFavorite(event,${p.id})">☆</span>
            </div>
            <div class="product-card__info">
              <h3>${p.name}</h3>
              <p>${p.price.toLocaleString("tr-TR")} TL</p>
              <button onclick="event.stopPropagation();goToProduct(${p.id})">İNCELE</button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
    document.querySelector(".product-page").insertAdjacentElement("afterend", sec);
    updateSaveIcons();
  }
});

function selectSize(btn) {
  document.querySelectorAll(".sizes button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  selectedSize = btn.innerText;
}

function selectColor(color, el) {
  selectedColor = color;
  document.querySelectorAll(".color").forEach(c => c.classList.remove("active"));
  el.classList.add("active");
}

// =====================
// KUPON SİSTEMİ
// =====================
const KUPONLAR = {
  "VELORA10":  10,
  "VELORA20":  20,
  "HOSGELDIN": 15
};

let aktifKupon = null;

function applyCoupon() {
  const input = document.getElementById("couponInput");
  const msg   = document.getElementById("couponMsg");
  const kod   = input ? input.value.trim().toUpperCase() : "";

  if (msg) {
    msg.className = "coupon-msg";
    msg.textContent = "";
  }

  if (!kod) {
    if (msg) { msg.textContent = "Lütfen bir kupon kodu girin."; msg.className = "coupon-msg error"; }
    return;
  }
  if (aktifKupon) {
    if (msg) { msg.textContent = "Zaten bir kupon uygulandı. Önce kaldırın."; msg.className = "coupon-msg error"; }
    return;
  }
  if (!KUPONLAR[kod]) {
    if (msg) { msg.textContent = "Geçersiz kupon kodu."; msg.className = "coupon-msg error"; }
    return;
  }

  aktifKupon = { kod: kod, yuzde: KUPONLAR[kod] };
  if (input) input.disabled = true;

  const appliedCodeText = document.getElementById("appliedCodeText");
  const couponApplied   = document.getElementById("couponApplied");

  if (appliedCodeText) appliedCodeText.textContent = `${kod} (%${KUPONLAR[kod]} indirim)`;
  if (couponApplied)   couponApplied.style.display  = "flex";
  if (msg)             msg.className                = "coupon-msg";

  renderCart();
}

function removeCoupon() {
  aktifKupon = null;

  const input = document.getElementById("couponInput");
  if (input) {
    input.value    = "";
    input.disabled = false;
  }

  const couponApplied = document.getElementById("couponApplied");
  if (couponApplied) couponApplied.style.display = "none";

  const discountRow = document.getElementById("discountRow");
  if (discountRow) discountRow.style.display = "none";

  const couponMsg = document.getElementById("couponMsg");
  if (couponMsg) couponMsg.className = "coupon-msg";

  renderCart();
}

// =====================
// SEPET SAYFASI
// =====================
if (document.getElementById("cart-items")) {
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";
  let araToplamTL = 0;

  const couponBox = document.getElementById("coupon-box");
  if (couponBox) couponBox.style.display = cart.length > 0 ? "block" : "none";
  updateHeaderCount();

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    araToplamTL += itemTotal;

    container.innerHTML += `
      <div class="cart-item">
        <a href="product.html?id=${item.id}">
          <img src="${item.image}" class="product-img" alt="${item.name}">
        </a>
        <div>
          <h4><a href="product.html?id=${item.id}" class="product-link">${item.name}</a></h4>
          <p>Beden: <strong>${item.size}</strong></p>
          <p>Renk: <strong>${item.color}</strong></p>
        </div>
        <div class="cart-price">${item.price.toLocaleString("tr-TR")} TL</div>
        <div class="quantity">
          <button onclick="changeQty(${item.id}, '${item.size}', '${item.color}', -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="changeQty(${item.id}, '${item.size}', '${item.color}', 1)">+</button>
        </div>
        <div class="remove" onclick="removeItem(${item.id}, '${item.size}', '${item.color}')">❌</div>
      </div>
    `;
  });

  const discountRow     = document.getElementById("discountRow");
  const discountDisplay = document.getElementById("discountDisplay");
  const totalEl         = document.getElementById("total");

  if (aktifKupon && araToplamTL > 0) {
    const indirimMiktar = Math.round(araToplamTL * aktifKupon.yuzde / 100);
    const sonToplamTL   = araToplamTL - indirimMiktar;
    if (discountDisplay) discountDisplay.textContent = `-${indirimMiktar.toLocaleString("tr-TR")} TL`;
    if (discountRow)     discountRow.style.display   = "flex";
    if (totalEl)         totalEl.innerText           = sonToplamTL.toLocaleString("tr-TR");
  } else {
    if (discountRow) discountRow.style.display = "none";
    if (totalEl)     totalEl.innerText         = araToplamTL.toLocaleString("tr-TR");
  }
}

function changeQty(id, size, color, delta) {
  const item = cart.find(i => i.id === id && i.size === size && i.color === color);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  updateCartCount();
}

function removeItem(id, size, color) {
  cart = cart.filter(i => !(i.id === id && i.size === size && i.color === color));
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
  let saved = JSON.parse(localStorage.getItem("saved")) || [];
  saved = saved.includes(id) ? saved.filter(s => s !== id) : [...saved, id];
  localStorage.setItem("saved", JSON.stringify(saved));
  updateSaveIcons();
}

function updateSaveIcons() {
  const saved = JSON.parse(localStorage.getItem("saved")) || [];
  document.querySelectorAll(".save-icon").forEach(icon => {
    icon.innerText = saved.includes(Number(icon.dataset.id)) ? "★" : "☆";
  });
}

setTimeout(updateSaveIcons, 100);

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("favorites-list")) {
    let saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number);
    const valid = saved.filter(id => products.find(p => p.id === id));
    if (valid.length !== saved.length) {
      localStorage.setItem("saved", JSON.stringify(valid));
    }
    renderFavoritesPage();
  }
});

function renderFavoritesPage() {
  const container = document.getElementById("favorites-list");
  if (!container) return;
  container.innerHTML = "";

  const saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number);

  if (saved.length === 0) {
    container.innerHTML = "<p style='color:#999;font-size:14px;letter-spacing:1px;'>Henüz favori ürün eklemediniz.</p>";
    return;
  }

  saved.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    container.innerHTML += `
      <div class="product-card" style="position:relative">
        <div class="remove-btn" onclick="removeSaved(${product.id})">✕</div>
        <div class="product-card__img-wrap">
          <img src="${product.image}" onclick="goToProduct(${product.id})" style="cursor:pointer" alt="${product.name}">
        </div>
        <div class="product-card__info">
          <h3 onclick="goToProduct(${product.id})" style="cursor:pointer">${product.name}</h3>
          <p>${product.price.toLocaleString("tr-TR")} TL</p>
          <button onclick="goToProduct(${product.id})">ÜRÜNE GİT</button>
        </div>
      </div>
    `;
  });
}

function removeSaved(id) {
  let saved = (JSON.parse(localStorage.getItem("saved")) || []).map(Number).filter(i => i !== Number(id));
  localStorage.setItem("saved", JSON.stringify(saved));
  renderFavoritesPage();
}

// =====================
// SLIDER OKLAR
// =====================
function slideRight() {
  document.getElementById("products").scrollBy({ left: 280, behavior: "smooth" });
}
function slideLeft() {
  document.getElementById("products").scrollBy({ left: -280, behavior: "smooth" });
}
function scrollBottom(dir) {
  document.getElementById("products-bottom").scrollBy({ left: dir * 280, behavior: "smooth" });
}

const topSlider = document.getElementById("products");
const topLeft   = document.querySelectorAll(".arrow.left")[0];
const topRight  = document.querySelectorAll(".arrow.right")[0];

function updateTopButtons() {
  if (!topSlider) return;
  if (topSlider.scrollLeft <= 10) {
    if (topLeft) topLeft.style.display = "none";
  } else {
    if (topLeft) topLeft.style.display = "flex";
  }
  if (topSlider.scrollLeft + topSlider.clientWidth >= topSlider.scrollWidth - 10) {
    if (topRight) topRight.style.display = "none";
  } else {
    if (topRight) topRight.style.display = "flex";
  }
}

if (topSlider) {
  topSlider.addEventListener("scroll", updateTopButtons);
  window.addEventListener("load", updateTopButtons);
}

const bottomSlider = document.getElementById("products-bottom");
const bottomLeft   = document.querySelectorAll(".arrow.left")[1];
const bottomRight  = document.querySelectorAll(".arrow.right")[1];

function updateBottomButtons() {
  if (!bottomSlider) return;
  if (bottomSlider.scrollLeft <= 10) {
    if (bottomLeft) bottomLeft.style.display = "none";
  } else {
    if (bottomLeft) bottomLeft.style.display = "flex";
  }
  if (bottomSlider.scrollLeft + bottomSlider.clientWidth >= bottomSlider.scrollWidth - 10) {
    if (bottomRight) bottomRight.style.display = "none";
  } else {
    if (bottomRight) bottomRight.style.display = "flex";
  }
}

if (bottomSlider) {
  bottomSlider.addEventListener("scroll", updateBottomButtons);
  window.addEventListener("load", updateBottomButtons);
}

// =====================
// BANNER ANİMASYON
// =====================
function animateBanner() {
  const banner = document.querySelector(".mero");
  if (!banner) return;
  if (banner.getBoundingClientRect().top < window.innerHeight - 100) {
    banner.classList.add("show");
  }
}
window.addEventListener("scroll", animateBanner);
window.addEventListener("load", animateBanner);

// =====================
// WHATSAPP ÖDEME
// =====================
function sendWhatsApp() {
  if (cart.length === 0) { alert("Sepetiniz boş!"); return; }

  let message = "🛒 Sipariş Detayı:%0A%0A";
  let araToplamTL = 0;

  cart.forEach(item => {
    const itemTL = item.price * item.quantity;
    araToplamTL += itemTL;
    message += `Ürün: ${item.name}%0A`;
    message += `Beden: ${item.size}%0A`;
    message += `Renk: ${item.color}%0A`;
    message += `Adet: ${item.quantity}%0A`;
    message += `Fiyat: ${itemTL.toLocaleString("tr-TR")} TL%0A%0A`;
  });

  let sonToplamTL = araToplamTL;
  if (aktifKupon && araToplamTL > 0) {
    const indirimMiktar = Math.round(araToplamTL * aktifKupon.yuzde / 100);
    sonToplamTL = araToplamTL - indirimMiktar;
    message += `🏷️ Kupon: ${aktifKupon.kod} (-%${aktifKupon.yuzde})%0A`;
    message += `İndirim: -${indirimMiktar.toLocaleString("tr-TR")} TL%0A`;
  }

  message += `💰 TOPLAM: ${sonToplamTL.toLocaleString("tr-TR")} TL`;
  window.open(`https://wa.me/905550066123?text=${message}`, "_blank");
}

// =====================
// NAV MEGA MENU (mobil toggle)
// =====================
document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("active"));
});

// =====================
// ANA SAYFA BAŞLAT
// =====================
if (document.getElementById("products") && !document.getElementById("category-title")) {
  renderTopProducts(getNewCollection(products));
}
if (document.getElementById("products-bottom")) {
  renderBottomProducts(getRandomCollection(products));
}

// ── Yardımcı: Toast göster ──
function showToast(msg, type = "") {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show " + type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.className = "toast", 3000);
}

// ── Bölüm geçişi ──
function showSection(id) {
  ["register-section","verify-section","login-section","profile-section"].forEach(s => {
    const el = document.getElementById(s);
    if (el) el.classList.add("hidden");
  });
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

function showLogin()    { showSection("login-section"); }
function showRegister() { showSection("register-section"); }

// ── Validasyon yardımcıları ──
function setError(fgId, show) {
  const fg = document.getElementById(fgId);
  if (!fg) return;
  show ? fg.classList.add("has-error") : fg.classList.remove("has-error");
}
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

// =====================
// ŞİFRE VALİDASYONU
// =====================
const PW_RULES = {
  length:  { regex: /.{8,}/,          ruleId: "rule-length"  },
  upper:   { regex: /[A-Z]/,          ruleId: "rule-upper"   },
  number:  { regex: /[0-9]/,          ruleId: "rule-number"  },
  special: { regex: /[^a-zA-Z0-9]/,   ruleId: "rule-special" }
};

function checkPasswordStrength(value) {
  let passed = 0;
  Object.keys(PW_RULES).forEach(key => {
    const rule    = PW_RULES[key];
    const ok      = rule.regex.test(value);
    const el      = document.getElementById(rule.ruleId);
    if (el) {
      el.classList.toggle("rule-ok",   ok);
      el.classList.toggle("rule-fail", !ok && value.length > 0);
      el.textContent = (ok ? "✓ " : "✗ ") + el.textContent.slice(2);
    }
    if (ok) passed++;
  });

  const fill = document.getElementById("pw-strength-fill");
  if (!fill) return;
  const pct = (passed / 4) * 100;
  fill.style.width = pct + "%";
  fill.className = "pw-strength-fill";
  if      (passed <= 1) fill.classList.add("pw-weak");
  else if (passed === 2) fill.classList.add("pw-fair");
  else if (passed === 3) fill.classList.add("pw-good");
  else                   fill.classList.add("pw-strong");
}

function isPasswordValid(value) {
  return Object.values(PW_RULES).every(r => r.regex.test(value));
}

function togglePw(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  const isText = inp.type === "text";
  inp.type = isText ? "password" : "text";
  btn.innerHTML = isText
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
         <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>
       </svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
           stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
         <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>
       </svg>`;
}

async function hashPassword(password) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

let tempUser = {};

async function handleRegister() {
  const name      = document.getElementById("reg-name").value.trim();
  const email     = document.getElementById("reg-email").value.trim();
  const password  = document.getElementById("reg-password").value;
  const password2 = document.getElementById("reg-password2").value;
  const termsCheck = document.getElementById("termsCheck");
  let ok = true;

  if (!name) { setError("fg-name", true);  ok = false; } else { setError("fg-name", false); }

  if (!email || !isValidEmail(email)) {
    document.getElementById("email-error-msg").textContent =
      !email ? "E-posta adresi zorunludur." : "Geçerli bir e-posta adresi giriniz.";
    setError("fg-email", true);
    ok = false;
  } else { setError("fg-email", false); }

  if (!isPasswordValid(password)) {
    document.getElementById("password-error-msg").textContent = "Şifre gereksinimleri karşılanmıyor.";
    setError("fg-password", true);
    ok = false;
  } else { setError("fg-password", false); }

  if (password !== password2) {
    document.getElementById("password2-error-msg").textContent = "Şifreler eşleşmiyor.";
    setError("fg-password2", true);
    ok = false;
  } else { setError("fg-password2", false); }

  if (termsCheck && !termsCheck.checked) {
    setError("fg-terms", true);
    ok = false;
  } else {
    setError("fg-terms", false);
  }

  if (!ok) return;

  const allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  if (allUsers.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    document.getElementById("email-error-msg").textContent = "Bu e-posta zaten kayıtlı. Giriş yapın.";
    setError("fg-email", true);
    return;
  }

  const hashedPw = await hashPassword(password);
  tempUser = { name, email, passwordHash: hashedPw };
  document.getElementById("verify-email-label").textContent = email;

  const verifyCode = String(Math.floor(1000 + Math.random() * 9000));
  tempUser.code = verifyCode;

  const btn = document.getElementById("register-btn");
  btn.disabled = true;
  btn.textContent = "Gönderiliyor...";

  emailjs.send("service_u871hgw", "template_nnfkcc3", {
    to_email: email,
    to_name: name,
    code: verifyCode
  }).then(() => {
    showToast("Doğrulama kodu e-postanıza gönderildi!", "success");
    startCountdown();
    showSection("verify-section");
    setTimeout(() => document.getElementById("d1").focus(), 100);
  }).catch((err) => {
    console.error("EmailJS hatası:", err);
    showToast("Mail gönderilemedi. Lütfen tekrar deneyin.", "error");
  }).finally(() => {
    btn.disabled = false;
    btn.textContent = "Üye Ol ve Doğrulama Kodu Gönder";
  });
}

["d1","d2","d3","d4"].forEach((id, i, arr) => {
  const input = document.getElementById(id);
  if (!input) return;
  input.addEventListener("input", (e) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val;
    if (val && i < arr.length - 1) {
      document.getElementById(arr[i + 1]).focus();
    }
    e.target.classList.toggle("filled", !!val);
    const full = arr.map(a => document.getElementById(a).value).join("");
    if (full.length === 4) setTimeout(handleVerify, 200);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && !input.value && i > 0) {
      document.getElementById(arr[i - 1]).focus();
    }
  });
  input.addEventListener("paste", (e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, 4);
    arr.forEach((a, j) => {
      const el = document.getElementById(a);
      el.value = text[j] || "";
      el.classList.toggle("filled", !!el.value);
    });
    if (text.length === 4) setTimeout(handleVerify, 200);
  });
});

function getCode() {
  return ["d1","d2","d3","d4"].map(id => document.getElementById(id).value).join("");
}

function handleVerify() {
  const code = getCode();
  if (code.length < 4) { showToast("Lütfen 4 haneli kodu girin.", "error"); return; }

  if (code === tempUser.code) {
    const allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
    const saveUser = { name: tempUser.name, email: tempUser.email, passwordHash: tempUser.passwordHash };
    if (!allUsers.find(u => u.email.toLowerCase() === tempUser.email.toLowerCase())) {
      allUsers.push(saveUser);
      localStorage.setItem("velora_users", JSON.stringify(allUsers));
    }
    localStorage.setItem("activeUser", JSON.stringify({ name: saveUser.name, email: saveUser.email }));
    showToast("Üyeliğiniz tamamlandı! Hoş geldiniz 🎉", "success");
    setTimeout(() => { window.location.href = "index.html"; }, 1200);
  } else {
    showToast("Hatalı kod. Lütfen tekrar deneyin.", "error");
    ["d1","d2","d3","d4"].forEach(id => {
      const el = document.getElementById(id);
      el.value = "";
      el.classList.remove("filled");
      el.style.borderColor = "#cc0000";
      setTimeout(() => el.style.borderColor = "", 1500);
    });
    document.getElementById("d1").focus();
  }
}

async function handleLogin() {
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  let ok = true;

  if (!email || !isValidEmail(email)) {
    document.getElementById("login-email-error-msg").textContent = "Geçerli bir e-posta adresi giriniz.";
    setError("fg-login-email", true);
    ok = false;
  } else { setError("fg-login-email", false); }

  if (!password) {
    document.getElementById("login-password-error-msg").textContent = "Şifre zorunludur.";
    setError("fg-login-password", true);
    ok = false;
  } else { setError("fg-login-password", false); }

  if (!ok) return;

  const allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    document.getElementById("login-email-error-msg").textContent = "Bu e-posta ile kayıtlı kullanıcı bulunamadı.";
    setError("fg-login-email", true);
    return;
  }

  const hashedPw = await hashPassword(password);
  if (user.passwordHash && hashedPw !== user.passwordHash) {
    document.getElementById("login-password-error-msg").textContent = "Şifre hatalı.";
    setError("fg-login-password", true);
    return;
  }

  const rememberMe = document.getElementById("rememberMe");
  const sessionUser = { name: user.name, email: user.email };

  if (rememberMe && rememberMe.checked) {
    localStorage.setItem("activeUser", JSON.stringify(sessionUser));
    localStorage.setItem("velora_remember", "true");
  } else {
    localStorage.removeItem("velora_remember");
    sessionStorage.setItem("activeUser", JSON.stringify(sessionUser));
    localStorage.setItem("activeUser", JSON.stringify(sessionUser));
  }

  setError("fg-login-email",    false);
  setError("fg-login-password", false);
  showToast("Hoş geldiniz, " + user.name + "!", "success");
  setTimeout(() => { window.location.href = "index.html"; }, 1200);
}

// =====================
// ŞİFRE DEĞİŞTİRME (Profil)
// =====================
function togglePwChangeForm() {
  const form   = document.getElementById("pw-change-form");
  const toggle = document.getElementById("pw-change-toggle");
  if (!form) return;
  const isHidden = form.classList.contains("hidden");
  form.classList.toggle("hidden");
  if (toggle) toggle.textContent = isHidden ? "İptal" : "Değiştir";
  if (!isHidden) {
    ["current-pw","new-pw","new-pw2"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = "";
    });
    ["fg-current-pw","fg-new-pw","fg-new-pw2"].forEach(id => setError(id, false));
    const fill2 = document.getElementById("pw-strength-fill2");
    if (fill2) { fill2.style.width = "0%"; fill2.className = "pw-strength-fill"; }
    ["rule2-length","rule2-upper","rule2-number","rule2-special"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.classList.remove("rule-ok","rule-fail"); el.textContent = "✗ " + el.textContent.slice(2); }
    });
  }
}

const PW_RULES2 = {
  length:  { regex: /.{8,}/,        ruleId: "rule2-length"  },
  upper:   { regex: /[A-Z]/,        ruleId: "rule2-upper"   },
  number:  { regex: /[0-9]/,        ruleId: "rule2-number"  },
  special: { regex: /[^a-zA-Z0-9]/, ruleId: "rule2-special" }
};

function checkPasswordStrength2(value) {
  let passed = 0;
  Object.keys(PW_RULES2).forEach(key => {
    const rule = PW_RULES2[key];
    const ok   = rule.regex.test(value);
    const el   = document.getElementById(rule.ruleId);
    if (el) {
      el.classList.toggle("rule-ok",   ok);
      el.classList.toggle("rule-fail", !ok && value.length > 0);
      el.textContent = (ok ? "✓ " : "✗ ") + el.textContent.slice(2);
    }
    if (ok) passed++;
  });
  const fill = document.getElementById("pw-strength-fill2");
  if (!fill) return;
  const pct = (passed / 4) * 100;
  fill.style.width = pct + "%";
  fill.className = "pw-strength-fill";
  if      (passed <= 1) fill.classList.add("pw-weak");
  else if (passed === 2) fill.classList.add("pw-fair");
  else if (passed === 3) fill.classList.add("pw-good");
  else                   fill.classList.add("pw-strong");
}

async function handleChangePassword() {
  const currentPw = document.getElementById("current-pw").value;
  const newPw     = document.getElementById("new-pw").value;
  const newPw2    = document.getElementById("new-pw2").value;
  let ok = true;

  if (!currentPw) {
    document.getElementById("current-pw-error-msg").textContent = "Mevcut şifrenizi girin.";
    setError("fg-current-pw", true); ok = false;
  } else { setError("fg-current-pw", false); }

  if (!isPasswordValid(newPw)) {
    document.getElementById("new-pw-error-msg").textContent = "Şifre gereksinimleri karşılanmıyor.";
    setError("fg-new-pw", true); ok = false;
  } else { setError("fg-new-pw", false); }

  if (newPw !== newPw2) {
    document.getElementById("new-pw2-error-msg").textContent = "Şifreler eşleşmiyor.";
    setError("fg-new-pw2", true); ok = false;
  } else { setError("fg-new-pw2", false); }

  if (!ok) return;

  const activeUser = JSON.parse(localStorage.getItem("activeUser"));
  if (!activeUser) { showToast("Oturum bulunamadı.", "error"); return; }

  const allUsers = JSON.parse(localStorage.getItem("velora_users")) || [];
  const userIdx  = allUsers.findIndex(u => u.email.toLowerCase() === activeUser.email.toLowerCase());

  if (userIdx === -1) { showToast("Kullanıcı bulunamadı.", "error"); return; }

  const currentHash = await hashPassword(currentPw);

  if (allUsers[userIdx].passwordHash && currentHash !== allUsers[userIdx].passwordHash) {
    document.getElementById("current-pw-error-msg").textContent = "Mevcut şifre hatalı.";
    setError("fg-current-pw", true);
    return;
  }

  const newHash = await hashPassword(newPw);
  allUsers[userIdx].passwordHash = newHash;
  localStorage.setItem("velora_users", JSON.stringify(allUsers));

  showToast("Şifreniz başarıyla güncellendi! ✅", "success");
  togglePwChangeForm();
}

function handleLogout() {
  if (confirm("Çıkış yapmak istediğinize emin misiniz?")) {
    localStorage.removeItem("activeUser");
    localStorage.removeItem("velora_remember");
    sessionStorage.removeItem("activeUser");
    showToast("Çıkış yapıldı.", "");
    setTimeout(() => { showSection("login-section"); }, 600);
  }
}

function openTermsModal(e) {
  if (e) e.preventDefault();
  document.getElementById("termsModal").classList.add("active");
}
function closeTermsModal(e) {
  if (e.target === document.getElementById("termsModal")) {
    document.getElementById("termsModal").classList.remove("active");
  }
}
function acceptTerms() {
  const cb = document.getElementById("termsCheck");
  if (cb) { cb.checked = true; setError("fg-terms", false); }
  document.getElementById("termsModal").classList.remove("active");
}

function showProfile(user) {
  const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  document.getElementById("profile-avatar").textContent = initials;
  document.getElementById("profile-name").textContent = user.name;
  document.getElementById("profile-email").textContent = user.email;
  document.getElementById("profile-name-detail").textContent = user.name;
  document.getElementById("profile-email-detail").textContent = user.email;
  showSection("profile-section");
}

let countdownInterval;
function startCountdown() {
  const btn = document.getElementById("resend-btn");
  const txt = document.getElementById("countdown-text");
  let sec = 60;
  btn.classList.add("counting");
  txt.textContent = ` (${sec}s)`;
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    sec--;
    if (sec <= 0) {
      clearInterval(countdownInterval);
      btn.classList.remove("counting");
      txt.textContent = "";
    } else {
      txt.textContent = ` (${sec}s)`;
    }
  }, 1000);
}

function resendCode() {
  const btn = document.getElementById("resend-btn");
  if (btn.classList.contains("counting")) return;
  const newCode = String(Math.floor(1000 + Math.random() * 9000));
  tempUser.code = newCode;
  emailjs.send("service_u871hgw", "template_nnfkcc3", {
    to_email: tempUser.email,
    to_name: tempUser.name,
    code: newCode
  }).then(() => {
    showToast("Yeni kod e-postanıza gönderildi!", "success");
  }).catch(() => {
    showToast("Mail gönderilemedi. Tekrar deneyin.", "error");
  });
  startCountdown();
}

document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  if (user && document.getElementById("profile-section")) {
    showProfile(user);
  }
  const remember = localStorage.getItem("velora_remember");
  const loginEmailEl = document.getElementById("login-email");
  if (remember === "true" && user && loginEmailEl) {
    loginEmailEl.value = user.email;
    const rememberCb = document.getElementById("rememberMe");
    if (rememberCb) rememberCb.checked = true;
  }

  const regEmail   = document.getElementById("reg-email");
  const loginEmail = document.getElementById("login-email");
  const loginPw    = document.getElementById("login-password");

  if (regEmail)   regEmail.addEventListener("keydown",   e => { if (e.key === "Enter") handleRegister(); });
  if (loginEmail) loginEmail.addEventListener("keydown", e => { if (e.key === "Enter") handleLogin(); });
  if (loginPw)    loginPw.addEventListener("keydown",    e => { if (e.key === "Enter") handleLogin(); });
});

(function updateProfileIcon() {
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const icon = document.getElementById("profile-icon");
  if (!icon) return;
  if (user) {
    const initials = user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    icon.innerHTML = initials;
    icon.classList.add("logged-in");
    icon.title = user.name;
  }
})();

// =====================
// DARK MODE TOGGLE
// =====================
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (saved === "dark" || (!saved && prefersDark)) {
    document.body.classList.add("dark");
  }
  updateThemeBtn();
})();

function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeBtn();
}

function updateThemeBtn() {
  const isDark = document.body.classList.contains("dark");
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.textContent = isDark ? "☀️" : "🌙";
    btn.title = isDark ? "Aydınlık Mod" : "Karanlık Mod";
  });
}

// =====================
// HAMBURGer MENÜ (MOBİL)
// =====================
function toggleMenu() {
  const nav    = document.getElementById("navMenu");
  const search = document.querySelector(".search-box");
  if (!nav) return;
  nav.classList.toggle("open");
  if (search) search.classList.toggle("open");
}

(function initHamburger() {
  const btn = document.getElementById("hamburgerBtn");
  if (!btn) return;
})();

// =====================
// SCROLL REVEAL ANİMASYONU
// =====================
document.addEventListener("DOMContentLoaded", function() {
  function revealOnScroll() {
    document.querySelectorAll(".about-reveal-left, .about-reveal-right").forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 60) {
        el.classList.add("revealed");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});
