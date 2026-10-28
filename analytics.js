(() => {
  'use strict';
  const id = 'G-DS2PN2ZKER';
  const key = 'analytics-consent-v1';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const panel = document.querySelector('#analytics-notice');
  const settings = document.querySelectorAll('[data-analytics-settings]');
  let loaded = false;
  let choice = null;
  window['ga-disable-' + id] = true;
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value && ['accepted', 'rejected'].includes(value.choice) &&
        value.expires > Date.now() ? value.choice : null;
    } catch { return null; }
  }
  function clearCookies() {
    const domains = ['', location.hostname, '.' + location.hostname];
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.trim().split('=')[0];
      if (name === '_ga' || name.startsWith('_ga_')) {
        domains.forEach(domain => {
          document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax' +
            (domain ? '; Domain=' + domain : '') + '; Secure';
        });
      }
    });
  }
  function enable() {
    window['ga-disable-' + id] = false;
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied'
    });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: location.hostname,
      cookie_expires: 15552000,
      cookie_update: false,
      page_location: location.origin + location.pathname,
      page_referrer: document.referrer ? document.referrer.split(/[?#]/)[0] : ''
    });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(script);
  }
  function reject() {
    window['ga-disable-' + id] = true;
    clearCookies();
  }
  function save(next) {
    const wasLoaded = loaded;
    choice = next;
    try { localStorage.setItem(key, JSON.stringify({ choice, expires: Date.now() + lifetime })); } catch {}
    panel.hidden = true;
    if (choice === 'accepted') enable();
    else {
      reject();
      // Unload the running Google library; the next document blocks it completely.
      if (wasLoaded) location.reload();
    }
    settings[0]?.focus();
  }
  settings.forEach(button => {
    button.hidden = false;
    button.addEventListener('click', () => {
      panel.hidden = false;
      panel.querySelector('button').focus();
    });
  });
  panel.querySelector('[data-accept]').addEventListener('click', () => save('accepted'));
  panel.querySelector('[data-reject]').addEventListener('click', () => save('rejected'));
  choice = read();
  panel.hidden = choice !== null;
  if (choice === 'accepted') enable(); else reject();
  // Honour withdrawal made in another tab.
  window.addEventListener('storage', event => {
    if (event.key === key && read() !== 'accepted') {
      reject();
      if (loaded) location.reload();
      else panel.hidden = read() !== null;
    }
  });
  // Expired permissions must not continue in a long-lived open tab.
  window.setInterval(() => {
    if (choice === 'accepted' && read() !== 'accepted') {
      reject();
      location.reload();
    }
  }, 60000);
})();
