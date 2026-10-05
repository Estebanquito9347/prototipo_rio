/* Río Xanaes · Arroyito — interacciones de la página */
(function () {
  "use strict";

  /* ---------- Datos: etapas del río ---------- */
  var ETAPAS = [
    {
      titulo: "1 · Cabecera: Cumbres de Achala",
      tags: ["Naciente", "≈ 2.000 m s. n. m."],
      texto: "El sistema nace en las laderas orientales de las Cumbres de Achala, en la Sierra Grande. Allí se forman los arroyos y ríos que alimentan a los dos brazos principales del Xanaes: el río Anisacate (formado por los ríos De la Suela y San José) y el río Los Molinos.",
      puntos: [
        "El dique Los Molinos recoge aguas de los ríos San Pedro, de los Espinillos, del Medio y de Los Reartes, y ayuda a regular el caudal.",
        "Es la zona de montaña: pendiente fuerte y agua más rápida."
      ]
    },
    {
      titulo: "2 · Confluencia y salida de las sierras",
      tags: ["Curso alto", "Despeñaderos"],
      texto: "Cerca de Despeñaderos se unen los ríos Los Molinos y Anisacate y, a partir de ese punto, se lo conoce como río Xanaes o Segundo. En Despeñaderos el río deja la región serrana.",
      puntos: [
        "Desde acá comienza el recorrido del Desafío del Xanaes (primer tramo).",
        "Es el punto donde el relieve cambia de sierra a llanura."
      ]
    },
    {
      titulo: "3 · Llanura pampeana",
      tags: ["Curso medio", "Pilar · Río Segundo · Villa del Rosario"],
      texto: "En la llanura el río corre primero de oeste a este y luego de sudoeste a noreste. La pendiente es suave, el cauce es arenoso y se ensancha, y aparecen islas y bancos de arena.",
      puntos: [
        "Pasa por Río Segundo, Pilar y Villa del Rosario.",
        "El caudal varía mucho entre verano (lluvias) e invierno (época seca)."
      ]
    },
    {
      titulo: "4 · Tramo de Arroyito",
      tags: ["Curso medio-bajo", "Tránsito · Arroyito"],
      texto: "Tras pasar por Capilla del Carmen y Villa del Tránsito, el río llega a Arroyito, donde forma playas, islas y el balneario municipal de las Costas del Xanaes. Es el final de la tercera parte del Desafío del Xanaes.",
      puntos: [
        "Costanera de unos 2 km con sectores de playa, camping, senderos e islas.",
        "Se aplican banderas rojas cuando el río crece por lluvias en la cuenca alta.",
        "El Biocorredor Xanaes–Plujunta protege el monte ribereño entre La Curva y Marull."
      ]
    },
    {
      titulo: "5 · Curso bajo y desembocadura",
      tags: ["Desembocadura", "Mar Chiquita"],
      texto: "Aguas abajo de Arroyito pasa por la zona de El Tío, Marull y Balnearia. Finalmente se divide en dos brazos (uno es el Canal de Plujunta) y desagua en la laguna de Mar Chiquita, también llamada Mar de Ansenuza, la laguna salada más grande de Argentina.",
      puntos: [
        "Es una cuenca endorreica: el agua no llega al mar.",
        "Junto con los ríos Primero (Suquía) y Dulce alimenta la laguna."
      ]
    }
  ];

  /* ---------- Datos: quiz ---------- */
  var PREGUNTAS = [
    {
      q: "¿Con qué otro nombre se conoce al río Xanaes?",
      o: ["Río Primero", "Río Segundo", "Río Tercero"],
      c: 1,
      f: "Los españoles nombraron los ríos de norte a sur: el Segundo es el Xanaes."
    },
    {
      q: "¿Dónde termina el río Xanaes?",
      o: ["En el río Paraná", "En el Océano Atlántico", "En la laguna de Mar Chiquita"],
      c: 2,
      f: "Su cuenca es endorreica: no tiene salida al mar y desagua en Mar Chiquita."
    },
    {
      q: "¿Qué ríos se unen para formar el Xanaes?",
      o: ["Los Molinos y Anisacate", "Suquía y Dulce", "San Pedro y Cálamo"],
      c: 0,
      f: "Se forma de la unión de los ríos Los Molinos y Anisacate, cerca de Despeñaderos."
    },
    {
      q: "¿Qué significa una bandera roja en la costa del río?",
      o: ["Que se puede pescar", "Que está prohibido entrar al agua", "Que hay una fiesta"],
      c: 1,
      f: "Se coloca cuando el caudal crece. Prohíbe entrar al agua e incluso acercarse a la orilla."
    },
    {
      q: "¿Qué tramo recorre el Desafío del Xanaes que llega a Arroyito?",
      o: ["Córdoba capital – Alta Gracia", "Villa del Rosario – Arroyito", "Arroyito – San Francisco"],
      c: 1,
      f: "La tercera parte de la travesía sale de Villa del Rosario y llega al balneario de Arroyito."
    }
  ];

  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  function esc(t) {
    var d = document.createElement("div");
    d.textContent = t;
    return d.innerHTML;
  }

  /* ---------- Menú móvil ---------- */
  var toggle = $("#navToggle");
  var menu = $("#menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var abierto = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(abierto));
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Resaltar sección activa del menú ---------- */
  var enlaces = $$(".menu a");
  var secciones = enlaces
    .map(function (a) { return $(a.getAttribute("href")); })
    .filter(Boolean);

  function marcarActivo() {
    var pos = window.scrollY + 120;
    var actual = secciones[0];
    secciones.forEach(function (s) { if (s.offsetTop <= pos) actual = s; });
    enlaces.forEach(function (a) {
      a.classList.toggle("is-active", actual && a.getAttribute("href") === "#" + actual.id);
    });
  }

  /* ---------- Botón volver arriba ---------- */
  var toTop = $("#toTop");
  if (toTop) {
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }
  window.addEventListener("scroll", function () {
    marcarActivo();
    if (toTop) toTop.classList.toggle("is-visible", window.scrollY > 600);
  }, { passive: true });
  marcarActivo();

  /* ---------- Recorrido del río ---------- */
  var tabsBox = $("#stationTabs");
  var info = $("#stationInfo");
  var prev = $("#prevStation");
  var next = $("#nextStation");
  var estaciones = $$(".station");
  var actual = 0;

  function mostrarEtapa(i, animar) {
    if (i < 0 || i >= ETAPAS.length) return;
    actual = i;
    var e = ETAPAS[i];
    var html = "<h3>" + esc(e.titulo) + "</h3>";
    e.tags.forEach(function (t) { html += '<span class="tag">' + esc(t) + "</span>"; });
    html += "<p>" + esc(e.texto) + "</p><ul>";
    e.puntos.forEach(function (p) { html += "<li>" + esc(p) + "</li>"; });
    html += "</ul>";
    info.innerHTML = html;
    if (animar !== false) {
      info.classList.remove("fade");
      void info.offsetWidth;
      info.classList.add("fade");
    }
    estaciones.forEach(function (g, idx) { g.classList.toggle("is-active", idx === i); });
    $$(".tab", tabsBox).forEach(function (b, idx) {
      b.classList.toggle("is-active", idx === i);
      b.setAttribute("aria-selected", String(idx === i));
    });
    prev.disabled = i === 0;
    next.disabled = i === ETAPAS.length - 1;
  }

  if (tabsBox && info) {
    ETAPAS.forEach(function (_, i) {
      var b = document.createElement("button");
      b.className = "tab";
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Etapa " + (i + 1));
      b.textContent = i + 1;
      b.addEventListener("click", function () { mostrarEtapa(i); });
      tabsBox.appendChild(b);
    });
    estaciones.forEach(function (g) {
      var i = Number(g.getAttribute("data-station"));
      g.addEventListener("click", function () { mostrarEtapa(i); });
      g.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); mostrarEtapa(i); }
      });
    });
    prev.addEventListener("click", function () { mostrarEtapa(actual - 1); });
    next.addEventListener("click", function () { mostrarEtapa(actual + 1); });
    mostrarEtapa(0, false);
  }

  /* ---------- Filtro de actividades ---------- */
  var chips = $$(".chip");
  var tarjetas = $$(".card--act");
  chips.forEach(function (c) {
    c.addEventListener("click", function () {
      var f = c.getAttribute("data-filter");
      chips.forEach(function (x) { x.classList.toggle("is-active", x === c); });
      tarjetas.forEach(function (t) {
        t.hidden = !(f === "todas" || t.getAttribute("data-cat") === f);
      });
    });
  });

  /* ---------- Checklist de compromisos ---------- */
  var cajas = $$("#checklist input[type=checkbox]");
  var barra = $("#progressBar");
  var texto = $("#progressText");
  var CLAVE = "xanaes_compromisos";

  function actualizarProgreso() {
    var n = cajas.filter(function (c) { return c.checked; }).length;
    if (barra) barra.style.width = (n / cajas.length * 100) + "%";
    if (texto) {
      texto.textContent = n + " de " + cajas.length + " compromisos" +
        (n === cajas.length ? " · ¡Gracias por cuidar el Xanaes! 💙" : "");
    }
    try { localStorage.setItem(CLAVE, JSON.stringify(cajas.map(function (c) { return c.checked; }))); } catch (e) {}
  }
  try {
    var guardado = JSON.parse(localStorage.getItem(CLAVE) || "[]");
    cajas.forEach(function (c, i) { c.checked = !!guardado[i]; });
  } catch (e) {}
  cajas.forEach(function (c) { c.addEventListener("change", actualizarProgreso); });
  actualizarProgreso();

  /* ---------- Quiz ---------- */
  var quiz = $("#quiz");
  var qi = 0, puntos = 0;

  function mostrarPregunta() {
    var p = PREGUNTAS[qi];
    var html = '<p class="quiz__count">Pregunta ' + (qi + 1) + " de " + PREGUNTAS.length + "</p>" +
      '<p class="quiz__q">' + esc(p.q) + '</p><div class="quiz__opts">';
    p.o.forEach(function (op, i) {
      html += '<button type="button" class="quiz__opt" data-i="' + i + '">' + esc(op) + "</button>";
    });
    html += '</div><p class="quiz__fb" aria-live="polite"></p>';
    quiz.innerHTML = html;
    $$(".quiz__opt", quiz).forEach(function (b) {
      b.addEventListener("click", function () { responder(Number(b.getAttribute("data-i"))); });
    });
  }

  function responder(i) {
    var p = PREGUNTAS[qi];
    var botones = $$(".quiz__opt", quiz);
    botones.forEach(function (b, idx) {
      b.disabled = true;
      if (idx === p.c) b.classList.add("is-right");
      else if (idx === i) b.classList.add("is-wrong");
    });
    if (i === p.c) puntos++;
    $(".quiz__fb", quiz).textContent = (i === p.c ? "¡Correcto! " : "Casi. ") + p.f;
    var sig = document.createElement("button");
    sig.type = "button";
    sig.className = "btn btn--small quiz__next";
    sig.textContent = qi < PREGUNTAS.length - 1 ? "Siguiente →" : "Ver resultado";
    sig.addEventListener("click", function () {
      qi++;
      if (qi < PREGUNTAS.length) mostrarPregunta(); else resultado();
    });
    quiz.appendChild(sig);
    sig.focus();
  }

  function resultado() {
    var msg = puntos === PREGUNTAS.length ? "¡Sos un experto del Xanaes!" :
              puntos >= 3 ? "¡Muy bien! Conocés bastante el río." : "Seguí explorando: el río tiene mucho para contar.";
    quiz.innerHTML = '<div class="quiz__score"><strong>' + puntos + " / " + PREGUNTAS.length +
      "</strong><p>" + msg + '</p><button type="button" class="btn btn--small" id="quizRestart">Intentar de nuevo</button></div>';
    $("#quizRestart").addEventListener("click", function () { qi = 0; puntos = 0; mostrarPregunta(); });
  }
  if (quiz) mostrarPregunta();

  /* ---------- Contadores del hero ---------- */
  var contadores = $$("[data-count]");
  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reducir && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, fin = Number(el.getAttribute("data-count")), t0 = null;
        function paso(t) {
          if (!t0) t0 = t;
          var k = Math.min((t - t0) / 1200, 1);
          el.textContent = Math.round(fin * k).toLocaleString("es-AR");
          if (k < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
        io.unobserve(el);
      });
    }, { threshold: .6 });
    contadores.forEach(function (c) { io.observe(c); });
  }

  /* ---------- Año del pie ---------- */
  var y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
