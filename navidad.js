/* MODO NAVIDAD 2026 · albaniarestaurante.com
   Temporal: destellos muy sutiles sobre la portada.
   No hace nada si falta body.modo-navidad, si el visitante pidio
   menos movimiento o si va en ahorro de datos. Sin dependencias. */
(function () {
  var b = document.body;
  if (!b || !b.classList.contains('modo-navidad')) return;

  var mm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mm && mm.matches) return;
  var con = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (con && con.saveData) return;

  var portada = document.querySelector('.portada');
  if (!portada) return;

  var capa = document.createElement('div');
  capa.className = 'nav-destellos';
  capa.setAttribute('aria-hidden', 'true');

  var n = window.innerWidth < 700 ? 10 : 18;
  for (var i = 0; i < n; i++) {
    var s = document.createElement('span');
    var t = (1.6 + Math.random() * 2.4).toFixed(1);
    s.style.setProperty('--x', (Math.random() * 100).toFixed(1) + '%');
    s.style.setProperty('--t', t + 'px');
    s.style.setProperty('--d', (10 + Math.random() * 9).toFixed(1) + 's');
    s.style.setProperty('--r', (-Math.random() * 18).toFixed(1) + 's');
    s.style.setProperty('--v', ((Math.random() * 40) - 20).toFixed(0) + 'px');
    s.style.setProperty('--o', (0.35 + Math.random() * 0.35).toFixed(2));
    capa.appendChild(s);
  }
  portada.appendChild(capa);

  // Si el visitante activa «menos movimiento» con la pagina abierta, se retiran.
  if (mm && mm.addEventListener) {
    mm.addEventListener('change', function (e) { if (e.matches && capa.parentNode) capa.parentNode.removeChild(capa); });
  }
})();
