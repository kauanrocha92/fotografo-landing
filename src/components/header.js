import { esc, icon } from './util.js'

export function Header(site) {
  const links = site.nav
    .map((l) => `<li><a class="nav-link" href="${l.href}">${esc(l.label)}</a></li>`)
    .join('')
  const bigLinks = site.nav
    .map((l, i) => `<li style="--i:${i}"><a href="${l.href}"><span>${esc(l.label)}</span></a></li>`)
    .join('')

  return `
  ${site.demo ? `<div class="demo-note" role="note" data-demo-note><p><strong>Demonstração.</strong> Nome, textos, contatos e fotografias são temporários (fotos do Unsplash).</p><button type="button" data-demo-close aria-label="Fechar aviso">${icon('close')}</button></div>` : ''}
  <header class="site-header" data-header>
    <div class="header-inner">
      <a class="brand" href="#topo" aria-label="${esc(site.name)}, voltar ao início">${esc(site.shortName)}</a>
      <nav class="nav" aria-label="Principal">
        <ul class="nav-list">${links}</ul>
      </nav>
      <a class="btn btn-ink btn-sm header-cta" href="#contato" data-service-link>Solicitar orçamento</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
        <span class="menu-toggle-label" data-label-open>menu</span>
        <span class="menu-toggle-label" data-label-close>fechar</span>
      </button>
    </div>
    <div class="scroll-progress" aria-hidden="true"><span data-progress></span></div>
  </header>

  <div class="menu" id="menu" data-menu hidden>
    <nav aria-label="Menu">
      <ul class="menu-list">${bigLinks}</ul>
    </nav>
    <div class="menu-foot">
      <a class="btn btn-paper" href="#contato">Solicitar orçamento</a>
      <p>${esc(site.region)}</p>
    </div>
  </div>`
}
