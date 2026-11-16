(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Highlight today's opening hours
  var day = new Date().getDay(); // 0 = Sunday
  document.querySelectorAll('.hours tr[data-day="' + day + '"]').forEach(function (tr) { tr.classList.add('today'); });

  // Lightbox for gallery photos (links still open the full image without JavaScript)
  var links = document.querySelectorAll('a.zoom');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.innerHTML = '<button type="button" aria-label="Close photo">&times;</button><img alt=""><p></p>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('img');
  var cap = dlg.querySelector('p');
  dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var thumb = a.querySelector('img');
      img.src = a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      var fc = a.closest('figure') && a.closest('figure').querySelector('figcaption');
      var b = fc && fc.querySelector('b');
      var title = b ? b.textContent.trim() : '';
      var rest = fc ? fc.textContent.replace(title, '').replace(/\s+/g, ' ').trim() : '';
      cap.textContent = title && rest ? title + ': ' + rest : (title || rest);
      dlg.showModal();
    });
  });
})();
