(function () {
  var btn = document.querySelector('[data-menu]');
  var nav = document.getElementById('main-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var form = document.querySelector('form[data-preview]');
  if (form) {
    var names = {
      extensions: 'Extensions & New Build', conservatories: 'Conservatories & Glazing',
      garageconversions: 'Garage Conversions', loftconversions: 'Loft Conversions',
      kitchens: 'Kitchens', bathrooms: 'Bathrooms', driveways: 'Driveways & Landscaping',
      renovations: 'Renovations', restorations: 'Restorations', adaptedliving: 'Adapted Living Solutions',
      adaptedextensions: 'Adapted Living: Extensions', adaptedkitchens: 'Adapted Living: Kitchens',
      adaptedbathrooms: 'Adapted Living: Bathrooms', adapteddriveways: 'Adapted Living: Driveways & Landscaping',
      adaptedrenovations: 'Adapted Living: Whole House Conversions'
    };
    var m = /[?&]service=([a-z]+)/.exec(window.location.search);
    if (m && names[m[1]]) {
      var subj = form.querySelector('#subject');
      if (subj && !subj.value) subj.value = 'Enquiry: ' + names[m[1]];
      var h = document.getElementById('form-title');
      if (h) h.textContent = 'General enquiry: ' + names[m[1]];
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var err = document.getElementById('form-error');
      var msg = document.getElementById('form-msg');
      var hp = form.querySelector('#website');
      if (hp && hp.value) return;
      var val = function (id) { var el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };
      var problem = '';
      if (!val('name')) problem = 'Please enter your name.';
      else if (!val('phone') && !val('email')) problem = 'Please give a phone number or an email address so we can reply.';
      if (problem) {
        err.textContent = problem;
        err.classList.add('show');
        msg.classList.remove('show');
        return;
      }
      err.classList.remove('show');
      msg.classList.add('show');
      msg.focus();
    });
  }
})();
