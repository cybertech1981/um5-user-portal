/*!
 * UM5 User Portal — multilingual (FA/EN/TR) self-service panel for MikroTik User Manager v5.
 * Copyright (C) 2026 Amir Makouei — Amir Echo Tech <https://amirechotech.ca/>
 * Licensed under AGPL-3.0-or-later WITH an Additional Term under section 7:
 * the author attribution shown in the UI footer and About page must be preserved.
 * See LICENSE and ADDITIONAL_TERMS.md.
 */
/* ==========================================================================
   MikroTik User Manager v5 — multilingual user portal
   user.js : dashboard, sessions, payments, plans, buy flow
   API endpoints are identical to the stock portal.
   ========================================================================== */

var STATE_BADGE = { 0: "warn", 1: "info", 2: "ok", 3: "" };
var PAY_BADGE = { 0: "info", 1: "warn", 2: "ok", 3: "bad", 4: "bad", 5: "bad", 6: "", 7: "info" };
var VIEWS = ["status", "sessions", "payments", "profiles", "profile", "buyprofile", "redirecting", "about"];
var cache = {};   // last API data per view, so a language switch re-renders without refetching

var pending = 0;
function busy(on) {
    pending = Math.max(0, pending + (on ? 1 : -1));
    var b = document.getElementById("loadbar");
    if (b) b.className = pending ? "loadbar on" : "loadbar";
}
/* kept for compatibility with stock function names */
function blockGUI() { busy(true); }
function unblockGUI() { busy(false); }

function call(name, data, onOk, onFail) {
    busy(true);
    api(name, data, function (d) { busy(false); onOk(d); }, function (o) {
        busy(false);
        if (onFail) onFail(o);
        else toast(o && o.data && o.data.error ? o.data.error : t("err.unknown"), "error");
    });
}

function emptyBox(iconName, key) {
    return '<div class="empty">' + icon(iconName) + '<div>' + esc(t(key)) + '</div></div>';
}
function skeletonRows(n) {
    var h = "";
    for (var i = 0; i < n; i++) h += '<div class="card plan-row"><div class="skeleton" style="width:40px;height:40px;border-radius:12px"></div><div class="pm"><div class="skeleton" style="height:14px;width:40%;margin-bottom:8px"></div><div class="skeleton" style="height:12px;width:25%"></div></div></div>';
    return h;
}
function td(label, html, cls) {
    return '<td data-label="' + esc(label) + '"' + (cls ? ' class="' + cls + '"' : '') + '><span class="v">' + html + '</span></td>';
}
function badge(kind, text, extra) {
    return '<span class="badge ' + (kind || "") + (extra ? " " + extra : "") + '">' + esc(text) + '</span>';
}

/* ---------- Navigation ---------- */
function getLocationHash() { return window.location.hash.substring(1); }

function show(id) {
    for (var i = 0; i < VIEWS.length; i++) {
        var el = document.getElementById(VIEWS[i]);
        if (el) el.className = "view" + (VIEWS[i] === id ? " on" : "");
    }
    var navId = (id === "profile" || id === "buyprofile") ? "profiles" : id;
    var links = document.querySelectorAll("#nav a");
    for (i = 0; i < links.length; i++) {
        var on = links[i].getAttribute("data-view") === navId;
        links[i].className = on ? "on" : "";
        if (on) links[i].setAttribute("aria-current", "page"); else links[i].removeAttribute("aria-current");
    }
    window.scrollTo(0, 0);
}

function processNavigation() {
    var h = getLocationHash().split(":");
    switch (h[0]) {
        case "sessions": show("sessions"); loadSessions(); break;
        case "payments": show("payments"); loadPayments(); break;
        case "about": show("about"); renderAbout(); break;
        case "profiles": show("profiles"); loadProfiles(); break;
        case "profile": show("profile"); loadProfile(h[1]); break;
        case "buyprofile": show("buyprofile"); loadPaymentTypes(); break;
        default: show("status"); loadStatusData();
    }
}

/* Re-render the current view in the new language from cached data */
function onLangChanged() {
    var h = getLocationHash().split(":")[0] || "status";
    if (h === "sessions" && cache.sessions) renderSessions(cache.sessions);
    else if (h === "payments" && cache.payments) renderPayments(cache.payments);
    else if (h === "profiles" && cache.profiles) renderProfiles(cache.profiles);
    else if (h === "profile" && cache.profile) renderProfile(cache.profile);
    else if (h === "buyprofile" && cache.payTypes) renderPaymentTypes(cache.payTypes);
    else if (h === "about") renderAbout();
    else {
        if (cache.user) renderUser(cache.user);
        if (cache.userProfiles) renderUserProfiles(cache.userProfiles);
    }
}

/* ---------- Dashboard ---------- */
function loadStatusData() {
    document.getElementById("status-profiles").innerHTML = skeletonRows(2);
    document.getElementById("status-exp-profiles").innerHTML = "";
    call("getUser", null, function (d) { cache.user = d; renderUser(d); });
    call("getUserProfiles", null, function (d) { cache.userProfiles = d.profiles || []; renderUserProfiles(cache.userProfiles); });
}

function renderUser(d) {
    document.getElementById("h-user").innerHTML = '<span class="ltr">' + esc(d.username) + '</span>';
    document.getElementById("s-down").innerHTML = fmtBytes(d.download);
    document.getElementById("s-up").innerHTML = fmtBytes(d.upload);
    document.getElementById("s-time").innerHTML = fmtDuration(d.uptime);
    document.getElementById("s-sess").innerHTML = digits(d.activeSess === undefined ? 0 : d.activeSess);
    var max = (d.sharedUsers == 0 || d.sharedUsers === undefined) ? t("status.unlimited") : digits(d.sharedUsers);
    document.getElementById("s-sess-max").textContent = "";
    document.getElementById("s-sess-max").innerHTML = esc(t("status.ofMax")) + " " + max;
}

function planRow(p, kind) {
    var name = '<a class="pn" href="#profile:' + esc(p.profileId) + '">' + esc(p.name) + '</a>';
    var sub, act = "";
    if (kind === "used") {
        sub = esc(t("col.expiredAt")) + ": " + fmtDate(p.expAt);
    } else {
        sub = esc(t("col.expiresAfter")) + ": " + fmtDuration(p.expAfter);
        if (p.state == 0 || p.state == 1)
            act = '<button class="btn sm" type="button" data-id="' + esc(p.id) + '" onclick="onActivateClick(this)">' + icon("check") + esc(t("btn.activate")) + '</button>';
    }
    var live = p.state == 2 ? "live" : "";
    return '<div class="card plan-row ' + kind + '"><span class="pi">' + icon("box") + '</span>'
        + '<div class="pm">' + name + '<span class="pd">' + sub + '</span></div>'
        + '<div class="pa">' + badge(STATE_BADGE[p.state], t("state." + p.state), live) + act + '</div></div>';
}

function renderUserProfiles(list) {
    var active = "", running = "", waiting = "", used = "", current = null;
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        if (p.state == 3) used += planRow(p, "used");
        else if (p.state == 0) waiting += planRow(p, "wait");
        else if (p.state == 1) running += planRow(p, "run");
        else { active += planRow(p, "act"); current = p; }
    }
    var mine = active + running + waiting;
    document.getElementById("status-profiles").innerHTML = mine || '<div class="card">' + emptyBox("box", "status.noPlans") + '</div>';
    document.getElementById("status-exp-profiles").innerHTML = used || '<div class="card">' + emptyBox("clock", "status.noExpired") + '</div>';

    var hp = document.getElementById("h-plan");
    if (current) {
        hp.innerHTML = '<div class="plan-label">' + esc(t("status.activePlan")) + '</div>'
            + '<div class="plan-name">' + esc(current.name) + '</div>'
            + '<div class="plan-left">' + esc(t("status.expiresIn")) + ': ' + fmtDuration(current.expAfter) + '</div>';
    } else {
        hp.innerHTML = '<div class="plan-label">' + esc(t("status.noActive")) + '</div>'
            + '<a class="btn sm" href="#profiles">' + esc(t("status.browse")) + '</a>';
    }
}

function onActivateClick(el) {
    var id = el.getAttribute("data-id") || el.value;
    el.disabled = true;
    call("activateProfile", { id: id }, function () {
        toast(t("btn.activate") + " ✓", "ok");
        loadStatusData();
    }, function (o) {
        el.disabled = false;
        toast(o && o.data && o.data.error ? o.data.error : t("err.unknown"), "error");
    });
}

/* ---------- Sessions ---------- */
function loadSessions() {
    document.getElementById("sessions-sessions").innerHTML = '<div style="padding:18px">' + '<div class="skeleton" style="height:14px;margin-bottom:12px"></div><div class="skeleton" style="height:14px;width:80%;margin-bottom:12px"></div><div class="skeleton" style="height:14px;width:60%"></div></div>';
    call("getUserSessions", null, function (d) { cache.sessions = d.sessions || []; renderSessions(cache.sessions); });
}
function isActive(v) { return v === true || v === "true" || v === "yes" || v === 1 || v === "1"; }

function renderSessions(list) {
    if (!list.length) { document.getElementById("sessions-sessions").innerHTML = emptyBox("list", "sessions.empty"); return; }
    var h = '<table class="tbl"><thead><tr><th>' + esc(t("col.start")) + '</th><th>' + esc(t("col.end")) + '</th><th>' + esc(t("col.uptime"))
        + '</th><th>' + esc(t("col.download")) + '</th><th>' + esc(t("col.upload")) + '</th><th>' + esc(t("col.active")) + '</th></tr></thead><tbody>';
    for (var i = list.length - 1; i >= 0; i--) {
        var s = list[i], on = isActive(s.active);
        h += '<tr>' + td(t("col.start"), fmtDate(s.startTime), "head")
            + td(t("col.end"), on ? "—" : fmtDate(s.endTime))
            + td(t("col.uptime"), fmtDuration(s.uptime), "num")
            + td(t("col.download"), '<span class="dl">↓</span> ' + fmtBytes(s.downloaded), "num")
            + td(t("col.upload"), '<span class="ul">↑</span> ' + fmtBytes(s.uploaded), "num")
            + td(t("col.active"), on ? badge("ok", t("sessions.online"), "live") : badge("", t("sessions.offline")))
            + '</tr>';
    }
    document.getElementById("sessions-sessions").innerHTML = h + '</tbody></table>';
}

/* ---------- Payments ---------- */
function loadPayments() {
    document.getElementById("payments-payments").innerHTML = '<div style="padding:18px"><div class="skeleton" style="height:14px;margin-bottom:12px"></div><div class="skeleton" style="height:14px;width:70%"></div></div>';
    call("getUserPayments", null, function (d) { cache.payments = d.payments || []; renderPayments(cache.payments); });
}
function renderPayments(list) {
    if (!list.length) { document.getElementById("payments-payments").innerHTML = emptyBox("card", "payments.empty"); return; }
    var h = '<table class="tbl"><thead><tr><th>' + esc(t("col.profile")) + '</th><th>' + esc(t("col.type")) + '</th><th>' + esc(t("col.start")) + '</th><th>' + esc(t("col.end"))
        + '</th><th>' + esc(t("col.message")) + '</th><th>' + esc(t("col.state")) + '</th><th></th></tr></thead><tbody>';
    for (var i = list.length - 1; i >= 0; i--) {
        var p = list[i];
        var act = (p.state == 0 || p.state == 1 || p.state == 7)
            ? '<button class="btn sm" type="button" data-id="' + esc(p.id) + '" onclick="onContinueBuyClick(this)">' + esc(t("btn.continue")) + '</button>' : "";
        h += '<tr>' + td(t("col.profile"), esc(p.profileName), "head")
            + td(t("col.type"), p.typeId === 2 ? esc(t("buy.card")) : "PayPal")
            + td(t("col.start"), fmtDate(p.start))
            + td(t("col.end"), fmtDate(p.end))
            + td(t("col.message"), fmtText(p.message))
            + td(t("col.state"), badge(PAY_BADGE[p.state], t("pay." + p.state)))
            + td("", act) + '</tr>';
    }
    document.getElementById("payments-payments").innerHTML = h + '</tbody></table>';
}
function onContinueBuyClick(el) {
    el.disabled = true;
    call("continueBuy", { id: el.getAttribute("data-id") || el.value }, function () { loadPayments(); },
        function (o) { toast(o && o.data && o.data.error ? o.data.error : t("err.unknown"), "error"); loadPayments(); });
}

/* ---------- Plan catalogue ---------- */
function loadProfiles() {
    var sk = "";
    for (var i = 0; i < 3; i++) sk += '<div class="card pkg"><div class="skeleton" style="width:44px;height:44px;border-radius:13px"></div><div class="skeleton" style="height:16px;width:60%"></div><div class="skeleton" style="height:12px"></div></div>';
    document.getElementById("profiles-profiles").innerHTML = sk;
    call("getProfiles", null, function (d) { cache.profiles = d.profiles || []; renderProfiles(cache.profiles); });
}
function renderProfiles(list) {
    var box = document.getElementById("profiles-profiles");
    if (!list.length) { box.innerHTML = '<div class="card" style="grid-column:1/-1">' + emptyBox("box", "profiles.empty") + '</div>'; return; }
    var h = "";
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        h += '<a class="card pkg" href="#profile:' + esc(p.id) + '">'
            + '<span class="pkg-ic">' + icon("wifi") + '</span>'
            + '<span class="pkg-name">' + esc(p.name) + '</span>'
            + '<span class="pkg-meta"><div><span>' + esc(t("col.validity")) + '</span><b>' + fmtDuration(p.validity) + '</b></div>'
            + '<div><span>' + esc(t("col.startsAt")) + '</span><b>' + esc(t("startsAt." + p.startsAt)) + '</b></div></span>'
            + '<span class="more">' + esc(t("btn.details")) + '<span class="flip">' + icon("chevron") + '</span></span></a>';
    }
    box.innerHTML = h;
}

/* ---------- Plan detail ---------- */
function loadProfile(id) {
    document.getElementById("profile-data").innerHTML = '<div style="padding:18px"><div class="skeleton" style="height:14px;margin-bottom:12px"></div><div class="skeleton" style="height:14px;width:60%"></div></div>';
    call("getProfile", { id: id }, function (d) { cache.profile = d; renderProfile(d); });
}
function renderProfile(d) {
    var h = '<dl class="kv">'
        + '<dt>' + esc(t("col.name")) + '</dt><dd>' + esc(d.name) + '</dd>'
        + '<dt>' + esc(t("col.price")) + '</dt><dd>' + fmtText(d.price) + '</dd>'
        + '<dt>' + esc(t("col.validity")) + '</dt><dd>' + fmtDuration(d.validity) + '</dd>'
        + '<dt>' + esc(t("col.startsAt")) + '</dt><dd>' + esc(t("startsAt." + d.startsAt)) + '</dd>'
        + '</dl>';
    if (d.canBuy) h += '<div class="actions"><a class="btn" href="#buyprofile:' + esc(d.id) + '">' + icon("card") + esc(t("btn.buy")) + '</a></div>';
    document.getElementById("profile-data").innerHTML = h;
}

/* ---------- Buy ---------- */
function loadPaymentTypes() {
    document.getElementById("buyprofile-buyprofile").innerHTML = '<div style="padding:18px"><div class="skeleton" style="height:44px;margin-bottom:10px"></div><div class="skeleton" style="height:44px"></div></div>';
    call("getPayamentTypes", null, function (d) { cache.payTypes = d.paymentTypes || []; renderPaymentTypes(cache.payTypes); });
}
function renderPaymentTypes(list) {
    var box = document.getElementById("buyprofile-buyprofile");
    if (!list.length) { box.innerHTML = emptyBox("card", "buy.none"); return; }
    var h = '<form id="buy-form" class="methods" onsubmit="onBuyClick(); return false;">';
    for (var i = 0; i < list.length; i++) {
        var chk = i === 0 ? ' checked' : '';
        if (list[i].typeId === 1)
            h += '<label class="method"><input type="radio" name="paymethod" value="1"' + chk + '><img src="../img/PayPal_mark_37x23.gif" alt="PayPal"><span>PayPal</span></label>';
        else if (list[i].typeId === 2)
            h += '<label class="method"><input type="radio" name="paymethod" value="2"' + chk + '>' + icon("card") + '<span>' + esc(t("buy.card")) + ' <small>' + esc(t("buy.cardVia")) + '</small></span></label>';
    }
    h += '<button class="btn block" type="submit" id="buy-btn">' + esc(t("btn.pay")) + '</button></form>';
    box.innerHTML = h;
}
function onBuyClick() {
    var f = document.getElementById("buy-form");
    var sel = f.querySelector('input[name="paymethod"]:checked');
    var btn = document.getElementById("buy-btn");
    if (btn) btn.disabled = true;
    call("buyProfile", { payMethod: sel ? sel.value : "", profileId: getLocationHash().split(":")[1] }, function (d) {
        show("redirecting");
        if (d.redirectUrl) window.location.href = d.redirectUrl;
    }, function (o) {
        if (btn) btn.disabled = false;
        toast(o && o.data && o.data.error ? o.data.error : t("err.unknown"), "error");
    });
}

/* ---------- About ---------- */
function aboutHTML() {
    return '<div class="about">' +
        '<div class="about-head"><span class="about-mark">' + icon("wifi") + '</span><div><h2>Amir Echo Tech</h2><p>' + esc(t("about.desc")) + '</p></div></div>' +
        '<div class="about-dev"><span>' + esc(t("about.dev")) + '</span><b>' + esc(t("about.name")) + '</b></div>' +
        '<div class="about-links">' +
        '<a class="about-link" href="https://www.linkedin.com/in/amir1360/" target="_blank" rel="noopener noreferrer"><span class="al-ic">' + icon("linkedin") + '</span><span class="al-t"><small>' + esc(t("about.li")) + '</small><bdi dir="ltr">linkedin.com/in/amir1360</bdi></span></a>' +
        '<a class="about-link" href="https://amirechotech.ca/" target="_blank" rel="noopener noreferrer"><span class="al-ic">' + icon("globe") + '</span><span class="al-t"><small>' + esc(t("about.web")) + '</small><bdi dir="ltr">amirechotech.ca</bdi></span></a>' +
        '<a class="about-link" href="https://t.me/AmirEchoTech" target="_blank" rel="noopener noreferrer"><span class="al-ic">' + icon("telegram") + '</span><span class="al-t"><small>' + esc(t("about.tg")) + '</small><bdi dir="ltr">t.me/AmirEchoTech</bdi></span></a>' +
        '</div>' + '</div>';
}
function renderAbout() { document.getElementById("about-data").innerHTML = aboutHTML(); }

/* ---------- Logout ---------- */
function onLogout() {
    call("logout", null, function () { location.reload(); });
}
function onMenuClick(el) {          // stock compatibility
    if (el && el.id === "menu-logout") onLogout();
    else if (el && el.id) location.hash = "#" + el.id.replace("menu-", "");
}

/* ---------- Boot ---------- */
window.onload = function () {
    buildLangSwitch(document.getElementById("lang-switch"));
    fillIcons();
    applyLang();
    if (window.UM_DEMO) { var b = document.createElement("div"); b.className = "demo-badge"; b.setAttribute("data-i18n", "demo.badge"); document.body.appendChild(b); applyLang(); }
    processNavigation();
};
window.onhashchange = processNavigation;
