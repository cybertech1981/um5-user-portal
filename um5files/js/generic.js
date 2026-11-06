/*!
 * UM5 User Portal — multilingual (FA/EN/TR) self-service panel for MikroTik User Manager v5.
 * Copyright (C) 2026 Amir Makouei — Amir Echo Tech <https://amirechotech.ca/>
 * Licensed under AGPL-3.0-or-later WITH an Additional Term under section 7:
 * the author attribution shown in the UI footer and About page must be preserved.
 * See LICENSE and ADDITIONAL_TERMS.md.
 */
/* ==========================================================================
   MikroTik User Manager v5 — multilingual user portal (FA / EN / TR)
   generic.js : shared core (settings, i18n, formatting, API, theme)
   Same API endpoints as the stock portal (../api/*), no external libraries.
   ========================================================================== */

/* ---------- Settings you can change ---------- */
var UM_CONFIG = {
    brand: { fa: "پنل کاربری اینترنت", en: "Internet User Portal", tr: "İnternet Kullanıcı Paneli" },
    defaultLang: "fa",          // fa | en | tr  (used when the browser gives no hint)
    jalaliDates: true,          // show dates in Persian (Solar Hijri) calendar when language is fa
    persianDigits: true         // show ۰۱۲۳ digits when language is fa
};

/* ---------- Translations ---------- */
var I18N = {
    fa: {
        "lang.name": "فارسی",
        "login.title": "ورود به حساب کاربری",
        "login.subtitle": "برای مشاهدهٔ مصرف و بسته‌ها وارد شوید",
        "login.username": "نام کاربری",
        "login.password": "رمز عبور",
        "login.submit": "ورود",
        "login.show": "نمایش رمز",
        "login.required": "نام کاربری و رمز عبور را وارد کنید.",
        "login.footer": "قدرت‌گرفته از MikroTik User Manager",
        "nav.status": "داشبورد",
        "nav.sessions": "اتصال‌ها",
        "nav.payments": "پرداخت‌ها",
        "nav.profiles": "بسته‌ها",
        "nav.logout": "خروج",
        "theme.toggle": "تغییر حالت روشن/تیره",
        "status.hello": "سلام،",
        "status.activePlan": "بستهٔ فعال",
        "status.noActive": "در حال حاضر بستهٔ فعالی ندارید",
        "status.browse": "مشاهدهٔ بسته‌ها",
        "status.expiresIn": "زمان باقی‌مانده",
        "status.download": "دانلود کل",
        "status.upload": "آپلود کل",
        "status.uptime": "مدت اتصال کل",
        "status.sessions": "اتصال‌های فعال",
        "status.ofMax": "از",
        "status.unlimited": "نامحدود",
        "status.myPlans": "بسته‌های من",
        "status.expiredPlans": "بسته‌های منقضی‌شده",
        "status.noPlans": "بسته‌ای برای حساب شما ثبت نشده است.",
        "status.noExpired": "بستهٔ منقضی‌شده‌ای ندارید.",
        "col.name": "نام بسته",
        "col.state": "وضعیت",
        "col.expiresAfter": "انقضا پس از",
        "col.expiredAt": "تاریخ انقضا",
        "col.action": "عملیات",
        "col.start": "شروع",
        "col.end": "پایان",
        "col.uptime": "مدت",
        "col.download": "دانلود",
        "col.upload": "آپلود",
        "col.active": "وضعیت",
        "col.type": "روش",
        "col.profile": "بسته",
        "col.message": "پیام",
        "col.validity": "اعتبار",
        "col.startsAt": "شروع اعتبار",
        "col.price": "قیمت",
        "state.0": "در انتظار",
        "state.1": "فعال‌شده",
        "state.2": "در حال استفاده",
        "state.3": "تمام‌شده",
        "startsAt.0": "از اولین ورود",
        "startsAt.1": "بلافاصله",
        "pay.0": "شروع‌شده",
        "pay.1": "در انتظار",
        "pay.2": "موفق",
        "pay.3": "رد شده",
        "pay.4": "خطا",
        "pay.5": "پایان مهلت",
        "pay.6": "لغو شده",
        "pay.7": "تأیید کاربر",
        "btn.activate": "فعال‌سازی",
        "btn.continue": "ادامهٔ پرداخت",
        "btn.details": "جزئیات",
        "btn.buy": "خرید این بسته",
        "btn.pay": "پرداخت",
        "btn.back": "بازگشت",
        "sessions.title": "تاریخچهٔ اتصال‌ها",
        "sessions.empty": "هنوز اتصالی ثبت نشده است.",
        "sessions.online": "آنلاین",
        "sessions.offline": "پایان‌یافته",
        "payments.title": "تاریخچهٔ پرداخت‌ها",
        "payments.empty": "پرداختی ثبت نشده است.",
        "profiles.title": "بسته‌های قابل خرید",
        "profiles.empty": "در حال حاضر بسته‌ای برای فروش تعریف نشده است.",
        "profile.title": "جزئیات بسته",
        "buy.title": "انتخاب روش پرداخت",
        "buy.none": "هیچ روش پرداختی فعال نیست. برای خرید با پشتیبانی تماس بگیرید.",
        "buy.card": "کارت اعتباری",
        "buy.cardVia": "(از طریق Authorize.net)",
        "redirect.text": "در حال انتقال به درگاه پرداخت… لطفاً صبر کنید.",
        "err.unknown": "خطای نامشخص. لطفاً دوباره تلاش کنید.",
        "err.network": "ارتباط با سرور برقرار نشد.",
        "err.blocked": "آنتی‌ویروس یا فیلتر وب این درخواست را مسدود کرد. این آدرس را در آنتی‌ویروس استثنا کنید یا پنل را با HTTPS باز کنید.",
        "demo.badge": "نسخهٔ نمایشی",
        "about.nav": "درباره ما",
        "about.title": "درباره ما",
        "about.desc": "پنل چندزبانهٔ مدیریت و کاربری برای MikroTik User Manager v5، طراحی و توسعه توسط Amir Echo Tech",
        "about.dev": "برنامه‌نویس",
        "about.name": "امیر ماکوئی",
        "about.li": "لینکدین",
        "about.web": "وب‌سایت",
        "about.tg": "کانال تلگرام",
        "about.ver": "نسخه"
    },
    en: {
        "lang.name": "English",
        "login.title": "Sign in to your account",
        "login.subtitle": "Sign in to see your usage and plans",
        "login.username": "Username",
        "login.password": "Password",
        "login.submit": "Sign in",
        "login.show": "Show password",
        "login.required": "Please enter your username and password.",
        "login.footer": "Powered by MikroTik User Manager",
        "nav.status": "Dashboard",
        "nav.sessions": "Sessions",
        "nav.payments": "Payments",
        "nav.profiles": "Plans",
        "nav.logout": "Sign out",
        "theme.toggle": "Toggle light/dark mode",
        "status.hello": "Hello,",
        "status.activePlan": "Active plan",
        "status.noActive": "You have no active plan right now",
        "status.browse": "Browse plans",
        "status.expiresIn": "Time left",
        "status.download": "Total download",
        "status.upload": "Total upload",
        "status.uptime": "Total uptime",
        "status.sessions": "Active sessions",
        "status.ofMax": "of",
        "status.unlimited": "unlimited",
        "status.myPlans": "My plans",
        "status.expiredPlans": "Expired plans",
        "status.noPlans": "No plans are assigned to your account.",
        "status.noExpired": "You have no expired plans.",
        "col.name": "Plan",
        "col.state": "Status",
        "col.expiresAfter": "Expires after",
        "col.expiredAt": "Expired at",
        "col.action": "Action",
        "col.start": "Start",
        "col.end": "End",
        "col.uptime": "Duration",
        "col.download": "Download",
        "col.upload": "Upload",
        "col.active": "Status",
        "col.type": "Method",
        "col.profile": "Plan",
        "col.message": "Message",
        "col.validity": "Validity",
        "col.startsAt": "Starts",
        "col.price": "Price",
        "state.0": "Waiting",
        "state.1": "Running",
        "state.2": "In use",
        "state.3": "Used up",
        "startsAt.0": "At first login",
        "startsAt.1": "Immediately",
        "pay.0": "Started",
        "pay.1": "Pending",
        "pay.2": "Successful",
        "pay.3": "Declined",
        "pay.4": "Error",
        "pay.5": "Timed out",
        "pay.6": "Cancelled",
        "pay.7": "User approved",
        "btn.activate": "Activate",
        "btn.continue": "Continue payment",
        "btn.details": "Details",
        "btn.buy": "Buy this plan",
        "btn.pay": "Pay",
        "btn.back": "Back",
        "sessions.title": "Session history",
        "sessions.empty": "No sessions recorded yet.",
        "sessions.online": "Online",
        "sessions.offline": "Ended",
        "payments.title": "Payment history",
        "payments.empty": "No payments recorded.",
        "profiles.title": "Available plans",
        "profiles.empty": "No plans are for sale at the moment.",
        "profile.title": "Plan details",
        "buy.title": "Choose a payment method",
        "buy.none": "No payment method is enabled. Please contact support to buy.",
        "buy.card": "Credit card",
        "buy.cardVia": "(via Authorize.net)",
        "redirect.text": "Redirecting to the payment page… please wait.",
        "err.unknown": "Unknown error. Please try again.",
        "err.network": "Could not reach the server.",
        "err.blocked": "Your antivirus or web filter blocked this request. Add this address as an exception or open the portal over HTTPS.",
        "demo.badge": "Demo",
        "about.nav": "About",
        "about.title": "About",
        "about.desc": "Multilingual admin and user panels for MikroTik User Manager v5, designed and developed by Amir Echo Tech.",
        "about.dev": "Developer",
        "about.name": "Amir Makouei",
        "about.li": "LinkedIn",
        "about.web": "Website",
        "about.tg": "Telegram channel",
        "about.ver": "Version"
    },
    tr: {
        "lang.name": "Türkçe",
        "login.title": "Hesabınıza giriş yapın",
        "login.subtitle": "Kullanımınızı ve paketlerinizi görmek için giriş yapın",
        "login.username": "Kullanıcı adı",
        "login.password": "Şifre",
        "login.submit": "Giriş yap",
        "login.show": "Şifreyi göster",
        "login.required": "Lütfen kullanıcı adınızı ve şifrenizi girin.",
        "login.footer": "MikroTik User Manager altyapısıyla",
        "nav.status": "Panel",
        "nav.sessions": "Oturumlar",
        "nav.payments": "Ödemeler",
        "nav.profiles": "Paketler",
        "nav.logout": "Çıkış",
        "theme.toggle": "Açık/koyu mod",
        "status.hello": "Merhaba,",
        "status.activePlan": "Aktif paket",
        "status.noActive": "Şu anda aktif paketiniz yok",
        "status.browse": "Paketleri incele",
        "status.expiresIn": "Kalan süre",
        "status.download": "Toplam indirme",
        "status.upload": "Toplam yükleme",
        "status.uptime": "Toplam bağlantı süresi",
        "status.sessions": "Aktif oturumlar",
        "status.ofMax": "/",
        "status.unlimited": "sınırsız",
        "status.myPlans": "Paketlerim",
        "status.expiredPlans": "Süresi dolan paketler",
        "status.noPlans": "Hesabınıza tanımlı paket yok.",
        "status.noExpired": "Süresi dolmuş paketiniz yok.",
        "col.name": "Paket",
        "col.state": "Durum",
        "col.expiresAfter": "Bitiş süresi",
        "col.expiredAt": "Bitiş tarihi",
        "col.action": "İşlem",
        "col.start": "Başlangıç",
        "col.end": "Bitiş",
        "col.uptime": "Süre",
        "col.download": "İndirme",
        "col.upload": "Yükleme",
        "col.active": "Durum",
        "col.type": "Yöntem",
        "col.profile": "Paket",
        "col.message": "Mesaj",
        "col.validity": "Geçerlilik",
        "col.startsAt": "Başlangıç",
        "col.price": "Fiyat",
        "state.0": "Bekliyor",
        "state.1": "Çalışıyor",
        "state.2": "Kullanımda",
        "state.3": "Tükendi",
        "startsAt.0": "İlk girişte",
        "startsAt.1": "Hemen",
        "pay.0": "Başlatıldı",
        "pay.1": "Beklemede",
        "pay.2": "Başarılı",
        "pay.3": "Reddedildi",
        "pay.4": "Hata",
        "pay.5": "Zaman aşımı",
        "pay.6": "İptal edildi",
        "pay.7": "Kullanıcı onayladı",
        "btn.activate": "Etkinleştir",
        "btn.continue": "Ödemeye devam et",
        "btn.details": "Ayrıntılar",
        "btn.buy": "Bu paketi satın al",
        "btn.pay": "Öde",
        "btn.back": "Geri",
        "sessions.title": "Oturum geçmişi",
        "sessions.empty": "Henüz kayıtlı oturum yok.",
        "sessions.online": "Çevrimiçi",
        "sessions.offline": "Sona erdi",
        "payments.title": "Ödeme geçmişi",
        "payments.empty": "Kayıtlı ödeme yok.",
        "profiles.title": "Satın alınabilir paketler",
        "profiles.empty": "Şu anda satışta paket yok.",
        "profile.title": "Paket ayrıntıları",
        "buy.title": "Ödeme yöntemi seçin",
        "buy.none": "Etkin ödeme yöntemi yok. Satın almak için destekle iletişime geçin.",
        "buy.card": "Kredi kartı",
        "buy.cardVia": "(Authorize.net ile)",
        "redirect.text": "Ödeme sayfasına yönlendiriliyorsunuz… lütfen bekleyin.",
        "err.unknown": "Bilinmeyen hata. Lütfen tekrar deneyin.",
        "err.network": "Sunucuya ulaşılamadı.",
        "err.blocked": "Antivirüs veya web filtresi bu isteği engelledi. Bu adresi istisna olarak ekleyin veya paneli HTTPS ile açın.",
        "demo.badge": "Demo",
        "about.nav": "Hakkımızda",
        "about.title": "Hakkımızda",
        "about.desc": "MikroTik User Manager v5 için çok dilli yönetim ve kullanıcı panelleri; Amir Echo Tech tarafından tasarlanıp geliştirildi.",
        "about.dev": "Geliştirici",
        "about.name": "Amir Makouei",
        "about.li": "LinkedIn",
        "about.web": "Web sitesi",
        "about.tg": "Telegram kanalı",
        "about.ver": "Sürüm"
    }
};

var UM_LANGS = ["fa", "en", "tr"];
var UM_RTL = { fa: true };

/* ---------- Safe storage (works even when storage is blocked) ---------- */
function umStore(key, val) {
    try {
        if (val === undefined) return window.localStorage.getItem("um5." + key);
        window.localStorage.setItem("um5." + key, val);
    } catch (e) { return null; }
}

/* ---------- Language ---------- */
function detectLang() {
    var saved = umStore("lang");
    if (saved && I18N[saved]) return saved;
    var q = (window.location.search.match(/[?&]lang=(fa|en|tr)/) || [])[1];
    if (q) return q;
    var nav = (navigator.languages || [navigator.language || ""]);
    for (var i = 0; i < nav.length; i++) {
        var code = String(nav[i]).slice(0, 2).toLowerCase();
        if (I18N[code]) return code;
    }
    return UM_CONFIG.defaultLang;
}

var UM_LANG = detectLang();

function t(key) {
    var d = I18N[UM_LANG] || I18N.en;
    return d[key] !== undefined ? d[key] : (I18N.en[key] !== undefined ? I18N.en[key] : key);
}

function applyLang(lang) {
    if (lang && I18N[lang]) { UM_LANG = lang; umStore("lang", lang); }
    var html = document.documentElement;
    html.setAttribute("lang", UM_LANG);
    html.setAttribute("dir", UM_RTL[UM_LANG] ? "rtl" : "ltr");
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute("data-i18n"));
    nodes = document.querySelectorAll("[data-i18n-ph]");
    for (i = 0; i < nodes.length; i++) nodes[i].setAttribute("placeholder", t(nodes[i].getAttribute("data-i18n-ph")));
    nodes = document.querySelectorAll("[data-i18n-title]");
    for (i = 0; i < nodes.length; i++) {
        nodes[i].setAttribute("title", t(nodes[i].getAttribute("data-i18n-title")));
        nodes[i].setAttribute("aria-label", t(nodes[i].getAttribute("data-i18n-title")));
    }
    nodes = document.querySelectorAll("[data-brand]");
    for (i = 0; i < nodes.length; i++) nodes[i].textContent = UM_CONFIG.brand[UM_LANG] || UM_CONFIG.brand.en;
    var btns = document.querySelectorAll(".lang-switch button");
    for (i = 0; i < btns.length; i++) {
        var on = btns[i].getAttribute("data-lang") === UM_LANG;
        btns[i].className = on ? "on" : "";
        btns[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
    document.title = (UM_CONFIG.brand[UM_LANG] || UM_CONFIG.brand.en);
}

function buildLangSwitch(container) {
    var labels = { fa: "فا", en: "EN", tr: "TR" };
    var h = "";
    for (var i = 0; i < UM_LANGS.length; i++) {
        var l = UM_LANGS[i];
        h += '<button type="button" data-lang="' + l + '" title="' + I18N[l]["lang.name"] + '" lang="' + l + '">' + labels[l] + '</button>';
    }
    container.innerHTML = h;
    container.onclick = function (e) {
        var b = e.target.closest ? e.target.closest("button") : e.target;
        if (b && b.getAttribute("data-lang")) {
            applyLang(b.getAttribute("data-lang"));
            if (typeof onLangChanged === "function") onLangChanged();
        }
    };
}

/* ---------- Theme (auto / light / dark) ---------- */
function applyTheme(mode) {
    if (mode) umStore("theme", mode);
    var m = umStore("theme");
    if (m === "light" || m === "dark") document.documentElement.setAttribute("data-theme", m);
    else document.documentElement.removeAttribute("data-theme");
}
function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    if (!cur) cur = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
    applyTheme(cur === "dark" ? "light" : "dark");
}
applyTheme();

/* ---------- Formatting helpers ---------- */
function esc(s) {
    if (s === null || s === undefined) return "";
    return String(s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
}

function digits(s) {
    s = (s === null || s === undefined) ? "" : String(s);
    if (UM_LANG === "fa" && UM_CONFIG.persianDigits) {
        s = s.replace(/[0-9]/g, function (d) { return "۰۱۲۳۴۵۶۷۸۹".charAt(+d); }).replace(/\./g, "٫");
    }
    return s;
}

/* RouterOS duration, e.g. "1w2d3h4m5s" / "3h12m" / "00:12:30" → localized */
var DUR_UNITS = {
    fa: { w: "هفته", d: "روز", h: "ساعت", m: "دقیقه", s: "ثانیه", sep: " و " },
    en: { w: "w", d: "d", h: "h", m: "m", s: "s", sep: " " },
    tr: { w: "hafta", d: "gün", h: "sa", m: "dk", s: "sn", sep: " " }
};
function fmtDuration(v) {
    if (v === null || v === undefined || v === "") return "—";
    var str = String(v).trim();
    var u = DUR_UNITS[UM_LANG] || DUR_UNITS.en;
    var parts = [];
    if (/^\d+$/.test(str)) {                         // plain seconds
        var n = +str, w = Math.floor(n / 604800); n %= 604800;
        var d = Math.floor(n / 86400); n %= 86400;
        var h = Math.floor(n / 3600); n %= 3600;
        var m = Math.floor(n / 60), s = n % 60;
        str = (w ? w + "w" : "") + (d ? d + "d" : "") + (h ? h + "h" : "") + (m ? m + "m" : "") + (s || !(w || d || h || m) ? s + "s" : "");
    }
    var tm = str.match(/^(?:(\d+)w)?(?:(\d+)d)?\s*(\d+):(\d+):(\d+)$/);  // "2d 03:04:05"
    if (tm) str = (tm[1] ? tm[1] + "w" : "") + (tm[2] ? tm[2] + "d" : "") + (+tm[3] ? +tm[3] + "h" : "") + (+tm[4] ? +tm[4] + "m" : "") + (+tm[5] ? +tm[5] + "s" : "");
    if (!/^(\d+[wdhms])+$/.test(str)) return digits(esc(v));
    var re = /(\d+)([wdhms])/g, x;
    while ((x = re.exec(str))) parts.push(x[1] + (UM_LANG === "en" ? "" : " ") + u[x[2]]);
    if (UM_LANG !== "fa" && parts.length > 3) parts = parts.slice(0, 3);
    if (UM_LANG === "fa" && parts.length > 3) parts = parts.slice(0, 3);
    return digits(parts.join(u.sep));
}

/* Bytes: number → "1.2 GB"; already-formatted strings ("1.2GiB") are localized */
var SIZE_UNITS = {
    fa: ["بایت", "کیلوبایت", "مگابایت", "گیگابایت", "ترابایت"],
    en: ["B", "KB", "MB", "GB", "TB"],
    tr: ["B", "KB", "MB", "GB", "TB"]
};
function fmtBytes(v) {
    if (v === null || v === undefined || v === "") return "—";
    var u = SIZE_UNITS[UM_LANG] || SIZE_UNITS.en;
    var s = String(v).trim(), n, i = 0;
    if (/^\d+$/.test(s)) {
        n = +s;
        while (n >= 1024 && i < 4) { n /= 1024; i++; }
    } else {
        var m = s.match(/^([\d.]+)\s*([KMGT]?)(i?B)?$/i);
        if (!m) return digits(esc(s));
        n = parseFloat(m[1]); i = " KMGT".indexOf((m[2] || " ").toUpperCase());
        if (i < 0) i = 0;
    }
    var num = n >= 100 || i === 0 ? Math.round(n) : Math.round(n * 10) / 10;
    return digits(num + " " + u[i]);
}

/* Dates: "2026-05-12 10:22:33", "may/12/2026 10:22:33", "2026-05-12T…", or unix seconds */
var MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11 };
function parseDate(v) {
    if (v === null || v === undefined || v === "") return null;
    var s = String(v).trim(), m;
    if (/^\d{9,11}$/.test(s)) return new Date(+s * 1000);
    if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/))) return new Date(+m[1], m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0));
    if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/))) return new Date(+m[1], m[2] - 1, +m[3]);
    if ((m = s.match(/^([a-z]{3})\/(\d{1,2})\/(\d{4})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/i)) && MONTHS[m[1].toLowerCase()] !== undefined)
        return new Date(+m[3], MONTHS[m[1].toLowerCase()], +m[2], +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
    return null;
}
function fmtDate(v) {
    var d = parseDate(v);
    if (!d || isNaN(d.getTime())) return (v === null || v === undefined || v === "") ? "—" : digits(esc(v));
    var loc = UM_LANG === "fa" ? (UM_CONFIG.jalaliDates ? "fa-IR-u-ca-persian" : "fa-IR") : (UM_LANG === "tr" ? "tr-TR" : "en-GB");
    try {
        return new Intl.DateTimeFormat(loc, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(d);
    } catch (e) {
        return digits(esc(v));
    }
}
function fmtText(v) { return (v === null || v === undefined || v === "") ? "—" : digits(esc(v)); }

/* ---------- API (same endpoints as stock portal) ---------- */
var ajax = {};
ajax.post = function (url, data, callback) {
    if (window.UM_DEMO && typeof umDemoApi === "function") {
        setTimeout(function () { callback(JSON.stringify(umDemoApi(url, data || {}))); }, 180);
        return;
    }
    var x = new XMLHttpRequest();
    var q = [];
    for (var k in data) if (Object.prototype.hasOwnProperty.call(data, k)) q.push(encodeURIComponent(k) + "=" + encodeURIComponent(data[k]));
    x.open("POST", url, true);
    x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    x.onreadystatechange = function () {
        if (x.readyState === 4) callback(x.status === 0 ? null : x.responseText, x.status, (x.getResponseHeader("X-Bitdefender") || x.getResponseHeader("X-Kaspersky") || "") + (/bitdefender|kaspersky|eset|avast|norton|blocked by/i.test(String(x.responseText).slice(0, 4000)) ? " av" : ""));
    };
    x.send(q.join("&"));
};
ajax.get = function (url, data, callback) { ajax.post(url, data, callback); };

/* Calls the API and hands back parsed JSON; handles session-expired & errors */
function api(name, data, onOk, onFail) {
    ajax.post("../api/" + name, data, function (txt, status, av) {
        var obj = null;
        if (txt === null) {
            console.error("[UM] " + name + ": no response (network/CORS)");
            fail({ data: { error: t("err.network") } }); return;
        }
        try { obj = JSON.parse(txt); } catch (e) {
            var m = String(txt).match(/\{[\s\S]*\}/);          // tolerate junk around the JSON
            if (m) { try { obj = JSON.parse(m[0]); } catch (e2) { obj = null; } }
        }
        if (!obj && av) {
            console.error("[UM] " + name + ": response replaced by antivirus/web filter", txt);
            fail({ data: { error: t("err.blocked") } }); return;
        }
        if (!obj) {
            var snippet = String(txt).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
            console.error("[UM] " + name + " HTTP " + status + " — response is not JSON:", txt);
            fail({ data: { error: t("err.unknown") + " (HTTP " + status + (snippet ? ": " + snippet : "") + ")" } });
            return;
        }
        if (obj.success) { onOk(obj.data || {}); return; }
        if (obj.type === "LOGIN" && name !== "login") { location.reload(); return; }
        console.warn("[UM] " + name + " failed:", obj);
        if (!obj.data || !obj.data.error) obj.data = { error: t("err.unknown") + (obj.type ? " (" + obj.type + ")" : "") };
        fail(obj);
    });
    function fail(o) {
        if (onFail) onFail(o);
        else toast(o.data.error, "error");
    }
}

/* ---------- Toast ---------- */
function toast(msg, kind) {
    var box = document.getElementById("toasts");
    if (!box) { box = document.createElement("div"); box.id = "toasts"; box.setAttribute("role", "status"); document.body.appendChild(box); }
    var el = document.createElement("div");
    el.className = "toast " + (kind || "");
    el.textContent = msg;
    box.appendChild(el);
    setTimeout(function () { el.className += " out"; }, 3800);
    setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 4300);
}

/* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
var ICON = {
    down: '<path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14"/>',
    up: '<path d="M12 20V8m0 0-5 5m5-5 5 5M5 4h14"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    link: '<path d="M4.5 12.5a10 10 0 0 1 15 0M7.5 15.5a6 6 0 0 1 9 0"/><circle cx="12" cy="18.5" r="1.3" fill="currentColor"/>',
    grid: '<rect x="4" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5"/>',
    list: '<path d="M8 6.5h12M8 12h12M8 17.5h12"/><circle cx="4.5" cy="6.5" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="17.5" r="1" fill="currentColor"/>',
    card: '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    box: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
    logout: '<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 16l-4-4 4-4M6 12h10"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    user: '<circle cx="12" cy="8.5" r="4"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5v6M8 7.6v.1M11.5 16.5v-3.6a2.3 2.3 0 0 1 4.6 0v3.6M11.5 10.5v6"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.3 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.3-3.5-8.5s1.1-6.1 3.5-8.5z"/>',
    telegram: '<path d="m20.5 4.5-17 6.6 5.4 2 2 6.4 3.2-3.9 4.8 3.7z"/><path d="m8.9 13.1 7.6-5.6-5.6 7"/>',
    code: '<path d="m8.5 7.5-5 4.5 5 4.5M15.5 7.5l5 4.5-5 4.5M13.5 5l-3 14"/>',
    wifi: '<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.3" r="1.2" fill="currentColor"/>'
};
function icon(name, cls) {
    return '<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICON[name] || "") + '</svg>';
}
function fillIcons(root) {
    var n = (root || document).querySelectorAll("[data-icon]");
    for (var i = 0; i < n.length; i++) n[i].innerHTML = icon(n[i].getAttribute("data-icon"));
}

/* Kept for compatibility with the stock code */
function getQueryObj() {
    var o = {}, v = window.location.search.substring(1).split("&");
    for (var i = 0; i < v.length; i++) { var p = v[i].split("="); if (p[0]) o[p[0]] = p[1]; }
    return o;
}
