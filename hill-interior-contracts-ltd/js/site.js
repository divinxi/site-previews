(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Portfolio sector filter
  var filters = document.querySelector('.filters');
  if (!filters) return;
  filters.hidden = false;
  var chips = filters.querySelectorAll('.chip');
  var cards = document.querySelectorAll('.pcard');
  var status = document.querySelector('.filter-status');

  function apply(key, push) {
    var valid = false;
    chips.forEach(function (c) { if (c.dataset.filter === key) valid = true; });
    if (!valid) key = 'all';
    var shown = 0;
    cards.forEach(function (card) {
      var show = key === 'all' || card.dataset.sector === key;
      card.hidden = !show;
      if (show) shown++;
    });
    var label = '';
    chips.forEach(function (c) {
      var on = c.dataset.filter === key;
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) label = c.textContent;
    });
    if (status) status.textContent = key === 'all' ? 'Showing all ' + shown + ' projects' : 'Showing ' + shown + ' ' + label.toLowerCase() + ' projects';
    if (push && history.replaceState) history.replaceState(null, '', key === 'all' ? location.pathname : '#' + key);
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { apply(c.dataset.filter, true); });
  });
  window.addEventListener('hashchange', function () { apply(location.hash.slice(1) || 'all', false); });
  apply(location.hash.slice(1) || 'all', false);
})();
