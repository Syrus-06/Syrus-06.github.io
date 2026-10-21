/* Winter Arc Hub — header search. Black/white, client-side, no dependencies. */
(function () {
  'use strict';

  var PAGES = [
    { t: 'Home', u: '/', k: 'winter arc hub home start', c: 'Page' },
    { t: 'What is Winter Arc? The Complete Guide', u: '/2026/08/18/what-is-winter-arc.html', k: 'winter arc guide discipline consistency mindset habits challenge', c: 'Guide' },
    { t: 'About', u: '/about/', k: 'about winter arc hub story', c: 'Page' },
    { t: 'Disclosure', u: '/disclosure/', k: 'affiliate disclosure policy', c: 'Page' },
    { t: 'Shop', u: '/shop/', k: 'shop all products gear store', c: 'Shop' },
    { t: 'Tees', u: '/shop/apparel/tees/', k: 'tee t-shirt shirt top apparel clothing training', c: 'Apparel' },
    { t: 'Compression', u: '/shop/apparel/compression/', k: 'compression base layer sleeves apparel clothing', c: 'Apparel' },
    { t: 'Trackpants', u: '/shop/apparel/trackpants/', k: 'trackpants joggers track pants bottoms apparel', c: 'Apparel' },
    { t: 'Shorts', u: '/shop/apparel/shorts/', k: 'shorts bottoms apparel training', c: 'Apparel' },
    { t: 'Shoes', u: '/shop/footwear/shoes/', k: 'shoes trainers sneakers footwear running gym', c: 'Footwear' },
    { t: 'Socks', u: '/shop/footwear/socks/', k: 'socks footwear crew ankle', c: 'Footwear' },
    { t: 'Bands', u: '/shop/gym-essentials/bands/', k: 'resistance bands gym essentials equipment', c: 'Gym Essentials' },
    { t: 'Grippers', u: '/shop/gym-essentials/grippers/', k: 'gripper hand grip strength gym essentials', c: 'Gym Essentials' },
    { t: 'Bottles', u: '/shop/gym-essentials/bottles/', k: 'water bottle shaker hydration gym essentials', c: 'Gym Essentials' },
    { t: 'Other gym essentials', u: '/shop/gym-essentials/more/', k: 'gym essentials straps belt wraps equipment misc', c: 'Gym Essentials' },
    { t: 'Creatine', u: '/shop/supplements/creatine/', k: 'creatine monohydrate supplements powder', c: 'Supplements' },
    { t: 'Protein', u: '/shop/supplements/protein/', k: 'protein whey isolate powder supplements shake', c: 'Supplements' },
    { t: 'Pre-workout', u: '/shop/supplements/pre-workout/', k: 'pre-workout energy pump caffeine supplements', c: 'Supplements' },
    { t: 'Other supplements', u: '/shop/supplements/more/', k: 'supplements vitamins omega sleep magnesium misc', c: 'Supplements' }
  ];

  var btn = document.getElementById('wah-search-btn');
  var overlay = document.getElementById('wah-search-overlay');
  var input = document.getElementById('wah-search-input');
  var close = document.getElementById('wah-search-close');
  var list = document.getElementById('wah-search-results');
  var empty = document.getElementById('wah-search-empty');
  if (!btn || !overlay || !input || !close || !list || !empty) return;

  function norm(s) { return (s || '').toLowerCase().trim(); }

  function matches(q) {
    var words = norm(q).split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return PAGES.filter(function (p) {
      var hay = norm(p.t + ' ' + p.k + ' ' + p.c);
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    }).slice(0, 8);
  }

  function render(q) {
    var m = matches(q);
    list.innerHTML = '';
    m.forEach(function (p) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'wah-search-hit';
      a.href = p.u;
      a.innerHTML = '<span class="wah-search-hit-name"></span><span class="wah-search-hit-cat"></span>';
      a.querySelector('.wah-search-hit-name').textContent = p.t;
      a.querySelector('.wah-search-hit-cat').textContent = p.c;
      li.appendChild(a);
      list.appendChild(li);
    });
    empty.hidden = m.length > 0;
    list.hidden = m.length === 0;
  }

  function open() {
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
    document.documentElement.classList.add('wah-lock');
    btn.setAttribute('aria-expanded', 'true');
    render('');
    input.value = '';
    input.focus();
  }

  function shut() {
    overlay.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('wah-lock');
    window.setTimeout(function () { overlay.hidden = true; }, 220);
  }

  btn.addEventListener('click', open);
  close.addEventListener('click', shut);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) shut(); });
  input.addEventListener('input', function () { render(input.value); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.hidden) { shut(); return; }
    if (e.key === '/' && overlay.hidden && !/^(input|textarea|select)$/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      open();
    }
  });
})();
