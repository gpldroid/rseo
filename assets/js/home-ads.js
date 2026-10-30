(function () {
  'use strict';

  var CLIENT_ID = 'ca-pub-6996931662051674';
  var slot = document.getElementById('homepage-adsense-slot');
  var activated = false;
  var loaderPromise;

  if (!slot) return;

  function loadAdsense() {
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      return Promise.resolve();
    }
    if (loaderPromise) return loaderPromise;

    loaderPromise = new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-adsense-loader]');
      if (existing) {
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }

      var script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.dataset.adsenseLoader = 'true';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + CLIENT_ID;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    return loaderPromise;
  }

  function activate() {
    if (activated) return;
    activated = true;

    loadAdsense().then(function () {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }).catch(function () {
      slot.dataset.adLoadFailed = 'true';
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) {
        observer.disconnect();
        activate();
      }
    }, { rootMargin: '600px 0px' });
    observer.observe(slot);
  } else {
    activate();
  }
})();
