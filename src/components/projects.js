import { esc, picture, gridLines, icon } from './util.js'

export function Projects(site) {
  const rows = site.projects
    .map(
      (p, i) => `<article class="project${i % 2 ? ' is-flipped' : ''}" aria-labelledby="project-${i}">
        <div class="project-media" data-reveal="slats">
          <div class="project-frame" data-parallax-frame>${picture(p.cover, { alt: `Capa do projeto ${p.title}`, sizes: '(min-width: 900px) 58vw, 100vw' })}</div>
          <div class="slats" aria-hidden="true">${'<i></i>'.repeat(7)}</div>
        </div>
        <div class="project-text">
          <h3 class="display project-title" id="project-${i}" data-reveal="words">${esc(p.title)}</h3>
          <p class="project-meta tnum" data-reveal="rise"><span>${esc(p.category)}</span><span>${esc(p.year)}</span></p>
          <p class="project-desc" data-reveal="rise">${esc(p.description)}</p>
          <button type="button" class="link-line link-line-paper" data-open="project" data-project="${i}" data-reveal="rise">
            Ver galeria completa <span class="tnum">(${p.gallery.length})</span> ${icon('arrow')}
          </button>
        </div>
      </article>`,
    )
    .join('')

  return `
  <section class="projects" id="projetos" data-theme="ink" aria-labelledby="projects-title">
    ${gridLines()}
    <h2 class="display projects-title" id="projects-title" data-reveal="words">projetos <span class="indent">em destaque</span></h2>
    <div class="project-list">${rows}</div>
  </section>`
}
