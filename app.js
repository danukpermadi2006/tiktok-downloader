(() => {
  'use strict';

  /* =========================================================
     Konfigurasi — ubah di sini jika perlu
     ========================================================= */
  const CONFIG = {
    apiUrl: 'https://www.tikwm.com/api/',
    apiOrigin: 'https://www.tikwm.com',
    requestTimeout: 25000,
    rateLimitRetryDelay: 1300,
    rateLimitMaxRetry: 2,
    historyKey: 'official_dl_history',
    historyLimit: 20,
    langKey: 'danuk_lang',
    defaultLang: 'id' // 'id' atau 'en'
  };

  /* =========================================================
     Teks antarmuka (Indonesia / English)
     ========================================================= */
  const I18N = {
    id: {
      'meta.title': 'Danuk Downloader — Unduh Video TikTok Tanpa Watermark',
      'meta.desc': 'Unduh video TikTok tanpa watermark dalam kualitas HD, ambil audio MP3, dan simpan foto slide. Gratis, tanpa daftar, langsung dari browser.',
      'skip': 'Lompat ke konten utama',
      'lang.label': 'Bahasa',
      'tool.label': 'Unduh media TikTok',
      'tabs.label': 'Menu alat',
      'hero.title': 'Unduh video TikTok tanpa watermark',
      'hero.lead': 'Tempel tautan video atau foto TikTok, pilih format, lalu simpan. Gratis dan tanpa perlu daftar.',
      'tab.download': 'Unduh',
      'tab.history': 'Riwayat',
      'field.label': 'Tautan TikTok',
      'field.placeholder': 'Tempel tautan di sini',
      'field.paste': 'Tempel',
      'field.clear': 'Hapus tautan',
      'field.hint': 'Mendukung tautan TikTok dari aplikasi maupun browser.',
      'btn.submit': 'Ambil media',
      'btn.loading': 'Memproses…',
      'btn.download': 'Unduh',
      'btn.preview': 'Pratinjau',
      'btn.view': 'Lihat',
      'btn.save': 'Simpan',
      'btn.saveAll': 'Simpan semua',
      'btn.close': 'Tutup',
      'btn.downloadFile': 'Unduh file',
      'fmt.label': 'Format yang didukung',
      'fmt.hd.title': 'Video tanpa watermark',
      'fmt.hd.desc': 'Kualitas tertinggi yang tersedia dari TikTok.',
      'fmt.sd.title': 'Video hemat kuota',
      'fmt.sd.desc': 'Ukuran file lebih kecil, cocok untuk koneksi lambat.',
      'fmt.audio.title': 'Audio',
      'fmt.audio.desc': 'Suara asli atau musik dari video.',
      'fmt.img.title': 'Foto, cover, dan foto profil',
      'fmt.img.desc': 'Simpan tiap foto atau semua slide sekaligus.',
      'how.title': 'Cara pakai',
      'how.1.title': 'Salin tautan',
      'how.1.desc': 'Di aplikasi TikTok, ketuk Bagikan lalu pilih Salin tautan.',
      'how.2.title': 'Tempel di sini',
      'how.2.desc': 'Tempel tautan pada kolom di atas, lalu ketuk Ambil media.',
      'how.3.title': 'Pilih dan unduh',
      'how.3.desc': 'Pilih video HD atau SD, audio MP3, atau foto, lalu ketuk Unduh.',
      'faq.title': 'Pertanyaan umum',
      'faq.1.q': 'Apakah layanan ini gratis?',
      'faq.1.a': 'Ya. Danuk Downloader gratis dan tidak memerlukan akun atau pendaftaran.',
      'faq.2.q': 'Kenapa video saya tidak ditemukan?',
      'faq.2.a': 'Biasanya karena akunnya privat, videonya sudah dihapus, atau tautannya salah. Salin ulang tautan dari tombol Bagikan di TikTok, lalu coba lagi.',
      'faq.3.q': 'Ke mana file yang diunduh tersimpan?',
      'faq.3.a': 'File masuk ke folder Unduhan di perangkat Anda. Jika video terbuka di tab baru, ketuk menu ⋮ lalu pilih Unduh. Di iPhone, ketuk tombol Bagikan lalu pilih Simpan ke File.',
      'faq.4.q': 'Apakah tautan dan riwayat saya disimpan?',
      'faq.4.a': 'Riwayat hanya tersimpan di browser Anda dan bisa dihapus kapan saja lewat tab Riwayat. Situs ini tidak menyimpan tautan atau video di server sendiri. Untuk memproses tautan, Danuk Downloader mengirimkannya ke layanan pihak ketiga (tikwm.com).',
      'faq.5.q': 'Bolehkah video orang lain dipakai ulang?',
      'faq.5.a': 'Video tetap milik pembuatnya. Gunakan untuk keperluan pribadi, dan minta izin atau cantumkan kredit sebelum mengunggah ulang.',
      'footer.legal': 'Danuk Downloader tidak berafiliasi dengan, didukung, atau disponsori oleh TikTok maupun ByteDance. TikTok adalah merek dagang milik pemiliknya masing-masing.',
      'footer.social': 'Media sosial',
      'history.note': 'Riwayat hanya disimpan di browser ini dan bisa dihapus kapan saja.',
      'history.clear': 'Hapus semua',
      'history.confirm': 'Ketuk lagi untuk hapus',
      'history.empty': 'Belum ada riwayat. Tautan yang sudah diproses akan muncul di sini.',
      'history.start': 'Mulai unduh',
      'history.remove': 'Hapus dari riwayat',
      'history.cleared': 'Riwayat dihapus.',
      'res.tabs': 'Format unduhan',
      'res.video': 'Video',
      'res.photos': 'Foto',
      'res.audio': 'Audio',
      'res.extra': 'Lainnya',
      'res.hd': 'Kualitas HD',
      'res.hdNote': 'Tanpa watermark',
      'res.sd': 'Kualitas standar',
      'res.sdNote': 'Hemat kuota',
      'res.noVideo': 'File video tidak tersedia untuk tautan ini.',
      'res.photoCount': '{n} foto',
      'res.photoN': 'Foto {n}',
      'res.audioDefault': 'Suara asli',
      'res.audioNone': 'Audio tidak tersedia untuk tautan ini.',
      'res.extraNone': 'Tidak ada gambar tambahan untuk tautan ini.',
      'res.cover': 'Cover video',
      'res.avatar': 'Foto profil',
      'res.noCaption': 'Tanpa deskripsi.',
      'res.views': 'penayangan',
      'res.likes': 'suka',
      'preview.video': 'Pratinjau video',
      'preview.audio': 'Pratinjau audio',
      'preview.image': 'Pratinjau gambar',
      'preview.loading': 'Memuat pratinjau…',
      'preview.errorVideo': 'Pratinjau video gagal dimuat. Coba unduh file-nya langsung.',
      'preview.errorAudio': 'Pratinjau audio gagal dimuat. Coba unduh file-nya langsung.',
      'preview.errorImage': 'Pratinjau gambar gagal dimuat. Coba unduh file-nya langsung.',
      'err.empty': 'Tempel tautan TikTok terlebih dahulu.',
      'err.invalid': 'Tautan ini bukan dari TikTok. Di aplikasi TikTok, ketuk Bagikan lalu Salin tautan, kemudian tempel di sini.',
      'err.notfound': 'Video tidak ditemukan. Pastikan akunnya tidak privat dan videonya belum dihapus.',
      'err.ratelimit': 'Terlalu banyak permintaan. Tunggu beberapa detik, lalu coba lagi.',
      'err.network': 'Tidak bisa terhubung ke server. Periksa koneksi internet, lalu coba lagi.',
      'err.timeout': 'Server terlalu lama merespons. Coba lagi beberapa saat lagi.',
      'err.server': 'Server sedang bermasalah. Coba lagi beberapa saat lagi.',
      'err.format': 'Respons server tidak dikenali. Coba lagi beberapa saat lagi.',
      'err.paste': 'Tidak bisa membaca clipboard. Tekan lama pada kolom, lalu pilih Tempel.',
      'ok.found': 'Media dari @{user} ditemukan.',
      'dl.preparing': 'Menyiapkan file…',
      'dl.progress': 'Mengunduh… {pct}%',
      'dl.started': 'Unduhan dimulai. File akan masuk ke folder Unduhan.',
      'dl.fallback': 'Browser memblokir unduhan langsung. Buka file di tab baru, lalu ketuk menu ⋮ dan pilih Unduh.',
      'dl.openFile': 'Buka file',
      'dl.batch': 'Mengunduh foto {i} dari {n}…',
      'dl.batchDone': '{n} foto diunduh.',
      'dl.batchPartial': '{ok} dari {n} foto berhasil diunduh. Simpan sisanya satu per satu.'
    },
    en: {
      'meta.title': 'Danuk Downloader — Download TikTok Videos Without Watermark',
      'meta.desc': 'Download TikTok videos without watermark in HD, extract MP3 audio, and save photo slides. Free, no sign-up, right in your browser.',
      'skip': 'Skip to main content',
      'lang.label': 'Language',
      'tool.label': 'Download TikTok media',
      'tabs.label': 'Tool menu',
      'hero.title': 'Download TikTok videos without watermark',
      'hero.lead': 'Paste a TikTok video or photo link, pick a format, and save it. Free, with no sign-up.',
      'tab.download': 'Download',
      'tab.history': 'History',
      'field.label': 'TikTok link',
      'field.placeholder': 'Paste the link here',
      'field.paste': 'Paste',
      'field.clear': 'Clear link',
      'field.hint': 'Works with TikTok links from the app or the browser.',
      'btn.submit': 'Get media',
      'btn.loading': 'Processing…',
      'btn.download': 'Download',
      'btn.preview': 'Preview',
      'btn.view': 'View',
      'btn.save': 'Save',
      'btn.saveAll': 'Save all',
      'btn.close': 'Close',
      'btn.downloadFile': 'Download file',
      'fmt.label': 'Supported formats',
      'fmt.hd.title': 'Video without watermark',
      'fmt.hd.desc': 'The highest quality TikTok provides.',
      'fmt.sd.title': 'Data-saving video',
      'fmt.sd.desc': 'Smaller files, ideal for slow connections.',
      'fmt.audio.title': 'Audio',
      'fmt.audio.desc': 'The original sound or music from the video.',
      'fmt.img.title': 'Photos, cover, and profile picture',
      'fmt.img.desc': 'Save each photo, or every slide at once.',
      'how.title': 'How it works',
      'how.1.title': 'Copy the link',
      'how.1.desc': 'In the TikTok app, tap Share, then Copy link.',
      'how.2.title': 'Paste it here',
      'how.2.desc': 'Paste the link in the field above, then tap Get media.',
      'how.3.title': 'Pick and download',
      'how.3.desc': 'Choose HD or SD video, MP3 audio, or photos, then tap Download.',
      'faq.title': 'Frequently asked questions',
      'faq.1.q': 'Is it free?',
      'faq.1.a': 'Yes. Danuk Downloader is free and needs no account or sign-up.',
      'faq.2.q': "Why can't my video be found?",
      'faq.2.a': "Usually the account is private, the video was removed, or the link is wrong. Copy the link again from TikTok's Share button and retry.",
      'faq.3.q': 'Where do downloaded files go?',
      'faq.3.a': "Files go to your device's Downloads folder. If a video opens in a new tab, tap the ⋮ menu and choose Download. On iPhone, tap the Share button and choose Save to Files.",
      'faq.4.q': 'Are my links and history stored?',
      'faq.4.a': 'History stays in this browser and can be deleted anytime from the History tab. This site does not store links or videos on its own server. To process a link, Danuk Downloader sends it to a third-party service (tikwm.com).',
      'faq.5.q': "Can I reuse other people's videos?",
      'faq.5.a': 'Videos belong to their creators. Use them for personal purposes, and ask permission or give credit before re-posting.',
      'footer.legal': 'Danuk Downloader is not affiliated with, endorsed by, or sponsored by TikTok or ByteDance. TikTok is a trademark of its respective owner.',
      'footer.social': 'Social media',
      'history.note': 'History is stored only in this browser and can be deleted anytime.',
      'history.clear': 'Clear all',
      'history.confirm': 'Tap again to clear',
      'history.empty': 'No history yet. Links you have processed will show up here.',
      'history.start': 'Start downloading',
      'history.remove': 'Remove from history',
      'history.cleared': 'History cleared.',
      'res.tabs': 'Download formats',
      'res.video': 'Video',
      'res.photos': 'Photos',
      'res.audio': 'Audio',
      'res.extra': 'More',
      'res.hd': 'HD quality',
      'res.hdNote': 'No watermark',
      'res.sd': 'Standard quality',
      'res.sdNote': 'Saves data',
      'res.noVideo': 'No video file is available for this link.',
      'res.photoCount': '{n} photos',
      'res.photoN': 'Photo {n}',
      'res.audioDefault': 'Original sound',
      'res.audioNone': 'No audio is available for this link.',
      'res.extraNone': 'No extra images are available for this link.',
      'res.cover': 'Video cover',
      'res.avatar': 'Profile picture',
      'res.noCaption': 'No description.',
      'res.views': 'views',
      'res.likes': 'likes',
      'preview.video': 'Video preview',
      'preview.audio': 'Audio preview',
      'preview.image': 'Image preview',
      'preview.loading': 'Loading preview…',
      'preview.errorVideo': 'The video preview failed to load. Try downloading the file directly.',
      'preview.errorAudio': 'The audio preview failed to load. Try downloading the file directly.',
      'preview.errorImage': 'The image preview failed to load. Try downloading the file directly.',
      'err.empty': 'Paste a TikTok link first.',
      'err.invalid': 'This link is not from TikTok. In the TikTok app, tap Share, then Copy link, and paste it here.',
      'err.notfound': 'Video not found. Make sure the account is not private and the video has not been deleted.',
      'err.ratelimit': 'Too many requests. Wait a few seconds, then try again.',
      'err.network': 'Could not reach the server. Check your internet connection, then try again.',
      'err.timeout': 'The server took too long to respond. Try again in a moment.',
      'err.server': 'The server is having problems. Try again in a moment.',
      'err.format': 'The server response was not recognised. Try again in a moment.',
      'err.paste': 'Could not read the clipboard. Long-press the field, then choose Paste.',
      'ok.found': 'Found media from @{user}.',
      'dl.preparing': 'Preparing file…',
      'dl.progress': 'Downloading… {pct}%',
      'dl.started': 'Download started. The file will land in your Downloads folder.',
      'dl.fallback': 'Your browser blocked the direct download. Open the file in a new tab, then tap the ⋮ menu and choose Download.',
      'dl.openFile': 'Open file',
      'dl.batch': 'Downloading photo {i} of {n}…',
      'dl.batchDone': '{n} photos downloaded.',
      'dl.batchPartial': '{ok} of {n} photos downloaded. Save the rest one by one.'
    }
  };

  /* =========================================================
     Helper umum
     ========================================================= */
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const store = {
    get(key) { try { return window.localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch (_) { return false; } },
    remove(key) { try { window.localStorage.removeItem(key); } catch (_) { /* diabaikan */ } }
  };

  class AppError extends Error {
    constructor(code) { super(code); this.code = code; }
  }

  /* Membuat elemen DOM tanpa innerHTML (aman dari XSS) */
  const h = (tag, props, ...children) => {
    const el = document.createElement(tag);
    Object.entries(props || {}).forEach(([key, value]) => {
      if (value === undefined || value === null || value === false) return;
      if (key === 'class') el.className = value;
      else if (key === 'text') el.textContent = value;
      else if (key.startsWith('on') && typeof value === 'function') el.addEventListener(key.slice(2), value);
      else el.setAttribute(key, value === true ? '' : value);
    });
    children.flat().forEach((child) => {
      if (child === undefined || child === null || child === false) return;
      el.append(child.nodeType ? child : document.createTextNode(String(child)));
    });
    return el;
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const icon = (name, small) => {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', small ? 'icon icon-sm' : 'icon');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.appendChild(use);
    return svg;
  };

  /* =========================================================
     Bahasa
     ========================================================= */
  let lang = CONFIG.defaultLang;

  const t = (key, vars) => {
    let text = (I18N[lang] || {})[key];
    if (text === undefined) text = I18N.id[key];
    if (text === undefined) return key;
    return vars ? text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] !== undefined ? vars[name] : '')) : text;
  };
  const locale = () => (lang === 'en' ? 'en-US' : 'id-ID');

  const fmtCompact = (n) => {
    try { return new Intl.NumberFormat(locale(), { notation: 'compact', maximumFractionDigits: 1 }).format(n); }
    catch (_) { return String(n); }
  };
  const fmtSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / 1048576;
    try {
      if (mb >= 1) return new Intl.NumberFormat(locale(), { maximumFractionDigits: mb >= 10 ? 0 : 1 }).format(mb) + ' MB';
      return new Intl.NumberFormat(locale(), { maximumFractionDigits: 0 }).format(bytes / 1024) + ' KB';
    } catch (_) { return Math.round(mb * 10) / 10 + ' MB'; }
  };
  const fmtDuration = (total) => {
    const s = Math.max(0, Math.round(total));
    const pad = (n) => String(n).padStart(2, '0');
    const hh = Math.floor(s / 3600);
    const mm = Math.floor((s % 3600) / 60);
    return hh ? `${hh}:${pad(mm)}:${pad(s % 60)}` : `${mm}:${pad(s % 60)}`;
  };
  const timeAgo = (ts) => {
    if (!ts) return '';
    const diff = Math.round((ts - Date.now()) / 1000);
    const abs = Math.abs(diff);
    const units = [['year', 31536000], ['month', 2592000], ['day', 86400], ['hour', 3600], ['minute', 60]];
    try {
      const rtf = new Intl.RelativeTimeFormat(locale(), { numeric: 'auto' });
      for (const [unit, secs] of units) {
        if (abs >= secs) return rtf.format(Math.round(diff / secs), unit);
      }
      return rtf.format(0, 'second');
    } catch (_) { return ''; }
  };

  /* =========================================================
     Tautan: ekstrak, validasi, amankan
     ========================================================= */
  const toSafeUrl = (value) => {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, CONFIG.apiOrigin);
      if (url.protocol === 'http:') url.protocol = 'https:';
      return url.protocol === 'https:' ? url.href : '';
    } catch (_) { return ''; }
  };

  /* Mengambil tautan pertama dari teks bagikan TikTok yang biasanya ikut membawa kalimat lain */
  const extractUrl = (raw) => {
    const text = String(raw || '').trim();
    if (!text) return '';
    let candidate = '';
    const full = text.match(/https?:\/\/[^\s<>"'`]+/i);
    if (full) {
      candidate = full[0];
    } else {
      const bare = text.match(/(?:^|[\s(])((?:[a-z0-9-]+\.)?tiktok(?:v)?\.com\/[^\s<>"'`]+)/i);
      if (bare) candidate = 'https://' + bare[1];
    }
    return candidate.replace(/[)\].,;!?]+$/, '');
  };

  const isTikTokUrl = (value) => {
    try {
      const { hostname, protocol } = new URL(value);
      if (protocol !== 'https:' && protocol !== 'http:') return false;
      return /(^|\.)(tiktok|tiktokv)\.com$/i.test(hostname);
    } catch (_) { return false; }
  };

  const fileSafe = (text) => String(text || '').replace(/[^\w.-]+/g, '_').slice(0, 40) || 'tiktok';

  /* =========================================================
     Elemen halaman & status
     ========================================================= */
  const els = {
    mainTabs: $('#main-tabs'),
    form: $('#form'),
    field: $('#field'),
    input: $('#url'),
    paste: $('#btn-paste'),
    clear: $('#btn-clear'),
    submit: $('#submit'),
    submitIcon: $('#submit-icon'),
    submitSpinner: $('#submit-spinner'),
    submitLabel: $('#submit-label'),
    alert: $('#url-alert'),
    status: $('#sr-status'),
    skeleton: $('#skeleton'),
    result: $('#result'),
    historyList: $('#history-list'),
    historyEmpty: $('#history-empty'),
    historyClear: $('#history-clear'),
    historyStart: $('#history-start'),
    historyCount: $('#history-count'),
    toast: $('#toast'),
    toastMsg: $('#toast-msg'),
    toastUse: $('#toast-use'),
    toastAction: $('#toast-action'),
    toastClose: $('#toast-close'),
    modal: $('#modal'),
    dialog: $('#modal .modal-dialog'),
    modalTitle: $('#modal-title'),
    stage: $('#modal-stage'),
    modalDownload: $('#modal-download'),
    modalClose: $('#modal-close')
  };

  const state = { loading: false, media: null, resultTab: null, confirmClear: false, confirmTimer: 0 };
  let history = [];
  let alertKey = null;
  let announceTimer = 0;
  let toastTimer = 0;

  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t('meta.title');
    const description = $('meta[name="description"]');
    if (description) description.setAttribute('content', t('meta.desc'));
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]').forEach((el) => el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder)));
    $$('[data-i18n-aria-label]').forEach((el) => el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel)));
    $$('[data-lang]').forEach((btn) => btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang)));
    updateSubmitLabel();
    resetClearConfirm();
  }

  function setLang(next) {
    if (next !== 'id' && next !== 'en') return;
    lang = next;
    store.set(CONFIG.langKey, next);
    applyI18n();
    renderResult();
    renderHistory();
    if (alertKey) showAlert(alertKey);
  }

  /* Pembaca layar: pengumuman singkat */
  function announce(message) {
    clearTimeout(announceTimer);
    els.status.textContent = '';
    announceTimer = setTimeout(() => { els.status.textContent = message; }, 60);
  }

  /* Pesan di bawah formulir */
  function showAlert(key, type = 'error') {
    alertKey = key;
    els.alert.className = 'alert alert-' + type;
    els.alert.replaceChildren(icon(type === 'error' ? 'alert-circle' : 'info'), h('span', { text: t(key) }));
    els.alert.hidden = false;
    els.field.dataset.invalid = type === 'error' ? 'true' : 'false';
    if (type === 'error') els.input.setAttribute('aria-invalid', 'true');
    announce(t(key));
  }

  function clearAlert() {
    alertKey = null;
    els.alert.hidden = true;
    els.alert.replaceChildren();
    els.field.dataset.invalid = 'false';
    els.input.removeAttribute('aria-invalid');
  }

  /* Toast untuk kabar unduhan */
  function toast(type, message, { persist = false, action = null } = {}) {
    clearTimeout(toastTimer);
    const name = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
    els.toastUse.setAttribute('href', '#i-' + name);
    els.toast.dataset.type = type;
    els.toastMsg.textContent = message;
    if (action) {
      els.toastAction.textContent = action.label;
      els.toastAction.href = action.href;
      els.toastAction.hidden = false;
    } else {
      els.toastAction.hidden = true;
    }
    els.toast.classList.add('show');
    if (!persist) toastTimer = setTimeout(hideToast, type === 'error' ? 8000 : 4500);
  }
  function hideToast() { els.toast.classList.remove('show'); }

  /* =========================================================
     Tab (bisa dipakai keyboard: panah, Home, End)
     ========================================================= */
  function initTabList(tablist, onSelect) {
    const visibleTabs = () => $$('[role="tab"]', tablist).filter((tab) => !tab.hidden);

    const select = (tab, focus) => {
      $$('[role="tab"]', tablist).forEach((el) => {
        const on = el === tab;
        el.setAttribute('aria-selected', String(on));
        el.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(el.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      if (onSelect) onSelect(tab);
    };

    tablist.addEventListener('click', (event) => {
      const tab = event.target.closest('[role="tab"]');
      if (tab && tablist.contains(tab)) select(tab, false);
    });

    tablist.addEventListener('keydown', (event) => {
      const tabs = visibleTabs();
      const index = tabs.indexOf(document.activeElement);
      if (index < 0) return;
      let next = null;
      if (event.key === 'ArrowRight') next = tabs[(index + 1) % tabs.length];
      else if (event.key === 'ArrowLeft') next = tabs[(index - 1 + tabs.length) % tabs.length];
      else if (event.key === 'Home') next = tabs[0];
      else if (event.key === 'End') next = tabs[tabs.length - 1];
      if (next) { event.preventDefault(); select(next, true); }
    });

    return select;
  }

  /* =========================================================
     Mengambil data dari API
     ========================================================= */
  async function fetchMedia(url, attempt = 0) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CONFIG.requestTimeout);
    let payload;
    try {
      const response = await fetch(`${CONFIG.apiUrl}?url=${encodeURIComponent(url)}&hd=1`, { signal: controller.signal });
      if (!response.ok) throw new AppError('server');
      try { payload = await response.json(); } catch (_) { throw new AppError('format'); }
    } catch (error) {
      if (error instanceof AppError) throw error;
      if (error && error.name === 'AbortError') throw new AppError('timeout');
      throw new AppError('network');
    } finally {
      clearTimeout(timer);
    }

    if (payload && payload.data && payload.code !== -1) return payload.data;

    const message = String((payload && payload.msg) || '');
    if (/limit/i.test(message)) {
      if (attempt < CONFIG.rateLimitMaxRetry) {
        await sleep(CONFIG.rateLimitRetryDelay);
        return fetchMedia(url, attempt + 1);
      }
      throw new AppError('ratelimit');
    }
    throw new AppError('notfound');
  }

  function normalizeMedia(d, sourceUrl) {
    const author = d.author || {};
    const info = d.music_info || {};
    const user = String(author.unique_id || '').trim();
    return {
      url: sourceUrl,
      title: String(d.title || '').trim(),
      user,
      name: String(author.nickname || user || 'TikTok').trim(),
      fileUser: fileSafe(user),
      avatar: toSafeUrl(author.avatar),
      cover: toSafeUrl(d.cover || d.origin_cover),
      duration: Number(d.duration) || 0,
      plays: Number(d.play_count) || 0,
      likes: Number(d.digg_count) || 0,
      images: (Array.isArray(d.images) ? d.images : []).map(toSafeUrl).filter(Boolean),
      video: {
        hd: toSafeUrl(d.hdplay),
        sd: toSafeUrl(d.play),
        hdSize: Number(d.hd_size) || 0,
        sdSize: Number(d.size) || 0
      },
      music: {
        url: toSafeUrl(d.music),
        title: String(info.title || '').trim(),
        author: String(info.author || '').trim()
      }
    };
  }

  function updateSubmitLabel() {
    els.submitLabel.textContent = state.loading ? t('btn.loading') : t('btn.submit');
  }

  function setLoading(on) {
    state.loading = on;
    els.submit.disabled = on;
    els.submit.setAttribute('aria-busy', String(on));
    els.submitIcon.hidden = on;
    els.submitSpinner.hidden = !on;
    els.skeleton.hidden = !on;
    if (on) els.result.hidden = true;
    updateSubmitLabel();
  }

  async function runExtraction(rawInput) {
    if (state.loading) return;
    clearAlert();

    const url = extractUrl(rawInput);
    if (!url) { showAlert('err.empty'); els.input.focus(); return; }
    if (!isTikTokUrl(url)) { showAlert('err.invalid'); els.input.focus(); return; }

    els.input.value = url;
    syncField();
    setLoading(true);

    try {
      const data = await fetchMedia(url);
      state.media = normalizeMedia(data, url);
      state.resultTab = null;
      renderResult();
      saveHistory(state.media);
      renderHistory();
      announce(t('ok.found', { user: state.media.user || 'TikTok' }));
      revealResult();
    } catch (error) {
      state.media = null;
      renderResult();
      showAlert('err.' + ((error && error.code) || 'network'));
    } finally {
      setLoading(false);
    }
  }

  /* Di layar kecil, bawa hasil ke pandangan bila masih di bawah lipatan */
  function revealResult() {
    requestAnimationFrame(() => {
      if (els.result.hidden) return;
      const top = els.result.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.6 || top < 0) {
        els.result.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' });
      }
    });
  }

  /* =========================================================
     Menampilkan hasil
     ========================================================= */
  function mkRow({ lead, title, meta, actions }) {
    return h('li', { class: 'row' },
      lead ? h('div', { class: 'row-lead' }, lead) : null,
      h('div', { class: 'row-info' },
        h('div', { class: 'row-title', text: title }),
        meta && meta.length ? h('div', { class: 'row-meta' }, meta.filter(Boolean).map((item) => h('span', { text: item }))) : null),
      h('div', { class: 'row-actions' }, actions));
  }

  const previewButton = ({ type, url, file, title, label }) => h('button', {
    type: 'button',
    class: 'btn btn-secondary btn-sm',
    'aria-label': `${t('btn.preview')}: ${label}`,
    onclick: () => openPreview({ type, url, filename: file, title })
  }, icon('play'), h('span', { text: t('btn.preview') }));

  const downloadButton = ({ url, file, label }) => h('button', {
    type: 'button',
    class: 'btn btn-primary btn-sm',
    'aria-label': `${t('btn.download')}: ${label}`,
    onclick: (event) => downloadFile(url, file, event.currentTarget)
  }, icon('download'), h('span', { text: t('btn.download') }));

  function buildHead(m) {
    const thumb = h('div', { class: 'thumb' });
    if (m.cover) {
      thumb.append(h('img', { src: m.cover, alt: '', decoding: 'async', referrerpolicy: 'no-referrer', onerror: (event) => event.currentTarget.remove() }));
    }
    if (m.images.length) thumb.append(h('span', { class: 'chip', text: t('res.photoCount', { n: m.images.length }) }));
    else if (m.duration) thumb.append(h('span', { class: 'chip', text: fmtDuration(m.duration) }));

    const avatar = h('span', { class: 'avatar' }, m.avatar
      ? h('img', { src: m.avatar, alt: '', referrerpolicy: 'no-referrer', onerror: (event) => event.currentTarget.replaceWith(icon('user')) })
      : icon('user'));

    const stat = (name, value, labelKey) => (value > 0
      ? h('li', null, icon(name, true), h('span', { text: fmtCompact(value) }), h('span', { class: 'sr-only', text: ' ' + t(labelKey) }))
      : null);
    const stats = [stat('eye', m.plays, 'res.views'), stat('heart', m.likes, 'res.likes')].filter(Boolean);

    return h('div', { class: 'media-head' },
      thumb,
      h('div', { class: 'media-info' },
        h('div', { class: 'author' },
          avatar,
          h('div', { class: 'author-text' },
            h('div', { class: 'author-name', text: m.name }),
            m.user ? h('div', { class: 'author-handle', text: '@' + m.user }) : null)),
        h('p', { class: 'caption', text: m.title || t('res.noCaption') }),
        stats.length ? h('ul', { class: 'stats' }, stats) : null));
  }

  function buildVideoPanel(m) {
    const v = m.video;
    const options = [];
    if (v.hd) options.push({ tag: 'HD', url: v.hd, size: v.hdSize, title: t('res.hd'), note: t('res.hdNote'), file: `Video_${m.fileUser}_HD.mp4` });
    if (v.sd && v.sd !== v.hd) options.push({ tag: 'SD', url: v.sd, size: v.sdSize, title: t('res.sd'), note: t('res.sdNote'), file: `Video_${m.fileUser}_SD.mp4` });
    if (!options.length) return h('p', { class: 'panel-empty', text: t('res.noVideo') });

    return h('ul', null, options.map((o) => mkRow({
      lead: h('span', { class: 'row-tile', text: o.tag }),
      title: o.title,
      meta: [o.note, 'MP4', fmtSize(o.size)],
      actions: [
        previewButton({ type: 'video', url: o.url, file: o.file, title: `${t('preview.video')} ${o.tag}`, label: o.title }),
        downloadButton({ url: o.url, file: o.file, label: o.title })
      ]
    })));
  }

  function buildPhotosPanel(m) {
    const total = m.images.length;
    const bar = h('div', { class: 'photo-bar' },
      h('span', { class: 'photo-count', text: t('res.photoCount', { n: total }) }),
      h('button', {
        type: 'button',
        class: 'btn btn-primary btn-sm',
        onclick: (event) => downloadAll(m, event.currentTarget)
      }, icon('download'), h('span', { text: t('btn.saveAll') })));

    const items = m.images.map((src, index) => {
      const n = index + 1;
      const file = `Slide_${m.fileUser}_${n}.jpg`;
      const name = t('res.photoN', { n });
      return h('div', { class: 'photo' },
        h('button', {
          type: 'button',
          class: 'photo-frame',
          'aria-label': `${t('btn.view')}: ${name}`,
          onclick: () => openPreview({ type: 'image', url: src, filename: file, title: name })
        },
        h('img', { src, alt: '', loading: 'lazy', decoding: 'async', referrerpolicy: 'no-referrer' }),
        h('span', { class: 'photo-index', text: `${n}/${total}` })),
        h('button', {
          type: 'button',
          class: 'btn btn-secondary btn-sm',
          'aria-label': `${t('btn.save')}: ${name}`,
          onclick: (event) => downloadFile(src, file, event.currentTarget)
        }, icon('download'), h('span', { text: t('btn.save') })));
    });

    return h('div', null, bar, h('div', { class: 'photos', tabindex: '0', role: 'group', 'aria-label': t('res.photos') }, items));
  }

  function buildAudioPanel(m) {
    if (!m.music.url) return h('p', { class: 'panel-empty', text: t('res.audioNone') });
    const title = m.music.title || t('res.audioDefault');
    const file = `Audio_${m.fileUser}.mp3`;
    return h('ul', null, mkRow({
      lead: h('span', { class: 'row-tile' }, icon('music')),
      title,
      meta: [m.music.author, 'MP3'],
      actions: [
        previewButton({ type: 'audio', url: m.music.url, file, title: `${t('preview.audio')}: ${title}`, label: title }),
        downloadButton({ url: m.music.url, file, label: title })
      ]
    }));
  }

  function buildExtraPanel(m) {
    const items = [];
    if (m.cover) items.push({ url: m.cover, file: `Cover_${m.fileUser}.jpg`, title: t('res.cover'), round: false });
    if (m.avatar) items.push({ url: m.avatar, file: `Avatar_${m.fileUser}.jpg`, title: t('res.avatar'), round: true });
    if (!items.length) return h('p', { class: 'panel-empty', text: t('res.extraNone') });

    return h('ul', null, items.map((it) => mkRow({
      lead: h('span', { class: 'row-tile' + (it.round ? ' round' : '') },
        h('img', { src: it.url, alt: '', loading: 'lazy', referrerpolicy: 'no-referrer', onerror: (event) => event.currentTarget.remove() })),
      title: it.title,
      meta: ['JPG'],
      actions: [
        previewButton({ type: 'image', url: it.url, file: it.file, title: it.title, label: it.title }),
        downloadButton({ url: it.url, file: it.file, label: it.title })
      ]
    })));
  }

  function renderResult() {
    const m = state.media;
    els.result.replaceChildren();
    els.result.hidden = !m;
    if (!m) return;

    const isPhoto = m.images.length > 0;
    const items = [
      isPhoto
        ? { id: 'photos', icon: 'image', label: t('res.photos'), build: buildPhotosPanel }
        : { id: 'video', icon: 'video', label: t('res.video'), build: buildVideoPanel },
      { id: 'audio', icon: 'music', label: t('res.audio'), build: buildAudioPanel },
      { id: 'extra', icon: 'ellipsis', label: t('res.extra'), build: buildExtraPanel }
    ];
    const active = items.some((it) => it.id === state.resultTab) ? state.resultTab : items[0].id;

    const tablist = h('div', { class: 'rtabs', role: 'tablist', 'aria-label': t('res.tabs') });
    const panels = items.map((it) => {
      tablist.append(h('button', {
        type: 'button', role: 'tab', class: 'rtab', id: 'rtab-' + it.id,
        'aria-controls': 'rpanel-' + it.id, 'aria-selected': 'false', tabindex: '-1'
      }, icon(it.icon), h('span', { text: it.label })));
      return h('div', {
        role: 'tabpanel', class: 'rpanel', id: 'rpanel-' + it.id,
        'aria-labelledby': 'rtab-' + it.id, hidden: true
      }, it.build(m));
    });

    els.result.append(buildHead(m), tablist, ...panels);
    const select = initTabList(tablist, (tab) => { state.resultTab = tab.id.replace('rtab-', ''); });
    select(document.getElementById('rtab-' + active), false);
  }

  /* =========================================================
     Unduh file
     ========================================================= */
  const EXT_BY_TYPE = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif',
    'audio/mpeg': 'mp3', 'video/mp4': 'mp4'
  };
  const withExt = (name, type) => {
    const ext = EXT_BY_TYPE[String(type || '').split(';')[0].trim().toLowerCase()];
    return ext ? name.replace(/\.[a-z0-9]+$/i, '.' + ext) : name;
  };

  async function fetchBlob(url, onProgress) {
    const response = await fetch(url, { referrerPolicy: 'no-referrer' });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const total = Number(response.headers.get('content-length')) || 0;
    if (!onProgress || !total || !response.body || !response.body.getReader) return response.blob();

    const reader = response.body.getReader();
    const chunks = [];
    let received = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      onProgress(Math.min(99, Math.round((received / total) * 100)));
    }
    return new Blob(chunks, { type: response.headers.get('content-type') || 'application/octet-stream' });
  }

  function saveBlob(blob, filename) {
    const href = URL.createObjectURL(blob);
    const link = h('a', { href, download: filename, hidden: true });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(href), 30000);
  }

  /* Cadangan: buka langsung bila browser menolak unduhan lewat skrip (mis. CORS) */
  function openDirect(url) {
    const win = window.open(url, '_blank');
    if (win) { try { win.opener = null; } catch (_) { /* diabaikan */ } }
    toast('info', t('dl.fallback'), { persist: true, action: { label: t('dl.openFile'), href: url } });
  }

  async function downloadFile(url, filename, button, options = {}) {
    if (button) {
      if (button.classList.contains('is-busy')) return false;
      button.classList.add('is-busy');
    }
    const silent = Boolean(options.silent);
    if (!silent) toast('info', t('dl.preparing'), { persist: true });
    try {
      const blob = await fetchBlob(url, silent ? null : (pct) => { els.toastMsg.textContent = t('dl.progress', { pct }); });
      saveBlob(blob, withExt(filename, blob.type));
      if (!silent) toast('success', t('dl.started'));
      return true;
    } catch (_) {
      if (!silent) openDirect(url);
      return false;
    } finally {
      if (button) button.classList.remove('is-busy');
    }
  }

  async function downloadAll(m, button) {
    if (button.classList.contains('is-busy')) return;
    button.classList.add('is-busy');
    const total = m.images.length;
    let ok = 0;
    try {
      for (let i = 0; i < total; i += 1) {
        toast('info', t('dl.batch', { i: i + 1, n: total }), { persist: true });
        const saved = await downloadFile(m.images[i], `Slide_${m.fileUser}_${i + 1}.jpg`, null, { silent: true });
        if (saved) ok += 1;
        await sleep(450);
      }
      if (ok === total) toast('success', t('dl.batchDone', { n: total }));
      else toast('error', t('dl.batchPartial', { ok, n: total }));
    } finally {
      button.classList.remove('is-busy');
    }
  }

  /* =========================================================
     Pratinjau (modal) — fokus terkunci, Esc menutup
     ========================================================= */
  const modal = { opener: null, url: '', filename: '' };

  function teardownStage() {
    const media = $('video, audio', els.stage);
    if (media) { media.pause(); media.removeAttribute('src'); media.load(); }
    els.stage.replaceChildren();
  }

  function buildStage(type, url, title) {
    teardownStage();
    const loading = h('div', { class: 'stage-loading' }, h('span', { class: 'spinner spinner-lg' }), h('span', { text: t('preview.loading') }));
    els.stage.append(loading);
    const fail = (key) => els.stage.replaceChildren(h('p', { class: 'stage-error' }, icon('alert-circle'), h('span', { text: t(key) })));

    if (type === 'video') {
      const video = h('video', { controls: true, playsinline: true, preload: 'auto', 'aria-label': title });
      video.hidden = true;
      video.addEventListener('loadeddata', () => {
        loading.remove();
        video.hidden = false;
        const attempt = video.play();
        if (attempt && attempt.catch) attempt.catch(() => { /* pemutaran otomatis ditolak, pengguna bisa menekan putar */ });
      });
      video.addEventListener('error', () => fail('preview.errorVideo'));
      video.src = url;
      els.stage.append(video);
    } else if (type === 'audio') {
      const audio = h('audio', { controls: true, preload: 'auto', 'aria-label': title });
      audio.addEventListener('loadeddata', () => {
        loading.remove();
        const attempt = audio.play();
        if (attempt && attempt.catch) attempt.catch(() => { /* diabaikan */ });
      });
      audio.addEventListener('error', () => fail('preview.errorAudio'));
      audio.src = url;
      els.stage.append(h('div', { class: 'audio-box' }, h('span', { class: 'audio-art' }, icon('music')), h('p', { class: 'audio-name', text: title }), audio));
    } else {
      const image = new Image();
      image.alt = title;
      image.referrerPolicy = 'no-referrer';
      image.addEventListener('load', () => { loading.remove(); els.stage.append(image); });
      image.addEventListener('error', () => fail('preview.errorImage'));
      image.src = url;
    }
  }

  function openPreview({ type, url, filename, title }) {
    modal.opener = document.activeElement;
    modal.url = url;
    modal.filename = filename;
    els.modalTitle.textContent = title;
    buildStage(type, url, title);
    els.modal.hidden = false;
    document.documentElement.classList.add('modal-open');
    els.modalClose.focus();
  }

  function closePreview() {
    if (els.modal.hidden) return;
    teardownStage();
    els.modal.hidden = true;
    document.documentElement.classList.remove('modal-open');
    if (modal.opener && document.contains(modal.opener)) modal.opener.focus();
    modal.opener = null;
  }

  function trapFocus(event) {
    const nodes = $$('button:not([disabled]), a[href], video[controls], audio[controls], [tabindex]:not([tabindex="-1"])', els.dialog)
      .filter((node) => !node.hidden && node.offsetParent !== null);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!els.dialog.contains(document.activeElement)) { event.preventDefault(); first.focus(); }
    else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  /* =========================================================
     Riwayat (disimpan di browser; kunci lama tetap dipakai)
     ========================================================= */
  function loadHistory() {
    try {
      const raw = JSON.parse(store.get(CONFIG.historyKey) || '[]');
      if (!Array.isArray(raw)) return [];
      return raw
        .filter((item) => item && typeof item.url === 'string' && isTikTokUrl(item.url))
        .slice(0, CONFIG.historyLimit)
        .map((item) => ({
          url: item.url,
          cover: toSafeUrl(item.cover),
          author: String(item.author || ''),
          type: item.type === 'image' ? 'image' : 'video',
          ts: Number(item.ts) || 0
        }));
    } catch (_) { return []; }
  }

  const persistHistory = () => { store.set(CONFIG.historyKey, JSON.stringify(history)); };

  function saveHistory(m) {
    history = history.filter((item) => item.url !== m.url);
    history.unshift({ url: m.url, cover: m.cover, author: m.user, type: m.images.length ? 'image' : 'video', ts: Date.now() });
    history = history.slice(0, CONFIG.historyLimit);
    persistHistory();
  }

  function removeHistory(url) {
    history = history.filter((item) => item.url !== url);
    persistHistory();
    renderHistory();
  }

  function resetClearConfirm() {
    clearTimeout(state.confirmTimer);
    state.confirmClear = false;
    els.historyClear.textContent = t('history.clear');
    els.historyClear.classList.remove('is-danger');
  }

  function renderHistory() {
    const has = history.length > 0;
    els.historyList.replaceChildren();
    els.historyList.hidden = !has;
    els.historyEmpty.hidden = has;
    els.historyClear.hidden = !has;
    els.historyCount.hidden = !has;
    els.historyCount.textContent = String(history.length);

    history.forEach((item) => {
      const kind = item.type === 'image' ? 'image' : 'video';
      const thumb = h('span', { class: 'history-thumb' }, item.cover
        ? h('img', { src: item.cover, alt: '', loading: 'lazy', referrerpolicy: 'no-referrer', onerror: (event) => event.currentTarget.replaceWith(icon(kind)) })
        : icon(kind));
      const handle = item.author ? '@' + item.author : 'TikTok';
      const when = timeAgo(item.ts);

      els.historyList.append(h('li', { class: 'history-item' },
        h('button', { type: 'button', class: 'history-main', onclick: () => reloadFromHistory(item) },
          thumb,
          h('span', { class: 'history-text' },
            h('span', { class: 'history-user' }, icon(kind, true), h('span', { text: handle })),
            h('span', { class: 'history-url', text: item.url }),
            when ? h('span', { class: 'history-time', text: when }) : null)),
        h('button', {
          type: 'button',
          class: 'history-del',
          'aria-label': `${t('history.remove')}: ${handle}`,
          onclick: () => removeHistory(item.url)
        }, icon('trash'))));
    });
  }

  function reloadFromHistory(item) {
    selectMainTab($('#tab-download'), false);
    els.input.value = item.url;
    syncField();
    runExtraction(item.url);
  }

  /* =========================================================
     Formulir & interaksi
     ========================================================= */
  function syncField() {
    const has = els.input.value.length > 0;
    els.paste.hidden = has;
    els.clear.hidden = !has;
  }

  const selectMainTab = initTabList(els.mainTabs);

  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    runExtraction(els.input.value);
  });

  els.input.addEventListener('input', () => {
    syncField();
    if (alertKey) clearAlert();
  });

  /* Teks bagikan TikTok sering membawa kalimat lain; ambil tautannya saja */
  els.input.addEventListener('paste', () => {
    setTimeout(() => {
      const url = extractUrl(els.input.value);
      if (url && url !== els.input.value) els.input.value = url;
      syncField();
    }, 0);
  });

  els.clear.addEventListener('click', () => {
    els.input.value = '';
    syncField();
    clearAlert();
    els.input.focus();
  });

  els.paste.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (!text || !text.trim()) throw new Error('kosong');
      els.input.value = extractUrl(text) || text.trim();
      syncField();
      clearAlert();
      els.submit.focus();
    } catch (_) {
      showAlert('err.paste');
      els.input.focus();
    }
  });

  els.historyClear.addEventListener('click', () => {
    if (!state.confirmClear) {
      state.confirmClear = true;
      els.historyClear.textContent = t('history.confirm');
      els.historyClear.classList.add('is-danger');
      state.confirmTimer = setTimeout(resetClearConfirm, 3500);
      return;
    }
    resetClearConfirm();
    history = [];
    persistHistory();
    renderHistory();
    toast('success', t('history.cleared'));
  });

  els.historyStart.addEventListener('click', () => {
    selectMainTab($('#tab-download'), true);
    els.input.focus();
  });

  els.toastClose.addEventListener('click', hideToast);

  els.modal.addEventListener('click', (event) => { if (event.target.hasAttribute('data-close')) closePreview(); });
  els.modalClose.addEventListener('click', closePreview);
  els.modalDownload.addEventListener('click', (event) => downloadFile(modal.url, modal.filename, event.currentTarget));
  document.addEventListener('keydown', (event) => {
    if (els.modal.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closePreview(); }
    else if (event.key === 'Tab') trapFocus(event);
  });

  $$('[data-lang]').forEach((btn) => btn.addEventListener('click', () => setLang(btn.dataset.lang)));

  /* =========================================================
     Mulai
     ========================================================= */
  (function init() {
    const fromQuery = new URLSearchParams(window.location.search).get('lang');
    const saved = store.get(CONFIG.langKey);
    const pick = [fromQuery, saved].find((value) => value === 'id' || value === 'en');
    lang = pick || CONFIG.defaultLang;

    history = loadHistory();
    applyI18n();
    syncField();
    renderHistory();
    const year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());
  })();
})();
