const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const { handler, _private } = require("../netlify/functions/general-question.js");

const validQuestion = {
  name: "Алишер",
  phone: "+998 90 123 45 67",
  message: "Какие лечебные программы доступны?",
  locale: "ru",
  company: ""
};

function request(payload) {
  return {
    httpMethod: "POST",
    headers: {
      origin: "https://zamzam.example",
      "x-nf-client-connection-ip": `test-${Math.random()}`
    },
    body: JSON.stringify(payload)
  };
}

test("contact and homepage forms submit general questions without an email field", () => {
  for (const page of [
    "contact.html",
    "uz/contact.html",
    "kk/contact.html",
    "index.html",
    "uz/index.html",
    "kk/index.html"
  ]) {
    const html = fs.readFileSync(page, "utf8");
    const form = html.match(/<form id="contactForm"[\s\S]*?<\/form>/)?.[0] || "";

    assert.match(form, /action="\/\.netlify\/functions\/general-question"/);
    assert.match(form, /name="name"/);
    assert.match(form, /name="phone"/);
    assert.match(form, /name="message"/);
    assert.doesNotMatch(form, /name="email"/);
    assert.match(form, /id="contactSubmit"/);
  }
});

test("general-question validation requires a name, phone, and message", () => {
  assert.ok(_private.validateQuestion(validQuestion).value);
  assert.match(_private.validateQuestion({ ...validQuestion, name: "" }).error, /name/i);
  assert.match(_private.validateQuestion({ ...validQuestion, phone: "call me" }).error, /phone/i);
  assert.match(_private.validateQuestion({ ...validQuestion, message: "" }).error, /message/i);
});

test("general-question endpoint sends a distinct message to the booking Telegram bot", async () => {
  const previousFetch = global.fetch;
  const previousToken = process.env.TELEGRAM_BOT_TOKEN;
  const previousChat = process.env.TELEGRAM_CHAT_ID;
  let telegramRequest;

  process.env.TELEGRAM_BOT_TOKEN = "test-token";
  process.env.TELEGRAM_CHAT_ID = "-100123";
  global.fetch = async (url, options) => {
    telegramRequest = { url, options };
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  };

  try {
    const response = await handler(request(validQuestion));
    assert.equal(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.body), { ok: true });
    assert.equal(telegramRequest.url, "https://api.telegram.org/bottest-token/sendMessage");

    const payload = JSON.parse(telegramRequest.options.body);
    assert.equal(payload.chat_id, "-100123");
    assert.match(payload.text, /Общий вопрос/);
    assert.match(payload.text, /Алишер/);
    assert.match(payload.text, /\+998 90 123 45 67/);
    assert.match(payload.text, /Какие лечебные программы доступны\?/);
    assert.match(payload.text, /RU/);
  } finally {
    global.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = previousToken;
    if (previousChat === undefined) delete process.env.TELEGRAM_CHAT_ID;
    else process.env.TELEGRAM_CHAT_ID = previousChat;
  }
});

test("general-question honeypot submissions do not reach Telegram", async () => {
  const previousFetch = global.fetch;
  let called = false;
  global.fetch = async () => {
    called = true;
  };

  try {
    const response = await handler(request({ ...validQuestion, company: "spam.example" }));
    assert.equal(response.statusCode, 200);
    assert.equal(called, false);
  } finally {
    global.fetch = previousFetch;
  }
});

test("general-question message escapes Telegram HTML", () => {
  const message = _private.formatTelegramMessage({
    ...validQuestion,
    name: "<Admin>",
    message: "A & B"
  });

  assert.match(message, /&lt;Admin&gt;/);
  assert.match(message, /A &amp; B/);
});
