// ========== VELORA ADMIN — admin.js ==========
// localStorage KEY HARİTASI:
//   velora_products   → tüm ürünler (site bu key'den okur)
//   velora_coupons    → kuponlar
//   velora_admin_pw   → admin şifresi
//   velora_log        → aktivite logu
//   velora_settings   → site ayarları
//   velora_contact    → iletişim/whatsapp
//   velora_appearance → görünüm
//   velora_users      → kullanıcılar

// ========== VARSAYILAN ÜRÜNLER ==========
const CDN = "https://res.cloudinary.com/dy2dvpbit/image/upload";

const DEFAULT_PRODUCTS = [
  { id:1,  name:"Erkek Tişört",   price:1200, image:`${CDN}/haryo-setyadi-acn5ERAeSb4-unsplash_svhjqz.jpg`,               category:"erkek", type:"tisort"   },
  { id:2,  name:"Erkek Tişört",   price:300,  image:`${CDN}/pexels-david-fowora-2160297192-36801391_hfunqe.jpg`,           category:"erkek", type:"tisort"   },
  { id:3,  name:"Erkek Tişört",   price:800,  image:`${CDN}/sven-ciupka-x8Vg7Up6TUc-unsplash_fyrbqs.jpg`,                 category:"erkek", type:"tisort"   },
  { id:4,  name:"Erkek Tişört",   price:950,  image:`${CDN}/faith-yarn-Wr0TpKqf26s-unsplash_j2qqmb.jpg`,                  category:"erkek", type:"tisort"   },
  { id:5,  name:"Erkek Pantolon", price:800,  image:`${CDN}/tuananh-blue-fB9Ex6Q5L_g-unsplash_ogcpzj.jpg`,                category:"erkek", type:"pantalon" },
  { id:6,  name:"Erkek Pantolon", price:300,  image:`${CDN}/tuananh-blue-j_3IlDX-6uQ-unsplash_i2sbm4.jpg`,                category:"erkek", type:"pantalon" },
  { id:7,  name:"Erkek Pantolon", price:150,  image:`${CDN}/tuananh-blue-rJQCoHb8XxA-unsplash_tgtnxn.jpg`,                category:"erkek", type:"pantalon" },
  { id:8,  name:"Erkek Pantolon", price:1500, image:`${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,                category:"erkek", type:"pantalon" },
  { id:9,  name:"Erkek Şapka",    price:1500, image:`${CDN}/fatmanur-simsek-yILrYgG322s-unsplash_r4bhpq.jpg`,             category:"erkek", type:"sapka"    },
  { id:10, name:"Erkek Şapka",    price:1500, image:`${CDN}/mateus-jud-s-gRaxKXUio-unsplash_om2buz.jpg`,                  category:"erkek", type:"sapka"    },
  { id:11, name:"Erkek Şapka",    price:1500, image:`${CDN}/mathias-reding-dWFaMnAX49Q-unsplash_zulbnu.jpg`,              category:"erkek", type:"sapka"    },
  { id:12, name:"Erkek Şapka",    price:1500, image:`${CDN}/soroush-alavi-PVvoEQH6cOI-unsplash_zu7zmz.jpg`,               category:"erkek", type:"sapka"    },
  { id:13, name:"Erkek Ceket",    price:1500, image:`${CDN}/adrian-ordonez-P0W27GRvyww-unsplash_jsodmg.jpg`,              category:"erkek", type:"ceket"    },
  { id:14, name:"Erkek Ceket",    price:1500, image:`${CDN}/caio-coelho-QRN47la37gw-unsplash_fh7biy.jpg`,                 category:"erkek", type:"ceket"    },
  { id:15, name:"Erkek Ceket",    price:1500, image:`${CDN}/colton-sturgeon-oB7lLU9dwLc-unsplash_meuzv2.jpg`,             category:"erkek", type:"ceket"    },
  { id:16, name:"Erkek Ceket",    price:1500, image:`${CDN}/mike-montgomery-JNizejfX4B8-unsplash_d0pql3.jpg`,             category:"erkek", type:"ceket"    },
  { id:17, name:"Kadın Tişört",   price:1200, image:`${CDN}/charlesdeluvio-kPKFdPQTz9Y-unsplash_ulpc0v.jpg`,              category:"kadin", type:"tisort"   },
  { id:18, name:"Kadın Tişört",   price:300,  image:`${CDN}/feey-3fM186uPnZQ-unsplash_yrpqo0.jpg`,                        category:"kadin", type:"tisort"   },
  { id:19, name:"Kadın Tişört",   price:800,  image:`${CDN}/ronan-furuta-tt9hFR4aEKY-unsplash_lcdnvc.jpg`,                category:"kadin", type:"tisort"   },
  { id:20, name:"Kadın Tişört",   price:950,  image:`${CDN}/tuananh-blue-PvI3uWqDfTo-unsplash_gi8ei4.jpg`,                category:"kadin", type:"tisort"   },
  { id:21, name:"Kadın Pantolon", price:800,  image:`${CDN}/tamara-bellis-zDyJOj8ZXG0-unsplash_iuvn83.jpg`,               category:"kadin", type:"pantalon" },
  { id:22, name:"Kadın Pantolon", price:300,  image:`${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_mh2ook.jpg`,                category:"kadin", type:"pantalon" },
  { id:24, name:"Kadın Pantolon", price:1500, image:`${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,                category:"kadin", type:"pantalon" },
  { id:49, name:"Kadın Pantolon", price:950,  image:`${CDN}/tuananh-blue-2QSK4kFoVZE-unsplash_ivazfe.jpg`,                category:"kadin", type:"pantalon" },
  { id:25, name:"Kadın Şapka",    price:1500, image:`${CDN}/omar-sabra-V5yIyQ2m-bo-unsplash_cmq5g7.jpg`,                  category:"kadin", type:"sapka"    },
  { id:26, name:"Kadın Şapka",    price:1500, image:`${CDN}/nathan-dumlao-Y8hAxuKgP8g-unsplash_rr4mzr.jpg`,               category:"kadin", type:"sapka"    },
  { id:27, name:"Kadın Şapka",    price:1500, image:`${CDN}/kajetan-sumila-U8CyGLw2-ek-unsplash_xewyl5.jpg`,              category:"kadin", type:"sapka"    },
  { id:28, name:"Kadın Şapka",    price:1500, image:`${CDN}/elena-golubeva-rISh07SbuV4-unsplash_a4clvj.jpg`,              category:"kadin", type:"sapka"    },
  { id:29, name:"Kadın Ceket",    price:1500, image:`${CDN}/anna-evans-eELIrBJXBPk-unsplash_rtml0f.jpg`,                  category:"kadin", type:"ceket"    },
  { id:30, name:"Kadın Ceket",    price:1500, image:`${CDN}/donald-teel--J7OdbfiZ1o-unsplash_sr2e7y.jpg`,                 category:"kadin", type:"ceket"    },
  { id:31, name:"Kadın Ceket",    price:1500, image:`${CDN}/lea-ochel-nsRBbE6-YLs-unsplash_eklemz.jpg`,                   category:"kadin", type:"ceket"    },
  { id:32, name:"Kadın Ceket",    price:1500, image:`${CDN}/noelle-rebekah-PNCXp2Uh6WM-unsplash_mqx4v8.jpg`,              category:"kadin", type:"ceket"    },
  { id:33, name:"Çocuk Tişört",   price:1200, image:`${CDN}/fabio-alves-eAUE_FmclYE-unsplash_nt2rlg.jpg`,                 category:"cocuk", type:"tisort"   },
  { id:34, name:"Çocuk Tişört",   price:300,  image:`${CDN}/md-salman-tWOz2_EK5EQ-unsplash_tzznsh.jpg`,                   category:"cocuk", type:"tisort"   },
  { id:35, name:"Çocuk Tişört",   price:800,  image:`${CDN}/ryan-hoffman-u6n1HrW0sdQ-unsplash_xfyvkg.jpg`,                category:"cocuk", type:"tisort"   },
  { id:36, name:"Çocuk Tişört",   price:950,  image:`${CDN}/tuananh-blue-20wx7IY7Ggk-unsplash_dulwe5.jpg`,                category:"cocuk", type:"tisort"   },
  { id:37, name:"Çocuk Pantolon", price:800,  image:`${CDN}/christopher-luther-gwOLhTqWcaA-unsplash_kgfzef.jpg`,          category:"cocuk", type:"pantalon" },
  { id:38, name:"Çocuk Pantolon", price:300,  image:`${CDN}/pexels-amina-filkins-5560028_ib5oqv.jpg`,                     category:"cocuk", type:"pantalon" },
  { id:39, name:"Çocuk Pantolon", price:150,  image:`${CDN}/pexels-dmitriy-steinke-559643503-30683064_gmi9fs.jpg`,        category:"cocuk", type:"pantalon" },
  { id:40, name:"Çocuk Pantolon", price:1500, image:`${CDN}/pexels-dmitriy-steinke-559643503-30683099_eeqlgb.jpg`,        category:"cocuk", type:"pantalon" },
  { id:41, name:"Çocuk Şapka",    price:1500, image:`${CDN}/ahmed-syed-6NVrH0HB_DE-unsplash_eow23i.jpg`,                  category:"cocuk", type:"sapka"    },
  { id:42, name:"Çocuk Şapka",    price:1500, image:`${CDN}/angel-monsanto-iii-0wzyDMY8gCo-unsplash_gi7yc2.jpg`,          category:"cocuk", type:"sapka"    },
  { id:43, name:"Çocuk Şapka",    price:1500, image:`${CDN}/markus-spiske--rlShVn1_U8-unsplash_ybzneb.jpg`,               category:"cocuk", type:"sapka"    },
  { id:44, name:"Çocuk Şapka",    price:1500, image:`${CDN}/yang-deng-2loKxdi6Hmo-unsplash_sqvn1x.jpg`,                   category:"cocuk", type:"sapka"    },
  { id:45, name:"Çocuk Ceket",    price:1500, image:`${CDN}/2-bro-s-media-LV_ZrBEGupE-unsplash_ovmfbe.jpg`,               category:"cocuk", type:"ceket"    },
  { id:46, name:"Çocuk Ceket",    price:1500, image:`${CDN}/christopher-campbell--h_cufTEtcg-unsplash_cehfnl.jpg`,        category:"cocuk", type:"ceket"    },
  { id:47, name:"Çocuk Ceket",    price:1500, image:`${CDN}/nathan-dumlao-QqLuSb0sypY-unsplash_gs4zul.jpg`,               category:"cocuk", type:"ceket"    },
  { id:48, name:"Çocuk Ceket",    price:1500, image:`${CDN}/phat-tr-ng-UbJ2Q_HInuU-unsplash_sbwzvv.jpg`,                  category:"cocuk", type:"ceket"    },
  { id:50, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_9_mqf5za.jpg`,          category:"erkek", type:"tisort"   },
  { id:51, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.27_4_rawlcg.jpg`,          category:"erkek", type:"tisort"   },
  { id:52, name:"Erkek Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.24_sp3epo.jpg`,            category:"erkek", type:"pantalon" },
  { id:53, name:"Erkek Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.24_1_yc6cwo.jpg`,          category:"erkek", type:"pantalon" },
  { id:54, name:"Erkek Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.25_hh47wc.jpg`,            category:"erkek", type:"pantalon" },
  { id:55, name:"Erkek Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.25_1_xwrwcp.jpg`,          category:"erkek", type:"pantalon" },
  { id:56, name:"Erkek Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.27_3_m5guz6.jpg`,          category:"erkek", type:"pantalon" },
  { id:57, name:"Kadın Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_2_ldvaix.jpg`,          category:"kadin", type:"tisort"   },
  { id:58, name:"Kadın Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_5_oq4aof.jpg`,          category:"kadin", type:"tisort"   },
  { id:59, name:"Kadın Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_4_rufgco.jpg`,          category:"kadin", type:"pantalon" },
  { id:60, name:"Kadın Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_3_ebs2mm.jpg`,          category:"kadin", type:"tisort"   },
  { id:61, name:"Kadın Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_7_tulz7e.jpg`,          category:"kadin", type:"ceket"    },
  { id:62, name:"Kadın Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_8_apnfjd.jpg`,          category:"kadin", type:"ceket"    },
  { id:63, name:"Kadın Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_12.49.26_6_m5xtbh.jpg`,          category:"kadin", type:"ceket"    },
  { id:64, name:"Erkek Tişört",   price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_5_otfdbd.jpg`,          category:"erkek", type:"tisort"   },
  { id:65, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_4_njzedf.jpg`,          category:"erkek", type:"tisort"   },
  { id:66, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_ht6gbg.jpg`,            category:"erkek", type:"tisort"   },
  { id:67, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_1_vwhdwk.jpg`,          category:"erkek", type:"tisort"   },
  { id:68, name:"Kadın Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_5_bqgwxm.jpg`,          category:"kadin", type:"ceket"    },
  { id:69, name:"Kadın Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_4_nz0ryf.jpg`,          category:"kadin", type:"ceket"    },
  { id:70, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_2_cpdvlf.jpg`,          category:"erkek", type:"tisort"   },
  { id:71, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_3_oy9e4t.jpg`,          category:"erkek", type:"tisort"   },
  { id:72, name:"Kadın Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_7_ybynva.jpg`,          category:"kadin", type:"tisort"   },
  { id:73, name:"Kadın Pantolon", price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.46_6_nenaz9.jpg`,          category:"kadin", type:"pantalon" },
  { id:74, name:"Erkek Ceket",    price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_rnoweq.jpg`,            category:"erkek", type:"ceket"    },
  { id:75, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_1_sp0k6g.jpg`,          category:"erkek", type:"tisort"   },
  { id:76, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_3_yv7jdx.jpg`,          category:"erkek", type:"tisort"   },
  { id:77, name:"Erkek Tişört",   price:1200, image:`${CDN}/WhatsApp_Image_2026-05-16_at_13.59.45_2_k9kdyj.jpg`,          category:"erkek", type:"tisort"   },
  { id:78, name:"Çocuk Pantolon", price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.44_2_qcgbca.jpg`,          category:"cocuk", type:"pantalon" },
  { id:79, name:"Çocuk Pantolon", price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.44_4_b4ffsp.jpg`,          category:"cocuk", type:"pantalon" },
  { id:80, name:"Çocuk Pantolon", price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.44_5_ap0xia.jpg`,          category:"cocuk", type:"pantalon" },
  { id:81, name:"Çocuk Pantolon", price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.44_3_zk99uj.jpg`,          category:"cocuk", type:"pantalon" },
  { id:82, name:"Çocuk Tişört",   price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.45_eeq1dc.jpg`,            category:"cocuk", type:"tisort"   },
  { id:83, name:"Çocuk Tişört",   price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.45_1_cnld7p.jpg`,          category:"cocuk", type:"tisort"   },
  { id:84, name:"Çocuk Tişört",   price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.45_2_rayugx.jpg`,          category:"cocuk", type:"tisort"   },
  { id:85, name:"Çocuk Ceket",    price:800,  image:`${CDN}/WhatsApp_Image_2026-05-16_at_14.23.44_1_lvqfgm.jpg`,          category:"cocuk", type:"ceket"    },
];

// ========== ÜRÜNLER ==========
function loadProducts() {
  const stored = localStorage.getItem('velora_products');
  if (stored) {
    try { const arr = JSON.parse(stored); if (Array.isArray(arr) && arr.length > 0) return arr; } catch(e) {}
  }
  localStorage.setItem('velora_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS.slice();
}

function saveProducts() {
  localStorage.setItem('velora_products', JSON.stringify(products));
  // Diğer sekmelerdeki siteyi güncelle (storage event)
  // Not: storage event yalnızca diğer sekmeler için tetiklenir; aynı sekme kendi tetiklemesini almaz
}

let products = loadProducts();

// ========== KUPONLAR ==========
const DEFAULT_COUPONS = [
  { code:"VELORA10",  discount:10, status:"active", uses:0 },
  { code:"VELORA20",  discount:20, status:"active", uses:0 },
  { code:"HOSGELDIN", discount:15, status:"active", uses:0 },
];

function loadCoupons() {
  const stored = localStorage.getItem('velora_coupons');
  if (stored) { try { return JSON.parse(stored); } catch(e) {} }
  localStorage.setItem('velora_coupons', JSON.stringify(DEFAULT_COUPONS));
  return DEFAULT_COUPONS.slice();
}

function saveCoupons() { localStorage.setItem('velora_coupons', JSON.stringify(coupons)); }

let coupons = loadCoupons();

// ========== DİĞER STATE ==========
let activityLog   = JSON.parse(localStorage.getItem('velora_log') || '[]');
let currentFilter = 'all';
let currentPage   = 1;
const perPage     = 15;
let editingId     = null;

// ========== AUTH ==========
const ADMIN_PW_KEY = 'velora_admin_pw';
const DEFAULT_PW   = 'admin123';

function checkAdmin() {
  const storedPw = localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PW;
  const input    = document.getElementById('adminPwInput').value;
  if (input === storedPw) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display  = 'flex';
    initDashboard();
  } else {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('adminPwInput').value = '';
    document.getElementById('adminPwInput').focus();
  }
}

function adminLogout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('adminPwInput').value = '';
}

function changeAdminPw() {
  const pw1 = document.getElementById('set-newAdminPw').value;
  const pw2 = document.getElementById('set-newAdminPw2').value;
  if (!pw1)           { showToast('Şifre boş olamaz!', 'error'); return; }
  if (pw1.length < 4) { showToast('Şifre en az 4 karakter!', 'error'); return; }
  if (pw1 !== pw2)    { showToast('Şifreler eşleşmiyor!', 'error'); return; }
  localStorage.setItem(ADMIN_PW_KEY, pw1);
  document.getElementById('set-newAdminPw').value  = '';
  document.getElementById('set-newAdminPw2').value = '';
  showToast('Admin şifresi güncellendi ✅', 'success');
  addLog('settings', 'Admin şifresi değiştirildi');
}

// ========== SIDEBAR ==========
function openSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); }

// ========== NAV ==========
function navTo(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const pageEl = document.getElementById('page-' + page);
  if (!pageEl) return;
  pageEl.classList.add('active');
  if (el) el.classList.add('active');
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
  const bnavEl = document.getElementById('bnav-' + page);
  if (bnavEl) bnavEl.classList.add('active');
  const titles = { products:'Ürün Listesi', addProduct:'Yeni Ürün Ekle', coupons:'Kupon Yönetimi', users:'Kullanıcılar', siteSettings:'Site Ayarları', whatsapp:'WhatsApp & İletişim', appearance:'Görünüm', activity:'Aktivite Logu' };
  document.getElementById('topbarTitle').textContent = titles[page] || page;
  if (page === 'products')   { currentPage = 1; renderProductTable(); }
  if (page === 'coupons')    renderCoupons();
  if (page === 'users')      renderUsers();
  if (page === 'activity')   renderFullLog();
  if (page === 'addProduct') { clearProductForm(); editingId = null; document.getElementById('addProductTitle').textContent = 'Yeni Ürün Ekle'; }
  closeSidebar();
}

// ========== DASHBOARD ==========
function initDashboard() {
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('tr-TR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  updateStats();
  navTo('products', document.querySelector('.nav-item'));
}

function updateStats() {
  const statCoupons = document.getElementById('stat-coupons');
  const statUsers   = document.getElementById('stat-users');
  if (statCoupons) statCoupons.textContent = coupons.filter(c => c.status === 'active').length;
  if (statUsers) { const users = JSON.parse(localStorage.getItem('velora_users') || '[]'); statUsers.textContent = users.length; }
}

// ========== PRODUCTS TABLE ==========
function renderProductTable() {
  const search = (document.getElementById('productSearch')?.value || '').toLowerCase();
  let filtered = products.filter(p => {
    const matchFilter = currentFilter === 'all' || p.category === currentFilter || p.type === currentFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search) || (p.category||'').includes(search) || (p.type||'').includes(search);
    return matchFilter && matchSearch;
  });

  document.getElementById('productCount').textContent = filtered.length;

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  if (currentPage > totalPages) currentPage = totalPages;
  const slice = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const catBadge  = { erkek:'badge-erkek', kadin:'badge-kadin', cocuk:'badge-cocuk' };
  const typeBadge = { tisort:'badge-tisort', pantalon:'badge-pantalon', ceket:'badge-ceket', sapka:'badge-sapka' };
  const typeLabel = { tisort:'Tişört', pantalon:'Pantolon', ceket:'Ceket', sapka:'Şapka' };
  const catLabel  = { erkek:'Erkek', kadin:'Kadın', cocuk:'Çocuk' };

  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = slice.length === 0
    ? `<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">🔍</div>Ürün bulunamadı</div></td></tr>`
    : slice.map(p => `
        <tr>
          <td><img src="${p.image}" class="td-img" onerror="this.src='https://placehold.co/44x44/222/444?text=?'"></td>
          <td style="font-weight:500">${p.name}</td>
          <td style="color:var(--accent);font-family:'DM Mono',monospace">${(p.price||0).toLocaleString('tr-TR')} TL</td>
          <td><span class="badge ${catBadge[p.category]||''}">${catLabel[p.category]||p.category}</span></td>
          <td><span class="badge ${typeBadge[p.type]||''}">${typeLabel[p.type]||p.type}</span></td>
          <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:11px">#${p.id}</td>
          <td>
            <div style="display:flex;gap:6px">
              <button class="btn btn-secondary btn-sm" onclick="openEdit(${p.id})">✏️</button>
              <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">🗑</button>
            </div>
          </td>
        </tr>`).join('');

  const pag = document.getElementById('productPagination');
  pag.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
    btn.textContent = i;
    btn.onclick = () => { currentPage = i; renderProductTable(); };
    pag.appendChild(btn);
  }
}

function setFilter(f, btn) {
  currentFilter = f; currentPage = 1;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderProductTable();
}

// ========== ADD PRODUCT ==========
function previewImage() {
  const url = document.getElementById('newImage').value;
  const img = document.getElementById('previewImg');
  const ph  = document.getElementById('previewPlaceholder');
  if (url) { img.src=url; img.style.display='block'; ph.style.display='none'; }
  else     { img.style.display='none'; ph.style.display='flex'; }
  document.getElementById('previewName').textContent  = document.getElementById('newName').value || '—';
  const price = document.getElementById('newPrice').value;
  document.getElementById('previewPrice').textContent = price ? parseInt(price).toLocaleString('tr-TR')+' TL' : '— TL';
}

function saveProduct() {
  const name  = document.getElementById('newName').value.trim();
  const price = parseInt(document.getElementById('newPrice').value);
  const cat   = document.getElementById('newCategory').value;
  const type  = document.getElementById('newType').value;
  const image = document.getElementById('newImage').value.trim();

  if (!name || !price || !cat || !type || !image) { showToast('Tüm alanları doldurun!', 'error'); return; }

  const maxId      = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
  const newProduct = { id:maxId+1, name, price, image, category:cat, type };
  products.push(newProduct);
  saveProducts();

  addLog('add', `Yeni ürün eklendi: "${name}" (ID: ${newProduct.id})`);
  showToast(`"${name}" ürünü eklendi ✅`, 'success');
  clearProductForm();
  updateStats();
}

function clearProductForm() {
  ['newName','newPrice','newImage'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  ['newCategory','newType'].forEach(id => { const el=document.getElementById(id); if(el) el.selectedIndex=0; });
  const img=document.getElementById('previewImg'); if(img) img.style.display='none';
  const ph=document.getElementById('previewPlaceholder'); if(ph) ph.style.display='flex';
  const pn=document.getElementById('previewName'); if(pn) pn.textContent='—';
  const pp=document.getElementById('previewPrice'); if(pp) pp.textContent='— TL';
  const bj=document.getElementById('bulkJson'); if(bj) bj.value='';
}

function bulkAdd() {
  try {
    const arr = JSON.parse(document.getElementById('bulkJson').value);
    if (!Array.isArray(arr)) { showToast('Geçersiz JSON dizisi!', 'error'); return; }
    let added = 0;
    let maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    arr.forEach(item => {
      if (!item.name || !item.category || !item.type) return;
      maxId++;
      products.push({ id:maxId, name:item.name, price:item.price||0, image:item.image||'', category:item.category, type:item.type });
      added++;
    });
    saveProducts();
    addLog('add', `${added} ürün toplu eklendi`);
    showToast(`${added} ürün eklendi ✅`, 'success');
    document.getElementById('bulkJson').value = '';
    updateStats();
  } catch(e) { showToast('JSON formatı hatalı!', 'error'); }
}

// ========== EDIT / DELETE ==========
function openEdit(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('edit-id').value       = id;
  document.getElementById('edit-name').value     = p.name;
  document.getElementById('edit-price').value    = p.price;
  document.getElementById('edit-category').value = p.category;
  document.getElementById('edit-type').value     = p.type;
  document.getElementById('edit-image').value    = p.image;
  const prev = document.getElementById('editPreviewImg');
  prev.src   = p.image;
  prev.style.display = 'block';
  document.getElementById('editModal').classList.add('open');
}

function saveEdit() {
  const id  = parseInt(document.getElementById('edit-id').value);
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return;
  const name  = document.getElementById('edit-name').value.trim();
  const price = parseInt(document.getElementById('edit-price').value);
  const cat   = document.getElementById('edit-category').value;
  const type  = document.getElementById('edit-type').value;
  const image = document.getElementById('edit-image').value.trim();
  if (!name || !price || !cat || !type) { showToast('Tüm alanları doldurun!', 'error'); return; }
  products[idx] = { ...products[idx], name, price, category:cat, type, image };
  saveProducts();
  addLog('edit', `Ürün düzenlendi: "${name}" (ID: ${id})`);
  showToast('Ürün güncellendi ✅', 'success');
  closeEditModal();
  renderProductTable();
}

function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!confirm(`"${p?.name}" ürününü silmek istediğinize emin misiniz?`)) return;
  products = products.filter(x => x.id !== id);
  saveProducts();
  addLog('del', `Ürün silindi: "${p?.name}" (ID: ${id})`);
  showToast('Ürün silindi', 'error');
  renderProductTable();
  updateStats();
}

function closeEditModal() { document.getElementById('editModal').classList.remove('open'); }

// ========== COUPONS ==========
function renderCoupons() {
  const tbody = document.getElementById('couponTableBody');
  if (coupons.length === 0) { tbody.innerHTML=`<tr><td colspan="5"><div class="empty-state">Henüz kupon yok</div></td></tr>`; return; }
  tbody.innerHTML = coupons.map((c,i) => `
    <tr>
      <td><span class="coupon-code">${c.code}</span></td>
      <td style="color:var(--success);font-weight:600">%${c.discount}</td>
      <td><span class="badge ${c.status==='active'?'badge-cocuk':''}" style="${c.status!=='active'?'background:rgba(100,100,100,0.2);color:var(--muted)':''}">${c.status==='active'?'Aktif':'Pasif'}</span></td>
      <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:12px">${c.uses||0}</td>
      <td>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="toggleCoupon(${i})">${c.status==='active'?'⏸':'▶️'}</button>
          <button class="btn btn-secondary btn-sm" onclick="copyCoupon('${c.code}')">📋</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCoupon(${i})">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

function openCouponModal() {
  document.getElementById('coup-code').value=''; document.getElementById('coup-discount').value=''; document.getElementById('coup-status').selectedIndex=0;
  document.getElementById('couponModal').classList.add('open');
}
function closeCouponModal() { document.getElementById('couponModal').classList.remove('open'); }

function addCoupon() {
  const code   = document.getElementById('coup-code').value.trim().toUpperCase();
  const disc   = parseInt(document.getElementById('coup-discount').value);
  const status = document.getElementById('coup-status').value;
  if (!code || !disc || disc<1 || disc>100) { showToast('Geçerli kod ve indirim girin!', 'error'); return; }
  if (coupons.find(c => c.code===code))     { showToast('Bu kod zaten mevcut!', 'error'); return; }
  coupons.push({ code, discount:disc, status, uses:0 });
  saveCoupons();
  addLog('add', `Yeni kupon: ${code} (%${disc})`);
  showToast(`"${code}" kuponu eklendi ✅`, 'success');
  closeCouponModal();
  renderCoupons();
  updateStats();
}

function toggleCoupon(i) {
  coupons[i].status = coupons[i].status==='active' ? 'inactive' : 'active';
  saveCoupons();
  addLog('edit', `Kupon durumu: ${coupons[i].code}`);
  renderCoupons(); updateStats();
}

function deleteCoupon(i) {
  const code = coupons[i].code;
  if (!confirm(`"${code}" kuponunu silmek istediğinize emin misiniz?`)) return;
  coupons.splice(i,1); saveCoupons();
  addLog('del', `Kupon silindi: ${code}`);
  showToast('Kupon silindi','error'); renderCoupons(); updateStats();
}

function copyCoupon(code) { navigator.clipboard.writeText(code).then(() => showToast(`"${code}" kopyalandı 📋`,'success')); }

// ========== USERS ==========
function renderUsers() {
  const search   = (document.getElementById('userSearch')?.value || '').toLowerCase();
  const users    = JSON.parse(localStorage.getItem('velora_users') || '[]');
  const filtered = users.filter(u => !search || u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search));
  document.getElementById('userCount').textContent = filtered.length;
  const activeUser = JSON.parse(localStorage.getItem('activeUser') || 'null');
  const tbody = document.getElementById('userTableBody');
  if (filtered.length === 0) { tbody.innerHTML=`<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">👤</div>Kullanıcı bulunamadı</div></td></tr>`; return; }
  tbody.innerHTML = filtered.map((u,i) => `
    <tr>
      <td style="font-weight:500">${u.name}</td>
      <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:12px">${u.email}</td>
      <td>${activeUser?.email===u.email?'<span class="badge badge-cocuk">Aktif Oturum</span>':'<span class="badge" style="background:rgba(100,100,100,0.2);color:var(--muted)">Çevrimdışı</span>'}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteUser(${i})">🗑</button></td>
    </tr>`).join('');
}

function deleteUser(i) {
  const users = JSON.parse(localStorage.getItem('velora_users') || '[]');
  const u = users[i];
  if (!confirm(`"${u.name}" kullanıcısını silmek istediğinize emin misiniz?`)) return;
  users.splice(i,1); localStorage.setItem('velora_users', JSON.stringify(users));
  addLog('del', `Kullanıcı silindi: ${u.name}`);
  showToast('Kullanıcı silindi','error'); renderUsers();
}

function clearAllUsers() {
  if (!confirm('TÜM kullanıcıları silmek istediğinize emin misiniz?')) return;
  localStorage.setItem('velora_users','[]'); localStorage.removeItem('activeUser');
  addLog('del','Tüm kullanıcılar silindi');
  showToast('Tüm kullanıcılar silindi','error'); renderUsers();
}

// ========== SETTINGS ==========
function saveSiteSettings() {
  const settings = {
    storeName: document.getElementById('set-storeName').value,
    slogan:    document.getElementById('set-slogan').value,
    currency:  document.getElementById('set-currency').value,
    title:     document.getElementById('set-title').value,
    metaDesc:  document.getElementById('set-metaDesc').value,
    keywords:  document.getElementById('set-keywords').value,
    features: {
      search:      document.getElementById('feat-search').checked,
      favorites:   document.getElementById('feat-favorites').checked,
      darkmode:    document.getElementById('feat-darkmode').checked,
      coupon:      document.getElementById('feat-coupon').checked,
      auth:        document.getElementById('feat-auth').checked,
      maintenance: document.getElementById('feat-maintenance').checked,
    }
  };
  localStorage.setItem('velora_settings', JSON.stringify(settings));
  addLog('settings','Site ayarları güncellendi');
  showToast('Ayarlar kaydedildi ✅','success');
}

function saveContact() {
  const contact = {
    waNumber:   document.getElementById('wa-number').value,
    waGreeting: document.getElementById('wa-greeting').value,
    waActive:   document.getElementById('wa-active').checked,
    email:      document.getElementById('contact-email').value,
    phone:      document.getElementById('contact-phone').value,
    address:    document.getElementById('contact-address').value,
    instagram:  document.getElementById('contact-instagram').value,
    emailjs: { service:document.getElementById('ejs-service').value, template:document.getElementById('ejs-template').value, pubkey:document.getElementById('ejs-pubkey').value }
  };
  localStorage.setItem('velora_contact', JSON.stringify(contact));
  addLog('settings','İletişim / WhatsApp ayarları güncellendi');
  showToast('İletişim ayarları kaydedildi ✅','success');
}

function saveAppearance() {
  const app = {
    banner:  document.getElementById('app-banner').value,
    logo:    document.getElementById('app-logo').value,
    favicon: document.getElementById('app-favicon').value,
    colors:  { primary:document.getElementById('color-primary').value, bg:document.getElementById('color-bg').value, text:document.getElementById('color-text').value },
    headfont:     document.getElementById('app-headfont').value,
    bodyfont:     document.getElementById('app-bodyfont').value,
    announcebar:  document.getElementById('app-announcebar').checked,
    announcetext: document.getElementById('app-announcetext').value,
    announcecolor:document.getElementById('app-announcecolor').value,
  };
  localStorage.setItem('velora_appearance', JSON.stringify(app));
  addLog('settings','Görünüm ayarları güncellendi');
  showToast('Görünüm ayarları kaydedildi ✅','success');
}

// ========== EXPORT ==========
function exportProducts() {
  const header = 'ID,Ad,Fiyat,Kategori,Tip,Görsel\n';
  const rows   = products.map(p => `${p.id},"${p.name}",${p.price},${p.category},${p.type},"${p.image}"`).join('\n');
  const blob   = new Blob(['\uFEFF'+header+rows], { type:'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href=url; a.download='velora_urunler.csv'; a.click();
  URL.revokeObjectURL(url);
  addLog('settings','Ürün listesi CSV indirildi');
}

// ========== LOG ==========
function addLog(type, msg) {
  activityLog.unshift({ type, msg, time:new Date().toLocaleString('tr-TR') });
  if (activityLog.length > 200) activityLog.pop();
  localStorage.setItem('velora_log', JSON.stringify(activityLog));
}

function renderFullLog() {
  const el = document.getElementById('fullActivityLog');
  if (activityLog.length === 0) { el.innerHTML='<div class="empty-state">Log boş</div>'; return; }
  el.innerHTML = activityLog.map(l => `
    <div class="log-item">
      <div class="log-dot ${l.type}"></div>
      <div><div style="font-size:13px">${l.msg}</div><div class="log-time">${l.time}</div></div>
    </div>`).join('');
}

function clearLog() {
  if (!confirm('Aktivite logu temizlensin mi?')) return;
  activityLog = []; localStorage.setItem('velora_log','[]');
  renderFullLog(); showToast('Log temizlendi','success');
}

// ========== TOAST ==========
function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent=msg; t.className='toast show '+type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className='toast'; }, 3000);
}

// ========== INIT ==========
window.addEventListener('load', function() {
  // Eski key'den taşı
  const oldStored = localStorage.getItem('velora_admin_products');
  if (oldStored) {
    try {
      const oldArr = JSON.parse(oldStored);
      oldArr.forEach(sp => { if (!products.find(p => p.id===sp.id)) products.push(sp); });
      saveProducts();
    } catch(e) {}
    localStorage.removeItem('velora_admin_products');
  }

  document.getElementById('couponModal')?.addEventListener('click', function(e) { if(e.target===this) closeCouponModal(); });
  document.getElementById('editModal')?.addEventListener('click', function(e) { if(e.target===this) closeEditModal(); });
  document.getElementById('edit-image')?.addEventListener('input', function() {
    const prev=document.getElementById('editPreviewImg');
    prev.src=this.value; prev.style.display=this.value?'block':'none';
  });
  document.getElementById('adminPwInput')?.addEventListener('keydown', function(e) { if(e.key==='Enter') checkAdmin(); });

  // Kayıtlı ayarları yükle
  const saved = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (saved) {
    if (saved.storeName) document.getElementById('set-storeName').value = saved.storeName;
    if (saved.slogan)    document.getElementById('set-slogan').value    = saved.slogan;
    if (saved.title)     document.getElementById('set-title').value     = saved.title;
    if (saved.features)  Object.entries(saved.features).forEach(([k,v]) => { const el=document.getElementById('feat-'+k); if(el) el.checked=v; });
  }

  const contact = JSON.parse(localStorage.getItem('velora_contact') || 'null');
  if (contact) {
    if (contact.waNumber)  document.getElementById('wa-number').value         = contact.waNumber;
    if (contact.instagram) document.getElementById('contact-instagram').value = contact.instagram;
  }

  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('tr-TR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  updateStats();
});
