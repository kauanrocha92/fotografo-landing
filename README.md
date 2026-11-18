# Landing page: fotógrafo (demonstração)

Página única em HTML/CSS/JS gerada com Vite. Movimento com GSAP + ScrollTrigger + Flip e rolagem suave com Lenis. Fontes: Jost e Hanken Grotesk, servidas pelo próprio site.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/, pronto para qualquer hospedagem estática
```

## Onde editar

Todo o conteúdo fica em `src/data/site.js`: nome, textos, serviços, processo, depoimentos, contatos, ordem do portfólio e projetos. As seções são montadas a partir desse arquivo no momento do build, então o HTML final já chega pronto para buscadores.

## Antes de publicar: substituir

Tudo que está entre `[colchetes]` é placeholder. Além disso:

- [ ] `demo: true` → `false` em `site.js` (remove o aviso e o selo "foto temporária")
- [ ] Nome, região, domínio (`url`) e título/descrição de SEO
- [ ] WhatsApp, telefone, e-mail, Instagram, razão social/CNPJ
- [ ] Textos do "Sobre" e retrato do fotógrafo (`about.photo`)
- [ ] Depoimentos reais e autorizados (apague `demo: true` de cada um)
- [ ] Projetos em destaque: títulos, anos, textos e galerias
- [ ] **Todas as fotos**: hoje são temporárias do Unsplash (ver `CREDITOS-FOTOS.md`)
- [ ] `public/img/og.jpg` (imagem de compartilhamento, 1200×630)
- [ ] `contact.formEndpoint`: URL que recebe o formulário (Formspree, Getform, Basin ou API própria; recebe POST JSON). Enquanto estiver vazio, o formulário valida os campos e oferece enviar o pedido por WhatsApp ou e-mail, sem fingir que enviou.

## Fotos

Cada foto existe em `public/img/<slug>-<640|1280|2000>.<avif|webp>`. Para trocar uma foto, gere os seis arquivos com o mesmo slug, ou crie um slug novo e cadastre em `photos` (no fim de `site.js`) com largura, altura e cor média (`color`, usada enquanto a foto carrega).

## Acessibilidade e movimento

- Com `prefers-reduced-motion`, as animações são desligadas e todo o conteúdo aparece direto.
- Sem JavaScript, a página continua legível: os estados escondidos das animações só são aplicados quando o script roda.
- Lightbox com teclado (setas, Esc), foco devolvido à miniatura, gesto de arrastar no celular.
