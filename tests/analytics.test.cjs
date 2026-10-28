const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('analytics.js', 'utf8');
function setup(saved, blocked = false) {
  const handlers = {}, events = {}, scripts = [], cookies = [];
  const button = name => ({ hidden: true, focus() {}, addEventListener: (_, cb) => handlers[name] = cb });
  const accept = button('accept'), reject = button('reject'), settings = button('settings');
  const panel = { hidden: true, querySelector: selector => selector === '[data-reject]' ? reject : accept };
  let storage = saved, reloads = 0, interval;
  const document = { referrer: 'https://example.org/?secret=1#x', head: { appendChild: s => scripts.push(s) }, createElement: () => ({}), querySelector: () => panel, querySelectorAll: () => [settings] };
  Object.defineProperty(document, 'cookie', { get: () => '_ga=abc; _ga_DS2PN2ZKER=xyz; other=keep', set: v => cookies.push(v) });
  const window = { addEventListener: (name, cb) => events[name] = cb, setInterval: cb => interval = cb };
  const location = { hostname: 'c0dewars.github.io', origin: 'https://c0dewars.github.io', pathname: '/', reload: () => reloads++ };
  vm.runInNewContext(source, { window, document, location, Date, localStorage: { getItem: () => { if (blocked) throw Error(); return storage; }, setItem: (_, v) => { if (blocked) throw Error(); storage = v; } } });
  return { window, panel, scripts, cookies, handlers, events, get reloads() { return reloads; }, get storage() { return storage; }, expire: () => { storage = null; interval(); } };
}
const remembered = choice => JSON.stringify({ choice, expires: Date.now() + 100000 });
test('new visitor: no Google tag or queue before consent', () => { const s = setup(); assert.equal(s.scripts.length, 0); assert.equal(s.window.dataLayer, undefined); assert.equal(s.panel.hidden, false); });
test('reject stays blocked and remembers choice', () => { const s = setup(); s.handlers.reject(); assert.equal(s.scripts.length, 0); assert.equal(JSON.parse(s.storage).choice, 'rejected'); });
test('accept loads exactly one tag with restricted configuration', () => { const s = setup(); s.handlers.accept(); s.handlers.accept(); assert.equal(s.scripts.length, 1); assert.match(s.scripts[0].src, /G-DS2PN2ZKER$/); const q = s.window.dataLayer.map(v => Array.from(v)); assert.equal(q[0][2].ad_storage, 'denied'); assert.equal(q[1][2].analytics_storage, 'granted'); assert.equal(q[3][2].allow_google_signals, false); assert.equal(q[3][2].page_referrer, 'https://example.org/'); });
test('remembered accept loads; remembered reject does not', () => { assert.equal(setup(remembered('accepted')).scripts.length, 1); assert.equal(setup(remembered('rejected')).scripts.length, 0); });
test('expired, corrupt or unavailable storage fails closed', () => { for (const v of ['bad', JSON.stringify({ choice: 'accepted', expires: 1 }), null]) assert.equal(setup(v).scripts.length, 0); const s = setup(null, true); s.handlers.reject(); assert.equal(s.scripts.length, 0); });
test('withdrawal disables ID, removes only GA cookies and reloads', () => { const s = setup(remembered('accepted')); s.handlers.settings(); assert.equal(s.panel.hidden, false); s.handlers.reject(); assert.equal(s.window['ga-disable-G-DS2PN2ZKER'], true); assert.ok(s.cookies.some(v => v.startsWith('_ga='))); assert.ok(s.cookies.every(v => !v.startsWith('other='))); assert.equal(s.reloads, 1); });
test('cross-tab withdrawal and consent expiry unload analytics', () => { const s = setup(); s.handlers.accept(); s.events.storage({ key: 'analytics-consent-v1' }); assert.equal(s.reloads, 0); s.expire(); assert.equal(s.reloads, 1); });
