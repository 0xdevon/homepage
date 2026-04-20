(() => {
  const ICONS = {
    github: `
      <svg t="1776224501584" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8676" width="32" height="32"><path d="M512 85.333333C276.266667 85.333333 85.333333 276.266667 85.333333 512a426.410667 426.410667 0 0 0 291.754667 404.821333c21.333333 3.712 29.312-9.088 29.312-20.309333 0-10.112-0.554667-43.690667-0.554667-79.445333-107.178667 19.754667-134.912-26.112-143.445333-50.133334-4.821333-12.288-25.6-50.133333-43.733333-60.288-14.933333-7.978667-36.266667-27.733333-0.554667-28.245333 33.621333-0.554667 57.6 30.933333 65.621333 43.733333 38.4 64.512 99.754667 46.378667 124.245334 35.2 3.754667-27.733333 14.933333-46.378667 27.221333-57.045333-94.933333-10.666667-194.133333-47.488-194.133333-210.688 0-46.421333 16.512-84.778667 43.733333-114.688-4.266667-10.666667-19.2-54.4 4.266667-113.066667 0 0 35.712-11.178667 117.333333 43.776a395.946667 395.946667 0 0 1 106.666667-14.421333c36.266667 0 72.533333 4.778667 106.666666 14.378667 81.578667-55.466667 117.333333-43.690667 117.333334-43.690667 23.466667 58.666667 8.533333 102.4 4.266666 113.066667 27.178667 29.866667 43.733333 67.712 43.733334 114.645333 0 163.754667-99.712 200.021333-194.645334 210.688 15.445333 13.312 28.8 38.912 28.8 78.933333 0 57.045333-0.554667 102.912-0.554666 117.333334 0 11.178667 8.021333 24.490667 29.354666 20.224A427.349333 427.349333 0 0 0 938.666667 512c0-235.733333-190.933333-426.666667-426.666667-426.666667z" fill="#ffffff" p-id="8677"></path></svg>
    `,
    x: `
      <svg t="1776224573354" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11492" width="32" height="32"><path d="M683.776 256h91.605333l-200.106666 216.874667L810.666667 768h-184.32l-144.384-178.986667L316.8 768H225.109333l214.058667-231.978667L213.333333 256h189.013334l130.474666 163.584L683.776 256z m-32.170667 460.032h50.773334L374.741333 305.237333H320.298667l331.306666 410.794667z" fill="#ffffff" p-id="11493"></path></svg>
    `,
    weibo: `
      <svg t="1776224367534" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6011" width="32" height="32"><path d="M947.7 455.5v0.1c-4.3 13.1-16.1 22.3-29.9 23.4-13.8 1.1-26.9-6.2-33.2-18.4-4.1-8-4.9-17.3-2.1-25.9h-0.1c18.6-56.8 5.2-119.1-35.2-163.5-40.2-44.3-101.3-64-160.2-51.5-8.9 1.9-18.2 0.2-25.8-4.7-7.6-4.9-13-12.6-14.9-21.4-3.9-18.3 7.9-36.4 26.4-40.3 79.9-16.9 166.6 7.8 225.3 72.4 58.9 64.5 74.7 152.5 49.7 229.8zM710.5 328.4c-7.6 1.6-15.6 0.2-22.2-4.1-6.6-4.2-11.1-10.8-12.8-18.4-3.4-15.8 6.7-31.3 22.7-34.7 40.3-8.6 82.2 4.8 109.8 35.2 28.7 31.5 36.3 74.4 24.1 112-2.4 7.4-7.6 13.5-14.6 17s-15.1 4.2-22.5 1.8c-15.5-5-24-21.5-18.9-36.8h-0.1c6.2-19 1.8-39.9-11.7-54.8-13.7-14.8-34.1-21.4-53.8-17.2z m26.2 165.9c51.3 15.8 108.4 54 108.4 121.2 0 111.4-161.8 251.7-405 251.7-185.5 0-375.2-89.3-375.2-236.1 0-76.8 49-165.5 133.3-249.3 112.6-111.8 244-162.7 293.4-113.6 21.8 21.6 23.9 59.1 9.9 103.8-7.3 22.5 21.3 10 21.3 10.1 91-37.9 170.5-40.1 199.5 1.1 15.4 21.9 14 52.7-0.3 88.4-6.6 16.4 2 18.9 14.7 22.7zM440.5 814.6c148-14.5 260.3-104.5 250.7-201.1-9.6-96.4-137.4-162.9-285.4-148.4-148 14.5-260.3 104.6-250.7 201 9.6 96.6 137.4 163 285.4 148.5z m14.8-275.1c72.9 18.7 110.1 87 80.3 153.3-30.2 67.9-117.1 104-190.8 80.4-71.2-22.8-101.3-92.6-70.1-155.5 30.6-61.6 110.2-96.4 180.6-78.2zM401.5 700c14.1-22.9 6.7-49.1-16.5-58.9-22.9-9.5-52.6 0.3-66.7 22.3-14.3 22.1-7.6 48.5 15.2 58.7 23.1 10.5 53.7 0.5 68-22.1z m0 0" fill="#ffffff" p-id="6012"></path></svg>
    `,
    xiaohongshu: `
      <svg t="1776224441501" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7398" width="32" height="32"><path d="M13.95 391.93h63.58s4.56 144.8-11.26 177.65-32.85 58.41-32.85 58.41L10 561.07l3.95-169.14zM309.03 391.93h-63.58s-4.56 144.8 11.26 177.65 32.85 58.41 32.85 58.41l23.42-66.92-3.95-169.14zM128.33 306.75h64.49v305.42s0 35.29-32.25 40.15-60.23 0-60.23 0L78.14 600h48.97l1.22-293.25zM470.25 306.75h-68.14l-52.32 110.73s-15.82 35.29 15.82 35.29h36.5l-35.29 80.31s-10.95 30.42 24.34 30.42h79.09l15.82-53.54h-47.46l53.54-110.73-64.49-2.43 42.59-90.05zM351.01 587.84h109.51l-26.77 66.65H327.89zM516.49 326.22h152.1v65.71h-152.1zM559.08 391.93H626v205.64h-66.92zM497.02 597.57h194.69v56.92H465.39zM1009.3 494.75c-6.08-40.76-77.86-41.98-77.86-41.98s-1.23 24.34-0.02-46.24c1.22-70.57-62.06-80.31-62.06-80.31H711.18v65.71h47.45v59.62h-71.79v66.92h68.14V654.6l69.36-0.12V522.13l116.81 1.22 2.43 80.31H879.1L901 654.5s25.55 0.27 63.27 0 45.02-42.32 45.02-42.32 6.09-76.67 0.01-117.43z m-138.72-43.2h-46.24v-59.62h46.24v59.62z" fill="#ffffff" p-id="7399"></path><path d="M757.11 302.8h65.25v25.55h-65.25zM948.3 388.13s-8.86-76.68 42.44-59.78c41.52 13.69 19.16 81.22-42.44 59.78z" fill="#ffffff" p-id="7400"></path></svg>
    `,
    unsplash: `
      <svg t="1776302952723" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5152" width="32" height="32"><path d="M640 192H384v170.666667h256v-170.666667zM170.666667 448h213.333333v170.666667h256v-170.666667h213.333333v384H170.666667v-384z" fill="#ffffff" p-id="5153"></path></svg>
    `,
    blog: `
      <svg t="1776224774075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19693" width="32" height="32"><path d="M909 466.8a388 388 0 0 1 2.62 45.2c0 213-172.64 385.61-385.6 385.61a384 384 0 0 1-241.85-85.26c110.61-22.28 231.57-67.67 350.51-135.56l5.85-3.36 10-5.82c100.74-59.3 187.91-128 257.34-199.64zM951 220.64c-26.75-47.29-108.91-56.8-217.31-33.55A383.7 383.7 0 0 0 526 126.39C313 126.39 140.37 299 140.37 512q0 9.4 0.44 18.81C75.88 605.25 48.08 673.46 73 717.43c49.18 86.92 285.61 46.17 528.09-91S1000.22 307.56 951 220.64zM118.54 689.27c-6.61-11.69 2.46-42.83 32-85l0.7-1a383.22 383.22 0 0 0 41.64 103.13c-42.47 1.11-68.4-6.63-74.34-17.13z m533.19-319.54A69.75 69.75 0 1 1 721.48 300a69.74 69.74 0 0 1-69.75 69.73z m217.18-34.23a386.83 386.83 0 0 0-79.51-105.1l1.44-0.19c66.36-8.61 107 0.32 114.67 13.82 6.94 12.28-3.42 45.97-36.6 91.47z" fill="#ffffff" p-id="19694"></path><path d="M955.81 287a409.18 409.18 0 0 0-48.36-30.91c-1.12 16.69-13.13 44.62-38.54 79.43A386.83 386.83 0 0 0 789.4 230.4l1.44-0.19a377 377 0 0 1 48.63-3.39 400.28 400.28 0 0 0-123.85-19.54c-226.72 0-410.51 188.83-410.51 421.77a433 433 0 0 0 15.39 114.77c84.4-21.8 182-61.63 280.55-117.4C792.38 518.17 930.3 382.22 955.81 287z m-304.08-56.77A69.75 69.75 0 1 1 582 300a69.75 69.75 0 0 1 69.73-69.77zM907.82 468c-69.43 71.62-156.6 140.34-257.34 199.64l-10 5.82-5.85 3.36c-99.21 56.6-199.82 97.57-294.63 122.53a424.43 424.43 0 0 0 37.24 68.49A384.47 384.47 0 0 0 526 897.61c213 0 385.6-172.65 385.6-385.61a388 388 0 0 0-2.6-45.2z" fill="#ffffff" p-id="19695"></path><path d="M911.58 512a388 388 0 0 0-2.58-45.2l-1.18 1.2c-69.43 71.62-156.6 140.34-257.34 199.64l-10 5.82-5.85 3.36a1305.32 1305.32 0 0 1-174.76 83.48 390.72 390.72 0 0 0 37.84 136.3q14 1 28.26 1c212.97 0.01 385.61-172.6 385.61-385.6zM871.58 331.78q-1.3 1.85-2.67 3.72c-0.68-1.32-1.38-2.62-2.08-3.93q-7.51-0.29-15.11-0.28c-207.71 0-377.82 161-392.41 365a1353 1353 0 0 0 141.74-69.83c158.26-89.54 280-198 331.76-286.76a394 394 0 0 0-61.23-7.92z" fill="#ffffff" p-id="19696"></path><path d="M907.82 468c-66.59 68.69-149.5 134.7-245.05 192.3a338.52 338.52 0 0 0-9.33 215.7c150.33-52.59 258.14-195.7 258.14-364a388 388 0 0 0-2.58-45.2z" fill="#ffffff" p-id="19697"></path><path d="M438.53 206.83c7.55 11.35-32.19 25.35-74.12 53.29S294.25 319.34 286.7 308s15.62-50.21 57.55-78.14 86.75-34.37 94.28-23.03z" fill="#ffffff" p-id="19698"></path></svg>
    `,
    phone: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="7" y="2.8" width="10" height="18.4" rx="2.2"></rect>
        <path d="M10 5.8h4"></path>
        <path d="M11.4 18h1.2"></path>
      </svg>
    `,
    message: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `,
    email: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2"></rect>
        <path d="m4 7 8 6 8-6"></path>
      </svg>
    `,
    default: `
      <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 3h7v7"></path>
        <path d="M10 14 21 3"></path>
        <path d="M21 14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h4"></path>
      </svg>
    `
  };

  const config = window.SITE_CONFIG || {};
  const pageShell = document.getElementById("pageShell");
  const hero = document.getElementById("hero");
  const avatar = document.getElementById("avatar");
  const nameEl = document.getElementById("name");
  const bioEl = document.getElementById("bio");
  const socialLinks = document.getElementById("socialLinks");
  const quickActions = document.getElementById("quickActions");
  const langToggle = document.getElementById("langToggle");
  const themeToggle = document.getElementById("themeToggle");
  const themeColorMeta = document.getElementById("themeColorMeta");
  const installTip = document.getElementById("installTip");
  const installTipText = document.getElementById("installTipText");
  const installTipClose = document.getElementById("installTipClose");

  const THEME_KEY = "homepage-theme";
  const LANG_KEY = "homepage-lang";
  const TIP_KEY = "homepage-install-tip-dismissed";

  let currentTheme = localStorage.getItem(THEME_KEY) || config.defaultTheme || "dark";
  let currentLanguage = localStorage.getItem(LANG_KEY) || config.defaultLanguage || "zh";

  function textByLang(value) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    return value[currentLanguage] || value.zh || value.en || "";
  }

  function isStandaloneMode() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function updateStandaloneClass() {
    document.documentElement.classList.toggle("is-standalone", isStandaloneMode());
  }

  function updateThemeColor() {
    if (!themeColorMeta) return;
    themeColorMeta.setAttribute("content", currentTheme === "light" ? "#e7edf5" : "#0f1722");
  }

  function setTheme(theme) {
    currentTheme = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem(THEME_KEY, currentTheme);

    const themeText = config.uiText || {};
    const ariaLabel = currentTheme === "light"
      ? (textByLang(themeText.themeToDark) || "Switch to dark mode")
      : (textByLang(themeText.themeToLight) || "Switch to light mode");
    themeToggle.setAttribute("aria-label", ariaLabel);
    updateThemeColor();
  }

  function setLanguage(lang) {
    currentLanguage = lang === "en" ? "en" : "zh";
    localStorage.setItem(LANG_KEY, currentLanguage);
    render();
    syncInstallTip();
  }

  function applyBackground() {
    if (!config.backgroundImage) return;

    const backgroundValue = `
      linear-gradient(to bottom, var(--bg-overlay-1), var(--bg-overlay-2) 30%, var(--bg-overlay-3) 100%),
      url("${config.backgroundImage}")
    `;

    hero.style.backgroundImage = backgroundValue;
    document.body.style.backgroundImage = backgroundValue;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
  }

  function applyAvatar() {
    if (config.avatarImage) {
      avatar.classList.add("has-image");
      avatar.style.backgroundImage = `url("${config.avatarImage}")`;
      avatar.style.backgroundSize = "cover";
      avatar.style.backgroundPosition = "center";
    } else {
      avatar.classList.remove("has-image");
      avatar.style.backgroundImage = "";
    }
  }

  function createLinkItem(item) {
    const a = document.createElement("a");
    a.className = "link-item";
    a.href = item.url || "#";
    a.target = item.target || "_blank";
    a.rel = "noreferrer";

    const icon = ICONS[item.icon] || ICONS.default;
    a.innerHTML = `
      <div class="link-left">
        <span class="link-text">${textByLang(item.label)}</span>
      </div>
      <span class="link-right" aria-hidden="true">${icon}</span>
    `;
    return a;
  }

  function createQuickAction(item) {
    const a = document.createElement("a");
    a.className = "social-btn";
    a.href = item.url || "#";
    a.setAttribute("aria-label", textByLang(item.label) || "quick action");

    if (item.target === "_blank") {
      a.target = "_blank";
      a.rel = "noreferrer";
    }

    a.innerHTML = ICONS[item.icon] || ICONS.default;
    return a;
  }

  function syncInstallTip() {
    if (!installTip || !installTipText || !installTipClose) return;

    installTipText.textContent = textByLang(config.uiText?.installTip)
      || "Open in Safari and choose Add to Home Screen for a cleaner fullscreen look on iPhone.";
    installTipClose.setAttribute("aria-label", textByLang(config.uiText?.installClose) || "Dismiss");

    const dismissed = localStorage.getItem(TIP_KEY) === "1";
    const isiPhone = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const shouldShow = isiPhone && !dismissed && !isStandaloneMode();
    installTip.classList.toggle("hidden", !shouldShow);
  }

  function render() {
    const profile = config.profile || {};
    document.documentElement.lang = currentLanguage === "en" ? "en" : "zh-CN";
    document.title = textByLang(profile.siteTitle) || "Personal Homepage";

    nameEl.textContent = textByLang(profile.name) || "Your Name";
    bioEl.textContent = textByLang(profile.bio) || "Your short bio here.";

    socialLinks.innerHTML = "";
    (config.links || []).forEach((item) => {
      socialLinks.appendChild(createLinkItem(item));
    });

    quickActions.innerHTML = "";
    (config.quickActions || []).forEach((item) => {
      quickActions.appendChild(createQuickAction(item));
    });

    langToggle.textContent = textByLang(config.uiText?.langToggle) || "EN";
    setTheme(currentTheme);
  }

  langToggle.addEventListener("click", () => {
    setLanguage(currentLanguage === "zh" ? "en" : "zh");
  });

  themeToggle.addEventListener("click", () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  });

  installTipClose?.addEventListener("click", () => {
    localStorage.setItem(TIP_KEY, "1");
    syncInstallTip();
  });

  applyBackground();
  applyAvatar();
  updateStandaloneClass();
  setTheme(currentTheme);
  render();
  syncInstallTip();

  window.matchMedia("(display-mode: standalone)").addEventListener?.("change", () => {
    updateStandaloneClass();
    syncInstallTip();
  });

  window.addEventListener("load", () => {
    requestAnimationFrame(() => {
      pageShell.classList.remove("is-loading");
      pageShell.classList.add("ready");
    });
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js").catch(() => {});
    });
  }
})();
