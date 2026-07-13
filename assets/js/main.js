const SUPPORTED_LANGS = ["ru", "uz", "kk"];

function getCurrentLang() {
  const lang = (document.documentElement.lang || "").toLowerCase();
  return SUPPORTED_LANGS.includes(lang) ? lang : "ru";
}

const currentLang = getCurrentLang();

function resolveAssetPath(path) {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const parentDir = parts.length > 1 ? parts[parts.length - 2] : "";
  return SUPPORTED_LANGS.includes(parentDir) && parentDir !== "ru" ? `../${path}` : path;
}

const uiTextByLang = {
  ru: {
    reviewLabel: "Отзыв",
    reviewLink: "Открыть отзыв",
    reviewSectionSubtitle:
      "Мы ценим мнение каждого гостя. Настоящие отзывы помогают другим людям выбрать санаторий.",
    reviewStatsAria: "Рейтинг и источники отзывов",
    reviewBasedOn: "На основе {count}+ оценок",
    reviewPositive: "{percent}% положительных оценок по ключевым аспектам",
    reviewLeave: "Оставить отзыв",
    reviewVerified: "Проверенный отзыв",
    reviewSource: "Источник",
    reviewCityFallback: "город не указан",
    reviewPrevious: "Предыдущая страница отзывов",
    reviewNext: "Следующая страница отзывов",
    reviewNoResults: "Для выбранной категории пока нет проверенных отзывов.",
    reviewSourceReviews: "{count} отзывов",
    reviewSourceRatings: "{count} оценок",
    perNight: "ночь",
    perDay: "сутки",
    adultForms: ["взрослый", "взрослых", "взрослых"],
    childForms: ["ребенок", "ребенка", "детей"],
    formSuccess: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    contactSending: "Отправляем вопрос…",
    contactSuccess: "Вопрос отправлен. Мы свяжемся с вами в ближайшее время.",
    contactError: "Не удалось отправить вопрос. Попробуйте еще раз или свяжитесь с нами по телефону.",
    bookingDateMinimum: "Выберите даты проживания минимум на 10 суток.",
    bookingPhoneInvalid: "Введите корректный номер телефона.",
    bookingRoomRequired: "Выберите тип номера.",
    selectedRoomTypes: "Выбрано типов номера: {count}",
    datePlaceholder: "Выберите дату",
    minimumStayLabel: "Минимум 10 суток",
    previousMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    guestRoomSummary: "1 номер",
    bookingSending: "Отправляем запрос…",
    bookingSuccess: "Запрос отправлен. Администратор свяжется с вами для подтверждения.",
    bookingError: "Не удалось отправить запрос. Попробуйте еще раз или свяжитесь с нами по телефону."
  },
  uz: {
    reviewLabel: "Sharh",
    reviewLink: "Sharhni ochish",
    reviewSectionSubtitle:
      "Biz har bir mehmon fikrini qadrlaymiz. Haqiqiy sharhlar boshqalarga sanatoriyni tanlashda yordam beradi.",
    reviewStatsAria: "Sharhlar reytingi va manbalari",
    reviewBasedOn: "{count}+ baho asosida",
    reviewPositive: "Asosiy jihatlar bo'yicha {percent}% ijobiy baho",
    reviewLeave: "Sharh qoldirish",
    reviewVerified: "Tasdiqlangan sharh",
    reviewSource: "Manba",
    reviewCityFallback: "shahar ko'rsatilmagan",
    reviewPrevious: "Oldingi sharhlar sahifasi",
    reviewNext: "Keyingi sharhlar sahifasi",
    reviewNoResults: "Tanlangan kategoriya uchun tasdiqlangan sharhlar hozircha yo'q.",
    reviewSourceReviews: "{count} sharh",
    reviewSourceRatings: "{count} baho",
    perNight: "kecha",
    perDay: "kun",
    adultForms: ["katta", "katta", "katta"],
    childForms: ["bola", "bola", "bola"],
    formSuccess: "Rahmat! Tez orada siz bilan bog'lanamiz.",
    contactSending: "Savol yuborilmoqda…",
    contactSuccess: "Savol yuborildi. Tez orada siz bilan bog'lanamiz.",
    contactError: "Savolni yuborib bo'lmadi. Qayta urinib ko'ring yoki biz bilan telefon orqali bog'laning.",
    bookingDateMinimum: "Kamida 10 kunlik yashash sanalarini tanlang.",
    bookingPhoneInvalid: "To'g'ri telefon raqamini kiriting.",
    bookingRoomRequired: "Xona turini tanlang.",
    selectedRoomTypes: "Tanlangan xona turlari: {count}",
    datePlaceholder: "Sanani tanlang",
    minimumStayLabel: "Kamida 10 kun",
    previousMonth: "Oldingi oy",
    nextMonth: "Keyingi oy",
    guestRoomSummary: "1 xona",
    bookingSending: "So'rov yuborilmoqda…",
    bookingSuccess: "So'rov yuborildi. Administrator tasdiqlash uchun siz bilan bog'lanadi.",
    bookingError: "So'rovni yuborib bo'lmadi. Qayta urinib ko'ring yoki biz bilan telefon orqali bog'laning."
  },
  kk: {
    reviewLabel: "Пікір",
    reviewLink: "Пікірді ашу",
    reviewSectionSubtitle:
      "Біз әр қонақтың пікірін бағалаймыз. Шынайы пікірлер басқа адамдарға шипажайды таңдауға көмектеседі.",
    reviewStatsAria: "Пікірлер рейтингі және дереккөздер",
    reviewBasedOn: "{count}+ баға негізінде",
    reviewPositive: "Негізгі аспектілер бойынша {percent}% оң баға",
    reviewLeave: "Пікір қалдыру",
    reviewVerified: "Расталған пікір",
    reviewSource: "Дереккөз",
    reviewCityFallback: "қала көрсетілмеген",
    reviewPrevious: "Алдыңғы пікірлер беті",
    reviewNext: "Келесі пікірлер беті",
    reviewNoResults: "Таңдалған санат үшін расталған пікірлер әзірге жоқ.",
    reviewSourceReviews: "{count} пікір",
    reviewSourceRatings: "{count} баға",
    perNight: "түн",
    perDay: "тәулік",
    adultForms: ["ересек", "ересек", "ересек"],
    childForms: ["бала", "бала", "бала"],
    formSuccess: "Рақмет! Жақын арада сізбен хабарласамыз.",
    contactSending: "Сұрақ жіберілуде…",
    contactSuccess: "Сұрақ жіберілді. Жақын арада сізбен хабарласамыз.",
    contactError: "Сұрақты жіберу мүмкін болмады. Қайталап көріңіз немесе бізге телефон шалыңыз.",
    bookingDateMinimum: "Кемінде 10 тәулік тұру күндерін таңдаңыз.",
    bookingPhoneInvalid: "Дұрыс телефон нөмірін енгізіңіз.",
    bookingRoomRequired: "Бөлме түрін таңдаңыз.",
    selectedRoomTypes: "Таңдалған бөлме түрлері: {count}",
    datePlaceholder: "Күнді таңдаңыз",
    minimumStayLabel: "Кемінде 10 тәулік",
    previousMonth: "Алдыңғы ай",
    nextMonth: "Келесі ай",
    guestRoomSummary: "1 бөлме",
    bookingSending: "Сұраныс жіберілуде…",
    bookingSuccess: "Сұраныс жіберілді. Әкімші растау үшін сізбен хабарласады.",
    bookingError: "Сұранысты жіберу мүмкін болмады. Қайталап көріңіз немесе бізге телефон шалыңыз."
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
      image: "images/standart.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/lux.jpg"
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
      image: "images/standart.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/lux.jpg"
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
      image: "images/standart.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/polulux.jpg"
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
      image: "images/lux.jpg"
    }
  }
};

const YANDEX_REVIEWS_URL =
  "https://yandex.com/maps/?mode=search&tab=reviews&ol=biz&oid=70228850210";
const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Zangiota%20Zam-Zam%20MCHJ";

const reviewStats = {
  rating: 4.9,
  totalCount: 751,
  positivePercent: 97,
  ctaUrl: YANDEX_REVIEWS_URL,
  sources: [
    {
      source: "Яндекс Карты",
      sourceKey: "yandex",
      rating: 5,
      count: 229,
      countType: "reviews",
      sourceUrl: YANDEX_REVIEWS_URL
    },
    {
      source: "Google Reviews",
      sourceKey: "google",
      rating: 4.6,
      count: 235,
      countType: "reviews",
      sourceUrl: GOOGLE_REVIEWS_URL
    }
  ]
};

const verifiedReviews = [
  {
    id: "yandex-BQbopop7TFQtFQeIFXz0oteWMNy9NT",
    reviewId: "BQbopop7TFQtFQeIFXz0oteWMNy9NT",
    name: "Надежда Захарчук",
    city: "",
    date: "2026-05-06",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "food"],
    verified: true,
    text:
      "Хочу поблагодарить санаторий ZamZam, глав/врача Олимбой Камоловича за прекрасный, оздоровительный комплекс, за чистейшую, полезную минеральную воду..."
  },
  {
    id: "yandex-AQIM3J_sDEvsrDPoFAtWfouDls3e-K",
    reviewId: "AQIM3J_sDEvsrDPoFAtWfouDls3e-K",
    name: "Gulnora Sadieva",
    city: "",
    date: "2026-01-21",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "stay", "food", "procedures"],
    verified: true,
    text:
      "Идеальное место для восстановления сил и здоровья! «Провели в санатории «Zangiota Zam-Zam» незабываемые 10 дней..."
  },
  {
    id: "yandex-0fGgz3ded6KAI7c7bZNiZtZJl8mRA4",
    reviewId: "0fGgz3ded6KAI7c7bZNiZtZJl8mRA4",
    name: "Гульмира К",
    city: "",
    date: "2026-01-10",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "procedures"],
    verified: true,
    text:
      "Мы с дочкой и сестрой посетили санаторий Zam-Zam, и у нас остались самые тёплые и приятные впечатления."
  },
  {
    id: "yandex-gf5eE2ZAruER8rrx4pTbqVblITOSCQb45",
    reviewId: "gf5eE2ZAruER8rrx4pTbqVblITOSCQb45",
    name: "Феруза Ибрагимова",
    city: "",
    date: "2025-12-30",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["stay", "staff", "food"],
    verified: true,
    text:
      "Территория ухоженная, чистая, приятно прогуливаться. Персонал вежливый и отзывчивый, всегда готов помочь..."
  },
  {
    id: "yandex-dD2A56hsEyQvk6JN1jGLsXLrkvS8z3od",
    reviewId: "dD2A56hsEyQvk6JN1jGLsXLrkvS8z3od",
    name: "Анастасия",
    city: "",
    date: "2026-02-25",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "procedures"],
    verified: true,
    text:
      "Очень внимательный и грамотный персонал.никакой вопрос не останется без ответа. Доктор Азиза Абдуалиевна Нишанова..."
  },
  {
    id: "yandex-ug-rQ8WRA-C6qBgjXY18gfijl4uI2g",
    reviewId: "ug-rQ8WRA-C6qBgjXY18gfijl4uI2g",
    name: "Бану Сабыркеева",
    city: "",
    date: "2026-01-07",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "procedures"],
    verified: true,
    text:
      "Нас встретили с теплотой и заботой. Нас обслуживала врач физио терапевт Нишанова Азиза..."
  },
  {
    id: "yandex-PciUJioGiMJDvx6coxVHUShSigx85l",
    reviewId: "PciUJioGiMJDvx6coxVHUShSigx85l",
    name: "Надежда Ли",
    city: "",
    date: "2026-03-11",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["stay", "staff", "food"],
    verified: true,
    text:
      "Приехали с мужем и остались очень довольны! Санаторий находится близко от города , территория чистая, зелёная, красивая!"
  },
  {
    id: "yandex-SeNAMBbvrqFK9v2QVhTr_MoZUVSH4GMvd",
    reviewId: "SeNAMBbvrqFK9v2QVhTr_MoZUVSH4GMvd",
    name: "alsu i.",
    city: "",
    date: "2026-04-20",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "stay"],
    verified: true,
    text:
      "В санатории Зангиота отдыхали с 7 по 20 апреля 2026 года. Сразу хочется сказать, что все положительные отзывы..."
  },
  {
    id: "yandex-665vEK1obNVRnWDAfIio9xGaC-H6NBb",
    reviewId: "665vEK1obNVRnWDAfIio9xGaC-H6NBb",
    name: "Ирина Афанасьева",
    city: "",
    date: "2026-03-16",
    rating: 5,
    source: "Яндекс Карты",
    sourceKey: "yandex",
    sourceUrl: YANDEX_REVIEWS_URL,
    category: ["treatment", "staff", "procedures"],
    verified: true,
    text:
      "Очень хорошее лечение и разнообразные процедуры.Очень понравилась минеральная ванна,электропроцедуры на современных аппаратах."
  }
];

const reviewsByLang = {
  ru: verifiedReviews,
  uz: verifiedReviews,
  kk: verifiedReviews
};

const roomData = roomDataByLang[currentLang] || roomDataByLang.ru;
const reviews = reviewsByLang[currentLang] || reviewsByLang.ru;
const uiText = uiTextByLang[currentLang] || uiTextByLang.ru;

const REVIEW_PAGE_SIZE = 3;
const reviewState = {
  page: 1
};

const reviewSourceMeta = {
  yandex: {
    icon: "Я",
    label: "Яндекс Карты"
  },
  google: {
    icon: "G",
    label: "Google Reviews"
  },
  twogis: {
    icon: "2G",
    label: "2GIS"
  }
};

let revealAnimationsReady = false;

const state = {
  activeRoomId: "standart",
  adults: 2,
  children: 0
};

const BOOKING_MINIMUM_NIGHTS = 10;
const DAY_MS = 86_400_000;
const localeByLang = {
  ru: "ru-RU",
  uz: "uz-UZ",
  kk: "kk-KZ"
};
const bookingLocale = localeByLang[currentLang] || localeByLang.ru;

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
  if (window.matchMedia("(max-width: 1199px)").matches) return;

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
  if (window.matchMedia("(max-width: 1199px)").matches) return;

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

  const desktopMq = window.matchMedia("(min-width: 1200px)");
  const isMenuOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const setMenuState = (open) => {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    mobileMenu.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("menu-open", open);
  };

  setMenuState(false);

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setMenuState(!isMenuOpen());
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!isMenuOpen()) return;
    if (target instanceof Node && (mobileMenu.contains(target) || toggle.contains(target))) return;
    setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      setMenuState(false);
      toggle.focus();
    }
  });

  const closeOnDesktop = () => {
    if (desktopMq.matches) setMenuState(false);
  };

  closeOnDesktop();
  if (typeof desktopMq.addEventListener === "function") desktopMq.addEventListener("change", closeOnDesktop);
  else if (typeof desktopMq.addListener === "function") desktopMq.addListener(closeOnDesktop);
}

function formatDateValue(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTodayDate() {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

function setDateValue(input, date) {
  if (!input) return;
  input.value = formatDateValue(date);
}

function parseLocalDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return formatDateValue(date) === value ? date : null;
}

function addDays(date, days) {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function addMonths(date, months) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1));
}

function getMonthStart(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
}

function getDaysInMonth(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
}

function isSameDate(first, second) {
  return Boolean(first && second && formatDateValue(first) === formatDateValue(second));
}

function bookingNights(checkin, checkout) {
  const start = parseLocalDate(checkin);
  const end = parseLocalDate(checkout);
  if (!start || !end) return 0;
  return Math.round((end.getTime() - start.getTime()) / DAY_MS);
}

function formatBookingDate(date, options) {
  return new Intl.DateTimeFormat(bookingLocale, { timeZone: "UTC", ...options }).format(date);
}

function formatBookingMainDate(date) {
  return formatBookingDate(date, { day: "2-digit", month: "short", year: "numeric" }).replace(/\.$/, "");
}

function formatBookingWeekday(date) {
  return formatBookingDate(date, { weekday: "short" }).replace(/\.$/, "");
}

function formatBookingMonthTitle(date) {
  return formatBookingDate(date, { month: "long", year: "numeric" });
}

function getWeekdayLabels() {
  const monday = new Date(Date.UTC(2026, 5, 22));
  return Array.from({ length: 7 }, (_, index) => formatBookingDate(addDays(monday, index), { weekday: "short" }));
}

function closeBookingPopover(triggerId, popoverId) {
  const trigger = document.getElementById(triggerId);
  const popover = document.getElementById(popoverId);
  trigger?.setAttribute("aria-expanded", "false");
  if (popover) popover.hidden = true;
}

function ensureDefaultBookingDates(checkin, checkout) {
  const today = getTodayDate();
  const todayValue = formatDateValue(today);
  const selectedCheckin = parseLocalDate(checkin.value);

  if (!selectedCheckin || selectedCheckin.getTime() < today.getTime()) {
    setDateValue(checkin, today);
  }

  const activeCheckin = parseLocalDate(checkin.value) || today;
  const minimumCheckout = addDays(activeCheckin, BOOKING_MINIMUM_NIGHTS);
  checkin.min = todayValue;
  checkout.min = formatDateValue(minimumCheckout);

  if (!parseLocalDate(checkout.value) || bookingNights(checkin.value, checkout.value) < BOOKING_MINIMUM_NIGHTS) {
    setDateValue(checkout, minimumCheckout);
  }
}

function initNativeBookingDates(checkin, checkout) {
  ensureDefaultBookingDates(checkin, checkout);

  const updateCheckoutMinimum = () => {
    const selectedCheckin = parseLocalDate(checkin.value);
    if (!selectedCheckin) return;
    const nextMinimum = addDays(selectedCheckin, BOOKING_MINIMUM_NIGHTS);
    checkout.min = formatDateValue(nextMinimum);
    if (!checkout.value || bookingNights(checkin.value, checkout.value) < BOOKING_MINIMUM_NIGHTS) {
      setDateValue(checkout, nextMinimum);
    }
  };

  updateCheckoutMinimum();
  checkin.addEventListener("change", updateCheckoutMinimum);
}

function initBookingDates() {
  const checkin = document.getElementById("checkinInput");
  const checkout = document.getElementById("checkoutInput");
  if (!checkin || !checkout) return;

  const checkinTrigger = document.getElementById("checkinTrigger");
  const checkoutTrigger = document.getElementById("checkoutTrigger");
  const checkinDisplay = document.getElementById("checkinDisplay");
  const checkoutDisplay = document.getElementById("checkoutDisplay");
  const checkinMeta = document.getElementById("checkinMeta");
  const checkoutMeta = document.getElementById("checkoutMeta");
  const popover = document.getElementById("bookingCalendarPopover");
  const monthsHost = document.getElementById("bookingCalendarMonths");
  const clearButton = document.getElementById("calendarClear");
  const applyButton = document.getElementById("calendarApply");

  if (!checkinTrigger || !checkoutTrigger || !checkinDisplay || !checkoutDisplay || !popover || !monthsHost) {
    initNativeBookingDates(checkin, checkout);
    return;
  }

  ensureDefaultBookingDates(checkin, checkout);

  const calendarMq = window.matchMedia("(max-width: 767px)");
  const weekdayLabels = getWeekdayLabels();
  const picker = {
    activeField: "checkin",
    draftCheckin: parseLocalDate(checkin.value),
    draftCheckout: parseLocalDate(checkout.value),
    visibleMonth: getMonthStart(parseLocalDate(checkin.value) || getTodayDate()),
    isOpen: false,
    closeTimer: 0
  };

  const getMonthCount = () => (calendarMq.matches ? 1 : 2);

  const updateInputMinimums = () => {
    const selectedCheckin = parseLocalDate(checkin.value);
    checkin.min = formatDateValue(getTodayDate());
    if (selectedCheckin) checkout.min = formatDateValue(addDays(selectedCheckin, BOOKING_MINIMUM_NIGHTS));
    else checkout.removeAttribute("min");
  };

  const syncDateDisplays = () => {
    const selectedCheckin = parseLocalDate(checkin.value);
    const selectedCheckout = parseLocalDate(checkout.value);
    const showDate = (date, display, meta) => {
      if (!display) return;
      if (!date) {
        display.textContent = uiText.datePlaceholder;
        if (meta) meta.textContent = uiText.minimumStayLabel;
        return;
      }
      display.textContent = formatBookingMainDate(date);
      if (meta) meta.textContent = formatBookingWeekday(date);
    };

    showDate(selectedCheckin, checkinDisplay, checkinMeta);
    showDate(selectedCheckout, checkoutDisplay, checkoutMeta);
    document.getElementById("bookingDateHint")?.replaceChildren(document.createTextNode(uiText.minimumStayLabel));
    updateInputMinimums();
  };

  const isDraftRangeValid = () =>
    Boolean(
      picker.draftCheckin &&
        picker.draftCheckout &&
        bookingNights(formatDateValue(picker.draftCheckin), formatDateValue(picker.draftCheckout)) >=
          BOOKING_MINIMUM_NIGHTS
    );

  const isDateDisabled = (date) => {
    const today = getTodayDate();
    if (date.getTime() < today.getTime()) return true;
    if (picker.activeField === "checkout" && picker.draftCheckin) {
      return (
        bookingNights(formatDateValue(picker.draftCheckin), formatDateValue(date)) < BOOKING_MINIMUM_NIGHTS
      );
    }
    return false;
  };

  const focusCalendarDate = (date) => {
    if (!date) return;
    const button = monthsHost.querySelector(`.calendar-day[data-date="${formatDateValue(date)}"]:not(:disabled)`);
    if (button) button.focus({ preventScroll: true });
  };

  const ensureDateVisible = (date) => {
    const firstMonth = picker.visibleMonth;
    const lastMonth = addMonths(firstMonth, getMonthCount() - 1);
    const targetMonth = getMonthStart(date);
    if (targetMonth.getTime() < firstMonth.getTime()) {
      picker.visibleMonth = targetMonth;
      return true;
    }
    if (targetMonth.getTime() > lastMonth.getTime()) {
      picker.visibleMonth = getMonthCount() > 1 ? addMonths(targetMonth, -1) : targetMonth;
      return true;
    }
    return false;
  };

  const renderCalendar = () => {
    monthsHost.innerHTML = "";
    const monthCount = getMonthCount();

    for (let monthIndex = 0; monthIndex < monthCount; monthIndex += 1) {
      const monthDate = addMonths(picker.visibleMonth, monthIndex);
      monthsHost.appendChild(createCalendarMonth(monthDate, monthIndex, monthCount));
    }

    if (applyButton) {
      applyButton.disabled = !isDraftRangeValid();
      applyButton.setAttribute("aria-disabled", applyButton.disabled ? "true" : "false");
    }
  };

  function handleDayKeyboard(event) {
    const current = parseLocalDate(event.currentTarget.dataset.date);
    if (!current) return;

    let target = null;
    if (event.key === "ArrowRight") target = addDays(current, 1);
    else if (event.key === "ArrowLeft") target = addDays(current, -1);
    else if (event.key === "ArrowDown") target = addDays(current, 7);
    else if (event.key === "ArrowUp") target = addDays(current, -7);
    else if (event.key === "Home") target = addDays(current, -((current.getUTCDay() + 6) % 7));
    else if (event.key === "End") target = addDays(current, 6 - ((current.getUTCDay() + 6) % 7));
    else if (event.key === "PageDown") target = addMonths(current, 1);
    else if (event.key === "PageUp") target = addMonths(current, -1);

    if (!target) return;
    event.preventDefault();
    if (ensureDateVisible(target)) renderCalendar();
    window.requestAnimationFrame(() => focusCalendarDate(target));
  }

  function chooseDate(date) {
    if (isDateDisabled(date)) return;

    if (picker.activeField === "checkout" && picker.draftCheckin) {
      picker.draftCheckout = date;
      picker.activeField = "checkin";
    } else {
      picker.draftCheckin = date;
      if (
        !picker.draftCheckout ||
        bookingNights(formatDateValue(picker.draftCheckin), formatDateValue(picker.draftCheckout)) <
          BOOKING_MINIMUM_NIGHTS
      ) {
        picker.draftCheckout = null;
      }
      picker.activeField = "checkout";
    }

    renderCalendar();
  }

  function createCalendarMonth(monthDate, monthIndex, monthCount) {
    const month = document.createElement("section");
    month.className = "booking-calendar-month";

    const header = document.createElement("div");
    header.className = "booking-calendar-header";

    const previous = document.createElement("button");
    previous.type = "button";
    previous.className = "calendar-nav calendar-nav-prev";
    previous.setAttribute("aria-label", uiText.previousMonth);
    if (monthIndex === 0) {
      previous.addEventListener("click", () => {
        picker.visibleMonth = addMonths(picker.visibleMonth, -1);
        renderCalendar();
      });
    } else {
      previous.classList.add("calendar-nav-placeholder");
      previous.tabIndex = -1;
      previous.setAttribute("aria-hidden", "true");
    }

    const title = document.createElement("h3");
    title.className = "booking-calendar-title";
    title.textContent = formatBookingMonthTitle(monthDate);

    const next = document.createElement("button");
    next.type = "button";
    next.className = "calendar-nav calendar-nav-next";
    next.setAttribute("aria-label", uiText.nextMonth);
    if (monthIndex === monthCount - 1) {
      next.addEventListener("click", () => {
        picker.visibleMonth = addMonths(picker.visibleMonth, 1);
        renderCalendar();
      });
    } else {
      next.classList.add("calendar-nav-placeholder");
      next.tabIndex = -1;
      next.setAttribute("aria-hidden", "true");
    }

    header.append(previous, title, next);

    const weekdays = document.createElement("div");
    weekdays.className = "booking-calendar-weekdays";
    weekdayLabels.forEach((label) => {
      const weekday = document.createElement("span");
      weekday.className = "booking-calendar-weekday";
      weekday.textContent = label;
      weekdays.appendChild(weekday);
    });

    const days = document.createElement("div");
    days.className = "booking-calendar-days";
    const firstOffset = (monthDate.getUTCDay() + 6) % 7;
    for (let index = 0; index < firstOffset; index += 1) {
      const empty = document.createElement("span");
      empty.className = "calendar-empty-day";
      empty.setAttribute("aria-hidden", "true");
      days.appendChild(empty);
    }

    const totalDays = getDaysInMonth(monthDate);
    for (let day = 1; day <= totalDays; day += 1) {
      const date = new Date(Date.UTC(monthDate.getUTCFullYear(), monthDate.getUTCMonth(), day));
      const button = document.createElement("button");
      button.type = "button";
      button.className = "calendar-day";
      button.textContent = String(day);
      button.dataset.date = formatDateValue(date);
      button.setAttribute("aria-label", formatBookingDate(date, { weekday: "long", day: "numeric", month: "long", year: "numeric" }));

      if (isDateDisabled(date)) button.disabled = true;
      if (isSameDate(date, getTodayDate())) button.classList.add("is-today");
      if (isSameDate(date, picker.draftCheckin)) {
        button.classList.add("is-checkin");
        button.setAttribute("aria-pressed", "true");
      }
      if (isSameDate(date, picker.draftCheckout)) {
        button.classList.add("is-checkout");
        button.setAttribute("aria-pressed", "true");
      }
      if (
        picker.draftCheckin &&
        picker.draftCheckout &&
        date.getTime() > picker.draftCheckin.getTime() &&
        date.getTime() < picker.draftCheckout.getTime()
      ) {
        button.classList.add("is-in-range");
      }

      button.addEventListener("click", () => chooseDate(date));
      button.addEventListener("keydown", handleDayKeyboard);
      days.appendChild(button);
    }

    month.append(header, weekdays, days);
    return month;
  }

  const closeCalendar = (returnFocus = false) => {
    if (!picker.isOpen) return;
    picker.isOpen = false;
    window.clearTimeout(picker.closeTimer);
    popover.classList.remove("is-open");
    checkinTrigger.setAttribute("aria-expanded", "false");
    checkoutTrigger.setAttribute("aria-expanded", "false");
    picker.closeTimer = window.setTimeout(() => {
      if (!picker.isOpen) popover.hidden = true;
    }, 210);
    if (returnFocus) {
      const trigger = picker.activeField === "checkout" ? checkoutTrigger : checkinTrigger;
      trigger.focus();
    }
  };

  const openCalendar = (field) => {
    const selectedCheckin = parseLocalDate(checkin.value);
    const selectedCheckout = parseLocalDate(checkout.value);
    picker.activeField = field;
    picker.draftCheckin = selectedCheckin;
    picker.draftCheckout = selectedCheckout;
    picker.visibleMonth = getMonthStart(
      field === "checkout" ? selectedCheckin || selectedCheckout || getTodayDate() : selectedCheckin || getTodayDate()
    );

    closeBookingPopover("guestTrigger", "guestPopover");
    closeBookingPopover("roomTrigger", "roomPopover");

    window.clearTimeout(picker.closeTimer);
    renderCalendar();
    popover.hidden = false;
    window.requestAnimationFrame(() => {
      picker.isOpen = true;
      popover.classList.add("is-open");
      checkinTrigger.setAttribute("aria-expanded", field === "checkin" ? "true" : "false");
      checkoutTrigger.setAttribute("aria-expanded", field === "checkout" ? "true" : "false");
    });
  };

  const handleTriggerClick = (event) => {
    event.stopPropagation();
    const field = event.currentTarget.dataset.dateRole || "checkin";
    if (picker.isOpen && picker.activeField === field) {
      closeCalendar(true);
      return;
    }
    openCalendar(field);
  };

  checkinTrigger.addEventListener("click", handleTriggerClick);
  checkoutTrigger.addEventListener("click", handleTriggerClick);
  popover.addEventListener("click", (event) => event.stopPropagation());

  clearButton?.addEventListener("click", () => {
    picker.draftCheckin = null;
    picker.draftCheckout = null;
    picker.activeField = "checkin";
    checkin.value = "";
    checkout.value = "";
    checkout.removeAttribute("min");
    syncDateDisplays();
    renderCalendar();
    checkinTrigger.focus();
  });

  applyButton?.addEventListener("click", () => {
    if (!isDraftRangeValid()) return;
    setDateValue(checkin, picker.draftCheckin);
    setDateValue(checkout, picker.draftCheckout);
    checkin.dispatchEvent(new Event("change", { bubbles: true }));
    checkout.dispatchEvent(new Event("change", { bubbles: true }));
    syncDateDisplays();
    closeCalendar(true);
  });

  document.addEventListener("booking:close-date-picker", () => closeCalendar(false));

  document.addEventListener("click", (event) => {
    if (!picker.isOpen) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (popover.contains(target) || checkinTrigger.contains(target) || checkoutTrigger.contains(target)) return;
    closeCalendar(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !picker.isOpen) return;
    event.preventDefault();
    closeCalendar(true);
  });

  const handleCalendarMqChange = () => {
    if (picker.isOpen) renderCalendar();
  };
  if (typeof calendarMq.addEventListener === "function") calendarMq.addEventListener("change", handleCalendarMqChange);
  else if (typeof calendarMq.addListener === "function") calendarMq.addListener(handleCalendarMqChange);

  checkin.addEventListener("change", syncDateDisplays);
  checkout.addEventListener("change", syncDateDisplays);
  syncDateDisplays();
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
  const roomSummary = document.getElementById("guestRoomSummary");
  if (!adultsCount || !childrenCount || !summary) return;

  adultsCount.textContent = String(state.adults);
  childrenCount.textContent = String(state.children);
  if (roomSummary) roomSummary.textContent = uiText.guestRoomSummary;
  const adultsInput = document.getElementById("adultsInput");
  const childrenInput = document.getElementById("childrenInput");
  if (adultsInput) adultsInput.value = String(state.adults);
  if (childrenInput) childrenInput.value = String(state.children);

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
    const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
    if (shouldOpen) {
      document.dispatchEvent(new CustomEvent("booking:close-date-picker"));
      const roomTrigger = document.getElementById("roomTrigger");
      const roomPopover = document.getElementById("roomPopover");
      roomTrigger?.setAttribute("aria-expanded", "false");
      if (roomPopover) roomPopover.hidden = true;
    }
    setOpen(shouldOpen);
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

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || popover.hidden) return;
    setOpen(false);
    trigger.focus();
  });

  updateGuestSummary();
}

function initRoomPicker() {
  const trigger = document.getElementById("roomTrigger");
  const summary = document.getElementById("roomSummary");
  const popover = document.getElementById("roomPopover");
  const select = document.getElementById("bookingRoom");
  const options = [...document.querySelectorAll(".room-option")];
  if (!trigger || !summary || !popover || !select || !options.length) return;

  const setOpen = (isOpen) => {
    trigger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    popover.hidden = !isOpen;
  };

  const syncSelection = () => {
    const selectedOptions = [...select.selectedOptions].filter((option) => option.value);
    if (selectedOptions.length === 0) summary.textContent = select.options[0].textContent;
    else if (selectedOptions.length === 1) summary.textContent = selectedOptions[0].textContent;
    else summary.textContent = uiText.selectedRoomTypes.replace("{count}", selectedOptions.length);
    options.forEach((option) => {
      const matchingOption = [...select.options].find((item) => item.value === option.dataset.roomValue);
      option.setAttribute("aria-selected", matchingOption?.selected ? "true" : "false");
    });
  };

  trigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
    if (shouldOpen) {
      document.dispatchEvent(new CustomEvent("booking:close-date-picker"));
      const guestTrigger = document.getElementById("guestTrigger");
      const guestPopover = document.getElementById("guestPopover");
      guestTrigger?.setAttribute("aria-expanded", "false");
      if (guestPopover) guestPopover.hidden = true;
    }
    setOpen(shouldOpen);
  });

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const matchingOption = [...select.options].find((item) => item.value === option.dataset.roomValue);
      if (matchingOption) matchingOption.selected = !matchingOption.selected;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  select.addEventListener("change", syncSelection);
  document.getElementById("roomDone")?.addEventListener("click", () => {
    setOpen(false);
    trigger.focus();
  });

  document.addEventListener("click", (event) => {
    if (popover.hidden) return;
    if (!popover.contains(event.target) && !trigger.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || popover.hidden) return;
    setOpen(false);
    trigger.focus();
  });

  syncSelection();
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

  document.querySelectorAll(".room-thumbnail").forEach((button) => {
    const isActive = button.dataset.roomId === roomId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
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
  roomImage.src = resolveAssetPath(room.image);
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
  document.querySelectorAll(".room-tab, .room-thumbnail").forEach((button) => {
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

function formatText(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, value),
    template
  );
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

function formatReviewDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat(localeByLang[currentLang] || localeByLang.ru, {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function createSourceBadge(sourceKey, sourceLabel) {
  const sourceMeta = reviewSourceMeta[sourceKey] || {
    icon: sourceLabel.slice(0, 2).toUpperCase(),
    label: sourceLabel
  };
  const badge = document.createElement("span");
  badge.className = `review-source-badge review-source-badge--${sourceKey || "default"}`;

  const icon = document.createElement("span");
  icon.className = "review-source-icon";
  icon.textContent = sourceMeta.icon;

  const label = document.createElement("span");
  label.textContent = sourceMeta.label || sourceLabel;

  badge.appendChild(icon);
  badge.appendChild(label);
  return badge;
}

function createRatingStars(rating) {
  const stars = document.createElement("div");
  stars.className = "review-stars";
  const normalizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
  stars.setAttribute("aria-label", `${uiText.reviewLabel}: ${normalizedRating}/5`);

  for (let i = 0; i < 5; i += 1) {
    const star = createStarIcon();
    star.style.setProperty("--star-index", i);
    if (i >= normalizedRating) {
      star.classList.add("is-muted");
    }
    stars.appendChild(star);
  }

  return stars;
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card reveal";
  card.dataset.reviewId = review.reviewId || review.id;

  if (revealAnimationsReady) {
    card.classList.add("visible");
  }

  const top = document.createElement("div");
  top.className = "review-card-top";

  const author = document.createElement("div");
  author.className = "review-author";

  const avatar = document.createElement("div");
  avatar.className = "review-avatar";
  avatar.textContent = getReviewInitials(review.name);

  const meta = document.createElement("div");

  const nameLocation = document.createElement("h4");
  nameLocation.textContent = review.name;

  const details = document.createElement("p");
  details.className = "review-meta";
  const city = review.city || uiText.reviewCityFallback;
  const date = formatReviewDate(review.date);
  details.textContent = [city, date].filter(Boolean).join(" · ");

  meta.appendChild(nameLocation);
  meta.appendChild(details);

  author.appendChild(avatar);
  author.appendChild(meta);
  top.appendChild(author);
  top.appendChild(createSourceBadge(review.sourceKey, review.source));

  const trust = document.createElement("div");
  trust.className = "review-trust";
  if (review.verified) {
    const verified = document.createElement("span");
    verified.className = "review-verified";
    verified.textContent = `✓ ${uiText.reviewVerified}`;
    trust.appendChild(verified);
  }
  trust.appendChild(createRatingStars(review.rating));

  const text = document.createElement("p");
  text.className = "review-text";
  text.textContent = review.text;

  card.appendChild(top);
  card.appendChild(trust);
  card.appendChild(text);

  const hasValidReviewUrl =
    typeof review.sourceUrl === "string" && /^https?:\/\//i.test(review.sourceUrl);

  if (hasValidReviewUrl) {
    const link = document.createElement("a");
    link.className = "review-more";
    link.href = review.sourceUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `${uiText.reviewSource} → ${review.source}`;
    card.appendChild(link);
  }

  return card;
}

function renderReviewStats() {
  const summaryCard = document.querySelector(".reviews-summary-card");
  const averageRating = document.getElementById("reviewsAverageRating");
  const basedOn = document.getElementById("reviewsBasedOn");
  const positive = document.getElementById("reviewsPositive");
  const cta = document.getElementById("reviewsCta");
  const sourceList = document.getElementById("reviewsSourceStats");

  if (summaryCard) {
    summaryCard.setAttribute("aria-label", uiText.reviewStatsAria);
  }
  if (averageRating) {
    averageRating.textContent = reviewStats.rating.toFixed(1);
  }
  if (basedOn) {
    basedOn.textContent = formatText(uiText.reviewBasedOn, { count: reviewStats.totalCount });
  }
  if (positive) {
    positive.textContent = formatText(uiText.reviewPositive, {
      percent: reviewStats.positivePercent
    });
  }
  if (cta) {
    cta.href = reviewStats.ctaUrl;
    cta.textContent = uiText.reviewLeave;
  }
  if (!sourceList) return;

  sourceList.innerHTML = "";
  reviewStats.sources.forEach((source) => {
    const item = document.createElement("a");
    item.className = `reviews-source-stat reviews-source-stat--${source.sourceKey}`;
    item.href = source.sourceUrl;
    item.target = "_blank";
    item.rel = "noopener noreferrer";

    item.appendChild(createSourceBadge(source.sourceKey, source.source));

    const rating = document.createElement("strong");
    rating.textContent = source.rating.toFixed(1);

    const countText =
      source.countType === "ratings" ? uiText.reviewSourceRatings : uiText.reviewSourceReviews;
    const count = document.createElement("span");
    count.textContent = formatText(countText, { count: source.count });

    item.appendChild(rating);
    item.appendChild(count);
    sourceList.appendChild(item);
  });
}

function renderReviewPagination(totalPages) {
  const pagination = document.getElementById("reviewPagination");
  if (!pagination) return;

  pagination.innerHTML = "";
  if (totalPages <= 1) return;

  const createButton = (label, page, options = {}) => {
    const button = document.createElement("button");
    button.className = "review-page";
    button.type = "button";
    button.textContent = label;
    if (options.ariaLabel) {
      button.setAttribute("aria-label", options.ariaLabel);
    }
    if (options.current) {
      button.classList.add("is-active");
      button.setAttribute("aria-current", "page");
    }
    if (options.disabled) {
      button.disabled = true;
    }
    button.addEventListener("click", () => {
      reviewState.page = page;
      renderReviews();
    });
    return button;
  };

  pagination.appendChild(
    createButton("‹", Math.max(1, reviewState.page - 1), {
      ariaLabel: uiText.reviewPrevious,
      disabled: reviewState.page === 1
    })
  );

  for (let page = 1; page <= totalPages; page += 1) {
    pagination.appendChild(
      createButton(String(page), page, {
        current: page === reviewState.page
      })
    );
  }

  pagination.appendChild(
    createButton("›", Math.min(totalPages, reviewState.page + 1), {
      ariaLabel: uiText.reviewNext,
      disabled: reviewState.page === totalPages
    })
  );
}

function renderReviews() {
  const reviewGrid = document.getElementById("reviewGrid");
  if (!reviewGrid) return;

  const totalPages = Math.max(1, Math.ceil(reviews.length / REVIEW_PAGE_SIZE));
  reviewState.page = Math.min(reviewState.page, totalPages);

  const start = (reviewState.page - 1) * REVIEW_PAGE_SIZE;
  const visibleReviews = reviews.slice(start, start + REVIEW_PAGE_SIZE);

  reviewGrid.innerHTML = "";

  if (visibleReviews.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "review-empty";
    emptyState.textContent = uiText.reviewNoResults;
    reviewGrid.appendChild(emptyState);
  } else {
    visibleReviews.forEach((review) => {
      reviewGrid.appendChild(createReviewCard(review));
    });
  }

  renderReviewPagination(totalPages);
}

function initReviews() {
  const reviewGrid = document.getElementById("reviewGrid");
  if (!reviewGrid) return;

  renderReviewStats();
  renderReviews();
}

function initFloatingButtonsVisibility() {
  // On short/medium mobile viewports the fixed WhatsApp/Telegram bubbles can
  // sit on top of the hero booking submit button. Hide them whenever the two
  // actually overlap, and fade back in once the visitor scrolls past.
  const floatingButtons = document.querySelector(".floating-buttons");
  const bookingSubmit = document.getElementById("bookingSubmit");
  if (!floatingButtons || !bookingSubmit) return;

  const GAP = 12;
  let buttonsRect = null;
  let ticking = false;

  // The bubbles are position: fixed, so their visible-state rect only changes
  // on resize. Measure with the is-hidden transform temporarily cleared —
  // the synchronous class swap never paints.
  const measureButtons = () => {
    const wasHidden = floatingButtons.classList.contains("is-hidden");
    if (wasHidden) floatingButtons.classList.remove("is-hidden");
    buttonsRect = floatingButtons.getBoundingClientRect();
    if (wasHidden) floatingButtons.classList.add("is-hidden");
  };

  const update = () => {
    ticking = false;
    if (!buttonsRect) measureButtons();
    const submitRect = bookingSubmit.getBoundingClientRect();
    const overlaps =
      submitRect.bottom + GAP > buttonsRect.top &&
      submitRect.top - GAP < buttonsRect.bottom &&
      submitRect.right + GAP > buttonsRect.left &&
      submitRect.left - GAP < buttonsRect.right;
    floatingButtons.classList.toggle("is-hidden", overlaps);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      buttonsRect = null;
      requestUpdate();
    },
    { passive: true }
  );
  update();
}

function initRevealAnimations() {
  const elements = Array.from(document.querySelectorAll(".reveal"));
  if (elements.length === 0) {
    revealAnimationsReady = true;
    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    revealAnimationsReady = true;
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
  revealAnimationsReady = true;
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (!form || !formStatus) return;

  if (form.getAttribute("action") !== "/.netlify/functions/general-question") {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      formStatus.textContent = uiText.formSuccess;
      form.reset();
    });
    return;
  }

  const submit = document.getElementById("contactSubmit");
  if (!submit) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setContactStatus(formStatus, "");

    if (typeof form.reportValidity === "function" && !form.reportValidity()) {
      return;
    }

    const phone = form.elements.namedItem("phone");
    if (!phone || !hasValidPhone(phone.value.trim())) {
      setContactStatus(formStatus, uiText.bookingPhoneInvalid, "error");
      phone?.focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.locale = currentLang;

    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    setContactStatus(formStatus, uiText.contactSending);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`General question failed with ${response.status}`);
      setContactStatus(formStatus, uiText.contactSuccess, "success");
      form.reset();
    } catch (error) {
      console.error(error);
      setContactStatus(formStatus, uiText.contactError, "error");
    } finally {
      submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
}

function setContactStatus(status, message, type = "") {
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");
  status.classList.toggle("is-error", type === "error");
}

function setBookingStatus(status, message, type = "") {
  if (!status) return;
  status.textContent = message;
  status.classList.toggle("is-success", type === "success");
  status.classList.toggle("is-error", type === "error");
}

function hasValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const status = document.getElementById("bookingStatus");
  const submit = document.getElementById("bookingSubmit");
  if (!form || !status || !submit) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    setBookingStatus(status, "");

    const checkin = document.getElementById("checkinInput");
    const checkout = document.getElementById("checkoutInput");
    const phone = document.getElementById("bookingPhone");
    const room = document.getElementById("bookingRoom");

    if (!checkin?.value || !checkout?.value || bookingNights(checkin.value, checkout.value) < BOOKING_MINIMUM_NIGHTS) {
      setBookingStatus(status, uiText.bookingDateMinimum, "error");
      const checkinTrigger = document.getElementById("checkinTrigger");
      if (checkinTrigger) checkinTrigger.focus();
      else checkin?.focus();
      return;
    }

    if (!phone || !hasValidPhone(phone.value.trim())) {
      setBookingStatus(status, uiText.bookingPhoneInvalid, "error");
      phone?.focus();
      return;
    }

    const selectedRoomTypes = room ? [...room.selectedOptions].map((option) => option.value).filter(Boolean) : [];
    if (!selectedRoomTypes.length) {
      setBookingStatus(status, uiText.bookingRoomRequired, "error");
      document.getElementById("roomTrigger")?.focus();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.roomTypes = selectedRoomTypes;
    delete payload.roomType;
    payload.locale = currentLang;

    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    setBookingStatus(status, uiText.bookingSending);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Booking request failed with ${response.status}`);
      setBookingStatus(status, uiText.bookingSuccess, "success");
      phone.value = "";
      [...room.options].forEach((option) => {
        option.selected = false;
      });
      room.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (error) {
      console.error(error);
      setBookingStatus(status, uiText.bookingError, "error");
    } finally {
      submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
}

function initProceduresExperience() {
  const page = document.querySelector(".procedures-redesign");
  if (!page) return;

  const revealItems = [...page.querySelectorAll("[data-reveal]")];
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    document.body.classList.add("is-reveal-ready");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const navLinks = [...page.querySelectorAll(".section-jump a[href^='#']")];
  const sectionLinks = navLinks.filter((link) => link.hash !== "#main");
  const sections = sectionLinks.map((link) => document.querySelector(link.hash)).filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => link.classList.toggle("is-active", link.hash === `#${id}`));
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveLink(visible.target.id);
    },
    { rootMargin: "-28% 0px -58%", threshold: [0, 0.1, 0.25] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

function initIndicationGroups() {
  const groups = [...document.querySelectorAll(".indication-groups__grid > .indication-group")];
  if (!groups.length) return;

  const desktopQuery = window.matchMedia("(min-width: 768px)");

  const applyDefaultState = () => {
    groups.forEach((group) => {
      group.open = desktopQuery.matches;
    });
  };

  applyDefaultState();

  if (typeof desktopQuery.addEventListener === "function") {
    desktopQuery.addEventListener("change", applyDefaultState);
  } else if (typeof desktopQuery.addListener === "function") {
    desktopQuery.addListener(applyDefaultState);
  }
}

function bootstrap() {
  setCurrentYear();
  initHeaderScrollResize();
  initHeroParallax();
  initMobileMenu();
  initBookingDates();
  initGuestPicker();
  initRoomPicker();
  initBookingForm();
  initRoomTabs();
  initReviews();
  initRevealAnimations();
  initContactForm();
  initProceduresExperience();
  initIndicationGroups();
  initFloatingButtonsVisibility();
}

document.addEventListener("DOMContentLoaded", bootstrap);
