/* The Sofa Library: small enhancements. Everything works without this file. */
(function () {
  // Photo viewer: links with class "zoom" open the large photo in a dialog, grouped by data-group.
  var box = document.getElementById("lightbox");
  if (box && typeof box.showModal === "function") {
    var img = box.querySelector("img"), cap = box.querySelector("figcaption");
    var list = [], pos = 0;
    function show(i) {
      pos = (i + list.length) % list.length;
      var a = list[pos];
      img.src = a.getAttribute("href");
      var c = a.getAttribute("data-caption") || (a.querySelector("img") || {}).alt || "";
      img.alt = c;
      cap.textContent = c + (list.length > 1 ? "  (" + (pos + 1) + " of " + list.length + ")" : "");
      box.querySelector(".lb-prev").hidden = box.querySelector(".lb-next").hidden = list.length < 2;
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a.zoom");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      var g = a.getAttribute("data-group");
      list = Array.prototype.slice.call(document.querySelectorAll('a.zoom[data-group="' + g + '"]'));
      show(list.indexOf(a));
      box.showModal();
    });
    box.querySelector(".lb-close").addEventListener("click", function () { box.close(); });
    box.querySelector(".lb-prev").addEventListener("click", function () { show(pos - 1); });
    box.querySelector(".lb-next").addEventListener("click", function () { show(pos + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(pos - 1);
      if (e.key === "ArrowRight") show(pos + 1);
    });
    var x0 = null;
    box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(pos + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }

  // Contact form: the preview cannot send, so explain instead.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.querySelector(".form-msg").textContent =
        "This form will be connected to " + form.getAttribute("data-email") + " when the site goes live.";
    });
  }

  // Keep the current nav item in view on narrow screens.
  var cur = document.querySelector('.site-nav a[aria-current="page"]');
  if (cur && cur.scrollIntoView && window.innerWidth < 900) {
    var ul = cur.closest("ul");
    ul.scrollLeft = cur.offsetLeft - 16;
  }
})();
