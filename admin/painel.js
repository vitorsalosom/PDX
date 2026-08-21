/* ============================================================
   Ajustes de usabilidade do painel PDX
   - tira o "(opcional)" repetido em todo campo
   - troca textos que ficaram em inglês
   - mostra um aviso curto no topo lembrando de avisar após salvar
   ============================================================ */
(function () {
  'use strict';

  var TROCAS = [
    [/\s*\(opcional\)\s*\(opcional\)/gi, ' (opcional)'],
    [/\s*\(optional\)/gi, ''],
    [/\s*\(opcional\)/gi, '']
  ];

  function limpar(no) {
    if (no.nodeType === 3) {                     /* nó de texto */
      var t = no.nodeValue, novo = t;
      TROCAS.forEach(function (p) { novo = novo.replace(p[0], p[1]); });
      if (novo !== t) no.nodeValue = novo;
      return;
    }
    if (no.nodeType !== 1) return;
    if (/^(INPUT|TEXTAREA|SCRIPT|STYLE)$/.test(no.tagName)) return;
    for (var i = 0; i < no.childNodes.length; i++) limpar(no.childNodes[i]);
  }

  function avisoTopo() {
    if (document.getElementById('pdx-aviso')) return;
    var alvo = document.querySelector('[class*="ControlPaneContainer"]') ||
               document.querySelector('[class*="EditorContent"]');
    if (!alvo) return;
    var caixa = document.createElement('div');
    caixa.id = 'pdx-aviso';
    caixa.style.cssText = 'background:#F3EEFF;border:1px solid #E4DAF5;border-left:5px solid #8338EC;' +
      'border-radius:12px;padding:14px 18px;margin:0 0 22px;color:#3A1470;font-size:14.5px;line-height:1.55';
    caixa.innerHTML = '<strong>Como funciona:</strong> abra a seção que quer mudar, edite e clique em ' +
      '<strong>Save</strong> no topo. Depois avise o Vitor para publicar — as alterações aparecem no site em poucos minutos.';
    alvo.insertBefore(caixa, alvo.firstChild);
  }

  function rodar() {
    limpar(document.body);
    avisoTopo();
  }

  /* o painel monta a tela aos poucos, então observamos as mudanças */
  var pendente = null;
  var observador = new MutationObserver(function () {
    clearTimeout(pendente);
    pendente = setTimeout(rodar, 120);
  });

  function iniciar() {
    rodar();
    observador.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
