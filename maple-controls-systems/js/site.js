(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var form = document.getElementById('enquiry');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('form-msg');
      msg.classList.add('show');
      msg.focus();
    });
  }
})();
