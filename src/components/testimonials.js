import { esc, gridLines } from './util.js'

export function Testimonials(site) {
  if (!site.testimonials.length) return ''
  const items = site.testimonials
    .map(
      (t, i) => `<li class="quote q${i}" data-reveal="rise">
        <figure>
          <blockquote><p>${esc(t.quote)}</p></blockquote>
          <figcaption><span class="quote-name">${esc(t.name)}</span><span class="quote-service">${esc(t.service)}${t.demo ? ' · depoimento de demonstração' : ''}</span></figcaption>
        </figure>
      </li>`,
    )
    .join('')

  return `
  <section class="testimonials" id="depoimentos" data-theme="paper" aria-labelledby="testimonials-title">
    ${gridLines()}
    <h2 class="display testimonials-title" id="testimonials-title" data-reveal="words">quem já <span class="indent">foi fotografado</span></h2>
    <ul class="quotes">${items}</ul>
  </section>`
}
