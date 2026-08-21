/* ============================================================
   PDX — Pagode do Xandó · renderização dinâmica das seções
   O conteúdo vem de content/site.json (editável no painel /admin).
   A ordem das seções no JSON define a ordem na página e no menu.
   ============================================================ */
(function () {
  'use strict';

  var MESES = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

  var ICON_INSTA = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>';
  var ICON_ZAP = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  var ICON_TIKTOK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5 2.59 2.59 0 01-2.59-2.59 2.59 2.59 0 013.42-2.45V9.72a5.69 5.69 0 00-.83-.06A5.69 5.69 0 004.17 15.3 5.69 5.69 0 009.86 21a5.69 5.69 0 005.69-5.69V8.83a7.35 7.35 0 004.3 1.38V7.12a4.29 4.29 0 01-3.25-1.3z"/></svg>';
  var ICON_SPOTIFY = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.28c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.28 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.14-1.26 11.16-1.02 15.54 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.5.24z"/></svg>';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---------- títulos na fonte Spot ----------
     A Spot não tem letras acentuadas: os títulos saem sem acento,
     que é como a marca usa a fonte. Vale no computador e no celular. */
  var ACENTOS = {
    'á':['a','agudo'], 'à':['a','grave'], 'â':['a','circo'], 'ã':['a','til'], 'ä':['a','trema'],
    'é':['e','agudo'], 'è':['e','grave'], 'ê':['e','circo'], 'ë':['e','trema'],
    'í':['i','agudo'], 'ì':['i','grave'], 'î':['i','circo'], 'ï':['i','trema'],
    'ó':['o','agudo'], 'ò':['o','grave'], 'ô':['o','circo'], 'õ':['o','til'], 'ö':['o','trema'],
    'ú':['u','agudo'], 'ù':['u','grave'], 'û':['u','circo'], 'ü':['u','trema'],
    'ç':['c','cedilha'], 'ñ':['n','til'],
    'Á':['A','agudo'], 'À':['A','grave'], 'Â':['A','circo'], 'Ã':['A','til'], 'Ä':['A','trema'],
    'É':['E','agudo'], 'È':['E','grave'], 'Ê':['E','circo'], 'Ë':['E','trema'],
    'Í':['I','agudo'], 'Ì':['I','grave'], 'Î':['I','circo'], 'Ï':['I','trema'],
    'Ó':['O','agudo'], 'Ò':['O','grave'], 'Ô':['O','circo'], 'Õ':['O','til'], 'Ö':['O','trema'],
    'Ú':['U','agudo'], 'Ù':['U','grave'], 'Û':['U','circo'], 'Ü':['U','trema'],
    'Ç':['C','cedilha'], 'Ñ':['N','til']
  };

  function comAcentos(texto) {
    var saida = '';
    String(texto == null ? '' : texto).split('').forEach(function (ch) {
      var a = ACENTOS[ch];
      saida += a ? a[0] : ch;
    });
    return esc(saida);
  }

  /* ---------- cor de fundo escolhida no painel ----------
     Aplica a cor na seção e acerta o texto sozinho: fundo claro recebe
     texto escuro, fundo escuro recebe texto claro. Assim nada some.    */
  function aplicarCor(node, cor) {
    if (!node || !cor) return;
    var rgb = corParaRGB(cor);
    if (!rgb) return;
    /* luminância percebida: o olho enxerga o verde muito mais que o azul */
    var luz = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    var claro = luz > 0.6;
    node.style.background = cor;
    node.style.setProperty('--txt-auto', claro ? '#3A1470' : '#F3D9C9');
    node.style.setProperty('--tit-auto', claro ? '#8338EC' : '#FFBE0B');
    node.style.setProperty('--sec-inicio', cor);
    node.style.setProperty('--sec-fim', cor);
    node.classList.add('cor-propria');
  }

  function corParaRGB(cor) {
    cor = String(cor).trim();
    var m = cor.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      var h = m[1];
      if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    m = cor.match(/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (m) return [Number(m[1]), Number(m[2]), Number(m[3])];
    return null;
  }

  /* ---------- mini player da playlist ----------
     O quadro do Spotify só é criado quando a pessoa clica: assim a página
     abre leve e ninguém carrega o player sem querer ouvir.            */
  function initPlayer(link) {
    var botao = document.getElementById('nav-play');
    var caixa = document.getElementById('player');
    if (!botao || !caixa) return;

    var id = idDaPlaylist(link);
    if (!id) return;                     /* sem link, o botão nem aparece */
    botao.hidden = false;

    var area = caixa.querySelector('.player__caixa');
    var montado = false;

    function abrir() {
      if (!montado) {
        area.innerHTML = '<iframe src="https://open.spotify.com/embed/playlist/' + esc(id) +
          '?utm_source=generator&theme=0" height="152" allowfullscreen ' +
          'allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" ' +
          'loading="lazy" title="Playlist do PDX no Spotify"></iframe>';
        montado = true;
      }
      caixa.hidden = false;
      caixa.classList.remove('player--mini');
      requestAnimationFrame(function () { caixa.classList.add('player--aberto'); });
      botao.setAttribute('aria-expanded', 'true');
    }

    /* minimizar: encolhe a janelinha mas mantém o quadro na página,
       então a música não para */
    function minimizar() {
      caixa.classList.add('player--mini');
      caixa.querySelector('.player__minimizar')
           .setAttribute('aria-label', 'Voltar ao tamanho normal');
    }

    function alternarMini() {
      if (caixa.classList.contains('player--mini')) {
        caixa.classList.remove('player--mini');
        caixa.querySelector('.player__minimizar')
             .setAttribute('aria-label', 'Minimizar sem parar a música');
      } else {
        minimizar();
      }
    }

    function fechar() {
      caixa.classList.remove('player--aberto');
      botao.setAttribute('aria-expanded', 'false');
      setTimeout(function () {
        caixa.hidden = true;
        caixa.classList.remove('player--mini');
        area.innerHTML = '';            /* aqui sim a música para */
        montado = false;
      }, 250);
    }

    botao.addEventListener('click', function () {
      if (botao.getAttribute('aria-expanded') !== 'true') { abrir(); return; }
      /* já está tocando: o botão da barra volta a mostrar a janelinha */
      if (caixa.classList.contains('player--mini')) alternarMini(); else minimizar();
    });

    caixa.querySelector('.player__minimizar').addEventListener('click', function (e) {
      e.stopPropagation(); alternarMini();
    });
    caixa.querySelector('.player__fechar').addEventListener('click', function (e) {
      e.stopPropagation(); fechar();
    });
    /* clicar na faixa do título também minimiza/restaura */
    caixa.querySelector('.player__topo').addEventListener('click', alternarMini);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && botao.getAttribute('aria-expanded') === 'true') minimizar();
    });
  }

  function idDaPlaylist(link) {
    var m = String(link || '').match(/playlist[/:]([A-Za-z0-9]+)/);
    return m ? m[1] : '';
  }

  /* monta o link do WhatsApp já com a mensagem pronta, quando houver */
  function linkZap(cfg) {
    var num = String(cfg.whatsapp || '').replace(/\D/g, '');
    if (!num) return '';
    return 'https://wa.me/' + num + (cfg.whatsappTexto ? '?text=' + cfg.whatsappTexto : '');
  }

  /* ---------- carregamento do conteúdo ----------
     Os eventos moram num arquivo separado (content/eventos.json): assim
     quem cuida da agenda edita uma lista simples, sem passar pelas seções. */
  function load() {
    var conteudo = fetch('content/site.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return window.PDX_CONTENT; });

    var eventos = fetch('content/eventos.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .catch(function () { return window.PDX_EVENTOS || null; });

    return Promise.all([conteudo, eventos]).then(function (r) {
      var dados = r[0], ev = r[1];
      if (!dados) return dados;
      var sec = (dados.sections || []).filter(function (s) { return s.type === 'edicoes'; })[0];
      if (!sec) return dados;

      /* junta as duas origens: o arquivo próprio e o que porventura tenha
         sido salvo dentro da seção. Nenhum evento se perde no caminho. */
      var juntos = [];
      var vistos = {};
      function guarda(it) {
        if (!it) return;
        var chave = (it.data || '') + '|' + (it.titulo || '') + '|' + (it.cidade || '');
        if (vistos[chave]) return;
        vistos[chave] = 1;
        juntos.push(it);
      }
      (ev && ev.items ? ev.items : []).forEach(guarda);
      (sec.items || []).forEach(guarda);
      sec.items = juntos;
      return dados;
    });
  }

  /* ---------- renderizadores por tipo de seção ---------- */
  var render = {

    hero: function (s, cfg) {
      var videoHtml = '';
      var temVideo = false;
      if (s.videoYoutube) {
        var yid = extractYouTubeId(s.videoYoutube);
        var ini = Number(s.videoInicio) || 0;
        var fim = Number(s.videoFim) || 0;
        var params = 'autoplay=1&mute=1&loop=1&playlist=' + yid +
          '&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3' +
          '&playsinline=1&disablekb=1&fs=0&cc_load_policy=0' +
          (ini ? '&start=' + ini : '') + (fim ? '&end=' + fim : '');
        videoHtml = '<div class="hero__yt" aria-hidden="true"' +
          (s.videoPoster ? ' style="background-image:url(' + esc(s.videoPoster) + ')"' : '') + '>' +
          '<iframe src="https://www.youtube-nocookie.com/embed/' + esc(yid) + '?' + params +
          '" title="PDX aftermovie" frameborder="0" allow="autoplay; encrypted-media" tabindex="-1"></iframe>' +
          '</div><div class="hero__overlay"></div>';
        temVideo = true;
      } else if (s.video) {
        /* no celular usa o corte vertical, quando existir: enquadra melhor
           e baixa menos dados. Só um dos dois arquivos é carregado. */
        var estreito = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
        var arquivo = (estreito && s.videoMobile) ? s.videoMobile : s.video;
        var capa = (estreito && s.videoPosterMobile) ? s.videoPosterMobile : s.videoPoster;
        videoHtml = '<video class="hero__video" autoplay muted loop playsinline preload="auto"' +
          (capa ? ' poster="' + esc(capa) + '"' : '') +
          '><source src="' + esc(arquivo) + '" type="video/mp4"></video>' +
          '<div class="hero__overlay"></div>';
        temVideo = true;
      }
      var node = el(
        '<section id="hero" class="hero' + (temVideo ? ' hero--video' : '') + '">' +
          videoHtml +
          '<div class="hero__content">' +
            (s.titulo ? '<h1 class="hero__title">' + esc(s.titulo) + '</h1>' : '') +
            (s.subtitulo ? '<p class="hero__sub">' + esc(s.subtitulo) + '</p>' : '') +
            '<div class="hero__cta">' +
              '<a class="btn btn--neutro" href="' + esc(s.botaoLink || '#edicoes') + '">' +
              esc(s.botaoPrimario || 'Vem ser feliz no PDX') + '</a>' +
            '</div>' +
          '</div>' +
          '<a class="hero__scroll" href="#edicoes" aria-hidden="true">&#8964;</a>' +
        '</section>'
      );
      return node;
    },

    headline: function (s) {
      var paras = String(s.texto || '').split(/\n+/).map(function (p) {
        return '<p>' + esc(p) + '</p>';
      }).join('');
      return el('<section id="headline" class="section sec-headline">' +
        '<div class="headline__caixa reveal">' +
          (s.titulo ? '<h2 class="headline__frase">' + esc(s.titulo) + '</h2>' : '') +
          '<div class="headline__texto">' + paras + '</div>' +
        '</div></section>');
    },

    caraiva: function (s) {
      var blocos = (s.blocos || []).map(function (b) {
        var fotos = (b.fotos || []).filter(Boolean);
        var carrossel = fotos.length
          ? '<div class="caraiva__fotos">' + fotos.map(function (f) {
              return '<figure><img src="' + esc(f) + '" alt="' + esc(b.titulo) + '" loading="lazy"></figure>';
            }).join('') + '</div>'
          : '';
        var itens = (b.itens || []).filter(Boolean);
        var lista = itens.length
          ? '<ul class="caraiva__itens">' + itens.map(function (i) {
              return '<li>' + esc(i) + '</li>';
            }).join('') + '</ul>'
          : '';
        /* aceita vários botões; o formato antigo (um só) continua valendo */
        var botoes = (b.botoes && b.botoes.length)
          ? b.botoes
          : (b.botaoLink ? [{ texto: b.botao, link: b.botaoLink }] : []);
        var botoesHtml = botoes.filter(function (x) { return x && x.link; })
          .map(function (x) {
            return '<a class="btn btn--verde caraiva__btn" href="' + esc(x.link) +
              '" target="_blank" rel="noopener">' + esc(x.texto || 'Falar no WhatsApp') + '</a>';
          }).join('');
        return '<article class="caraiva__bloco reveal">' +
          '<h3 class="caraiva__titulo">' + esc(b.titulo) + '</h3>' +
          (b.texto ? '<p class="caraiva__texto">' + esc(b.texto) + '</p>' : '') +
          carrossel + lista +
          (botoesHtml ? '<div class="caraiva__botoes">' + botoesHtml + '</div>' : '') +
        '</article>';
      }).join('');
      return el('<section id="caraiva" class="section sec-caraiva">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2>' +
        (s.subtitulo ? '<p class="section__sub">' + esc(s.subtitulo) + '</p>' : '') + '</div>' +
        (s.texto ? '<p class="caraiva__intro reveal">' + esc(s.texto) + '</p>' : '') +
        '<div class="caraiva__blocos">' + blocos + '</div></section>');
    },

    lojinha: function (s) {
      var fotos = (s.fotos || []).filter(Boolean);
      var grade = fotos.length
        ? '<div class="lojinha__fotos reveal">' + fotos.map(function (f) {
            return '<figure><img src="' + esc(f) + '" alt="Camiseta PDX" loading="lazy"></figure>';
          }).join('') + '</div>'
        : '';
      return el('<section id="lojinha" class="section sec-lojinha">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2>' +
        (s.subtitulo ? '<p class="section__sub">' + esc(s.subtitulo) + '</p>' : '') + '</div>' +
        (s.texto ? '<p class="lojinha__texto reveal">' + esc(s.texto) + '</p>' : '') +
        grade +
        (s.botaoLink ? '<div class="lojinha__cta reveal"><a class="btn btn--amarelo" href="' +
          esc(s.botaoLink) + '" target="_blank" rel="noopener">' +
          esc(s.botao || 'Ver produtos da lojinha') + '</a></div>' : '') +
      '</section>');
    },

    depoimentos: function (s) {
      var itens = (s.itens || []).filter(function (d) { return d && d.texto; });
      if (!itens.length) return null;
      var cards = itens.map(function (d) {
        return '<article class="depo">' +
          '<span class="depo__aspas" aria-hidden="true">&#8220;</span>' +
          '<p class="depo__texto">' + esc(d.texto) + '</p>' +
          '<p class="depo__autor">' + esc(d.autor) + '</p>' +
        '</article>';
      }).join('');
      var node = el('<section id="depoimentos" class="section sec-depoimentos">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2>' +
        (s.subtitulo ? '<p class="section__sub">' + esc(s.subtitulo) + '</p>' : '') + '</div>' +
        '<div class="webdoor__wrap depo__wrap">' +
          '<button class="webdoor__seta webdoor__seta--prev" aria-label="Depoimentos anteriores">&#8249;</button>' +
          '<div class="webdoor__lista depo__lista">' + cards + '</div>' +
          '<button class="webdoor__seta webdoor__seta--next" aria-label="Próximos depoimentos">&#8250;</button>' +
        '</div></section>');
      initCarrossel(node);
      return node;
    },

    sobre: function (s) {
      var paras = String(s.texto || '').split(/\n+/).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      var stats = (s.stats || []).map(function (st) {
        return '<div class="stat reveal"><div class="stat__num" data-num="' + Number(st.numero || 0) + '" data-sufixo="' + esc(st.sufixo || '') + '">0</div><div class="stat__label">' + esc(st.label) + '</div></div>';
      }).join('');
      return el('<section id="sobre" class="section sec-sobre">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2></div>' +
        '<div class="sobre__grid">' +
          '<div class="sobre__texto reveal">' + paras + '</div>' +
          (s.foto ? '<div class="sobre__foto reveal"><img src="' + esc(s.foto) + '" alt="PDX ao vivo" loading="lazy"></div>' : '') +
        '</div>' +
        (stats ? '<div class="stats">' + stats + '</div>' : '') +
      '</section>');
    },

    galeria: function (s) {
      if (!s.fotos || !s.fotos.length) return null;

      /* miniatura: sempre derivada da foto atual. As fotos originais da
         galeria têm uma versão menor em /thumb/; se não houver (foto trocada
         ou enviada pelo painel), o navegador cai para a própria foto.
         Não usamos campo guardado aqui: ele ficaria desatualizado ao trocar
         a foto e o carrossel mostraria a imagem antiga. */
      function mini(f) {
        return String(f.img || '').replace('/gallery/full/', '/gallery/thumb/');
      }
      function imgMini(f, extra) {
        var alvo = mini(f);
        var original = esc(f.img);
        return '<img src="' + esc(alvo) + '" alt="' + esc(f.legenda || 'Foto PDX') +
          '" loading="lazy"' + (extra || '') +
          ' onerror="this.onerror=null;this.src=\'' + original + '\'">';
      }

      var inner;
      if (s.variante === 'mosaico' || s.variante === 'grade') {
        var cls = s.variante === 'mosaico' ? 'mosaico' : 'grade';
        inner = '<div class="' + cls + ' reveal">' + s.fotos.map(function (f, i) {
          return '<figure data-i="' + i + '">' + imgMini(f) + '</figure>';
        }).join('') + '</div>';
      } else {
        inner = '<div class="car3d reveal"><div class="car3d__ring" id="car3d-ring">' + s.fotos.map(function (f, i) {
          return '<figure class="car3d__item" data-i="' + i + '" style="margin:0">' + imgMini(f, ' draggable="false"') + '</figure>';
        }).join('') + '</div></div>';
      }
      var albuns = (s.albuns || []).filter(function (a) { return a && a.link; });
      var extra = '';
      if (albuns.length) {
        extra = '<div class="galeria__mais reveal">' +
          '<button class="btn btn--amarelo js-abrir-albuns" type="button">' +
          esc(s.botaoAlbuns || 'Mais clicks PDX') + '</button></div>';
      }

      var node = el('<section id="galeria" class="section sec-galeria">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2><p class="section__sub">' + esc(s.subtitulo) + '</p></div>' +
        inner + extra + '</section>');

      node.addEventListener('click', function (e) {
        var fig = e.target.closest('figure[data-i]');
        if (fig) openLightbox(s.fotos, Number(fig.getAttribute('data-i')));
      });

      if (albuns.length) {
        var botao = node.querySelector('.js-abrir-albuns');
        botao.addEventListener('click', function () {
          abrirAlbuns(albuns, s.tituloAlbuns || 'Mais clicks PDX', s.subtituloAlbuns || '');
        });
      }

      if (s.variante !== 'mosaico' && s.variante !== 'grade') init3dRing(node, s.fotos.length);
      return node;
    },

    videos: function (s) {
      var vids = (s.videos || []).filter(function (v) { return v.youtube; });
      if (!vids.length) return null;
      var grid = vids.map(function (v) {
        var id = extractYouTubeId(v.youtube);
        return '<div class="video reveal" data-yt="' + esc(id) + '">' +
          '<img src="https://i.ytimg.com/vi/' + esc(id) + '/hqdefault.jpg" alt="' + esc(v.titulo) + '" loading="lazy">' +
          '<button class="video__play" aria-label="Assistir ' + esc(v.titulo) + '"></button>' +
          '<div class="video__titulo">' + esc(v.titulo) + '</div>' +
        '</div>';
      }).join('');
      var node = el('<section id="videos" class="section sec-videos">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2><p class="section__sub">' + esc(s.subtitulo) + '</p></div>' +
        '<div class="videos__grid">' + grid + '</div></section>');
      node.addEventListener('click', function (e) {
        var card = e.target.closest('.video[data-yt]');
        if (!card) return;
        var id = card.getAttribute('data-yt');
        card.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1" title="Vídeo PDX" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>';
      });
      return node;
    },

    edicoes: function (s) {
      if (!s.items || !s.items.length) return null;

      /* some com o que já passou: só entram eventos de hoje em diante.
         Eventos sem data (ex.: "Verão PDX") ficam sempre no fim da fila. */
      var hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      var itens = s.items.filter(function (it) {
        if (!it.data) return true;
        var d = new Date(it.data + 'T12:00:00');
        if (isNaN(d)) return true;
        return d >= hoje;
      }).sort(function (a, b) {
        if (!a.data) return 1;
        if (!b.data) return -1;
        return a.data < b.data ? -1 : (a.data > b.data ? 1 : 0);
      });
      if (!itens.length) return null;

      var lista = itens.map(function (it) {
        var dataHtml = '';
        if (it.data) {
          var d = new Date(it.data + 'T12:00:00');
          if (!isNaN(d)) {
            dataHtml = '<div class="webdoor__data"><span class="webdoor__dia">' + d.getDate() + '</span><span class="webdoor__mes">' + MESES[d.getMonth()] + '</span></div>';
          }
        }
        var acao = it.link
          ? '<a class="btn btn--pink webdoor__btn" href="' + esc(it.link) + '" target="_blank" rel="noopener">' +
            esc(it.botao || 'Quero ser feliz') + '</a>'
          : '<span class="btn btn--embreve webdoor__btn">' + esc(it.botao || 'Em breve') + '</span>';
        return '<article class="webdoor reveal">' +
          dataHtml +
          '<div class="webdoor__info">' +
            '<h3 class="webdoor__titulo">' + esc(it.titulo) + '</h3>' +
            (it.cidade ? '<p class="webdoor__cidade">' + esc(it.cidade) + '</p>' : '') +
            (it.local ? '<p class="webdoor__local">' + esc(it.local) + '</p>' : '') +
          '</div>' + acao +
        '</article>';
      }).join('');
      var node = el('<section id="edicoes" class="section sec-edicoes">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2>' + (s.subtitulo ? '<p class="section__sub">' + esc(s.subtitulo) + '</p>' : '') + '</div>' +
        '<div class="webdoor__wrap">' +
          '<button class="webdoor__seta webdoor__seta--prev" aria-label="Eventos anteriores">&#8249;</button>' +
          '<div class="webdoor__lista">' + lista + '</div>' +
          '<button class="webdoor__seta webdoor__seta--next" aria-label="Próximos eventos">&#8250;</button>' +
        '</div></section>');
      initCarrossel(node);
      return node;
    },

    comunidade: function (s) {
      if (!s.grupos || !s.grupos.length) return null;

      /* mosaico de fundo: imagem única já montada (uma requisição só) */
      var fundo = '';
      if (s.mosaico) {
        fundo = '<div class="mosaico-fundo" aria-hidden="true" style="background-image:' +
          'linear-gradient(rgba(58,20,112,.42),rgba(58,20,112,.42)),' +
          'url(&quot;' + esc(s.mosaico) + '&quot;)"></div>';
      }

      var lista = s.grupos.map(function (g, i) {
        return '<a class="grupo grupo--c' + (i % 4) + ' reveal" href="' + esc(g.link) + '" target="_blank" rel="noopener" style="--atraso:' + (i * 60) + 'ms">' +
          '<span class="grupo__zap">' + ICON_ZAP + '</span>' +
          '<span class="grupo__nome">' + esc(g.nome) + '</span>' +
          '<span class="grupo__entrar">Entrar</span>' +
        '</a>';
      }).join('');
      return el('<section id="comunidade" class="section sec-comunidade' + (fundo ? ' sec-comunidade--mosaico' : '') + '">' +
        fundo +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2>' +
        (s.subtitulo ? '<p class="section__sub">' + esc(s.subtitulo) + '</p>' : '') + '</div>' +
        '<div class="grupos">' + lista + '</div></section>');
    },

    contato: function (s, cfg) {
      var extras = (s.links || []).filter(function (l) { return l && l.link && l.nome; });
      var extrasHtml = '';
      if (extras.length) {
        extrasHtml = '<div class="contato__links reveal">' + extras.map(function (l) {
          return '<a class="contato-link" href="' + esc(l.link) + '" target="_blank" rel="noopener">' +
            esc(l.nome) + '<span class="contato-link__seta" aria-hidden="true">&#8599;</span></a>';
        }).join('') + '</div>';
      }
      return el('<section id="contato" class="section sec-contato">' +
        '<div class="section__head reveal"><h2 class="section__title">' + comAcentos(s.titulo) + '</h2></div>' +
        '<p class="contato__texto reveal">' + esc(s.texto) + '</p>' +
        '<div class="contato__botoes reveal">' +
          '<a class="btn btn--verde" href="' + esc(linkZap(cfg)) + '" target="_blank" rel="noopener">WhatsApp</a>' +
          '<a class="btn btn--amarelo" href="https://instagram.com/' + esc(cfg.instagram) + '" target="_blank" rel="noopener">Instagram</a>' +
        '</div>' + extrasHtml + '</section>');
    }
  };

  function extractYouTubeId(v) {
    var m = String(v).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    return m ? m[1] : String(v).trim();
  }

  /* ---------- modal dos álbuns de fotos ---------- */
  function abrirAlbuns(albuns, titulo, subtitulo) {
    var antigo = document.getElementById('modal-albuns');
    if (antigo) antigo.remove();

    var itens = albuns.map(function (a, i) {
      return '<a class="album album--c' + (i % 4) + '" href="' + esc(a.link) + '" target="_blank" rel="noopener">' +
        '<span class="album__nome">' + esc(a.nome) + '</span>' +
        '<span class="album__seta" aria-hidden="true">&#8599;</span>' +
      '</a>';
    }).join('');

    var box = el('<div id="modal-albuns" class="modal" role="dialog" aria-modal="true" aria-label="' + esc(titulo) + '">' +
      '<div class="modal__caixa">' +
        '<button class="modal__fechar" aria-label="Fechar">&times;</button>' +
        '<h3 class="modal__titulo">' + comAcentos(titulo) + '</h3>' +
        (subtitulo ? '<p class="modal__sub">' + esc(subtitulo) + '</p>' : '') +
        '<div class="modal__lista">' + itens + '</div>' +
      '</div></div>');

    function fechar() {
      box.classList.remove('modal--aberto');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', aoTeclar);
      setTimeout(function () { box.remove(); }, 300);
    }
    function aoTeclar(e) { if (e.key === 'Escape') fechar(); }

    box.querySelector('.modal__fechar').addEventListener('click', fechar);
    box.addEventListener('click', function (e) { if (e.target === box) fechar(); });
    document.addEventListener('keydown', aoTeclar);

    document.body.appendChild(box);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { box.classList.add('modal--aberto'); });
  }

  /* ---------- transição em degradê entre as seções ---------- */
  function initTransicoes(app) {
    var blocos = Array.prototype.slice.call(app.children);
    var footer = document.querySelector('.footer');
    if (footer) blocos.push(footer);

    function corDe(nodo, ponta) {
      var estilo = getComputedStyle(nodo);
      var declarada = estilo.getPropertyValue('--sec-' + ponta).trim();
      if (declarada) return declarada;
      var bg = estilo.backgroundColor;
      /* ignora transparente (ex.: seções com gradiente sem cor declarada) */
      if (!bg || bg === 'transparent' || /rgba\([^)]*,\s*0\s*\)/.test(bg)) return '';
      return bg;
    }

    for (var i = 1; i < blocos.length; i++) {
      var atual = blocos[i];
      var antes = blocos[i - 1];
      /* blocos muito baixos servem de origem de cor, não de destino */
      if (atual.getBoundingClientRect().height < 200) continue;

      /* se a seção anterior tem foto de fundo, o rasgo vai na base dela,
         com a cor desta — assim a foto não precisa desbotar na borda */
      if (antes.querySelector && antes.querySelector('.mosaico-fundo')) {
        var corDaAtual = corDe(atual, 'inicio') || corDe(atual, 'fim');
        if (corDaAtual) {
          antes.style.setProperty('--cor-seguinte', corDaAtual);
          antes.classList.add('tem-rasgo-base');
          continue;
        }
      }

      var anterior = corDe(antes, 'fim');
      if (!anterior) continue;
      if (corDe(atual, 'inicio') === anterior) continue;
      atual.style.setProperty('--cor-anterior', anterior);
      atual.classList.add('tem-rasgo');
    }
  }

  /* ---------- carrossel horizontal (Edições) ---------- */
  function initCarrossel(node) {
    var lista = node.querySelector('.webdoor__lista');
    var prev = node.querySelector('.webdoor__seta--prev');
    var next = node.querySelector('.webdoor__seta--next');
    if (!lista || !prev || !next) return;

    function passo() {
      var card = lista.firstElementChild;
      if (!card) return lista.clientWidth;
      var gap = parseFloat(getComputedStyle(lista).columnGap || getComputedStyle(lista).gap) || 0;
      return card.getBoundingClientRect().width + gap;
    }

    function atualizarSetas() {
      var max = lista.scrollWidth - lista.clientWidth - 2;
      prev.disabled = lista.scrollLeft <= 2;
      next.disabled = lista.scrollLeft >= max;
      var semOverflow = lista.scrollWidth <= lista.clientWidth + 2;
      node.classList.toggle('sem-setas', semOverflow);
    }

    prev.addEventListener('click', function () { lista.scrollBy({ left: -passo(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { lista.scrollBy({ left: passo(), behavior: 'smooth' }); });
    lista.addEventListener('scroll', atualizarSetas, { passive: true });
    window.addEventListener('resize', atualizarSetas);

    /* arraste com o mouse */
    var dragging = false, startX = 0, startScroll = 0, moveu = false;
    lista.addEventListener('mousedown', function (e) {
      dragging = true; moveu = false;
      startX = e.pageX; startScroll = lista.scrollLeft;
      lista.classList.add('arrastando');
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var d = e.pageX - startX;
      if (Math.abs(d) > 4) moveu = true;
      lista.scrollLeft = startScroll - d;
    });
    window.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      lista.classList.remove('arrastando');
    });
    /* evita abrir o link quando o clique foi um arraste */
    lista.addEventListener('click', function (e) {
      if (moveu) { e.preventDefault(); e.stopPropagation(); moveu = false; }
    }, true);

    setTimeout(atualizarSetas, 0);
  }

  /* ---------- carrossel 3D ---------- */
  function init3dRing(node, count) {
    var ring = node.querySelector('#car3d-ring');
    if (!ring) return;
    var step = 360 / count;
    var radius = Math.round((count * 320) / (2 * Math.PI)) + 60;
    Array.prototype.forEach.call(ring.children, function (item, i) {
      item.style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + radius + 'px)';
    });
    var angle = 0, vel = 0.045, dragging = false, lastX = 0;

    function frame() {
      if (!dragging) angle += vel;
      ring.style.transform = 'translateZ(-' + radius + 'px) rotateY(' + angle + 'deg)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    function down(x) { dragging = true; lastX = x; }
    function move(x) { if (dragging) { angle += (x - lastX) * 0.25; lastX = x; } }
    function up() { dragging = false; }

    ring.addEventListener('mousedown', function (e) { e.preventDefault(); down(e.clientX); });
    window.addEventListener('mousemove', function (e) { move(e.clientX); });
    window.addEventListener('mouseup', up);
    ring.addEventListener('touchstart', function (e) { down(e.touches[0].clientX); }, { passive: true });
    ring.addEventListener('touchmove', function (e) { move(e.touches[0].clientX); }, { passive: true });
    ring.addEventListener('touchend', up);
  }

  /* ---------- lightbox ---------- */
  var lb = { fotos: [], i: 0 };
  function openLightbox(fotos, i) {
    lb.fotos = fotos; lb.i = i;
    updateLightbox();
    document.getElementById('lightbox').classList.add('lightbox--open');
  }
  function updateLightbox() {
    var f = lb.fotos[lb.i];
    var box = document.getElementById('lightbox');
    box.querySelector('img').src = f.img;
    box.querySelector('.lightbox__caption').textContent = f.legenda || '';
  }
  function initLightbox() {
    var box = document.getElementById('lightbox');
    box.querySelector('.lightbox__close').onclick = function () { box.classList.remove('lightbox--open'); };
    box.querySelector('.lightbox__prev').onclick = function () { lb.i = (lb.i - 1 + lb.fotos.length) % lb.fotos.length; updateLightbox(); };
    box.querySelector('.lightbox__next').onclick = function () { lb.i = (lb.i + 1) % lb.fotos.length; updateLightbox(); };
    box.addEventListener('click', function (e) { if (e.target === box) box.classList.remove('lightbox--open'); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('lightbox--open')) return;
      if (e.key === 'Escape') box.classList.remove('lightbox--open');
      if (e.key === 'ArrowLeft') box.querySelector('.lightbox__prev').click();
      if (e.key === 'ArrowRight') box.querySelector('.lightbox__next').click();
    });
  }

  /* ---------- efeitos globais ---------- */
  function initReveal() {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('reveal--in');
          if (en.target.classList.contains('stat')) animateCounter(en.target.querySelector('.stat__num'));
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (n) { io.observe(n); });
  }

  function animateCounter(numEl) {
    if (!numEl || numEl.dataset.done) return;
    numEl.dataset.done = '1';
    var target = Number(numEl.dataset.num), suf = numEl.dataset.sufixo || '';
    var t0 = null;
    function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1400, 1);
      numEl.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function initNav(sections, rendered) {
    var menu = document.getElementById('nav-menu');
    sections.forEach(function (s) {
      if (!s.enabled || !s.menuLabel || s.type === 'hero') return;
      if (rendered.indexOf(s.type) === -1) return;
      var li = document.createElement('li');
      li.innerHTML = '<a href="#' + s.type + '">' + esc(s.menuLabel) + '</a>';
      menu.appendChild(li);
    });
    var nav = document.getElementById('nav');
    var burger = document.getElementById('nav-burger');
    burger.onclick = function () { nav.classList.toggle('nav--open'); };
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') nav.classList.remove('nav--open'); });
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--solid', window.scrollY > 60);
    }, { passive: true });
  }

  /* ---------- boot ---------- */
  load().then(function (data) {
    if (!data) { document.getElementById('app').innerHTML = '<p style="padding:120px 5vw">Erro ao carregar o conteúdo.</p>'; return; }
    var cfg = data.config || {};
    document.title = cfg.titulo || document.title;

    /* a descrição do painel passa a valer de fato no Google e nas redes */
    if (cfg.descricao) {
      [['meta[name="description"]', 'content'],
       ['meta[property="og:description"]', 'content']].forEach(function (p) {
        var el = document.querySelector(p[0]);
        if (el) el.setAttribute(p[1], cfg.descricao);
      });
    }
    if (cfg.titulo) {
      var og = document.querySelector('meta[property="og:title"]');
      if (og) og.setAttribute('content', cfg.titulo);
    }

    var app = document.getElementById('app');
    var rendered = [];
    (data.sections || []).forEach(function (s) {
      if (!s.enabled) return;
      var fn = render[s.type];
      if (!fn) return;
      var node = fn(s, cfg);
      if (node) { aplicarCor(node, s.corFundo); app.appendChild(node); rendered.push(s.type); }
    });

    initNav(data.sections || [], rendered);
    initLightbox();
    initReveal();
    initTransicoes(app);
    initPlayer(cfg.spotifyPlaylist || cfg.spotify);

    document.getElementById('footer-year').textContent = new Date().getFullYear();
    document.getElementById('footer-tagline').textContent = cfg.tagline || '';
    document.getElementById('whats-float').href = linkZap(cfg);
    var social = document.getElementById('footer-social');
    var redes = '';
    if (cfg.instagram) redes += '<a href="https://instagram.com/' + esc(cfg.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON_INSTA + '</a>';
    if (cfg.tiktok)    redes += '<a href="' + esc(cfg.tiktok) + '" target="_blank" rel="noopener" aria-label="TikTok">' + ICON_TIKTOK + '</a>';
    if (cfg.spotify)   redes += '<a href="' + esc(cfg.spotify) + '" target="_blank" rel="noopener" aria-label="Spotify">' + ICON_SPOTIFY + '</a>';
    if (cfg.whatsapp)  redes += '<a href="' + esc(linkZap(cfg)) + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + ICON_ZAP + '</a>';
    social.innerHTML = redes;

    var contratar = document.getElementById('footer-contratar');
    if (contratar && cfg.contratarLink) {
      contratar.innerHTML = '<a class="btn btn--amarelo footer__btn" href="' + esc(cfg.contratarLink) +
        '" target="_blank" rel="noopener">' + esc(cfg.contratarTexto || 'Contrate o PDX para o seu evento') + '</a>';
    }
  });
})();
