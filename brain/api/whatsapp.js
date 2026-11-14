'use strict';
const { createHmac, timingSafeEqual } = require('node:crypto');

/** Verify Meta webhook POST signatures against raw body bytes. */
function verifySignature(rawBody, signature, appSecret) {
  if (!appSecret || typeof signature !== 'string' || !signature.startsWith('sha256=')) return false;
  const candidate = signature.slice('sha256='.length);
  if (!/^[a-f0-9]{64}$/i.test(candidate)) return false;
  const expected = createHmac('sha256', appSecret).update(rawBody).digest('hex');
  return timingSafeEqual(Buffer.from(expected, 'hex'), Buffer.from(candidate, 'hex'));
}
async function readRaw(req, maxBytes = 1024 * 1024) {
  if (Buffer.isBuffer(req.body)) {
    if (req.body.length > maxBytes) throw new Error('too_large');
    return req.body;
  }
  if (typeof req.body === 'string') {
    const data = Buffer.from(req.body);
    if (data.length > maxBytes) throw new Error('too_large');
    return data;
  }
  // When bodyParser is disabled, stream the original HTTP bytes for HMAC.
  const chunks = []; let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) throw new Error('too_large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
async function webhook(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const ready = process.env.BRAIN_WHATSAPP_ACTIVE === '1'
    && Boolean(process.env.WHATSAPP_VERIFY_TOKEN && process.env.WHATSAPP_APP_SECRET)
    && process.env.BRAIN_AUTH_AND_LEDGER_READY === '1';
  if (!ready) {
    // We deliberately refuse Meta's GET verification until storage, authorization,
    // idempotency and a safe message-processing queue exist.
    return res.status(503).send('integration_not_activated');
  }
  if (req.method === 'GET') {
    const q = req.query || {};
    if (q['hub.mode'] === 'subscribe' && q['hub.verify_token'] === process.env.WHATSAPP_VERIFY_TOKEN && typeof q['hub.challenge'] === 'string') {
      return res.status(200).send(q['hub.challenge']);
    }
    return res.status(403).send('invalid_verification');
  }
  if (req.method !== 'POST') { res.setHeader('Allow','GET, POST'); return res.status(405).send('method_not_allowed'); }
  let raw;
  try { raw = await readRaw(req); } catch { return res.status(413).send('payload_too_large_or_unreadable'); }
  if (!verifySignature(raw, req.headers['x-hub-signature-256'], process.env.WHATSAPP_APP_SECRET))
    return res.status(401).send('invalid_signature');
  // DO NOT acknowledge signed message delivery before durable enqueue,
  // deduplication, user allowlisting and a bounded processor are implemented.
  // Meta should retry instead of losing the message. Never echo data or trigger AI here.
  return res.status(503).send('durable_delivery_pipeline_not_released');
}
module.exports = webhook;
module.exports.verifySignature = verifySignature;
module.exports.config = { api: { bodyParser: false } };
