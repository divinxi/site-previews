// Range finder: filter every product line (and the family notes) by text and finish.
(function () {
  var q = document.getElementById('q');
  if (!q) return;
  var rows = Array.prototype.slice.call(document.querySelectorAll('.range-list tbody tr'));
  var fams = Array.prototype.slice.call(document.querySelectorAll('.r-fam'));
  var count = document.getElementById('count');
  var none = document.getElementById('none');
  function norm(s) { return s.toLowerCase().replace(/\s+/g, ' ').trim(); }
  function textMatch(t, terms, lo, hi) {
    return terms.every(function (w) {
      if (t.indexOf(w) !== -1) return true;
      var m = /^m(\d+)$/.exec(w);
      return !!(m && lo && +m[1] >= lo && +m[1] <= hi);
    });
  }
  function run() {
    var terms = norm(q.value).split(' ').filter(Boolean);
    var fin = (document.querySelector('input[name="finish"]:checked') || {}).value || 'all';
    var shown = 0;
    rows.forEach(function (r) {
      var ok = textMatch(r.getAttribute('data-text'), terms, +r.getAttribute('data-mmin'), +r.getAttribute('data-mmax')) &&
        (fin === 'all' || (' ' + r.getAttribute('data-finish') + ' ').indexOf(' ' + fin + ' ') !== -1);
      r.hidden = !ok;
      if (ok) shown++;
    });
    var anyNote = false;
    fams.forEach(function (f) {
      f.querySelectorAll('.spec-wrap').forEach(function (w) {
        w.hidden = !w.querySelector('tbody tr:not([hidden])');
      });
      var hasRows = !!f.querySelector('tbody tr:not([hidden])');
      var noteHit = false;
      f.querySelectorAll('.note').forEach(function (n) {
        var hit = terms.length > 0 && textMatch(n.getAttribute('data-text'), terms);
        if (hit) noteHit = true;
        n.hidden = !(hasRows || hit);
        n.classList.toggle('hit', hit);
      });
      if (noteHit) anyNote = true;
      f.hidden = !(hasRows || noteHit);
    });
    count.textContent = 'Showing ' + shown + ' of ' + rows.length + ' product lines';
    none.hidden = shown !== 0 || anyNote;
  }
  q.addEventListener('input', run);
  document.querySelectorAll('input[name="finish"]').forEach(function (i) { i.addEventListener('change', run); });
  run();
})();
