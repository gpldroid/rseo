(function () {
  'use strict';

  var CLIENT_ID = 'ca-pub-6996931662051674';
  var AD_SLOT = '5806370724';
  var loaderPromise = null;

  function loadAdsense() {
    if (window.adsbygoogle && window.adsbygoogle.loaded) {
      return Promise.resolve();
    }

    if (loaderPromise) {
      return loaderPromise;
    }

    loaderPromise = new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-adsense-loader]');
      if (existing) {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          resolve();
        } else {
          existing.addEventListener('load', resolve, { once: true });
          existing.addEventListener('error', reject, { once: true });
        }
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

  function createAd(position) {
    var wrapper = document.createElement('div');
    wrapper.className = 'adsense-inline my-8 w-full';
    wrapper.setAttribute('aria-label', 'Advertisement');
    wrapper.dataset.adPosition = position;

    var ad = document.createElement('ins');
    ad.className = 'adsbygoogle';
    ad.style.display = 'block';
    ad.style.textAlign = 'center';
    ad.style.minHeight = '250px';
    ad.dataset.adLayout = 'in-article';
    ad.dataset.adFormat = 'fluid';
    ad.dataset.adClient = CLIENT_ID;
    ad.dataset.adSlot = AD_SLOT;
    wrapper.appendChild(ad);

    return wrapper;
  }

  function activateAd(wrapper) {
    if (wrapper.dataset.adActivated === 'true') {
      return;
    }
    wrapper.dataset.adActivated = 'true';

    loadAdsense().then(function () {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }).catch(function () {
      wrapper.dataset.adLoadFailed = 'true';
    });
  }

  function observeAd(wrapper) {
    if (!('IntersectionObserver' in window)) {
      activateAd(wrapper);
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          observer.unobserve(wrapper);
          activateAd(wrapper);
        }
      });
    }, { rootMargin: '600px 0px' });

    observer.observe(wrapper);
  }

  function insertAds() {
    var main = document.querySelector('main');
    if (!main || main.querySelector('.adsense-inline')) {
      return;
    }

    var article = main.querySelector(':scope > article');
    var contentRoot = article || main;
    var firstParagraph = article
      ? article.querySelector(':scope > p')
      : main.querySelector(':scope > section:first-of-type p');

    var paragraphs = Array.prototype.slice.call(contentRoot.querySelectorAll('p')).filter(function (paragraph) {
      return !paragraph.closest('[data-ad-position]') &&
        !/Related SEO Resources|Related Resources/i.test(
          paragraph.closest('section')?.querySelector('h2, h3')?.textContent || ''
        );
    });

    var lastParagraph = paragraphs.length ? paragraphs[paragraphs.length - 1] : null;

    if (firstParagraph) {
      var firstAd = createAd('after-intro');
      firstParagraph.insertAdjacentElement('afterend', firstAd);
      observeAd(firstAd);
    }

    if (lastParagraph && lastParagraph !== firstParagraph) {
      var lastAd = createAd('after-content');
      lastParagraph.insertAdjacentElement('afterend', lastAd);
      observeAd(lastAd);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertAds, { once: true });
  } else {
    insertAds();
  }
})();