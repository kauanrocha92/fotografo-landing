import { ScrollTrigger } from './motion.js'

export function initHeader(motion) {
  const header = document.querySelector('[data-header]')
  const progress = header.querySelector('[data-progress]')
  const hero = document.querySelector('.hero')
  const desktop = matchMedia('(min-width: 900px)')

  // Sólido depois do herói (desktop) ou logo no começo (celular, onde a foto não fica atrás do menu)
  const solidAt = () => (desktop.matches ? hero.offsetHeight - header.offsetHeight : 8)
  let lastY = window.scrollY
  const onScroll = () => {
    const y = window.scrollY
    header.classList.toggle('is-solid', y > solidAt())
    const goingDown = y > lastY + 4
    const goingUp = y < lastY - 4
    if (y > hero.offsetHeight && goingDown && !document.body.classList.contains('menu-open')) header.classList.add('is-hidden')
    else if (goingUp || y < hero.offsetHeight) header.classList.remove('is-hidden')
    lastY = y
    const max = document.documentElement.scrollHeight - innerHeight
    progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0)
  }
  if (motion.lenis) motion.lenis.on('scroll', onScroll)
  else addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  // Inverte as cores sobre seções em tinta
  document.querySelectorAll('[data-theme="ink"]').forEach((sec) => {
    ScrollTrigger.create({
      trigger: sec, start: () => `top ${header.offsetHeight / 2}px`, end: () => `bottom ${header.offsetHeight / 2}px`,
      onToggle: (s) => header.classList.toggle('on-ink', s.isActive),
    })
  })

  // Link atual
  const links = [...header.querySelectorAll('.nav-link')]
  links.forEach((a) => {
    const sec = document.querySelector(a.getAttribute('href'))
    if (!sec) return
    ScrollTrigger.create({
      trigger: sec, start: 'top 45%', end: 'bottom 45%',
      onToggle: (s) => {
        a.classList.toggle('is-current', s.isActive)
        if (s.isActive) a.setAttribute('aria-current', 'true')
        else a.removeAttribute('aria-current')
      },
    })
  })

  // Menu do celular
  const toggle = header.querySelector('[data-menu-toggle]')
  const menu = document.querySelector('[data-menu]')
  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open))
    document.body.classList.toggle('menu-open', open)
    if (open) {
      menu.hidden = false
      requestAnimationFrame(() => menu.classList.add('is-open'))
      motion.lenis?.stop()
      setTimeout(() => menu.querySelector('a')?.focus({ preventScroll: true }), 350)
    } else {
      menu.classList.remove('is-open')
      motion.lenis?.start()
      setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true }, 800)
    }
  }
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'))
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false) })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus() }
  })
  desktop.addEventListener('change', () => setOpen(false))
}
