'use strict';

/** Safe readiness endpoint: no private source content, usage numbers, or secrets. */
module.exports = async function status(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  return res.status(200).json({
    service: 'crabionics-brain',
    mode: 'preview',
    access: 'public_interface_only',
    aiExecution: { enabled: false, reason: 'authenticated gateway, quotas and ledger not activated' },
    sourceRetrieval: { enabled: false, reason: 'permissioned retrieval not connected' },
    sharedSessions: { enabled: false, reason: 'database and identity not configured' },
    providerUsage: { available: false, inputTokens: null, outputTokens: null, cachedInputTokens: null, costUsd: null },
    whatsApp: { enabled: false, reason: 'Meta approval, signature validation and durable idempotent pipeline not activated' },
    policy: { rawSourceLeakage: 'blocked', realActions: 'blocked', stage: 'safe_interface_preview' }
  });
};
