(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }
  var forms = document.querySelectorAll('.js-preview-form');
  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.querySelector('.form-msg');
      if (msg) { msg.classList.add('show'); msg.focus && msg.setAttribute('tabindex', '-1'); msg.focus(); }
    });
  });
})();
(function () {
  var y = new Date().getFullYear();
  Array.prototype.forEach.call(document.querySelectorAll('.js-year'), function (sel) {
    sel.innerHTML = '';
    [y, y + 1].forEach(function (v) { var o = document.createElement('option'); o.textContent = v; sel.appendChild(o); });
  });
})();
