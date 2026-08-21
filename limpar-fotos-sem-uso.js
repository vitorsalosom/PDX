/* ============================================================
   Remove da pasta de uploads as imagens que não estão sendo
   usadas em nenhum lugar do site.

   Roda sozinho dentro do PUBLICAR-SITE.bat, antes de publicar.
   Uso manual:  node limpar-fotos-sem-uso.js
   ============================================================ */
const fs = require('fs');
const path = require('path');

const PASTA = 'assets/img/uploads';
const CONTEUDO = 'content/site.json';

if (!fs.existsSync(CONTEUDO)) {
  console.log('  (conteudo nao encontrado, nada a limpar)');
  process.exit(0);
}

/* junta tudo o que o site referencia num texto só */
const texto = fs.readFileSync(CONTEUDO, 'utf8');

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
