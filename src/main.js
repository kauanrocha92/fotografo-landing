import '@fontsource-variable/jost/wght.css'
import '@fontsource-variable/hanken-grotesk/wght.css'
import './styles/base.css'
import './styles/sections.css'

import { initMotion } from './js/motion.js'
import { initHeader } from './js/header.js'
import { initPortfolio } from './js/portfolio.js'
import { initLightbox } from './js/lightbox.js'
import { initForm } from './js/form.js'
import { initImages } from './js/images.js'

const data = JSON.parse(document.getElementById('site-data').textContent)

initImages()
const motion = initMotion()
initHeader(motion)
const lightbox = initLightbox(data)
initPortfolio(data, motion)
initForm(data)

document.querySelectorAll('[data-open]').forEach((el) => {
  el.addEventListener('click', () => {
    if (el.dataset.open === 'portfolio') {
      const visible = [...document.querySelectorAll('[data-work]:not(.is-hidden) [data-open]')]
      const items = visible.map((b) => data.portfolio[+b.dataset.index])
      lightbox.open(items, visible.indexOf(el), (i) => visible[i])
    } else {
      const p = data.projects[+el.dataset.project]
      const cover = el.closest('.project').querySelector('.project-media')
      lightbox.open(p.items, 0, (i) => (i === 0 ? cover : null))
    }
  })
})

// Aviso de demonstração
const note = document.querySelector('[data-demo-note]')
if (note) {
  try { if (sessionStorage.getItem('demo-note') === 'off') note.hidden = true } catch {}
  note.querySelector('[data-demo-close]').addEventListener('click', () => {
    note.hidden = true
    try { sessionStorage.setItem('demo-note', 'off') } catch {}
  })
}

// O nome gigante do rodapé ocupa exatamente a largura útil, qualquer que seja o nome
const mark = document.querySelector('[data-footer-mark]')
if (mark) {
  const fit = () => {
    mark.style.fontSize = '100px'
    const avail = mark.parentElement.clientWidth - parseFloat(getComputedStyle(mark.parentElement).paddingLeft) * 2
    mark.style.fontSize = `${Math.floor((100 * avail) / mark.scrollWidth)}px`
  }
  document.fonts?.ready.then(fit)
  fit()
  addEventListener('resize', fit)
}

document.documentElement.classList.add('ready')
