const ROOM_TYPES = {
  standart: "Стандарт",
  polulux1: "Полулюкс, 1 комната",
  polulux2: "Полулюкс, 2 комнаты",
  lux: "Люкс"
};

const MINIMUM_NIGHTS = 10;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const rateBuckets = new Map();

function jsonResponse(statusCode, payload, headers = {}) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...headers
    },
    body: JSON.stringify(payload)
  };
}

function corsHeaders(event) {
  const origin = event.headers?.origin || event.headers?.Origin || "";
  const allowed = (process.env.BOOKING_ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (allowed.length && !allowed.includes(origin)) return null;
  return {
    "Access-Control-Allow-Origin": origin || allowed[0] || "*",
    Vary: "Origin",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}

function parseDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || "");
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return date.toISOString().startsWith(value) ? date : null;
}

function nightsBetween(checkin, checkout) {
  const start = parseDate(checkin);
  const end = parseDate(checkout);
  if (!start || !end) return 0;
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

function normalizePhone(value) {
  return typeof value === "string" ? value.trim().slice(0, 40) : "";
}

function validPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

function integerInRange(value, minimum, maximum) {
  const number = Number(value);
  return Number.isInteger(number) && number >= minimum && number <= maximum ? number : null;
}

function validateBooking(payload) {
  const checkin = typeof payload.checkin === "string" ? payload.checkin : "";
  const checkout = typeof payload.checkout === "string" ? payload.checkout : "";
  const phone = normalizePhone(payload.phone);
  const adults = integerInRange(payload.adults, 1, 10);
  const children = integerInRange(payload.children, 0, 10);
  const roomType = typeof payload.roomType === "string" ? payload.roomType : "";
  const locale = ["ru", "uz", "kk"].includes(payload.locale) ? payload.locale : "ru";
  const nights = nightsBetween(checkin, checkout);
  const today = new Date().toISOString().split("T")[0];

  if (!parseDate(checkin) || !parseDate(checkout) || nights < MINIMUM_NIGHTS) {
    return { error: "Stay must be at least 10 nights." };
  }
  if (checkin < today) return { error: "Check-in date cannot be in the past." };
  if (!validPhone(phone)) return { error: "Invalid phone number." };
  if (adults === null || children === null) return { error: "Invalid guest count." };
  if (!ROOM_TYPES[roomType]) return { error: "Invalid room type." };

  return {
    value: { checkin, checkout, phone, adults, children, roomType, locale, nights }
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatTelegramMessage(booking) {
  return [
    "🏨 <b>Новая заявка на бронирование</b>",
    "",
    `📅 <b>Заезд:</b> ${escapeHtml(booking.checkin)}`,
    `📅 <b>Выезд:</b> ${escapeHtml(booking.checkout)}`,
    `🌙 <b>Срок:</b> ${booking.nights} ночей`,
    `👤 <b>Взрослые:</b> ${booking.adults}`,
    `👶 <b>Дети:</b> ${booking.children}`,
    `🛏 <b>Номер:</b> ${ROOM_TYPES[booking.roomType]}`,
    `☎️ <b>Телефон:</b> ${escapeHtml(booking.phone)}`,
    `🌐 <b>Язык сайта:</b> ${booking.locale.toUpperCase()}`
  ].join("\n");
}

function clientIp(event) {
  return (
    event.headers?.["x-nf-client-connection-ip"] ||
    event.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(event, now = Date.now()) {
  const ip = clientIp(event);
  const recent = (rateBuckets.get(ip) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  return false;
}

async function handler(event) {
  const cors = corsHeaders(event);
  if (!cors) return jsonResponse(403, { error: "Origin not allowed." });
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers: cors, body: "" };
  if (event.httpMethod !== "POST") return jsonResponse(405, { error: "Method not allowed." }, cors);

  const contentLength = Number(event.headers?.["content-length"] || 0);
  if (contentLength > 8192) return jsonResponse(413, { error: "Request is too large." }, cors);

  let payload;
  try {
    const body = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "{}";
    payload = JSON.parse(body);
  } catch {
    return jsonResponse(400, { error: "Invalid JSON." }, cors);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse(400, { error: "Invalid payload." }, cors);
  }
  if (payload.website) return jsonResponse(200, { ok: true }, cors);
  if (isRateLimited(event)) return jsonResponse(429, { error: "Too many requests." }, cors);

  const validation = validateBooking(payload);
  if (validation.error) return jsonResponse(400, { error: validation.error }, cors);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram booking integration is not configured.");
    return jsonResponse(503, { error: "Booking service is not configured." }, cors);
  }

  const telegramPayload = {
    chat_id: chatId,
    text: formatTelegramMessage(validation.value),
    parse_mode: "HTML"
  };
  if (process.env.TELEGRAM_MESSAGE_THREAD_ID) {
    telegramPayload.message_thread_id = process.env.TELEGRAM_MESSAGE_THREAD_ID;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telegramPayload)
    });
    const result = await response.json();
    if (!response.ok || !result.ok) {
      console.error("Telegram rejected a booking request:", response.status, result.description);
      return jsonResponse(502, { error: "Telegram delivery failed." }, cors);
    }
  } catch (error) {
    console.error("Telegram delivery failed:", error);
    return jsonResponse(502, { error: "Telegram delivery failed." }, cors);
  }

  return jsonResponse(200, { ok: true }, cors);
}

module.exports = {
  handler,
  _private: { formatTelegramMessage, nightsBetween, validPhone, validateBooking }
};
