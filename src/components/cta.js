import { esc, picture, waLink, icon } from './util.js'

export function ContactCTA(site) {
  const c = site.cta
  const words = c.words.map((w, i) => `<span class="cta-line l${i}">${esc(w)}</span>`).join('')
  return `
  <section class="cta" data-theme="ink" aria-labelledby="cta-title" data-cta>
    <div class="cta-media" data-cta-media>
      ${picture(c.photo, { alt: c.alt, sizes: '100vw' })}
    </div>
    <div class="cta-copy">
      <h2 class="display cta-title" id="cta-title" data-reveal="words" aria-label="${esc(c.words.join(' '))}">${words}</h2>
      <p class="cta-text" data-reveal="rise">${esc(c.text)}</p>
      <div class="cta-actions" data-reveal="rise">
        <a class="btn btn-paper" href="${waLink(site.contact)}" target="_blank" rel="noopener">${icon('whatsapp')} Vamos conversar?</a>
        <a class="btn btn-outline-paper" href="#contato">Solicitar orçamento</a>
      </div>
    </div>
  </section>`
}
