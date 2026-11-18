import { esc, waLink, icon } from './util.js'

export function Footer(site) {
  const c = site.contact
  const year = new Date().getFullYear()
  return `
  <footer class="footer" data-theme="ink">
    <div class="footer-grid">
      <nav class="footer-nav" aria-label="Rodapé">
        <ul>${site.nav.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}</ul>
      </nav>
      <ul class="footer-social" aria-label="Redes e contato">
        <li><a href="${waLink(c)}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a></li>
        <li><a href="https://instagram.com/${c.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a></li>
        <li><a href="mailto:${c.email}" aria-label="E-mail">${icon('mail')}</a></li>
      </ul>
      <div class="footer-info">
        <p>${esc(site.region)}</p>
        <p>${esc(c.business)}</p>
      </div>
      <a class="footer-top" href="#topo">${icon('up')} Voltar ao topo</a>
    </div>
    <p class="footer-mark" aria-hidden="true" data-footer-mark>${esc(site.shortName)}</p>
    <div class="footer-legal">
      <p>© ${year} ${esc(site.name)}. Todas as imagens protegidas por direitos autorais.</p>
      ${site.demo ? '<p>Fotografias temporárias: Unsplash. Substituir pelo portfólio real.</p>' : ''}
    </div>
  </footer>`
}
