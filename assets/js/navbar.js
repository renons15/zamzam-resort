(function () {
  const SUPPORTED_LANGS = ["ru", "uz", "kk"];

  const NAV_TEXT = {
    ru: {
      logoAria: "На главную",
      desktopNavAria: "Основная навигация",
      mobileNavAria: "Мобильная навигация",
      menuAria: "Открыть меню",
      waText: "Написать в WhatsApp",
      nav: {
        about: "О нас",
        rooms: "Номера",
        pricing: "Прайс",
        procedures: "Процедуры",
        indications: "Показания",
        nutrition: "Питание",
        contact: "Контакты"
      }
    },
    uz: {
      logoAria: "Bosh sahifaga",
      desktopNavAria: "Asosiy navigatsiya",
      mobileNavAria: "Mobil navigatsiya",
      menuAria: "Menyuni ochish",
      waText: "WhatsApp orqali yozish",
      nav: {
        about: "Biz haqimizda",
        rooms: "Xonalar",
        pricing: "Narxlar",
        procedures: "Muolajalar",
        indications: "Ko'rsatmalar",
        nutrition: "Ovqatlanish",
        contact: "Aloqa"
      }
    },
    kk: {
      logoAria: "Басты бетке",
      desktopNavAria: "Негізгі навигация",
      mobileNavAria: "Мобильді навигация",
      menuAria: "Мәзірді ашу",
      waText: "WhatsApp-қа жазу",
      nav: {
        about: "Біз туралы",
        rooms: "Нөмірлер",
        pricing: "Бағалар",
        procedures: "Емшаралар",
        indications: "Көрсетілімдер",
        nutrition: "Тамақтану",
        contact: "Байланыс"
      }
    }
  };

  const NAV_ITEMS = [
    { key: "about", type: "page", file: "about.html" },
    { key: "rooms", type: "anchor", hash: "#rooms" },
    { key: "pricing", type: "page", file: "pricing.html" },
    { key: "procedures", type: "page", file: "procedures.html" },
    { key: "indications", type: "page", file: "indications.html" },
    { key: "nutrition", type: "page", file: "nutrition.html" },
    { key: "contact", type: "page", file: "contact.html" }
  ];

  function getPathContext() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const maybeFile = parts[parts.length - 1] || "";
    const currentPage = maybeFile.endsWith(".html") ? maybeFile : "index.html";
    const currentDirParts = maybeFile.endsWith(".html") ? parts.slice(0, -1) : parts.slice();
    const parentDir = currentDirParts[currentDirParts.length - 1] || "";
    const inLangSubdir = SUPPORTED_LANGS.includes(parentDir);
    const currentLang = inLangSubdir ? parentDir : "ru";
    const baseParts = inLangSubdir
      ? currentDirParts.slice(0, -1)
      : currentDirParts.slice();
    const basePath = baseParts.length ? `/${baseParts.join("/")}` : "";

    return {
      basePath,
      currentLang,
      currentPage,
      inLangSubdir
    };
  }

  function withBase(path, context) {
    const cleaned = String(path || "").replace(/^\.?\//, "");
    if (!cleaned) return context.basePath || "/";
    return context.basePath ? `${context.basePath}/${cleaned}` : `/${cleaned}`;
  }

  function localeHref(targetLang, page, context) {
    const targetPage = page || "index.html";
    return withBase(`${targetLang}/${targetPage}`, context);
  }

  function assetHref(path, context) {
    return context.inLangSubdir ? `../${path}` : path;
  }

  function isActive(item, context) {
    if (item.type === "page") return context.currentPage === item.file;
    if (context.currentPage !== "index.html") return false;
    return window.location.hash === item.hash;
  }

  function linkHref(item, context) {
    if (item.type === "page") return withBase(`${context.currentLang}/${item.file}`, context);
    return withBase(`${context.currentLang}/index.html${item.hash}`, context);
  }

  function renderNavLinks(labels, context) {
    return NAV_ITEMS.map((item) => {
      const active = isActive(item, context);
      const activeAttrs = active ? ' class="is-active" aria-current="page"' : "";
      const label = labels[item.key];
      return `<a href="${linkHref(item, context)}"${activeAttrs}>${label}</a>`;
    }).join("");
  }

  function renderLangSwitcher(context, isMobile) {
    const className = isMobile
      ? "lang-switcher lang-switcher--mobile"
      : "lang-switcher";

    return `
      <div class="${className}" aria-label="Language switcher">
        <a class="lang-switcher__btn${context.currentLang === "ru" ? " is-active" : ""}" href="${localeHref("ru", context.currentPage, context)}" lang="ru" hreflang="ru">RU</a>
        <a class="lang-switcher__btn${context.currentLang === "uz" ? " is-active" : ""}" href="${localeHref("uz", context.currentPage, context)}" lang="uz" hreflang="uz">UZ</a>
        <a class="lang-switcher__btn${context.currentLang === "kk" ? " is-active" : ""}" href="${localeHref("kk", context.currentPage, context)}" lang="kk" hreflang="kk">KZ</a>
      </div>
    `.trim();
  }

  function renderNavbar() {
    const host = document.querySelector('[data-shared-navbar="true"]');
    if (!host) return false;

    const context = getPathContext();
    const uiText = NAV_TEXT[context.currentLang] || NAV_TEXT.ru;
    const logoPath = assetHref("images/logo.webp", context);
    const waHref = "https://wa.me/998909829871";
    const desktopLinks = renderNavLinks(uiText.nav, context);
    const mobileLinks = renderNavLinks(uiText.nav, context);

    host.innerHTML = `
      <div class="container header-inner">
        <a class="logo-link" href="${withBase(`${context.currentLang}/index.html#hero`, context)}" aria-label="${uiText.logoAria}">
          <img src="${logoPath}" alt="Zangiota Zam-Zam" width="70" height="70" />
        </a>
        <nav class="site-nav desktop-nav" aria-label="${uiText.desktopNavAria}">
          ${desktopLinks}
        </nav>
        <div class="header-actions desktop-actions">
          ${renderLangSwitcher(context, false)}
          <a class="wa-pill" href="${waHref}" target="_blank" rel="noopener noreferrer">${uiText.waText}</a>
        </div>
        <button
          class="menu-toggle"
          id="menuToggle"
          type="button"
          aria-expanded="false"
          aria-controls="mobileMenu"
          aria-label="${uiText.menuAria}"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" id="mobileMenu">
        <nav class="site-nav mobile-nav" aria-label="${uiText.mobileNavAria}">
          ${mobileLinks}
        </nav>
        <div class="header-actions mobile-actions">
          <a class="wa-pill" href="${waHref}" target="_blank" rel="noopener noreferrer">${uiText.waText}</a>
        </div>
        ${renderLangSwitcher(context, true)}
      </div>
    `;

    return true;
  }

  const renderedImmediately = renderNavbar();

  if (!renderedImmediately) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", renderNavbar, { once: true });
    } else {
      renderNavbar();
    }
  }
})();
