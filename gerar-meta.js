/* ============================================================
   Escreve no index.html o "cartão" que aparece quando alguém
   compartilha o link do site (WhatsApp, Instagram, Facebook...).

   Os aplicativos de mensagem NÃO executam JavaScript: eles leem
   só o HTML cru. Por isso o cartão não pode ser montado pelo
   site em si — tem que estar escrito no arquivo. Este script
   faz isso a cada publicação, a partir do que o cliente colocou
   no painel /admin.
   ============================================================ */
const fs = require('fs');

const SITE = 'https://pdxcaraiva.com.br';
const PADRAO_IMG = '/assets/img/compartilhar.jpg';

let cfg = {};
try {
  cfg = (JSON.parse(fs.readFileSync('content/site.json', 'utf8')) || {}).config || {};
} catch (e) {
  console.log('  (conteudo nao encontrado, cartao mantido como esta)');
  process.exit(0);
}

function absoluta(caminho) {
  const c = String(caminho || '').trim();
  if (!c) return SITE + PADRAO_IMG;
  if (/^https?:\/\//i.test(c)) return c;
  return SITE + (c.charAt(0) === '/' ? c : '/' + c);
}

const titulo = (cfg.titulo || 'PDX — Pagode do Xandó | Caraíva - BA').trim();
const descricao = (cfg.descricao || 'O pagode mais feliz do Brasil. Seja feliz em Caraíva!').trim();
const imagem = absoluta(cfg.imagemCompartilhar);

function escapar(t) {
  return String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
    .replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

let html = fs.readFileSync('index.html', 'utf8');
const antes = html;

const trocas = [
  [/(<meta property="og:title" content=")[^"]*(">)/, escapar(titulo)],
  [/(<meta property="og:description" content=")[^"]*(">)/, escapar(descricao)],
  [/(<meta property="og:image" content=")[^"]*(">)/, escapar(imagem)],
  [/(<meta property="og:image:alt" content=")[^"]*(">)/, escapar(titulo)],
  [/(<meta name="twitter:title" content=")[^"]*(">)/, escapar(titulo)],
  [/(<meta name="twitter:description" content=")[^"]*(">)/, escapar(descricao)],
  [/(<meta name="twitter:image" content=")[^"]*(">)/, escapar(imagem)],
  [/(<title>)[^<]*(<\/title>)/, escapar(titulo)],
  [/(<meta name="description" content=")[^"]*(">)/, escapar(descricao)]
];

let trocadas = 0;
trocas.forEach(function (par) {
  const re = par[0], valor = par[1];
  if (re.test(html)) {
    html = html.replace(re, function (_, abre, fecha) { return abre + valor + fecha; });
    trocadas++;
  }
});

if (html !== antes) fs.writeFileSync('index.html', html, 'utf8');
console.log('  cartao de compartilhamento atualizado (' + trocadas + ' campos)');
console.log('     imagem: ' + imagem);
