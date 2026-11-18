import { esc, picture, gridLines } from './util.js'

export function Hero(site) {
  const { hero } = site
  const words = hero.words
    .map((w, i) => `<span class="hero-word w${i}"><span class="mask"><span data-word>${esc(w)}</span></span></span>`)
    .join('')
  const slides = hero.slides
    .map(
      (s, i) => `<figure class="hero-slide${i === 0 ? ' is-active' : ''}" data-slide="${i}" data-label="${esc(s.label)}" ${i ?'aria-hidden="true"' : ''}>
        ${picture(s.photo, { alt: s.alt, sizes: '(min-width: 900px) 66vw, 100vw', eager: i === 0 })}
      </figure>`,
    )
    .join('')

  return `
  <section class="hero" id="topo" data-theme="paper" aria-labelledby="hero-title">
    ${gridLines()}
    <div class="hero-media" data-hero-media>
      <div class="hero-frame" data-parallax-frame>
        ${slides}
      </div>
      <div class="slats" aria-hidden="true" data-slats>${'<i></i>'.repeat(8)}</div>
      <p class="hero-index" aria-live="polite">
        <span class="hero-index-label" data-slide-label>${esc(hero.slides[0].label)}</span>
        <span class="tnum"><span data-slide-num>01</span> / ${String(hero.slides.length).padStart(2, '0')}</span>
      </p>
    </div>

    <div class="hero-copy">
      <h1 class="hero-title" id="hero-title">
        <span class="sr-only">${esc(site.name)}, ${esc(site.role.toLowerCase())}: </span>
        ${words}
      </h1>
      <div class="hero-text" data-hero-rise>
        <p class="hero-claim">${esc(hero.claim)}</p>
        <p class="hero-desc">${esc(hero.description)}</p>
        <div class="hero-actions">
          <a class="btn btn-ink" href="#contato">Solicitar orçamento</a>
          <a class="link-line" href="#portfolio">Explorar portfólio</a>
        </div>
      </div>
    </div>
  </section>`
}
