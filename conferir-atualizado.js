/* ============================================================
   TRAVA DE SEGURANÇA — roda sozinha antes de qualquer
   "firebase deploy" feito do computador.

   O painel /admin grava direto no GitHub. Se a pasta do
   computador estiver desatualizada e alguém publicar a partir
   dela, o site no ar volta no tempo e o trabalho do cliente
   some. Esta trava compara o conteúdo daqui com o do GitHub e
   cancela a publicação quando estiver para trás.

   Na publicação automática (GitHub Actions) ela não roda:
   lá o conteúdo É o do GitHub, por definição.
   ============================================================ */
const fs = require('fs');

const ARQUIVOS = ['content/site.json', 'content/eventos.json'];
const BASE = 'https://raw.githubusercontent.com/vitorsalosom/PDX/main/';

if (process.env.GITHUB_ACTIONS) {
  console.log('  (publicacao automatica: conteudo ja vem do GitHub)');
  process.exit(0);
}

if (typeof fetch !== 'function') {
  console.log('  (Node antigo, sem como conferir — seguindo em frente)');
  process.exit(0);
}

function normalizar(texto) {
  try { return JSON.stringify(JSON.parse(texto)); } catch (e) { return null; }
}

(async function () {
  const desatualizados = [];
  let conferidos = 0;

  for (const arq of ARQUIVOS) {
    let daqui = null;
    try { daqui = normalizar(fs.readFileSync(arq, 'utf8')); } catch (e) {}
    if (daqui === null) continue;             /* arquivo ausente: nada a comparar */

    let doGitHub = null;
    try {
      const r = await fetch(BASE + arq + '?t=' + Date.now(), { cache: 'no-store' });
      if (r.ok) doGitHub = normalizar(await r.text());
    } catch (e) { /* sem internet: não trava a publicação */ }

    if (doGitHub === null) {
      console.log('  (nao deu para conferir ' + arq + ' — seguindo em frente)');
      continue;
    }
    conferidos++;
    if (daqui !== doGitHub) desatualizados.push(arq);
  }

  if (!desatualizados.length) {
    console.log(conferidos
      ? '  Conteudo desta pasta esta igual ao do GitHub.'
      : '  (nada pode ser conferido — seguindo em frente)');
    return;
  }

  console.error('');
  console.error('  ============================================');
  console.error('   PUBLICACAO CANCELADA');
  console.error('  ============================================');
  console.error('');
  console.error('  O conteudo desta pasta esta diferente do que');
  console.error('  esta no GitHub:');
  desatualizados.forEach(function (a) { console.error('     - ' + a); });
  console.error('');
  console.error('  Publicar daqui apagaria do site o que o cliente');
  console.error('  editou no painel /admin.');
  console.error('');
  console.error('  O site ja se publica sozinho depois de cada');
  console.error('  alteracao no painel — normalmente nao ha nada');
  console.error('  a fazer. Se precisar publicar mesmo assim, use');
  console.error('  o PUBLICAR-SITE.bat, que baixa a versao mais');
  console.error('  recente antes de publicar.');
  console.error('');
  process.exit(1);
})();
