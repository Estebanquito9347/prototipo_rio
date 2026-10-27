/* ==========================================================
   Río Xanaes · Arroyito — funciones extra
   (comparador ayer/hoy, videos, caudal e impacto de la campaña)
   ========================================================== */
(function () {
  'use strict';

  /* ---------- 1. Impacto de la campaña ----------
     EDITAR ACÁ con los resultados reales de la encuesta.
     Estos números son de EJEMPLO (los de la consigna de la tutora):
     reemplazarlos por los resultados reales antes de publicar. */
  var IMPACTO = {
    esEjemplo: true,
    personas: 120,
    compromisos: [
      { texto: 'se compromete a no arrojar residuos', porcentaje: 95 },
      { texto: 'se compromete a ahorrar agua',        porcentaje: 82 },
      { texto: 'se compromete a plantar especies nativas', porcentaje: 64 }
    ]
  };

  /* ---------- 2. Caudal ---------- */
  var NIVELES = {
    bajo: {
      etiqueta: 'Nivel: bajo',
      agua: 'M181.5 200 L418.5 200 L400 215 L200 215 Z',
      texto: 'Caudal bajo: típico de la época seca. Se ven bancos de arena y el agua ocupa solo el centro del cauce. En sequías muy intensas el río puede cortarse en superficie.'
    },
    normal: {
      etiqueta: 'Nivel: normal',
      agua: 'M138.5 165 L461.5 165 L400 215 L200 215 Z',
      texto: 'Caudal normal: el agua ocupa gran parte del cauce y las islas quedan rodeadas. Es el escenario con el que se usa el balneario cuando no hay bandera roja.'
    },
    crecida: {
      etiqueta: 'Nivel: crecida',
      agua: 'M0 112 L600 112 L600 120 L480 150 L400 215 L200 215 L120 150 L0 120 Z',
      texto: 'Crecida: tras lluvias fuertes en la cuenca alta, el río puede subir más de 2 metros en poco tiempo y desbordar las márgenes. Se colocan banderas rojas: no te acerques a la orilla.'
    }
  };

  function initCaudal() {
    var cont = document.getElementById('caudal');
    if (!cont) return;
    var medida = document.getElementById('caudalMedida');
    var texto = document.getElementById('caudalTexto');
    var botones = cont.querySelectorAll('[data-nivel]');

    function mostrar(nivel) {
      var n = NIVELES[nivel];
      if (!n) return;
      medida.textContent = n.etiqueta;
      texto.textContent = n.texto;
      botones.forEach(function (b) {
        b.classList.toggle('is-active', b.dataset.nivel === nivel);
      });
      cont.dataset.nivel = nivel;
    }
    botones.forEach(function (b) {
      b.addEventListener('click', function () { mostrar(b.dataset.nivel); });
    });
    mostrar('bajo');
  }

  /* ---------- 3. Comparador ayer / hoy ---------- */
  function cargarFoto(capa, url) {
    if (!url) return;
    var img = new Image();
    img.onload = function () {
      capa.style.backgroundImage = 'url("' + url + '")';
      capa.classList.add('tiene-foto');
    };
    img.src = url;
  }

  function initComparadores() {
    document.querySelectorAll('.compare').forEach(function (fig) {
      var stage = fig.querySelector('.compare__stage');
      var range = fig.querySelector('.compare__range');
      cargarFoto(fig.querySelector('.compare__img--ayer'), fig.dataset.ayer);
      cargarFoto(fig.querySelector('.compare__img--hoy'), fig.dataset.hoy);
      function mover() { stage.style.setProperty('--pos', range.value + '%'); }
      range.addEventListener('input', mover);
      mover();
    });
  }

  /* ---------- 4. Videos ---------- */
  function initVideos() {
    document.querySelectorAll('.video').forEach(function (card) {
      var yt = (card.dataset.youtube || '').trim();
      var archivo = (card.dataset.archivo || '').trim();
      var box = card.querySelector('.video__box');
      var btn = card.querySelector('.video__play');
      var soon = card.querySelector('.video__soon');

      if (!yt && !archivo) { btn.hidden = true; return; }
      card.classList.add('is-ready');
      if (soon) soon.remove();

      if (yt) {
        box.style.backgroundImage = 'url("https://i.ytimg.com/vi/' + encodeURIComponent(yt) + '/hqdefault.jpg")';
      }
      btn.addEventListener('click', function () {
        var titulo = card.querySelector('h3').textContent;
        var el;
        if (yt) {
          el = document.createElement('iframe');
          el.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(yt) + '?autoplay=1&rel=0';
          el.allow = 'autoplay; encrypted-media; picture-in-picture';
          el.allowFullscreen = true;
          el.title = titulo;
        } else {
          el = document.createElement('video');
          el.src = archivo;
          el.controls = true;
          el.autoplay = true;
          el.playsInline = true;
        }
        box.innerHTML = '';
        box.style.backgroundImage = 'none';
        box.appendChild(el);
      });
    });
  }

  /* ---------- 5. Impacto ---------- */
  function initImpacto() {
    var barras = document.getElementById('impactBars');
    if (!barras) return;
    document.getElementById('impactTotal').textContent = IMPACTO.personas;

    IMPACTO.compromisos.forEach(function (c) {
      var li = document.createElement('li');
      li.innerHTML =
        '<div class="impact__label"><strong>' + c.porcentaje + '%</strong> ' + c.texto + '</div>' +
        '<div class="progress" role="img" aria-label="' + c.porcentaje + '% ' + c.texto + '"><div class="progress__bar" style="width:0"></div></div>';
      li._pct = c.porcentaje;
      barras.appendChild(li);
    });

    function llenar() {
      barras.querySelectorAll('li').forEach(function (li) {
        li.querySelector('.progress__bar').style.width = li._pct + '%';
      });
    }
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) { llenar(); obs.disconnect(); }
      }, { threshold: 0.3 });
      obs.observe(barras);
    } else {
      llenar();
    }
  }

  function iniciar() {
    initCaudal();
    initComparadores();
    initVideos();
    initImpacto();
  }
  // Si la página ya terminó de cargar, arranca enseguida; si no, espera.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();