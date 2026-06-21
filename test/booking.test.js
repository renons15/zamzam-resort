const assert = require("node:assert/strict");
const fs = require("node:fs");
const test = require("node:test");

const { handler, _private } = require("../netlify/functions/booking.js");

const validBooking = {
  checkin: "2099-07-01",
  checkout: "2099-07-11",
  adults: 2,
  children: 1,
  phone: "+998 90 123 45 67",
  roomTypes: ["polulux1", "lux"],
  locale: "ru",
  website: ""
};

function request(payload, headers = {}) {
  return {
    httpMethod: "POST",
    headers: {
      origin: "https://zamzam.example",
      "x-nf-client-connection-ip": `test-${Math.random()}`,
      ...headers
    },
    body: JSON.stringify(payload)
  };
}

test("booking pages expose every required field in one form", () => {
  for (const page of ["index.html", "uz/index.html", "kk/index.html"]) {
    const html = fs.readFileSync(page, "utf8");
    assert.match(html, /id="bookingForm"/);
    assert.match(html, /name="checkin"/);
    assert.match(html, /name="checkout"/);
    assert.match(html, /name="adults"/);
    assert.match(html, /name="children"/);
    assert.match(html, /name="phone"/);
    assert.match(html, /name="roomTypes"/);
    assert.match(html, /multiple required/);
    assert.match(html, /id="roomTrigger"/);
    assert.match(html, /id="roomPopover"/);
    assert.equal((html.match(/class="room-option"/g) || []).length, 4);
    assert.equal((html.match(/<option value="(?:standart|polulux1|polulux2|lux)">/g) || []).length, 4);
  }
});

test("server validation enforces a minimum stay of 10 nights", () => {
  assert.equal(_private.nightsBetween("2099-07-01", "2099-07-11"), 10);
  assert.match(
    _private.validateBooking({ ...validBooking, checkout: "2099-07-10" }).error,
    /10 nights/
  );
  assert.ok(_private.validateBooking(validBooking).value);
});

test("server validation rejects unsupported rooms and malformed phone numbers", () => {
  assert.match(_private.validateBooking({ ...validBooking, roomTypes: ["penthouse"] }).error, /room/i);
  assert.match(_private.validateBooking({ ...validBooking, phone: "call me" }).error, /phone/i);
});

test("server validation accepts multiple unique room types", () => {
  const validation = _private.validateBooking(validBooking);
  assert.deepEqual(validation.value.roomTypes, ["polulux1", "lux"]);
});

test("booking endpoint sends a validated request to Telegram", async () => {
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
    const response = await handler(request(validBooking));
    assert.equal(response.statusCode, 200);
    assert.deepEqual(JSON.parse(response.body), { ok: true });
    assert.equal(telegramRequest.url, "https://api.telegram.org/bottest-token/sendMessage");

    const payload = JSON.parse(telegramRequest.options.body);
    assert.equal(payload.chat_id, "-100123");
    assert.match(payload.text, /Полулюкс, 1 комната/);
    assert.match(payload.text, /Люкс/);
    assert.match(payload.text, /10 ночей/);
    assert.match(payload.text, /\+998 90 123 45 67/);
  } finally {
    global.fetch = previousFetch;
    if (previousToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
    else process.env.TELEGRAM_BOT_TOKEN = previousToken;
    if (previousChat === undefined) delete process.env.TELEGRAM_CHAT_ID;
    else process.env.TELEGRAM_CHAT_ID = previousChat;
  }
});

test("honeypot submissions do not reach Telegram", async () => {
  const previousFetch = global.fetch;
  let called = false;
  global.fetch = async () => {
    called = true;
  };

  try {
    const response = await handler(request({ ...validBooking, website: "spam.example" }));
    assert.equal(response.statusCode, 200);
    assert.equal(called, false);
  } finally {
    global.fetch = previousFetch;
  }
});
