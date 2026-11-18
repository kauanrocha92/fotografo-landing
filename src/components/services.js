import { esc, picture, gridLines, icon } from './util.js'

export function Services(site) {
  const rows = site.services
    .map(
      (s) => `<li class="service" data-service>
        <h3 class="service-name display" data-reveal="words">${esc(s.name.toLowerCase())}</h3>
        <div class="service-media">${picture(s.photo, { alt: s.alt, sizes: '(min-width: 900px) 24vw, 100vw' })}</div>
        <div class="service-body" data-reveal="rise">
          <p class="service-desc">${esc(s.description)}</p>
          <ul class="dash-list service-includes" aria-label="O que está incluído">${s.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <p class="service-note">${esc(s.note)}</p>
          <a class="link-line" href="#contato" data-service-link="${s.id}">Solicitar orçamento ${icon('arrow')}</a>
        </div>
      </li>`,
    )
    .join('')

  return `
  <section class="services" id="servicos" data-theme="paper" aria-labelledby="services-title">
    ${gridLines()}
    <div class="services-head">
      <h2 class="display services-title" id="services-title" data-reveal="words">o que você pode contratar</h2>
      <p class="services-lede" data-reveal="rise">Cada trabalho tem um orçamento próprio, montado a partir da data, do local, da duração e do que você precisa receber. Sem pacote fechado.</p>
    </div>
    <ul class="service-list">${rows}</ul>
  </section>`
}
