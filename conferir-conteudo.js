/* ============================================================
   Confere se os arquivos de conteudo estao integros ANTES de
   publicar. Se algo estiver quebrado, a publicacao e abortada
   e o site no ar continua como estava.
   ============================================================ */
const fs = require('fs');

const obrigatorios = ['content/site.json', 'content/eventos.json'];
let erros = 0;

obrigatorios.forEach(function (arq) {
  if (!fs.existsSync(arq)) {
    console.error('ERRO: arquivo nao encontrado -> ' + arq);
    erros++;
    return;
  }
  const bruto = fs.readFileSync(arq, 'utf8');
  if (!bruto.trim()) {
    console.error('ERRO: arquivo vazio -> ' + arq);
    erros++;
    return;
  }
  let dados;
  try {
    dados = JSON.parse(bruto);
  } catch (e) {
    console.error('ERRO: ' + arq + ' esta com o formato quebrado -> ' + e.message);
    erros++;
    return;
  }
  if (arq === 'content/site.json') {
    if (!Array.isArray(dados.sections) || !dados.sections.length) {
      console.error('ERRO: site.json sem secoes.');
      erros++;
    } else {
      console.log('  site.json ok (' + dados.sections.length + ' secoes)');
    }
  }
  if (arq === 'content/eventos.json') {
    const itens = Array.isArray(dados.items) ? dados.items : [];
    console.log('  eventos.json ok (' + itens.length + ' evento(s))');
  }
});

if (!fs.existsSync('index.html')) {
  console.error('ERRO: index.html nao encontrado.');
  erros++;
}

if (erros) {
  console.error('\nPublicacao cancelada. O site no ar continua como estava.');
  process.exit(1);
}
console.log('Conteudo integro.');
