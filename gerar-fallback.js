/* ============================================================
   Regenera js/content-fallback.js a partir de content/.
   E a copia de seguranca usada quando os arquivos de content/
   nao podem ser carregados (ex.: abrir o index.html direto do
   computador). Roda sozinho a cada publicacao.
   ============================================================ */
const fs = require('fs');

const cabecalho = '/* Copia de seguranca do conteudo — usada apenas quando os arquivos de content/ nao podem ser carregados (ex.: abrir o index.html direto do computador). Gerada a partir de content/. */\n';

function ler(arq, padrao) {
  try {
    return JSON.parse(fs.readFileSync(arq, 'utf8'));
  } catch (e) {
    return padrao;
  }
}

const site = ler('content/site.json', null);
if (!site) {
  console.error('ERRO: nao foi possivel ler content/site.json');
  process.exit(1);
}
const eventos = ler('content/eventos.json', { items: [] });

const saida = cabecalho +
  'window.PDX_CONTENT = ' + JSON.stringify(site, null, 2) + ';\n\n' +
  'window.PDX_EVENTOS = ' + JSON.stringify(eventos, null, 2) + ';\n';

fs.writeFileSync('js/content-fallback.js', saida, 'utf8');
console.log('  content-fallback.js regenerado (' + (saida.length / 1024).toFixed(1) + ' KB)');
