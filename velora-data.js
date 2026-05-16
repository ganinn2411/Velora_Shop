// ============================================================
//  VELORA — velora-data.js
//  Admin paneli ile siteyi birbirine bağlayan veri katmanı.
//  index.html'de script.js'den ÖNCE yüklenmelidir.
// ============================================================

const CDN = "https://res.cloudinary.com/dy2dvpbit/image/upload";

const VELORA_DEFAULT_PRODUCTS = [
  { id: 1,  name: "Erkek Tişört",    price: 1200, image: `${CDN}/haryo-setyadi-acn5ERAeSb4-unsplash_svhjqz.jpg`,          category: "erkek", type: "tisort"   },
  { id: 2,  name: "Erkek Tişört",    price: 300,  image: `${CDN}/pexels-david-fowora-2160297192-36801391_hfunqe.jpg`,     category: "erkek", type: "tisort"   },
  { id: 3,  name: "Erkek Tişört",    price: 800,  image: `${CDN}/sven-ciupka-x8Vg7Up6TUc-unsplash_fyrbqs.jpg`,           category: "erkek", type: "tisort"   },
  { id: 4,  name: "Erkek Tişört",    price: 950,  image: `${CDN}/faith-yarn-Wr0TpKqf26s-unsplash_j2qqmb.jpg`,            category: "erkek", type: "tisort"   },
  { id: 5,  name: "Erkek Pantolon",  price: 800,  image: `${CDN}/tuananh-blue-fB9Ex6Q5L_g-unsplash_ogcpzj.jpg`,          category: "erkek", type: "pantalon" },
  { id: 6,  name: "Erkek Pantolon",  price: 300,  image: `${CDN}/tuananh-blue-j_3IlDX-6uQ-unsplash_i2sbm4.jpg`,          category: "erkek", type: "pantalon" },
  { id: 7,  name: "Erkek Pantolon",  price: 150,  image: `${CDN}/tuananh-blue-rJQCoHb8XxA-unsplash_tgtnxn.jpg`,          category: "erkek", type: "pantalon" },
  { id: 8,  name: "Erkek Pantolon",  price: 1500, image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,          category: "erkek", type: "pantalon" },
  { id: 9,  name: "Erkek Şapka",     price: 1500, image: `${CDN}/fatmanur-simsek-yILrYgG322s-unsplash_r4bhpq.jpg`,       category: "erkek", type: "sapka"    },
  { id: 10, name: "Erkek Şapka",     price: 1500, image: `${CDN}/mateus-jud-s-gRaxKXUio-unsplash_om2buz.jpg`,            category: "erkek", type: "sapka"    },
  { id: 11, name: "Erkek Şapka",     price: 1500, image: `${CDN}/mathias-reding-dWFaMnAX49Q-unsplash_zulbnu.jpg`,        category: "erkek", type: "sapka"    },
  { id: 12, name: "Erkek Şapka",     price: 1500, image: `${CDN}/soroush-alavi-PVvoEQH6cOI-unsplash_zu7zmz.jpg`,         category: "erkek", type: "sapka"    },
  { id: 13, name: "Erkek Ceket",     price: 1500, image: `${CDN}/adrian-ordonez-P0W27GRvyww-unsplash_jsodmg.jpg`,        category: "erkek", type: "ceket"    },
  { id: 14, name: "Erkek Ceket",     price: 1500, image: `${CDN}/caio-coelho-QRN47la37gw-unsplash_fh7biy.jpg`,           category: "erkek", type: "ceket"    },
  { id: 15, name: "Erkek Ceket",     price: 1500, image: `${CDN}/colton-sturgeon-oB7lLU9dwLc-unsplash_meuzv2.jpg`,       category: "erkek", type: "ceket"    },
  { id: 16, name: "Erkek Ceket",     price: 1500, image: `${CDN}/mike-montgomery-JNizejfX4B8-unsplash_d0pql3.jpg`,       category: "erkek", type: "ceket"    },
  { id: 17, name: "Kadın Tişört",    price: 1200, image: `${CDN}/charlesdeluvio-kPKFdPQTz9Y-unsplash_ulpc0v.jpg`,        category: "kadin", type: "tisort"   },
  { id: 18, name: "Kadın Tişört",    price: 300,  image: `${CDN}/feey-3fM186uPnZQ-unsplash_yrpqo0.jpg`,                  category: "kadin", type: "tisort"   },
  { id: 19, name: "Kadın Tişört",    price: 800,  image: `${CDN}/ronan-furuta-tt9hFR4aEKY-unsplash_lcdnvc.jpg`,          category: "kadin", type: "tisort"   },
  { id: 20, name: "Kadın Tişört",    price: 950,  image: `${CDN}/tuananh-blue-PvI3uWqDfTo-unsplash_gi8ei4.jpg`,          category: "kadin", type: "tisort"   },
  { id: 21, name: "Kadın Pantolon",  price: 800,  image: `${CDN}/tamara-bellis-zDyJOj8ZXG0-unsplash_iuvn83.jpg`,         category: "kadin", type: "pantalon" },
  { id: 22, name: "Kadın Pantolon",  price: 300,  image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_mh2ook.jpg`,          category: "kadin", type: "pantalon" },
  { id: 24, name: "Kadın Pantolon",  price: 1500, image: `${CDN}/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg`,          category: "kadin", type: "pantalon" },
  { id: 49, name: "Kadın Pantolon",  price: 950,  image: `${CDN}/tuananh-blue-2QSK4kFoVZE-unsplash_ivazfe.jpg`,          category: "kadin", type: "pantalon" },
  { id: 25, name: "Kadın Şapka",     price: 1500, image: `${CDN}/omar-sabra-V5yIyQ2m-bo-unsplash_cmq5g7.jpg`,            category: "kadin", type: "sapka"    },
  { id: 26, name: "Kadın Şapka",     price: 1500, image: `${CDN}/nathan-dumlao-Y8hAxuKgP8g-unsplash_rr4mzr.jpg`,         category: "kadin", type: "sapka"    },
  { id: 27, name: "Kadın Şapka",     price: 1500, image: `${CDN}/kajetan-sumila-U8CyGLw2-ek-unsplash_xewyl5.jpg`,        category: "kadin", type: "sapka"    },
  { id: 28, name: "Kadın Şapka",     price: 1500, image: `${CDN}/elena-golubeva-rISh07SbuV4-unsplash_a4clvj.jpg`,        category: "kadin", type: "sapka"    },
  { id: 29, name: "Kadın Ceket",     price: 1500, image: `${CDN}/anna-evans-eELIrBJXBPk-unsplash_rtml0f.jpg`,            category: "kadin", type: "ceket"    },
  { id: 30, name: "Kadın Ceket",     price: 1500, image: `${CDN}/donald-teel--J7OdbfiZ1o-unsplash_sr2e7y.jpg`,           category: "kadin", type: "ceket"    },
  { id: 31, name: "Kadın Ceket",     price: 1500, image: `${CDN}/lea-ochel-nsRBbE6-YLs-unsplash_eklemz.jpg`,             category: "kadin", type: "ceket"    },
  { id: 32, name: "Kadın Ceket",     price: 1500, image: `${CDN}/noelle-rebekah-PNCXp2Uh6WM-unsplash_mqx4v8.jpg`,        category: "kadin", type: "ceket"    },
  { id: 33, name: "Çocuk Tişört",    price: 1200, image: `${CDN}/fabio-alves-eAUE_FmclYE-unsplash_nt2rlg.jpg`,           category: "cocuk", type: "tisort"   },
  { id: 34, name: "Çocuk Tişört",    price: 300,  image: `${CDN}/md-salman-tWOz2_EK5EQ-unsplash_tzznsh.jpg`,             category: "cocuk", type: "tisort"   },
  { id: 35, name: "Çocuk Tişört",    price: 800,  image: `${CDN}/ryan-hoffman-u6n1HrW0sdQ-unsplash_xfyvkg.jpg`,          category: "cocuk", type: "tisort"   },
  { id: 36, name: "Çocuk Tişört",    price: 950,  image: `${CDN}/tuananh-blue-20wx7IY7Ggk-unsplash_dulwe5.jpg`,          category: "cocuk", type: "tisort"   },
  { id: 37, name: "Çocuk Pantolon",  price: 800,  image: `${CDN}/christopher-luther-gwOLhTqWcaA-unsplash_kgfzef.jpg`,    category: "cocuk", type: "pantalon" },
  { id: 38, name: "Çocuk Pantolon",  price: 300,  image: `${CDN}/pexels-amina-filkins-5560028_ib5oqv.jpg`,               category: "cocuk", type: "pantalon" },
  { id: 39, name: "Çocuk Pantolon",  price: 150,  image: `${CDN}/pexels-dmitriy-steinke-559643503-30683064_gmi9fs.jpg`,  category: "cocuk", type: "pantalon" },
  { id: 40, name: "Çocuk Pantolon",  price: 1500, image: `${CDN}/pexels-dmitriy-steinke-559643503-30683099_eeqlgb.jpg`,  category: "cocuk", type: "pantalon" },
  { id: 41, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/ahmed-syed-6NVrH0HB_DE-unsplash_eow23i.jpg`,            category: "cocuk", type: "sapka"    },
  { id: 42, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/angel-monsanto-iii-0wzyDMY8gCo-unsplash_gi7yc2.jpg`,    category: "cocuk", type: "sapka"    },
  { id: 43, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/markus-spiske--rlShVn1_U8-unsplash_ybzneb.jpg`,         category: "cocuk", type: "sapka"    },
  { id: 44, name: "Çocuk Şapka",     price: 1500, image: `${CDN}/yang-deng-2loKxdi6Hmo-unsplash_sqvn1x.jpg`,             category: "cocuk", type: "sapka"    },
  { id: 45, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/2-bro-s-media-LV_ZrBEGupE-unsplash_ovmfbe.jpg`,         category: "cocuk", type: "ceket"    },
  { id: 46, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/christopher-campbell--h_cufTEtcg-unsplash_cehfnl.jpg`,  category: "cocuk", type: "ceket"    },
  { id: 47, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/nathan-dumlao-QqLuSb0sypY-unsplash_gs4zul.jpg`,         category: "cocuk", type: "ceket"    },
  { id: 48, name: "Çocuk Ceket",     price: 1500, image: `${CDN}/phat-tr-ng-UbJ2Q_HInuU-unsplash_sbwzvv.jpg`,            category: "cocuk", type: "ceket"    },
];

const VELORA_DEFAULT_COUPONS = [
  { code: "VELORA10",  discount: 10, status: "active", uses: 0 },
  { code: "VELORA20",  discount: 20, status: "active", uses: 0 },
  { code: "HOSGELDIN", discount: 15, status: "active", uses: 0 },
];

// ----------------------------------------------------------
//  vGetProducts()
//  Admin panelinde eklenen/düzenlenen tüm ürünleri döner.
//
//  script.js'deki sabit diziyi şununla değiştirin:
//    let products = vGetProducts();
// ----------------------------------------------------------
function vGetProducts() {
  try {
    const raw = localStorage.getItem('velora_products');
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) {
    console.warn('velora-data: ürünler okunamadı', e);
  }
  // localStorage boşsa varsayılanları hem döndür hem kaydet
  localStorage.setItem('velora_products', JSON.stringify(VELORA_DEFAULT_PRODUCTS));
  return VELORA_DEFAULT_PRODUCTS.slice();
}

// ----------------------------------------------------------
//  vValidateCoupon(code)
//  Admin panelinden eklenen kuponları doğrular.
//
//  Dönüş: { valid: Boolean, discount: Number, message: String }
//
//  cart.html veya sepet sayfasında:
//    const r = vValidateCoupon(inputEl.value);
//    if (r.valid) {
//      const indirimliTutar = toplam * (1 - r.discount / 100);
//    } else { alert(r.message); }
// ----------------------------------------------------------
function vValidateCoupon(code) {
  if (!code || !code.trim()) {
    return { valid: false, discount: 0, message: 'Lütfen kupon kodu girin.' };
  }

  const normalised = code.trim().toUpperCase();

  try {
    const raw     = localStorage.getItem('velora_coupons');
    const coupons = raw ? JSON.parse(raw) : VELORA_DEFAULT_COUPONS.slice();

    if (!Array.isArray(coupons) || coupons.length === 0) {
      return { valid: false, discount: 0, message: 'Geçersiz kupon kodu.' };
    }

    const coupon = coupons.find(c => c.code === normalised);
    if (!coupon)                    return { valid: false, discount: 0, message: 'Geçersiz kupon kodu.' };
    if (coupon.status !== 'active') return { valid: false, discount: 0, message: 'Bu kupon artık aktif değil.' };

    // Kullanım sayısını artır ve geri kaydet
    coupon.uses = (coupon.uses || 0) + 1;
    localStorage.setItem('velora_coupons', JSON.stringify(coupons));

    return { valid: true, discount: coupon.discount, message: `%${coupon.discount} indirim uygulandı! 🎉` };
  } catch (e) {
    console.warn('velora-data: kupon doğrulanamadı', e);
    return { valid: false, discount: 0, message: 'Bir hata oluştu, tekrar deneyin.' };
  }
}

// ----------------------------------------------------------
//  Yardımcı okuyucular
// ----------------------------------------------------------
function vGetSettings()   { try { return JSON.parse(localStorage.getItem('velora_settings')   || '{}'); } catch(e) { return {}; } }
function vGetContact()    { try { return JSON.parse(localStorage.getItem('velora_contact')    || '{}'); } catch(e) { return {}; } }
function vGetAppearance() { try { return JSON.parse(localStorage.getItem('velora_appearance') || '{}'); } catch(e) { return {}; } }
