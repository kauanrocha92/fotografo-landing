import { esc, picture, ratio, gridLines } from './util.js'

export function Portfolio(site) {
  const count = (id) => site.portfolio.filter((p) => p.category === id).length
  const label = (id) => site.categories.find((c) => c.id === id)?.label ?? id

  const filters = [{ id: 'all', label: 'tudo' }, ...site.categories]
    .map(
      (c) => `<li><button type="button" class="filter" data-filter="${c.id}" aria-pressed="${c.id === 'all'}">
        <span class="filter-label">${esc(c.label)}</span><sup class="tnum">${c.id === 'all' ? site.portfolio.length : count(c.id)}</sup>
      </button></li>`,
    )
    .join('')

  const items = site.portfolio
    .map(
      (p, i) => `<li class="work" data-work data-cat="${p.category}" style="--ar:${ratio(p.photo).toFixed(4)}">
        <button type="button" class="work-btn" data-open="portfolio" data-index="${i}" aria-label="Ampliar: ${esc(p.title)}, ${esc(label(p.category))}">
          <span class="work-frame">${picture(p.photo, { alt: p.alt, sizes: '(min-width: 900px) 42vw, (min-width: 600px) 50vw, 100vw' })}</span>
          <span class="work-caption" aria-hidden="true"><span>${esc(p.title)}</span><span class="work-cat">${esc(label(p.category))}</span></span>
        </button>
      </li>`,
    )
    .join('')

  return `
  <section class="portfolio" id="portfolio" data-theme="paper" aria-labelledby="portfolio-title">
    ${gridLines()}
    <div class="portfolio-head">
      <h2 class="display portfolio-title" id="portfolio-title" data-reveal="words">o que eu vejo</h2>
      <p class="portfolio-lede" data-reveal="rise">Uma seleção por tipo de trabalho. Toque em qualquer foto para ampliar.</p>
      <ul class="filters" aria-label="Filtrar por categoria" data-reveal="rise">${filters}</ul>
    </div>
    <ul class="works" data-works>${items}</ul>
    <p class="sr-only" aria-live="polite" data-filter-status></p>
  </section>`
}
