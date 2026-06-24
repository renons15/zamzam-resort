const fs = require("node:fs");
const https = require("node:https");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const CACHE_FILE = path.join(ROOT, "locales", "translation-cache.json");
const PAGES = [
  "index.html",
  "about.html",
  "rooms.html",
  "pricing.html",
  "procedures.html",
  "indications.html",
  "nutrition.html",
  "licenses.html",
  "contact.html"
];
const LOCALES = ["uz", "kk"];
const WHATSAPP_MESSAGES = {
  uz: "Assalomu alaykum, xonani band qilmoqchiman",
  kk: "Сәлеметсіз бе, бөлме брондағым келеді"
};
const TRANSLATION_OVERRIDES = {
  uz: {
    "Заезд": "Kelish",
    "Выезд": "Ketish",
    "Даты проживания": "Yashash sanalari",
    "Гости и номера": "Mehmonlar va xonalar",
    "Минимум 10 суток": "Kamida 10 kun",
    "Номер телефона": "Telefon raqami",
    "Тип номера": "Xona turi",
    "Выберите дату": "Sanani tanlang",
    "Выберите номер": "Xonani tanlang",
    "Выбор дат": "Sanalarni tanlash",
    "Очистить даты": "Sanalarni tozalash",
    "Применить": "Qo'llash",
    "1 номер": "1 xona",
    "Стандарт": "Standart",
    "Полулюкс, 1 комната": "Polulyuks, 1 xona",
    "Полулюкс, 2 комнаты": "Polulyuks, 2 xona",
    "Люкс": "Lyuks",
    "Отправить запрос": "So'rov yuborish",
    "Не заполняйте это поле": "Bu maydonni to'ldirmang",
    "Готово": "Tayyor",
    "Номера": "Xonalar",
    "Прайс": "Narxlar",
    "ЗАБРОНИРОВАТЬ": "BAND QILISH",
    "ПОДРОБНЕЕ": "BATAFSIL",
    "Доп. программы": "Qo'shimcha dasturlar",
    "Минеральные процедуры": "Mineral muolajalar",
    "Вихревые ванны": "Girdobli vannalar",
    "Тубус": "Tubus",
    "Сопутствующие состояния": "Hamroh holatlar",
    "Лечение в Zam-Zam": "Zam-Zamda davolanish",
    "лечебных столов": "davolash parhezlari",
    "Рекомендации и лечебные столы": "Tavsiyalar va davolash parhezlari",
    "Лечебные столы №0—5": "Davolash parhezlari №0—5",
    "Питание, разработанное вместе с врачами": "Shifokorlar bilan birga ishlab chiqilgan ovqatlanish",
    "приёма пищи каждый день": "mahal ovqat har kuni",
    "Поможем подобрать программу и номер": "Dastur va xonani tanlashga yordam beramiz",
    "4-х местный номер (Эконом)": "4 o'rinli xona (Ekonom)",
    "2-х местный номер Стандарт (однокомнатный)": "2 o'rinli Standart xona (bir xonali)",
    "дата актуальности": "amal qilish sanasi",
    "минимальный срок путёвки": "yo'llanmaning minimal muddati"
  },
  kk: {
    "Заезд": "Келу",
    "Выезд": "Кету",
    "Даты проживания": "Тұру күндері",
    "Гости и номера": "Қонақтар мен бөлмелер",
    "Минимум 10 суток": "Кемінде 10 тәулік",
    "Номер телефона": "Телефон нөмірі",
    "Тип номера": "Бөлме түрі",
    "Выберите дату": "Күнді таңдаңыз",
    "Выберите номер": "Бөлмені таңдаңыз",
    "Выбор дат": "Күндерді таңдау",
    "Очистить даты": "Күндерді тазарту",
    "Применить": "Қолдану",
    "1 номер": "1 бөлме",
    "Стандарт": "Стандарт",
    "Полулюкс, 1 комната": "Полулюкс, 1 бөлме",
    "Полулюкс, 2 комнаты": "Полулюкс, 2 бөлме",
    "Люкс": "Люкс",
    "Отправить запрос": "Сұраныс жіберу",
    "Не заполняйте это поле": "Бұл өрісті толтырмаңыз",
    "Номера": "Бөлмелер",
    "Прайс": "Бағалар",
    "ЗАБРОНИРОВАТЬ": "БРОНДАУ",
    "ПОДРОБНЕЕ": "ТОЛЫҒЫРАҚ",
    "Доп. программы": "Қосымша бағдарламалар",
    "Минеральные процедуры": "Минералды процедуралар",
    "Вихревые ванны": "Құйынды ванналар",
    "Тубус": "Тубус",
    "Сопутствующие состояния": "Қосалқы жағдайлар",
    "Лечение в Zam-Zam": "Zam-Zam-да емделу",
    "лечебных столов": "емдік диета",
    "Рекомендации и лечебные столы": "Ұсыныстар мен емдік диеталар",
    "Лечебные столы №0—5": "№0—5 емдік диеталар",
    "Питание, разработанное вместе с врачами": "Дәрігерлермен бірге әзірленген тамақтану",
    "приёма пищи каждый день": "мезгіл тамақ күн сайын",
    "Поможем подобрать программу и номер": "Бағдарлама мен бөлмені таңдауға көмектесеміз",
    "4-х местный номер (Эконом)": "4 орындық бөлме (Эконом)",
    "2-х местный номер Стандарт (однокомнатный)": "2 орындық Стандарт бөлме (бір бөлмелі)",
    "дата актуальности": "жарамдылық күні",
    "минимальный срок путёвки": "жолдаманың ең аз мерзімі"
  }
};
const SEPARATOR = "\n__ZAMZAM_SPLIT_9F4D2C__\n";
const TRANSLATABLE_ATTRIBUTE = /\b(content|title|aria-label|alt|placeholder|data-label)="([^"]*)"/g;
const TEXT_NODE = />([^<>]+)</g;

function readCache() {
  if (!fs.existsSync(CACHE_FILE)) return { uz: {}, kk: {} };
  return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function needsTranslation(value) {
  return /[А-Яа-яЁё]/.test(value);
}

function collectStrings(html, strings) {
  for (const match of html.matchAll(TEXT_NODE)) {
    const value = normalize(match[1]);
    if (value && needsTranslation(value)) strings.add(value);
  }

  for (const match of html.matchAll(TRANSLATABLE_ATTRIBUTE)) {
    const value = normalize(match[2]);
    if (value && needsTranslation(value)) strings.add(value);
  }
}

function requestTranslation(text, locale, attempt = 1) {
  const params = new URLSearchParams({
    client: "gtx",
    sl: "ru",
    tl: locale,
    dt: "t",
    q: text
  });
  const url = `https://translate.googleapis.com/translate_a/single?${params}`;

  return new Promise((resolve, reject) => {
    https
      .get(url, { headers: { "User-Agent": "zamzam-resort-locale-sync/1.0" } }, (response) => {
        let body = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", async () => {
          if (response.statusCode !== 200) {
            if (attempt < 4) {
              await new Promise((done) => setTimeout(done, attempt * 750));
              try {
                resolve(await requestTranslation(text, locale, attempt + 1));
              } catch (error) {
                reject(error);
              }
              return;
            }
            reject(new Error(`Translation request failed (${response.statusCode}): ${body}`));
            return;
          }

          try {
            const payload = JSON.parse(body);
            resolve(payload[0].map((part) => part[0]).join(""));
          } catch (error) {
            reject(new Error(`Invalid translation response: ${error.message}`));
          }
        });
      })
      .on("error", reject);
  });
}

function makeBatches(strings) {
  const batches = [];
  let batch = [];
  let length = 0;

  for (const value of strings) {
    const nextLength = length + value.length + SEPARATOR.length;
    if (batch.length && nextLength > 2800) {
      batches.push(batch);
      batch = [];
      length = 0;
    }
    batch.push(value);
    length += value.length + SEPARATOR.length;
  }

  if (batch.length) batches.push(batch);
  return batches;
}

async function fillCache(locale, strings, cache) {
  const missing = [...strings].filter(
    (value) => !cache[locale][value] && !TRANSLATION_OVERRIDES[locale][value]
  );
  const batches = makeBatches(missing);

  for (let index = 0; index < batches.length; index += 1) {
    const batch = batches[index];
    const translated = await requestTranslation(batch.join(SEPARATOR), locale);
    const values = translated.split(SEPARATOR);

    if (values.length !== batch.length) {
      throw new Error(
        `Translation batch ${index + 1}/${batches.length} for ${locale} returned ${values.length} of ${batch.length} values`
      );
    }

    batch.forEach((source, itemIndex) => {
      cache[locale][source] = normalize(values[itemIndex]);
    });
    console.log(`${locale}: translated batch ${index + 1}/${batches.length}`);
  }
}

function translateHtml(source, locale, translations) {
  const translate = (value) => {
    const normalized = normalize(value);
    return TRANSLATION_OVERRIDES[locale][normalized] || translations[normalized] || value;
  };

  let html = source.replace('<html lang="ru"', `<html lang="${locale}"`);

  html = html.replace(TEXT_NODE, (full, raw) => {
    const value = normalize(raw);
    if (!value || !needsTranslation(value)) return full;
    const leading = raw.match(/^\s*/)[0];
    const trailing = raw.match(/\s*$/)[0];
    return `>${leading}${translate(value)}${trailing}<`;
  });

  html = html.replace(TRANSLATABLE_ATTRIBUTE, (full, attribute, value) => {
    if (!needsTranslation(value)) return full;
    return `${attribute}="${translate(value)}"`;
  });

  html = html
    .replace(/\b(src|href)="(assets\/|images\/|favicon\.svg)/g, '$1="../$2')
    .replace(/\bcontent="(images\/)/g, 'content="../$1')
    .replace(
      "https://wa.me/998909829871?text=Добрый день, хочу забронировать",
      `https://wa.me/998909829871?text=${encodeURIComponent(WHATSAPP_MESSAGES[locale])}`
    )
    .replace(/(?:Zangiota|Зангиота)\s+(?:Zam-Zam|zam-zam|Зам-Зам|Зәм-Зәм)/gi, "Zangiota Zam-Zam")
    .replace(/[ \t]+$/gm, "");

  return html;
}

async function main() {
  const sources = new Map();
  const strings = new Set();

  for (const page of PAGES) {
    const html = fs.readFileSync(path.join(ROOT, page), "utf8");
    sources.set(page, html);
    collectStrings(html, strings);
  }

  const cache = readCache();
  for (const locale of LOCALES) {
    cache[locale] ||= {};
    await fillCache(locale, strings, cache);
  }

  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, `${JSON.stringify(cache, null, 2)}\n`);

  for (const locale of LOCALES) {
    for (const [page, source] of sources) {
      const output = translateHtml(source, locale, cache[locale]);
      fs.writeFileSync(path.join(ROOT, locale, page), output);
    }
  }

  console.log(`Synchronized ${PAGES.length} page layouts for ${LOCALES.join(", ")}.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
