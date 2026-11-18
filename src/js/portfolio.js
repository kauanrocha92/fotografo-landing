import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from './motion.js'

gsap.registerPlugin(Flip)

/*
 * Galeria em grade de 12 colunas com posições assimétricas.
 * Cada foto recebe coluna inicial e largura de um padrão; a altura vira um
 * número de linhas de 8px, então a grade se comporta como um mosaico sem
 * perder o alinhamento às colunas. Filtrar recompõe a grade com Flip.
 */
const PATTERNS = {
  wide: [ // ≥ 1100px
    [1, 5], [7, 5], [2, 4], [7, 6], [1, 6], [8, 4], [3, 4], [8, 5],
  ],
  mid: [ // 600–1099px
    [1, 7], [8, 5], [1, 5], [7, 6], [2, 6], [8, 5],
  ],
  narrow: [ // < 600px
    [1, 12], [1, 7], [6, 7], [1, 12], [4, 9], [1, 8],
  ],
}
const GAP_ROWS = { wide: 7, mid: 5, narrow: 4 }
const ROW = 8

export function initPortfolio(data, motion) {
  const grid = document.querySelector('[data-works]')
  if (!grid) return
  const items = [...grid.querySelectorAll('[data-work]')]
  const filters = [...document.querySelectorAll('[data-filter]')]
  const status = document.querySelector('[data-filter-status]')
  let current = 'all'

  const tier = () => (innerWidth >= 1100 ? 'wide' : innerWidth >= 600 ? 'mid' : 'narrow')

  function layout() {
    const t = tier()
    const pattern = PATTERNS[t]
    const styles = getComputedStyle(grid)
    const cols = styles.gridTemplateColumns.split(' ').map(parseFloat)
    const gap = parseFloat(styles.columnGap) || 0
    const colW = cols[0] || grid.clientWidth / 12
    grid.classList.add('is-masonry')
    items
      .filter((el) => !el.classList.contains('is-hidden'))
      .forEach((el, i) => {
        const [start, span] = pattern[i % pattern.length]
        const ar = parseFloat(el.style.getPropertyValue('--ar')) || 1
        const w = span * colW + (span - 1) * gap
        const rows = Math.ceil(w / ar / ROW) + GAP_ROWS[t]
        el.style.gridColumn = `${start} / span ${span}`
        el.style.gridRow = `span ${rows}`
      })
  }

  layout()
  let rt
  addEventListener('resize', () => {
    clearTimeout(rt)
    rt = setTimeout(() => { layout(); ScrollTrigger.refresh() }, 150)
  })

  // Entrada: cada foto se revela de baixo para cima ao entrar na tela
  if (!motion.reduced) {
    items.forEach((el) => {
      const frame = el.querySelector('.work-frame')
      gsap.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
      gsap.fromTo(frame.querySelector('img'), { scale: 1.25 }, {
        scale: 1, duration: 2, ease: 'expo.out', clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      })
    })
  }

  function apply(cat) {
    if (cat === current) return
    current = cat
    filters.forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.filter === cat)))
    const state = Flip.getState(items)
    items.forEach((el) => el.classList.toggle('is-hidden', cat !== 'all' && el.dataset.cat !== cat))
    layout()
    // garante que fotos que reaparecem não fiquem presas no estado inicial da revelação
    items.forEach((el) => {
      if (!el.classList.contains('is-hidden')) gsap.set(el.querySelector('.work-frame'), { clipPath: 'inset(0% 0% 0% 0%)' })
    })
    const visible = items.filter((el) => !el.classList.contains('is-hidden'))
    status.textContent = `${visible.length} fotos${cat === 'all' ? '' : ` em ${data.categories[cat]}`}`

    if (motion.reduced) { ScrollTrigger.refresh(); return }
    Flip.from(state, {
      duration: 1, ease: 'expo.inOut', stagger: 0.025, absolute: true, nested: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }, { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 1, ease: 'expo.inOut', delay: 0.25, stagger: 0.04 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.5, ease: 'power2.in' }),
      onComplete: () => ScrollTrigger.refresh(),
    })
  }

  filters.forEach((f) => f.addEventListener('click', () => apply(f.dataset.filter)))
}
