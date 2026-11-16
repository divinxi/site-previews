// Preview only: the form cannot send yet. Check name plus one contact route, then show a message.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var err = document.getElementById('form-err');
  var msg = document.getElementById('form-msg');
  function val(id) { return document.getElementById(id).value.trim(); }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msg.classList.remove('show');
    var problem = '';
    var email = val('email');
    if (!val('name')) problem = 'Please enter your name.';
    else if (!val('tel') && !val('mobtel') && !email) problem = 'Please give a phone number or an email address so we can reply.';
    else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problem = 'Please check the email address.';
    err.textContent = problem;
    if (problem) return;
    msg.classList.add('show');
    msg.focus();
  });
})();
