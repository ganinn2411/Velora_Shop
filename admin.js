// ========== VELORA ADMIN — admin.js (Firebase) ==========

const CDN = "https://res.cloudinary.com/dy2dvpbit/image/upload";

const firebaseConfig = {
  apiKey: "AIzaSyBJuctg0HZnYjbZdGBztu9SioqEjgMNSDs",
  authDomain: "velora-shop-34729.firebaseapp.com",
  projectId: "velora-shop-34729",
  storageBucket: "velora-shop-34729.firebasestorage.app",
  messagingSenderId: "73973178858",
  appId: "1:73973178858:web:e028f350361d528cc59293"
};

(function loadFirebase() {
  const s1 = document.createElement('script');
  s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  s1.onload = function() {
    const s2 = document.createElement('script');
    s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js';
    s2.onload = function() {
      if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
      window._db = firebase.firestore();
      window._fbReady = true;
      document.dispatchEvent(new Event('fbReady'));
    };
    document.head.appendChild(s2);
  };
  document.head.appendChild(s1);
})();

function db() { return window._db; }

let products      = [];
let coupons       = [];
let activityLog   = JSON.parse(localStorage.getItem('velora_log') || '[]');
let currentFilter = 'all';
let currentPage   = 1;
const perPage     = 15;
let editingId     = null;
let _cachedUsers  = [];

const ADMIN_PW_KEY      = 'velora_admin_pw';
const ADMIN_SESSION_KEY = 'velora_admin_session';
const DEFAULT_PW        = 'admin123';

function checkAdmin() {
  const storedPw = localStorage.getItem(ADMIN_PW_KEY) || DEFAULT_PW;
  const input    = document.getElementById('adminPwInput').value;
  if (input === storedPw) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
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
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
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

function openSidebar()  { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('open'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('open'); }

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
  if (page === 'products')     { currentPage = 1; loadProductsFromFirebase(); }
  if (page === 'coupons')      loadCouponsFromFirebase();
  if (page === 'users')        loadUsersFromFirebase();
  if (page === 'activity')     renderFullLog();
  if (page === 'siteSettings') loadSiteSettingsForm();
  if (page === 'whatsapp')     loadContactForm();
  if (page === 'appearance')   loadAppearanceForm();
  if (page === 'addProduct') {
    clearProductForm();
    editingId = null;
    document.getElementById('addProductTitle').textContent = 'Yeni Ürün Ekle';
  }
  closeSidebar();
}

function initDashboard() {
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('tr-TR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  loadProductsFromFirebase();
}

function loadProductsFromFirebase() {
  const tbody = document.getElementById('productTableBody');
  tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--muted)">Yükleniyor...</td></tr>`;

  function doLoad() {
    db().collection('products').orderBy('id').get()
      .then(snap => {
        products = [];
        snap.forEach(doc => products.push(doc.data()));
        renderProductTable();
      })
      .catch(e => { console.error(e); showToast('Ürünler yüklenemedi!', 'error'); });
  }

  if (window._fbReady) doLoad();
  else document.addEventListener('fbReady', doLoad, { once: true });
}

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
  const newProduct = { id: maxId + 1, name, price, image, category: cat, type };

  db().collection('products').doc(String(newProduct.id)).set(newProduct)
    .then(() => {
      addLog('add', `Yeni ürün eklendi: "${name}" (ID: ${newProduct.id})`);
      showToast(`"${name}" ürünü eklendi ✅`, 'success');
      clearProductForm();
      loadProductsFromFirebase();
    })
    .catch(() => showToast('Kayıt hatası!', 'error'));
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
    let maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    const batch = db().batch();
    let added = 0;
    arr.forEach(item => {
      if (!item.name || !item.category || !item.type) return;
      maxId++;
      const p = { id:maxId, name:item.name, price:item.price||0, image:item.image||'', category:item.category, type:item.type };
      batch.set(db().collection('products').doc(String(maxId)), p);
      added++;
    });
    batch.commit().then(() => {
      addLog('add', `${added} ürün toplu eklendi`);
      showToast(`${added} ürün eklendi ✅`, 'success');
      document.getElementById('bulkJson').value = '';
      loadProductsFromFirebase();
    }).catch(() => showToast('Toplu ekleme hatası!', 'error'));
  } catch(e) { showToast('JSON formatı hatalı!', 'error'); }
}

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
  const id    = parseInt(document.getElementById('edit-id').value);
  const name  = document.getElementById('edit-name').value.trim();
  const price = parseInt(document.getElementById('edit-price').value);
  const cat   = document.getElementById('edit-category').value;
  const type  = document.getElementById('edit-type').value;
  const image = document.getElementById('edit-image').value.trim();
  if (!name || !price || !cat || !type) { showToast('Tüm alanları doldurun!', 'error'); return; }

  db().collection('products').doc(String(id)).update({ name, price, category:cat, type, image })
    .then(() => {
      addLog('edit', `Ürün düzenlendi: "${name}" (ID: ${id})`);
      showToast('Ürün güncellendi ✅', 'success');
      closeEditModal();
      loadProductsFromFirebase();
    })
    .catch(() => showToast('Güncelleme hatası!', 'error'));
}

function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!confirm(`"${p?.name}" ürününü silmek istediğinize emin misiniz?`)) return;
  db().collection('products').doc(String(id)).delete()
    .then(() => {
      addLog('del', `Ürün silindi: "${p?.name}" (ID: ${id})`);
      showToast('Ürün silindi', 'error');
      loadProductsFromFirebase();
    })
    .catch(() => showToast('Silme hatası!', 'error'));
}

function closeEditModal() { document.getElementById('editModal').classList.remove('open'); }

function loadCouponsFromFirebase() {
  function doLoad() {
    db().collection('coupons').get()
      .then(snap => {
        coupons = [];
        snap.forEach(doc => coupons.push(doc.data()));
        renderCoupons();
      })
      .catch(() => showToast('Kuponlar yüklenemedi!', 'error'));
  }
  if (window._fbReady) doLoad();
  else document.addEventListener('fbReady', doLoad, { once: true });
}

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
          <button class="btn btn-secondary btn-sm" onclick="toggleCoupon('${c.code}')">${c.status==='active'?'⏸':'▶️'}</button>
          <button class="btn btn-secondary btn-sm" onclick="copyCoupon('${c.code}')">📋</button>
          <button class="btn btn-danger btn-sm" onclick="deleteCoupon('${c.code}')">🗑</button>
        </div>
      </td>
    </tr>`).join('');
}

function openCouponModal() {
  document.getElementById('coup-code').value='';
  document.getElementById('coup-discount').value='';
  document.getElementById('coup-status').selectedIndex=0;
  document.getElementById('couponModal').classList.add('open');
}
function closeCouponModal() { document.getElementById('couponModal').classList.remove('open'); }

function addCoupon() {
  const code   = document.getElementById('coup-code').value.trim().toUpperCase();
  const disc   = parseInt(document.getElementById('coup-discount').value);
  const status = document.getElementById('coup-status').value;
  if (!code || !disc || disc<1 || disc>100) { showToast('Geçerli kod ve indirim girin!', 'error'); return; }
  if (coupons.find(c => c.code===code)) { showToast('Bu kod zaten mevcut!', 'error'); return; }

  const newCoupon = { code, discount: disc, status, uses: 0 };
  db().collection('coupons').doc(code).set(newCoupon)
    .then(() => {
      addLog('add', `Yeni kupon: ${code} (%${disc})`);
      showToast(`"${code}" kuponu eklendi ✅`, 'success');
      closeCouponModal();
      loadCouponsFromFirebase();
    })
    .catch(() => showToast('Kupon eklenemedi!', 'error'));
}

function toggleCoupon(code) {
  const c = coupons.find(x => x.code === code);
  if (!c) return;
  const newStatus = c.status === 'active' ? 'inactive' : 'active';
  db().collection('coupons').doc(code).update({ status: newStatus })
    .then(() => {
      addLog('edit', `Kupon durumu değiştirildi: ${code}`);
      loadCouponsFromFirebase();
    });
}

function deleteCoupon(code) {
  if (!confirm(`"${code}" kuponunu silmek istediğinize emin misiniz?`)) return;
  db().collection('coupons').doc(code).delete()
    .then(() => {
      addLog('del', `Kupon silindi: ${code}`);
      showToast('Kupon silindi', 'error');
      loadCouponsFromFirebase();
    });
}

function copyCoupon(code) { navigator.clipboard.writeText(code).then(() => showToast(`"${code}" kopyalandı 📋`, 'success')); }

let _usersUnsubscribe = null;

function loadUsersFromFirebase() {
  const tbody = document.getElementById('userTableBody');
  tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:var(--muted)">Yükleniyor...</td></tr>`;

  function doLoad() {
    if (_usersUnsubscribe) { _usersUnsubscribe(); _usersUnsubscribe = null; }

    db().collection('users').get()
      .then(snap => {
        const users = [];
        snap.forEach(doc => {
          const d = doc.data();
          users.push({
            _docId: doc.id,
            name:   d.name || d.displayName || d.email || doc.id,
            email:  d.email || doc.id,
            ...d
          });
        });
        localStorage.setItem('velora_users', JSON.stringify(users));
        _cachedUsers = users;
        renderUsersTable(users);
      })
      .catch(e => {
        console.error('Firestore users hatası:', e);
        showToast('Kullanıcılar yüklenemedi!', 'error');
        renderUsersTable([]);
      });
  }

  if (window._fbReady) doLoad();
  else document.addEventListener('fbReady', doLoad, { once: true });
}

function renderUsersTable(users) {
  const searchEl = document.getElementById('userSearch');
  const search   = (searchEl?.value || '').toLowerCase().trim();

  const filtered = users.filter(u => {
    if (!search) return true;
    return (u.name  || '').toLowerCase().includes(search) ||
           (u.email || '').toLowerCase().includes(search);
  });

  document.getElementById('userCount').textContent = users.length;

  const tbody = document.getElementById('userTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">
      <div class="empty-state">
        <div class="empty-icon">👤</div>
        ${users.length === 0 ? 'Henüz kayıtlı kullanıcı yok' : 'Arama sonucu bulunamadı'}
      </div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td style="font-weight:500">${u.name || '—'}</td>
      <td style="color:var(--muted);font-family:'DM Mono',monospace;font-size:12px">${u.email || '—'}</td>
      <td><span class="badge" style="background:rgba(100,100,100,0.2);color:var(--muted)">Kayıtlı</span></td>
      <td><button class="btn btn-danger btn-sm del-user-btn" data-docid="${u._docId}" data-email="${u.email}">🗑</button></td>
    </tr>`).join('');

  tbody.querySelectorAll('.del-user-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      deleteUserByDocId(this.dataset.docid, this.dataset.email);
    });
  });
}

function renderUsers() {
  if (_cachedUsers.length > 0) {
    renderUsersTable(_cachedUsers);
  } else {
    loadUsersFromFirebase();
  }
}

function deleteUserByDocId(docId, email) {
  if (!docId) return;
  if (!confirm(`"${email}" kullanıcısını silmek istediğinize emin misiniz?`)) return;

  const colRef = db().collection('users');

  const delDocId    = colRef.doc(docId).delete().catch(() => {});
  const delEmail    = colRef.doc(email).delete().catch(() => {});
  const delEmailLow = colRef.doc(email.toLowerCase()).delete().catch(() => {});
  const delWhere = colRef.where('email', '==', email).get().then(snap => {
    if (snap.empty) return;
    const batch = db().batch();
    snap.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }).catch(() => {});

  Promise.all([delDocId, delEmail, delEmailLow, delWhere])
    .then(() => {
      _cachedUsers = _cachedUsers.filter(u => !(u._docId === docId || (u.email || '').toLowerCase() === email.toLowerCase()));
      localStorage.setItem('velora_users', JSON.stringify(_cachedUsers));

      // ── Kullanıcı sitede açıksa çıkış yaptır ──────────────────────
      localStorage.setItem('velora_force_logout', email.toLowerCase());
      setTimeout(() => localStorage.removeItem('velora_force_logout'), 5000);

      addLog('del', `Kullanıcı silindi: ${email}`);
      showToast('Kullanıcı silindi ✅', 'success');
      renderUsersTable(_cachedUsers);
    })
    .catch(e => {
      console.error('Silme hatası:', e);
      showToast('Silme hatası!', 'error');
    });
}

function deleteUserByEmail(email) {
  const u = _cachedUsers.find(x => (x.email || '').toLowerCase() === email.toLowerCase());
  deleteUserByDocId(u ? u._docId : email, email);
}

function clearAllUsers() {
  if (!confirm('TÜM kullanıcıları silmek istediğinize emin misiniz?')) return;
  db().collection('users').get().then(snap => {
    const batch = db().batch();
    snap.forEach(doc => batch.delete(doc.ref));
    return batch.commit();
  }).then(() => {
    localStorage.removeItem('velora_users');
    _cachedUsers = [];
    addLog('del', 'Tüm kullanıcılar silindi');
    showToast('Tüm kullanıcılar silindi ✅', 'success');
    renderUsersTable([]);
  }).catch(e => {
    console.error('Toplu silme hatası:', e);
    showToast('Silme hatası! Firebase kurallarını kontrol edin.', 'error');
  });
}

function loadSiteSettingsForm() {
  const saved = JSON.parse(localStorage.getItem('velora_settings') || 'null');
  if (!saved) return;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined && val !== null) el.value = val; };
  const setChk = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.checked = val; };
  setVal('set-storeName', saved.storeName);
  setVal('set-slogan',    saved.slogan);
  setVal('set-currency',  saved.currency);
  setVal('set-title',     saved.title);
  setVal('set-metaDesc',  saved.metaDesc);
  setVal('set-keywords',  saved.keywords);
  if (saved.features) {
    setChk('feat-search',      saved.features.search);
    setChk('feat-favorites',   saved.features.favorites);
    setChk('feat-darkmode',    saved.features.darkmode);
    setChk('feat-coupon',      saved.features.coupon);
    setChk('feat-auth',        saved.features.auth);
    setChk('feat-maintenance', saved.features.maintenance);
  }
}

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
  db().collection('settings').doc('main').set(settings)
    .then(() => {
      addLog('settings', 'Site ayarları güncellendi');
      showToast('Ayarlar kaydedildi ✅', 'success');
    })
    .catch(() => showToast('Kayıt hatası!', 'error'));
}

function loadContactForm() {
  const contact = JSON.parse(localStorage.getItem('velora_contact') || 'null');
  if (!contact) return;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined && val !== null) el.value = val; };
  const setChk = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.checked = val; };
  setVal('wa-number', contact.waNumber);
  setVal('wa-greeting', contact.waGreeting);
  setChk('wa-active', contact.waActive);
  setVal('contact-email', contact.email);
  setVal('contact-phone', contact.phone);
  setVal('contact-address', contact.address);
  setVal('contact-instagram', contact.instagram);
  if (contact.emailjs) {
    setVal('ejs-service', contact.emailjs.service);
    setVal('ejs-template', contact.emailjs.template);
    setVal('ejs-pubkey', contact.emailjs.pubkey);
  }
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
    emailjs: {
      service:  document.getElementById('ejs-service').value,
      template: document.getElementById('ejs-template').value,
      pubkey:   document.getElementById('ejs-pubkey').value
    }
  };
  localStorage.setItem('velora_contact', JSON.stringify(contact));
  db().collection('settings').doc('contact').set(contact)
    .then(() => {
      addLog('settings', 'İletişim / WhatsApp ayarları güncellendi');
      showToast('İletişim ayarları kaydedildi ✅', 'success');
    })
    .catch(() => showToast('Kayıt hatası!', 'error'));
}

function loadAppearanceForm() {
  const app = JSON.parse(localStorage.getItem('velora_appearance') || 'null');
  if (!app) return;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined && val !== null) el.value = val; };
  const setChk = (id, val) => { const el = document.getElementById(id); if (el && val !== undefined) el.checked = val; };
  setVal('app-banner', app.banner);
  setVal('app-logo', app.logo);
  setVal('app-favicon', app.favicon);
  setVal('app-headfont', app.headfont);
  setVal('app-bodyfont', app.bodyfont);
  setVal('app-announcetext', app.announcetext);
  setVal('app-announcecolor', app.announcecolor);
  setChk('app-announcebar', app.announcebar);
  if (app.colors) {
    setVal('color-primary', app.colors.primary);
    setVal('color-bg', app.colors.bg);
    setVal('color-text', app.colors.text);
  }
}

function saveAppearance() {
  const app = {
    banner:        document.getElementById('app-banner').value,
    logo:          document.getElementById('app-logo').value,
    favicon:       document.getElementById('app-favicon').value,
    colors: {
      primary: document.getElementById('color-primary').value,
      bg:      document.getElementById('color-bg').value,
      text:    document.getElementById('color-text').value
    },
    headfont:      document.getElementById('app-headfont').value,
    bodyfont:      document.getElementById('app-bodyfont').value,
    announcebar:   document.getElementById('app-announcebar').checked,
    announcetext:  document.getElementById('app-announcetext').value,
    announcecolor: document.getElementById('app-announcecolor').value,
  };
  localStorage.setItem('velora_appearance', JSON.stringify(app));
  db().collection('settings').doc('appearance').set(app)
    .then(() => {
      addLog('settings', 'Görünüm ayarları güncellendi');
      showToast('Görünüm ayarları kaydedildi ✅', 'success');
    })
    .catch(() => showToast('Kayıt hatası!', 'error'));
}

function exportProducts() {
  const header = 'ID,Ad,Fiyat,Kategori,Tip,Görsel\n';
  const rows   = products.map(p => `${p.id},"${p.name}",${p.price},${p.category},${p.type},"${p.image}"`).join('\n');
  const blob   = new Blob(['\uFEFF'+header+rows], { type:'text/csv;charset=utf-8;' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href=url; a.download='velora_urunler.csv'; a.click();
  URL.revokeObjectURL(url);
  addLog('settings', 'Ürün listesi CSV indirildi');
}

function addLog(type, msg) {
  activityLog.unshift({ type, msg, time: new Date().toLocaleString('tr-TR') });
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

function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent=msg; t.className='toast show '+type;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.className='toast'; }, 3000);
}

window.addEventListener('load', function() {
  if (sessionStorage.getItem(ADMIN_SESSION_KEY) === '1') {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display  = 'flex';
    initDashboard();
  }

  document.getElementById('couponModal')?.addEventListener('click', function(e) { if(e.target===this) closeCouponModal(); });
  document.getElementById('editModal')?.addEventListener('click', function(e) { if(e.target===this) closeEditModal(); });
  document.getElementById('edit-image')?.addEventListener('input', function() {
    const prev=document.getElementById('editPreviewImg');
    prev.src=this.value; prev.style.display=this.value?'block':'none';
  });
  document.getElementById('adminPwInput')?.addEventListener('keydown', function(e) { if(e.key==='Enter') checkAdmin(); });
  document.getElementById('topbarDate').textContent = new Date().toLocaleDateString('tr-TR', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
});
