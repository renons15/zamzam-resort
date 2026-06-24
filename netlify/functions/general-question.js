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

function normalizeText(value, maximumLength) {
  return typeof value === "string" ? value.trim().slice(0, maximumLength) : "";
}

function validPhone(value) {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 7 && digits.length <= 15;
}

function validateQuestion(payload) {
  const name = normalizeText(payload.name, 100);
  const phone = normalizeText(payload.phone, 40);
  const message = normalizeText(payload.message, 2000);
  const locale = ["ru", "uz", "kk"].includes(payload.locale) ? payload.locale : "ru";

  if (name.length < 2) return { error: "Name is required." };
  if (!validPhone(phone)) return { error: "Invalid phone number." };
  if (message.length < 2) return { error: "Message is required." };

  return { value: { name, phone, message, locale } };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatTelegramMessage(question) {
  return [
    "❓ <b>Общий вопрос</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(question.name)}`,
    `☎️ <b>Телефон:</b> ${escapeHtml(question.phone)}`,
    `💬 <b>Сообщение:</b> ${escapeHtml(question.message)}`,
    `🌐 <b>Язык сайта:</b> ${question.locale.toUpperCase()}`
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
  if (payload.company) return jsonResponse(200, { ok: true }, cors);
  if (isRateLimited(event)) return jsonResponse(429, { error: "Too many requests." }, cors);

  const validation = validateQuestion(payload);
  if (validation.error) return jsonResponse(400, { error: validation.error }, cors);

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("Telegram general-question integration is not configured.");
    return jsonResponse(503, { error: "Contact service is not configured." }, cors);
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
      console.error("Telegram rejected a general question:", response.status, result.description);
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
  _private: { formatTelegramMessage, validPhone, validateQuestion }
};
