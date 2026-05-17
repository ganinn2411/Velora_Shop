// ============================================================
//  VELORA — velora-data.js
// ============================================================
(function () {

  var CDN = "https://res.cloudinary.com/dy2dvpbit/image/upload";

  var VELORA_DEFAULT_PRODUCTS = [
    { id:1,  name:"Erkek Tişört",   price:1200, image:CDN+"/haryo-setyadi-acn5ERAeSb4-unsplash_svhjqz.jpg",               category:"erkek", type:"tisort"   },
    { id:2,  name:"Erkek Tişört",   price:300,  image:CDN+"/pexels-david-fowora-2160297192-36801391_hfunqe.jpg",           category:"erkek", type:"tisort"   },
    { id:3,  name:"Erkek Tişört",   price:800,  image:CDN+"/sven-ciupka-x8Vg7Up6TUc-unsplash_fyrbqs.jpg",                 category:"erkek", type:"tisort"   },
    { id:4,  name:"Erkek Tişört",   price:950,  image:CDN+"/faith-yarn-Wr0TpKqf26s-unsplash_j2qqmb.jpg",                  category:"erkek", type:"tisort"   },
    { id:5,  name:"Erkek Pantolon", price:800,  image:CDN+"/tuananh-blue-fB9Ex6Q5L_g-unsplash_ogcpzj.jpg",                category:"erkek", type:"pantalon" },
    { id:6,  name:"Erkek Pantolon", price:300,  image:CDN+"/tuananh-blue-j_3IlDX-6uQ-unsplash_i2sbm4.jpg",                category:"erkek", type:"pantalon" },
    { id:7,  name:"Erkek Pantolon", price:150,  image:CDN+"/tuananh-blue-rJQCoHb8XxA-unsplash_tgtnxn.jpg",                category:"erkek", type:"pantalon" },
    { id:8,  name:"Erkek Pantolon", price:1500, image:CDN+"/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg",                category:"erkek", type:"pantalon" },
    { id:9,  name:"Erkek Şapka",    price:1500, image:CDN+"/fatmanur-simsek-yILrYgG322s-unsplash_r4bhpq.jpg",             category:"erkek", type:"sapka"    },
    { id:10, name:"Erkek Şapka",    price:1500, image:CDN+"/mateus-jud-s-gRaxKXUio-unsplash_om2buz.jpg",                  category:"erkek", type:"sapka"    },
    { id:11, name:"Erkek Şapka",    price:1500, image:CDN+"/mathias-reding-dWFaMnAX49Q-unsplash_zulbnu.jpg",              category:"erkek", type:"sapka"    },
    { id:12, name:"Erkek Şapka",    price:1500, image:CDN+"/soroush-alavi-PVvoEQH6cOI-unsplash_zu7zmz.jpg",               category:"erkek", type:"sapka"    },
    { id:13, name:"Erkek Ceket",    price:1500, image:CDN+"/adrian-ordonez-P0W27GRvyww-unsplash_jsodmg.jpg",              category:"erkek", type:"ceket"    },
    { id:14, name:"Erkek Ceket",    price:1500, image:CDN+"/caio-coelho-QRN47la37gw-unsplash_fh7biy.jpg",                 category:"erkek", type:"ceket"    },
    { id:15, name:"Erkek Ceket",    price:1500, image:CDN+"/colton-sturgeon-oB7lLU9dwLc-unsplash_meuzv2.jpg",             category:"erkek", type:"ceket"    },
    { id:16, name:"Erkek Ceket",    price:1500, image:CDN+"/mike-montgomery-JNizejfX4B8-unsplash_d0pql3.jpg",             category:"erkek", type:"ceket"    },
    { id:17, name:"Kadın Tişört",   price:1200, image:CDN+"/charlesdeluvio-kPKFdPQTz9Y-unsplash_ulpc0v.jpg",              category:"kadin", type:"tisort"   },
    { id:18, name:"Kadın Tişört",   price:300,  image:CDN+"/feey-3fM186uPnZQ-unsplash_yrpqo0.jpg",                        category:"kadin", type:"tisort"   },
    { id:19, name:"Kadın Tişört",   price:800,  image:CDN+"/ronan-furuta-tt9hFR4aEKY-unsplash_lcdnvc.jpg",                category:"kadin", type:"tisort"   },
    { id:20, name:"Kadın Tişört",   price:950,  image:CDN+"/tuananh-blue-PvI3uWqDfTo-unsplash_gi8ei4.jpg",                category:"kadin", type:"tisort"   },
    { id:21, name:"Kadın Pantolon", price:800,  image:CDN+"/tamara-bellis-zDyJOj8ZXG0-unsplash_iuvn83.jpg",               category:"kadin", type:"pantalon" },
    { id:22, name:"Kadın Pantolon", price:300,  image:CDN+"/tuananh-blue-XdXk39Bj3B0-unsplash_mh2ook.jpg",                category:"kadin", type:"pantalon" },
    { id:24, name:"Kadın Pantolon", price:1500, image:CDN+"/tuananh-blue-XdXk39Bj3B0-unsplash_s1pu8m.jpg",                category:"kadin", type:"pantalon" },
    { id:49, name:"Kadın Pantolon", price:950,  image:CDN+"/tuananh-blue-2QSK4kFoVZE-unsplash_ivazfe.jpg",                category:"kadin", type:"pantalon" },
    { id:25, name:"Kadın Şapka",    price:1500, image:CDN+"/omar-sabra-V5yIyQ2m-bo-unsplash_cmq5g7.jpg",                  category:"kadin", type:"sapka"    },
    { id:26, name:"Kadın Şapka",    price:1500, image:CDN+"/nathan-dumlao-Y8hAxuKgP8g-unsplash_rr4mzr.jpg",               category:"kadin", type:"sapka"    },
    { id:27, name:"Kadın Şapka",    price:1500, image:CDN+"/kajetan-sumila-U8CyGLw2-ek-unsplash_xewyl5.jpg",              category:"kadin", type:"sapka"    },
    { id:28, name:"Kadın Şapka",    price:1500, image:CDN+"/elena-golubeva-rISh07SbuV4-unsplash_a4clvj.jpg",              category:"kadin", type:"sapka"    },
    { id:29, name:"Kadın Ceket",    price:1500, image:CDN+"/anna-evans-eELIrBJXBPk-unsplash_rtml0f.jpg",                  category:"kadin", type:"ceket"    },
    { id:30, name:"Kadın Ceket",    price:1500, image:CDN+"/donald-teel--J7OdbfiZ1o-unsplash_sr2e7y.jpg",                 category:"kadin", type:"ceket"    },
    { id:31, name:"Kadın Ceket",    price:1500, image:CDN+"/lea-ochel-nsRBbE6-YLs-unsplash_eklemz.jpg",                   category:"kadin", type:"ceket"    },
    { id:32, name:"Kadın Ceket",    price:1500, image:CDN+"/noelle-rebekah-PNCXp2Uh6WM-unsplash_mqx4v8.jpg",              category:"kadin", type:"ceket"    },
    { id:33, name:"Çocuk Tişört",   price:1200, image:CDN+"/fabio-alves-eAUE_FmclYE-unsplash_nt2rlg.jpg",                 category:"cocuk", type:"tisort"   },
    { id:34, name:"Çocuk Tişört",   price:300,  image:CDN+"/md-salman-tWOz2_EK5EQ-unsplash_tzznsh.jpg",                   category:"cocuk", type:"tisort"   },
    { id:35, name:"Çocuk Tişört",   price:800,  image:CDN+"/ryan-hoffman-u6n1HrW0sdQ-unsplash_xfyvkg.jpg",                category:"cocuk", type:"tisort"   },
    { id:36, name:"Çocuk Tişört",   price:950,  image:CDN+"/tuananh-blue-20wx7IY7Ggk-unsplash_dulwe5.jpg",                category:"cocuk", type:"tisort"   },
    { id:37, name:"Çocuk Pantolon", price:800,  image:CDN+"/christopher-luther-gwOLhTqWcaA-unsplash_kgfzef.jpg",          category:"cocuk", type:"pantalon" },
    { id:38, name:"Çocuk Pantolon", price:300,  image:CDN+"/pexels-amina-filkins-5560028_ib5oqv.jpg",                     category:"cocuk", type:"pantalon" },
    { id:39, name:"Çocuk Pantolon", price:150,  image:CDN+"/pexels-dmitriy-steinke-559643503-30683064_gmi9fs.jpg",        category:"cocuk", type:"pantalon" },
    { id:40, name:"Çocuk Pantolon", price:1500, image:CDN+"/pexels-dmitriy-steinke-559643503-30683099_eeqlgb.jpg",        category:"cocuk", type:"pantalon" },
    { id:41, name:"Çocuk Şapka",    price:1500, image:CDN+"/ahmed-syed-6NVrH0HB_DE-unsplash_eow23i.jpg",                  category:"cocuk", type:"sapka"    },
    { id:42, name:"Çocuk Şapka",    price:1500, image:CDN+"/angel-monsanto-iii-0wzyDMY8gCo-unsplash_gi7yc2.jpg",          category:"cocuk", type:"sapka"    },
    { id:43, name:"Çocuk Şapka",    price:1500, image:CDN+"/markus-spiske--rlShVn1_U8-unsplash_ybzneb.jpg",               category:"cocuk", type:"sapka"    },
    { id:44, name:"Çocuk Şapka",    price:1500, image:CDN+"/yang-deng-2loKxdi6Hmo-unsplash_sqvn1x.jpg",                   category:"cocuk", type:"sapka"    },
    { id:45, name:"Çocuk Ceket",    price:1500, image:CDN+"/2-bro-s-media-LV_ZrBEGupE-unsplash_ovmfbe.jpg",               category:"cocuk", type:"ceket"    },
    { id:46, name:"Çocuk Ceket",    price:1500, image:CDN+"/christopher-campbell--h_cufTEtcg-unsplash_cehfnl.jpg",        category:"cocuk", type:"ceket"    },
    { id:47, name:"Çocuk Ceket",    price:1500, image:CDN+"/nathan-dumlao-QqLuSb0sypY-unsplash_gs4zul.jpg",               category:"cocuk", type:"ceket"    },
    { id:48, name:"Çocuk Ceket",    price:1500, image:CDN+"/phat-tr-ng-UbJ2Q_HInuU-unsplash_sbwzvv.jpg",                  category:"cocuk", type:"ceket"    },
    { id:50, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_9_mqf5za.jpg",          category:"erkek", type:"tisort"   },
    { id:51, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.27_4_rawlcg.jpg",          category:"erkek", type:"tisort"   },
    { id:52, name:"Erkek Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.24_sp3epo.jpg",            category:"erkek", type:"pantalon" },
    { id:53, name:"Erkek Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.24_1_yc6cwo.jpg",          category:"erkek", type:"pantalon" },
    { id:54, name:"Erkek Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.25_hh47wc.jpg",            category:"erkek", type:"pantalon" },
    { id:55, name:"Erkek Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.25_1_xwrwcp.jpg",          category:"erkek", type:"pantalon" },
    { id:56, name:"Erkek Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.27_3_m5guz6.jpg",          category:"erkek", type:"pantalon" },
    { id:57, name:"Kadın Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_2_ldvaix.jpg",          category:"kadin", type:"tisort"   },
    { id:58, name:"Kadın Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_5_oq4aof.jpg",          category:"kadin", type:"tisort"   },
    { id:59, name:"Kadın Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_4_rufgco.jpg",          category:"kadin", type:"pantalon" },
    { id:60, name:"Kadın Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_3_ebs2mm.jpg",          category:"kadin", type:"tisort"   },
    { id:61, name:"Kadın Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_7_tulz7e.jpg",          category:"kadin", type:"ceket"    },
    { id:62, name:"Kadın Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_8_apnfjd.jpg",          category:"kadin", type:"ceket"    },
    { id:63, name:"Kadın Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_12.49.26_6_m5xtbh.jpg",          category:"kadin", type:"ceket"    },
    { id:64, name:"Erkek Tişört",   price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_5_otfdbd.jpg",          category:"erkek", type:"tisort"   },
    { id:65, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_4_njzedf.jpg",          category:"erkek", type:"tisort"   },
    { id:66, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_ht6gbg.jpg",            category:"erkek", type:"tisort"   },
    { id:67, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_1_vwhdwk.jpg",          category:"erkek", type:"tisort"   },
    { id:68, name:"Kadın Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_5_bqgwxm.jpg",          category:"kadin", type:"ceket"    },
    { id:69, name:"Kadın Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_4_nz0ryf.jpg",          category:"kadin", type:"ceket"    },
    { id:70, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_2_cpdvlf.jpg",          category:"erkek", type:"tisort"   },
    { id:71, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_3_oy9e4t.jpg",          category:"erkek", type:"tisort"   },
    { id:72, name:"Kadın Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_7_ybynva.jpg",          category:"kadin", type:"tisort"   },
    { id:73, name:"Kadın Pantolon", price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.46_6_nenaz9.jpg",          category:"kadin", type:"pantalon" },
    { id:74, name:"Erkek Ceket",    price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_rnoweq.jpg",            category:"erkek", type:"ceket"    },
    { id:75, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_1_sp0k6g.jpg",          category:"erkek", type:"tisort"   },
    { id:76, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_3_yv7jdx.jpg",          category:"erkek", type:"tisort"   },
    { id:77, name:"Erkek Tişört",   price:1200, image:CDN+"/WhatsApp_Image_2026-05-16_at_13.59.45_2_k9kdyj.jpg",          category:"erkek", type:"tisort"   },
    { id:78, name:"Çocuk Pantolon", price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.44_2_qcgbca.jpg",          category:"cocuk", type:"pantalon" },
    { id:79, name:"Çocuk Pantolon", price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.44_4_b4ffsp.jpg",          category:"cocuk", type:"pantalon" },
    { id:80, name:"Çocuk Pantolon", price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.44_5_ap0xia.jpg",          category:"cocuk", type:"pantalon" },
    { id:81, name:"Çocuk Pantolon", price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.44_3_zk99uj.jpg",          category:"cocuk", type:"pantalon" },
    { id:82, name:"Çocuk Tişört",   price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.45_eeq1dc.jpg",            category:"cocuk", type:"tisort"   },
    { id:83, name:"Çocuk Tişört",   price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.45_1_cnld7p.jpg",          category:"cocuk", type:"tisort"   },
    { id:84, name:"Çocuk Tişört",   price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.45_2_rayugx.jpg",          category:"cocuk", type:"tisort"   },
    { id:85, name:"Çocuk Ceket",    price:800,  image:CDN+"/WhatsApp_Image_2026-05-16_at_14.23.44_1_lvqfgm.jpg",          category:"cocuk", type:"ceket"    }
  ];

  var VELORA_DEFAULT_COUPONS = [
    { code:"VELORA10",  discount:10, status:"active", uses:0 },
    { code:"VELORA20",  discount:20, status:"active", uses:0 },
    { code:"HOSGELDIN", discount:15, status:"active", uses:0 },
    { code:"GG2",       discount:50, status:"active", uses:0 },
    { code:"AA",        discount:40, status:"active", uses:0 },
    { code:"MM",        discount:20, status:"active", uses:0 }
  ];

  (function seedDefaults() {
    try {
      if (!localStorage.getItem("velora_products")) {
        localStorage.setItem("velora_products", JSON.stringify(VELORA_DEFAULT_PRODUCTS));
      }
      if (!localStorage.getItem("velora_coupons")) {
        localStorage.setItem("velora_coupons", JSON.stringify(VELORA_DEFAULT_COUPONS));
      }
    } catch(e) {}
  })();

  window.vGetProducts = function () {
    try {
      var raw = localStorage.getItem("velora_products");
      if (raw) {
        var arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length > 0) return arr;
      }
    } catch(e) { console.warn("velora-data: ürünler okunamadı", e); }
    localStorage.setItem("velora_products", JSON.stringify(VELORA_DEFAULT_PRODUCTS));
    return VELORA_DEFAULT_PRODUCTS.slice();
  };

  window.vValidateCoupon = function (code) {
    if (!code || !code.trim()) return { valid:false, discount:0, message:"Lütfen kupon kodu girin." };
    var norm = code.trim().toUpperCase();
    try {
      var raw = localStorage.getItem("velora_coupons");
      var coupons = raw ? JSON.parse(raw) : VELORA_DEFAULT_COUPONS.slice();
      var coupon = null;
      for (var i = 0; i < coupons.length; i++) {
        if (coupons[i].code === norm) { coupon = coupons[i]; break; }
      }
      if (!coupon)                    return { valid:false, discount:0, message:"Geçersiz kupon kodu." };
      if (coupon.status !== "active") return { valid:false, discount:0, message:"Bu kupon artık aktif değil." };
      coupon.uses = (coupon.uses || 0) + 1;
      localStorage.setItem("velora_coupons", JSON.stringify(coupons));
      return { valid:true, discount:coupon.discount, message:"%" + coupon.discount + " indirim uygulandı! 🎉" };
    } catch(e) {
      return { valid:false, discount:0, message:"Bir hata oluştu, tekrar deneyin." };
    }
  };

  window.vGetSettings   = function () { try { return JSON.parse(localStorage.getItem("velora_settings")   || "{}"); } catch(e) { return {}; } };
  window.vGetContact    = function () { try { return JSON.parse(localStorage.getItem("velora_contact")    || "{}"); } catch(e) { return {}; } };
  window.vGetAppearance = function () { try { return JSON.parse(localStorage.getItem("velora_appearance") || "{}"); } catch(e) { return {}; } };
  window.vSyncProducts  = function () { window._vProductsCache = null; };

})();
