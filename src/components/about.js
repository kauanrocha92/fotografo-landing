import { esc, picture, gridLines } from './util.js'

export function About(site) {
  const a = site.about
  const portrait = a.photo
    ? `<div class="about-frame" data-parallax-frame>${picture(a.photo, { alt: `Retrato de ${site.name}`, sizes: '(min-width: 900px) 33vw, 100vw' })}</div>`
    : `<div class="about-placeholder" role="img" aria-label="Espaço reservado para o retrato do fotógrafo">
        <span>retrato do fotógrafo</span>
        <small>Envie uma foto sua para este espaço.</small>
      </div>`

  const heading = a.heading
    .map((w, i) => `<span class="about-h-line l${i}">${esc(w)}</span>`)
    .join('')

  return `
  <section class="about" id="sobre" data-theme="paper" aria-labelledby="about-title">
    ${gridLines()}
    <h2 class="display about-heading" data-reveal="words" aria-label="${esc(a.heading.join(' '))}">${heading}</h2>
    <div class="about-media" data-reveal="slats">
      ${portrait}
      <div class="slats" aria-hidden="true">${'<i></i>'.repeat(4)}</div>
    </div>
    <div class="about-body">
      <h3 class="about-name" id="about-title" data-reveal="rise">${esc(site.name)}<span>${esc(site.role)} em ${esc(site.region)}</span></h3>
      <p class="about-intro" data-reveal="rise">${esc(a.intro)}</p>
      <div class="about-cols">
        <div data-reveal="rise"><h4>Trajetória</h4><p>${esc(a.story)}</p></div>
        <div data-reveal="rise"><h4>Estilo</h4><p>${esc(a.style)}</p></div>
        <div data-reveal="rise"><h4>Como eu trabalho</h4><p>${esc(a.philosophy)}</p></div>
        <div data-reveal="rise"><h4>Diferenciais</h4><ul class="dash-list">${a.differentials.map((d) => `<li>${esc(d)}</li>`).join('')}</ul></div>
      </div>
    </div>
  </section>`
}
