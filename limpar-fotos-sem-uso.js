/* ============================================================
   Remove da pasta de uploads as imagens que nao estao sendo
   usadas em nenhum lugar do site.

   Roda sozinho a cada publicacao (e tambem dentro do
   PUBLICAR-SITE.bat).  Uso manual:  node limpar-fotos-sem-uso.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const PASTA = 'assets/img/uploads';

/* junta TUDO o que o site referencia num texto so:
   todos os arquivos de content/, a pagina e os scripts/estilos */
let texto = '';

function juntar(arq) {
  try { texto += fs.readFileSync(arq, 'utf8') + '\n'; } catch (e) {}
}

function juntarPasta(pasta, extensoes) {
  if (!fs.existsSync(pasta)) return;
  fs.readdirSync(pasta).forEach(function (nome) {
    if (extensoes.some(function (e) { return nome.endsWith(e); })) {
      juntar(path.join(pasta, nome));
    }
  });
}

juntarPasta('content', ['.json']);
juntarPasta('js', ['.js']);
juntarPasta('css', ['.css']);
juntar('index.html');

if (!texto.trim()) {
  console.log('  (conteudo nao encontrado, nada a limpar por seguranca)');
  process.exit(0);
}

let removidas = 0, mantidas = 0, espaco = 0;
const arquivos = fs.existsSync(PASTA) ? fs.readdirSync(PASTA) : [];

arquivos.forEach(function (nome) {
  if (nome.startsWith('.')) return;              /* .gitkeep e afins */
  const usada = texto.indexOf(nome) !== -1;
  const caminho = path.join(PASTA, nome);
  if (usada) {
    mantidas++;
  } else {
    espaco += fs.statSync(caminho).size;
    fs.unlinkSync(caminho);
    console.log('  removida (sem uso): ' + nome);
    removidas++;
  }
});

if (removidas) {
  console.log('  ' + removidas + ' foto(s) sem uso removida(s), ' +
    (espaco / 1024 / 1024).toFixed(1) + ' MB liberados');
} else {
  console.log('  nenhuma foto sobrando (' + mantidas + ' em uso)');
}
