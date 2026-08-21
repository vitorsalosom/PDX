# Site PDX — Pagode do Xandó (Caraíva-BA)

Landing page com painel administrativo (Decap CMS). Site estático: sem servidor, sem banco de dados, hospedagem gratuita.

## Estrutura

```
site/
├── index.html              # página única, seções renderizadas via JS
├── css/style.css           # design system da marca PDX
├── js/main.js              # renderiza as seções a partir do content/site.json
├── js/content-fallback.js  # cópia do conteúdo p/ abrir localmente sem servidor
├── content/site.json       # TODO o conteúdo editável (ordem das seções = ordem no site)
├── admin/                  # painel Decap CMS (config.yml define os campos)
├── assets/fonts/           # Spot (display) + Brasilero (manuscrita)
├── assets/img/             # logo, heros, galeria (WebP), copos das edições
└── assets/docs/            # riders técnicos (PDF) e mapa de palco
```

## Testar localmente

```bash
cd site
python3 -m http.server 8000
# abra http://localhost:8000
```

(Abrir o `index.html` com duplo clique também funciona — usa o content-fallback.js.)

## Publicar (Netlify — gratuito)

1. Crie um repositório no GitHub e suba o conteúdo da pasta `site/` (a pasta `site` deve ser a raiz do repo).
2. Em [app.netlify.com](https://app.netlify.com): **Add new site → Import from Git** → selecione o repo. Publish directory: `.` (raiz). Deploy.
3. Ative o painel admin:
   - **Site configuration → Identity → Enable Identity**
   - Em **Identity → Registration**, marque **Invite only**
   - Em **Identity → Services → Git Gateway → Enable**
   - Em **Identity → Invite users**, convide o e-mail do cliente
4. O painel fica em `https://SEUSITE.netlify.app/admin`.

## Domínio próprio

1. Registre em [registro.br](https://registro.br) (ex: `pagodedoxando.com.br`, ~R$40/ano).
2. No Netlify: **Domain management → Add domain** e siga as instruções de DNS (apontar registros A/CNAME no painel do registro.br).
3. HTTPS é automático.

## Pendências para o lançamento

- [ ] Substituir o WhatsApp placeholder (`5573999999999`) em `content/site.json` (ou pelo painel)
- [ ] Confirmar Instagram e e-mail reais
- [ ] Adicionar links do YouTube na seção Vídeos (está oculta enquanto vazia)
- [ ] Revisar datas da agenda
