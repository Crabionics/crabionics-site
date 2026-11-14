const test = require('node:test');
const assert = require('node:assert/strict');
const { createHmac } = require('node:crypto');
const { verifySignature } = require('../api/whatsapp.js');
const webhook = require('../api/whatsapp.js');
const status = require('../api/status.js');
function mockRes(){return {code:200,headers:{},body:null,setHeader(k,v){this.headers[k]=v;return this},status(n){this.code=n;return this},send(v){this.body=v;return this},json(v){this.body=v;return this}}}
test('signature verifier accepts valid raw-body HMAC',()=>{
 const raw = Buffer.from('{"object":"whatsapp_business_account"}');
 const secret = 'test_only';
 const sig = 'sha256='+createHmac('sha256',secret).update(raw).digest('hex');
 assert.equal(verifySignature(raw,sig,secret),true);
 assert.equal(verifySignature(Buffer.from('changed'),sig,secret),false);
 assert.equal(verifySignature(raw,'sha256=oops',secret),false);
 assert.equal(verifySignature(raw,sig,''),false);
});
test('whatsapp endpoint fails closed when integration is absent',async()=>{
 const r=mockRes();await webhook({method:'GET',query:{'hub.mode':'subscribe','hub.challenge':'123','hub.verify_token':'bad'}},r);
 assert.equal(r.code,503);assert.equal(r.body,'integration_not_activated');
});
test('status endpoint clearly declines to report live metrics',async()=>{
 const r=mockRes();await status({method:'GET'},r);
 assert.equal(r.code,200);assert.equal(r.body.aiExecution.enabled,false);
 assert.equal(r.body.providerUsage.inputTokens,null);
 assert.equal(r.body.providerUsage.available,false);
});
