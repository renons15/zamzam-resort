const SUPPORTED_LANGS = ["ru", "uz", "kk"];

function getCurrentLang() {
  const lang = (document.documentElement.lang || "").toLowerCase();
  return SUPPORTED_LANGS.includes(lang) ? lang : "ru";
}

const currentLang = getCurrentLang();

const uiTextByLang = {
  ru: {
    reviewLabel: "Отзыв",
    reviewLink: "Открыть отзыв",
    perNight: "ночь",
    perDay: "сутки",
    adultForms: ["взрослый", "взрослых", "взрослых"],
    childForms: ["ребенок", "ребенка", "детей"],
    formSuccess: "Спасибо! Мы свяжемся с вами в ближайшее время."
  },
  uz: {
    reviewLabel: "Sharh",
    reviewLink: "Sharhni ochish",
    perNight: "kecha",
    perDay: "kun",
    adultForms: ["katta", "katta", "katta"],
    childForms: ["bola", "bola", "bola"],
    formSuccess: "Rahmat! Tez orada siz bilan bog'lanamiz."
  },
  kk: {
    reviewLabel: "Пікір",
    reviewLink: "Пікірді ашу",
    perNight: "түн",
    perDay: "тәулік",
    adultForms: ["ересек", "ересек", "ересек"],
    childForms: ["бала", "бала", "бала"],
    formSuccess: "Рақмет! Жақын арада сізбен хабарласамыз."
  }
};

const roomDataByLang = {
  ru: {
    standart: {
      name: "Стандарт (2-ой этаж)",
      size: "20 м²",
      building: "Основной корпус",
      pricePerNight: 490000,
      priceSingle: 710000,
      priceChild: 392000,
      currency: "сум",
      features: [
        "Однокомнатный двухместный номер",
        "LCD TV и WiFi",
        "Холодильник",
        "Кондиционер",
        "Душевая и туалет внутри номера"
      ],
      image: "assets/old/images/standart.jpg"
    },
    polulux1: {
      name: "Полулюкс (1-комнатный, 36 м²)",
      size: "36 м²",
      building: "Основной корпус",
      pricePerNight: 650000,
      priceSingle: 943000,
      priceChild: 520000,
      currency: "сум",
      features: [
        "2-х местный однокомнатный номер",
        "Отдельный санузел",
        "LCD TV",
        "Холодильник",
        "Мягкая мебель",
        "Балкон с видом на сад"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    polulux2: {
      name: "Полулюкс (2-комнатный)",
      size: "2 комнаты",
      building: "Основной корпус",
      pricePerNight: 670000,
      priceSingle: 972000,
      priceChild: 536000,
      currency: "сум",
      features: [
        "2-х местное размещение",
        "Две уютные комнаты",
        "Санузел",
        "LCD TV",
        "Холодильник",
        "Балкон с видом на сад"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    lux: {
      name: "Люкс (2-комнатный)",
      size: "55 м²",
      building: "Основной корпус",
      pricePerNight: 890000,
      priceSingle: 1291000,
      priceChild: 712000,
      currency: "сум",
      features: [
        "VIP номер на две персоны",
        "2 комнаты, около 56 м²",
        "Красивая мебель и удобные диваны",
        "LCD-42d",
        "Холодильник",
        "Просторный санузел",
        "Балконы с видом на сад"
      ],
      image: "assets/old/images/lux.jpg"
    }
  },
  uz: {
    standart: {
      name: "Standart",
      size: "18 m²",
      building: "Asosiy korpus",
      pricePerNight: 490000,
      priceSingle: 710000,
      priceChild: 392000,
      currency: "so'm",
      features: [
        "2 ta bir kishilik karavot",
        "Tumbochka, stol, stullar, shkaf",
        "Televizor, WI-FI",
        "Muzlatgich",
        "Konditsioner",
        "Choy to'plami, choynak",
        "Dush, hojatxona",
        "Fen, sochiqlar, xalat"
      ],
      image: "assets/old/images/standart.jpg"
    },
    polulux1: {
      name: "Polulyuks (1 xonali)",
      size: "20-35 m²",
      building: "Asosiy korpus",
      pricePerNight: 650000,
      priceSingle: 943000,
      priceChild: 520000,
      currency: "so'm",
      features: [
        "2 ta bir kishilik yoki 1 ta ikki kishilik karavot",
        "Tumbochka, stol, stullar, shkaf",
        "Televizor, WI-FI",
        "Muzlatgich",
        "Konditsioner",
        "Choy to'plami, choynak",
        "Dush, hojatxona",
        "Fen, sochiqlar, xalat, shippak"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    polulux2: {
      name: "Polulyuks (2 xonali)",
      size: "20-35 m²",
      building: "Asosiy korpus",
      pricePerNight: 670000,
      priceSingle: 972000,
      priceChild: 536000,
      currency: "so'm",
      features: [
        "2 ta bir kishilik yoki 1 ta ikki kishilik karavot",
        "Qo'shimcha mehmonxona zonasi",
        "Tumbochka, stol, stullar, shkaf",
        "Televizor, WI-FI",
        "Muzlatgich",
        "Konditsioner",
        "Choy to'plami, choynak",
        "Dush, hojatxona",
        "Fen, sochiqlar, xalat, shippak"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    lux: {
      name: "Lyuks",
      size: "40 m²",
      building: "Asosiy korpus",
      pricePerNight: 890000,
      priceSingle: 1291000,
      priceChild: 712000,
      currency: "so'm",
      features: [
        "2 kishilik karavot",
        "Tumbochka, stol, stullar, shkaf, divan",
        "Televizor, Wi-FI",
        "Muzlatgich",
        "Konditsioner",
        "Choy to'plami, choynak",
        "Dush, hojatxona",
        "Fen, sochiqlar, xalat, shippak"
      ],
      image: "assets/old/images/lux.jpg"
    }
  },
  kk: {
    standart: {
      name: "Стандарт",
      size: "18 м²",
      building: "Негізгі корпус",
      pricePerNight: 490000,
      priceSingle: 710000,
      priceChild: 392000,
      currency: "сом",
      features: [
        "2 бір орынды төсек",
        "Тумба, үстел, орындықтар, шкаф",
        "Теледидар, WI-FI",
        "Тоңазытқыш",
        "Кондиционер",
        "Шай жиынтығы, шайнек",
        "Душ, әжетхана",
        "Фен, сүлгілер, халат"
      ],
      image: "assets/old/images/standart.jpg"
    },
    polulux1: {
      name: "Жартылай люкс (1 бөлмелі)",
      size: "20-35 м²",
      building: "Негізгі корпус",
      pricePerNight: 650000,
      priceSingle: 943000,
      priceChild: 520000,
      currency: "сом",
      features: [
        "2 бір орынды немесе 1 екі орынды төсек",
        "Тумба, үстел, орындықтар, шкаф",
        "Теледидар, WI-FI",
        "Тоңазытқыш",
        "Кондиционер",
        "Шай жиынтығы, шайнек",
        "Душ, әжетхана",
        "Фен, сүлгілер, халат, тәпішке"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    polulux2: {
      name: "Жартылай люкс (2 бөлмелі)",
      size: "20-35 м²",
      building: "Негізгі корпус",
      pricePerNight: 670000,
      priceSingle: 972000,
      priceChild: 536000,
      currency: "сом",
      features: [
        "2 бір орынды немесе 1 екі орынды төсек",
        "Қосымша қонақ бөлме аймағы",
        "Тумба, үстел, орындықтар, шкаф",
        "Теледидар, WI-FI",
        "Тоңазытқыш",
        "Кондиционер",
        "Шай жиынтығы, шайнек",
        "Душ, әжетхана",
        "Фен, сүлгілер, халат, тәпішке"
      ],
      image: "assets/old/images/polulux.jpg"
    },
    lux: {
      name: "Люкс",
      size: "40 м²",
      building: "Негізгі корпус",
      pricePerNight: 890000,
      priceSingle: 1291000,
      priceChild: 712000,
      currency: "сом",
      features: [
        "2 кісілік төсек",
        "Тумба, үстел, орындықтар, шкаф, диван",
        "Теледидар, Wi-FI",
        "Тоңазытқыш",
        "Кондиционер",
        "Шай жиынтығы, шайнек",
        "Душ, әжетхана",
        "Фен, сүлгілер, халат, тәпішке"
      ],
      image: "assets/old/images/lux.jpg"
    }
  }
};

const reviewsByLang = {
  ru: [
    {
      name: "Мария К.",
      city: "Самарканд",
      date: "03.03.2025",
      rating: 5,
      text: "Вода — словно эликсир молодости. Сон и кожа стали лучше.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Алексей П.",
      city: "Ташкент",
      date: "12.04.2025",
      rating: 5,
      text: "Прекрасный санаторий с отличным сервисом и лечением!",
      url: "__REVIEW_URL__"
    },
    {
      name: "Наталья Б.",
      city: "Навои",
      date: "18.02.2025",
      rating: 5,
      text: "Природа потрясающая, процедуры эффективные.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Сергей В.",
      city: "Фергана",
      date: "27.01.2025",
      rating: 5,
      text: "Рекомендую, особенно людям с проблемами суставов.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Елена Д.",
      city: "Бухара",
      date: "10.01.2025",
      rating: 5,
      text: "Вернулась домой полная сил, здоровья. Персонал отличный.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Ольга Ш.",
      city: "Андижан",
      date: "22.12.2024",
      rating: 5,
      text: "Лечебная вода творит чудеса. Очень довольна.",
      url: "__REVIEW_URL__"
    }
  ],
  uz: [
    {
      name: "Mariya K.",
      city: "Samarqand",
      date: "03.03.2025",
      rating: 5,
      text: "Suv go'yo yoshlik eliksiri. Uyqu ham, terim ham yaxshilandi.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Aleksey P.",
      city: "Toshkent",
      date: "12.04.2025",
      rating: 5,
      text: "Ajoyib servis va davolashga ega zo'r sanatoriy!",
      url: "__REVIEW_URL__"
    },
    {
      name: "Natalya B.",
      city: "Navoiy",
      date: "18.02.2025",
      rating: 5,
      text: "Tabiat ajoyib, muolajalar samarali.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Sergey V.",
      city: "Farg'ona",
      date: "27.01.2025",
      rating: 5,
      text: "Tavsiya qilaman, ayniqsa bo'g'im muammosi borlarga.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Elena D.",
      city: "Buxoro",
      date: "10.01.2025",
      rating: 5,
      text: "Uyga kuch va sog'liq bilan qaytdim. Jamoa zo'r.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Olga Sh.",
      city: "Andijon",
      date: "22.12.2024",
      rating: 5,
      text: "Shifobaxsh suv mo''jiza qiladi. Juda mamnunman.",
      url: "__REVIEW_URL__"
    }
  ],
  kk: [
    {
      name: "Мария К.",
      city: "Самарқанд",
      date: "03.03.2025",
      rating: 5,
      text: "Су жастық эликсиріндей. Ұйқы мен терім жақсарды.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Алексей П.",
      city: "Ташкент",
      date: "12.04.2025",
      rating: 5,
      text: "Қызметі мен емі өте жақсы керемет шипажай!",
      url: "__REVIEW_URL__"
    },
    {
      name: "Наталья Б.",
      city: "Науаи",
      date: "18.02.2025",
      rating: 5,
      text: "Табиғат тамаша, емшаралар тиімді.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Сергей В.",
      city: "Ферғана",
      date: "27.01.2025",
      rating: 5,
      text: "Ұсынамын, әсіресе буын мәселесі бар адамдарға.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Елена Д.",
      city: "Бұхара",
      date: "10.01.2025",
      rating: 5,
      text: "Үйге күш-қуатпен оралдым. Қызметкерлер керемет.",
      url: "__REVIEW_URL__"
    },
    {
      name: "Ольга Ш.",
      city: "Андижан",
      date: "22.12.2024",
      rating: 5,
      text: "Емдік су керемет әсер береді. Өте ризамын.",
      url: "__REVIEW_URL__"
    }
  ]
};

const roomData = roomDataByLang[currentLang] || roomDataByLang.ru;
const reviews = reviewsByLang[currentLang] || reviewsByLang.ru;
const uiText = uiTextByLang[currentLang] || uiTextByLang.ru;

const state = {
  activeRoomId: "standart",
  adults: 2,
  children: 0
};

function formatPrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function setCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}

function initHeaderScrollResize() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeaderState = () => {
    header.classList.toggle("scrolled", window.scrollY > 4);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function initHeroParallax() {
  const hero = document.getElementById("hero");
  const heroBackground = hero?.querySelector(".hero-background");
  if (!hero || !heroBackground) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 1100px)").matches) return;

  let ticking = false;
  const speed = 0.24;
  const maxOffset = 120;

  const updateParallax = () => {
    const rect = hero.getBoundingClientRect();
    if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
      ticking = false;
      return;
    }

    const offset = Math.min(maxOffset, Math.max(0, -rect.top * speed));
    heroBackground.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function initAboutGalleryParallax() {
  const gallery = document.querySelector(".about-gallery");
  if (!gallery) return;
  const images = Array.from(gallery.querySelectorAll(".about-photo img"));
  if (images.length === 0) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia("(max-width: 1100px)").matches) return;

  let ticking = false;
  const maxOffset = 22;
  const intensity = 0.08;

  const updateParallax = () => {
    const viewportCenter = window.innerHeight / 2;

    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const imageCenter = rect.top + rect.height / 2;
      const offset = Math.max(
        -maxOffset,
        Math.min(maxOffset, (viewportCenter - imageCenter) * intensity)
      );
      image.style.setProperty("--about-parallax-y", `${offset.toFixed(2)}px`);
    });

    ticking = false;
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  };

  updateParallax();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function initMobileMenu() {
  const toggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  if (!toggle || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    toggle.classList.toggle("is-open", !isExpanded);
    mobileMenu.classList.toggle("is-open", !isExpanded);
  };

  toggle.addEventListener("click", toggleMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("is-open");
      mobileMenu.classList.remove("is-open");
    });
  });
}

function setDateValue(input, date) {
  if (!input) return;
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  input.value = localDate.toISOString().split("T")[0];
}

function initBookingDates() {
  const checkin = document.getElementById("checkinInput");
  const checkout = document.getElementById("checkoutInput");
  if (!checkin || !checkout) return;

  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  setDateValue(checkin, today);
  setDateValue(checkout, nextWeek);
  const minDate = checkin.value;
  checkin.min = minDate;
  checkout.min = minDate;

  checkin.addEventListener("change", () => {
    checkout.min = checkin.value;
    if (checkout.value < checkin.value) {
      checkout.value = checkin.value;
    }
  });
}

function pluralizeRu(value, one, few, many) {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return few;
  return many;
}

function pluralizeByLang(value, forms, lang) {
  if (lang !== "ru") return forms[2];
  return pluralizeRu(value, forms[0], forms[1], forms[2]);
}

function updateGuestSummary() {
  const adultsCount = document.getElementById("adultsCount");
  const childrenCount = document.getElementById("childrenCount");
  const summary = document.getElementById("guestSummary");
  if (!adultsCount || !childrenCount || !summary) return;

  adultsCount.textContent = String(state.adults);
  childrenCount.textContent = String(state.children);

  const adultText = `${state.adults} ${pluralizeByLang(state.adults, uiText.adultForms, currentLang)}`;
  const childrenText = `${state.children} ${pluralizeByLang(state.children, uiText.childForms, currentLang)}`;
  summary.textContent = `${adultText}, ${childrenText}`;
}

function initGuestPicker() {
  const trigger = document.getElementById("guestTrigger");
  const popover = document.getElementById("guestPopover");
  if (!trigger || !popover) return;

  const setOpen = (isOpen) => {
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    popover.hidden = !isOpen;
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(popover.hidden);
  });

  document.getElementById("guestDone")?.addEventListener("click", () => setOpen(false));
  document.getElementById("adultsMinus")?.addEventListener("click", () => {
    state.adults = Math.max(1, state.adults - 1);
    updateGuestSummary();
  });
  document.getElementById("adultsPlus")?.addEventListener("click", () => {
    state.adults = Math.min(10, state.adults + 1);
    updateGuestSummary();
  });
  document.getElementById("childrenMinus")?.addEventListener("click", () => {
    state.children = Math.max(0, state.children - 1);
    updateGuestSummary();
  });
  document.getElementById("childrenPlus")?.addEventListener("click", () => {
    state.children = Math.min(10, state.children + 1);
    updateGuestSummary();
  });

  document.addEventListener("click", (event) => {
    if (popover.hidden) return;
    if (!popover.contains(event.target) && !trigger.contains(event.target)) {
      setOpen(false);
    }
  });

  updateGuestSummary();
}

function createCheckIcon() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("fill", "none");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "M5 13l4 4L19 7");
  icon.appendChild(path);
  return icon;
}

function renderRoom(roomId) {
  const room = roomData[roomId];
  if (!room) return;
  state.activeRoomId = roomId;

  document.querySelectorAll(".room-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.roomId === roomId);
  });

  const roomName = document.getElementById("roomName");
  const roomSize = document.getElementById("roomSize");
  const roomBuilding = document.getElementById("roomBuilding");
  const roomPriceHeader = document.getElementById("roomPriceHeader");
  const roomCurrencyHeader = document.getElementById("roomCurrencyHeader");
  const roomPriceDouble = document.getElementById("roomPriceDouble");
  const roomPriceSingle = document.getElementById("roomPriceSingle");
  const roomPriceChild = document.getElementById("roomPriceChild");
  const roomFeatures = document.getElementById("roomFeatures");
  const roomImage = document.getElementById("roomImage");
  const roomPriceImage = document.getElementById("roomPriceImage");
  const roomCurrencyImage = document.getElementById("roomCurrencyImage");

  if (
    !roomName ||
    !roomSize ||
    !roomBuilding ||
    !roomPriceHeader ||
    !roomCurrencyHeader ||
    !roomPriceDouble ||
    !roomPriceSingle ||
    !roomPriceChild ||
    !roomFeatures ||
    !roomImage ||
    !roomPriceImage ||
    !roomCurrencyImage
  ) {
    return;
  }

  roomName.textContent = room.name;
  roomSize.textContent = room.size;
  roomBuilding.textContent = room.building;
  roomPriceHeader.textContent = formatPrice(room.pricePerNight);
  roomCurrencyHeader.textContent = `${room.currency}/${uiText.perNight}`;
  roomPriceDouble.textContent = `${formatPrice(room.pricePerNight)} ${room.currency} / ${uiText.perDay}`;
  roomPriceSingle.textContent = `${formatPrice(room.priceSingle)} ${room.currency} / ${uiText.perDay}`;
  roomPriceChild.textContent = `${formatPrice(room.priceChild)} ${room.currency} / ${uiText.perDay}`;
  roomImage.src = room.image;
  roomImage.alt = room.name;
  roomPriceImage.textContent = formatPrice(room.pricePerNight);
  roomCurrencyImage.textContent = `${room.currency} / ${uiText.perNight}`;

  roomFeatures.innerHTML = "";
  room.features.forEach((featureText) => {
    const item = document.createElement("li");
    item.appendChild(createCheckIcon());
    const text = document.createElement("span");
    text.textContent = featureText;
    item.appendChild(text);
    roomFeatures.appendChild(item);
  });
}

function initRoomTabs() {
  document.querySelectorAll(".room-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const roomId = button.dataset.roomId;
      if (!roomId) return;
      renderRoom(roomId);
    });
  });

  renderRoom(state.activeRoomId);
}

function createStarIcon() {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 20 20");
  icon.setAttribute("fill", "currentColor");
  icon.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  );
  icon.appendChild(path);
  return icon;
}

function getReviewInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk.charAt(0))
    .join("")
    .toUpperCase();
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card reveal";

  const author = document.createElement("div");
  author.className = "review-author";

  const avatar = document.createElement("div");
  avatar.className = "review-avatar";
  avatar.textContent = getReviewInitials(review.name);

  const meta = document.createElement("div");

  const nameLocation = document.createElement("h4");
  nameLocation.textContent = `${review.name}, ${review.city}`;

  meta.appendChild(nameLocation);
  if (review.date) {
    const date = document.createElement("p");
    date.className = "review-date";
    date.textContent = review.date;
    meta.appendChild(date);
  }

  author.appendChild(avatar);
  author.appendChild(meta);

  const stars = document.createElement("div");
  stars.className = "review-stars";
  const rating = Math.max(0, Math.min(5, Number(review.rating) || 0));
  stars.setAttribute("aria-label", `${uiText.reviewLabel}: ${rating}/5`);
  for (let i = 0; i < rating; i += 1) {
    stars.appendChild(createStarIcon());
  }

  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = review.text;

  const link = document.createElement("a");
  link.className = "review-more";
  link.href = review.url || "__REVIEW_URL__";
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = uiText.reviewLink;

  card.appendChild(author);
  card.appendChild(stars);
  card.appendChild(text);
  card.appendChild(link);
  return card;
}

function initReviews() {
  const reviewGrid = document.getElementById("reviewGrid");
  if (!reviewGrid) return;

  reviewGrid.innerHTML = "";
  reviews.slice(0, 6).forEach((review) => {
    reviewGrid.appendChild(createReviewCard(review));
  });
}

function initRevealAnimations() {
  const elements = Array.from(document.querySelectorAll(".reveal"));
  if (elements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (!form || !formStatus) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = uiText.formSuccess;
    form.reset();
  });
}

function bootstrap() {
  setCurrentYear();
  initHeaderScrollResize();
  initHeroParallax();
  initMobileMenu();
  initBookingDates();
  initGuestPicker();
  initRoomTabs();
  initReviews();
  initRevealAnimations();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", bootstrap);
