/*!
 * UM5 User Portal — multilingual (FA/EN/TR) self-service panel for MikroTik User Manager v5.
 * Copyright (C) 2026 Amir Makouei — Amir Echo Tech <https://amirechotech.ca/>
 * Licensed under AGPL-3.0-or-later WITH an Additional Term under section 7:
 * the author attribution shown in the UI footer and About page must be preserved.
 * See LICENSE and ADDITIONAL_TERMS.md.
 */
/* MikroTik User Manager v5 — multilingual login (same ../api/login endpoint) */

function setError(msg) {
    var e = document.getElementById("error-text");
    e.textContent = msg || "";
    if (msg) {
        var c = document.getElementById("login-container");
        c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake");
    }
}

function loginSubmited() {
    var u = document.getElementById("username").value.trim();
    var p = document.getElementById("password").value;
    var btn = document.getElementById("login-btn");
    setError("");
    if (!u || !p) { setError(t("login.required")); (u ? document.getElementById("password") : document.getElementById("username")).focus(); return; }

    btn.disabled = true; btn.classList.add("loading");
    api("login", { username: u, password: p }, function () {
        location.reload();
    }, function (obj) {
        btn.disabled = false; btn.classList.remove("loading");
        setError(obj && obj.data && obj.data.error ? obj.data.error : t("err.unknown"));
        document.getElementById("password").select();
    });
}

function togglePass() {
    var i = document.getElementById("password"), b = document.getElementById("eye");
    var show = i.type === "password";
    i.type = show ? "text" : "password";
    b.classList.toggle("on", show);
    i.focus();
}

window.onload = function () {
    buildLangSwitch(document.getElementById("lang-switch"));
    fillIcons();
    applyLang();
    document.getElementById("username").focus();
};
