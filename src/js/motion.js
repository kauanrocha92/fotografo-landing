import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

/*
 * Linguagem de movimento "Concreto":
 * - fotos se revelam por ripas, uma coluna da grade por vez;
 * - palavras sobem de dentro de uma máscara, uma a uma;
 * - textos secundários sobem 28px com fade;
 * - seções em tinta entram como um bloco alinhado à margem e se abrem até a borda;
 * - parallax só dentro das molduras, nunca no texto corrido.
 * Tudo em transform / opacity / clip-path, com expo.out.
 */
export const EASE = 'expo.out'

export function initMotion() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = matchMedia('(min-width: 900px)')
  let lenis = null

  if (!reduced) {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    window.__lenis = lenis
  }

  const api = {
    reduced,
    lenis,
    scrollTo(target, opts = {}) {
      const el = typeof target === 'string' ? document.querySelector(target) : target
      if (!el) return
      if (lenis) lenis.scrollTo(el, { offset: opts.offset ?? 0, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
      else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    },
  }

  // Âncoras internas passam pelo Lenis (respeita o cabeçalho fixo)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]')
    if (!a) return
    const id = a.getAttribute('href')
    if (id.length < 2) return
    const el = document.querySelector(id)
    if (!el) return
    e.preventDefault()
    api.scrollTo(el, { offset: id === '#topo' ? 0 : -8 })
    history.replaceState(null, '', id)
    // move o foco para o destino, sem rolar de novo
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
    el.focus({ preventScroll: true })
  })

  splitWords()
  if (reduced) {
    // sem animação, todas as etapas do processo aparecem acesas
    document.querySelectorAll('[data-step]').forEach((s) => s.classList.add('is-on'))
    return api
  }

  heroIntro(desktop)
  reveals()
  inkSections(desktop)
  photoMotion(desktop)
  processSteps()
  ctaOpen()
  footerMark()

  // Recalcula depois que as fontes chegam (as palavras mudam de largura)
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  return api
}

/* Quebra títulos marcados em palavras mascaradas, preservando a estrutura interna. */
function splitWords() {
  document.querySelectorAll('[data-reveal="words"]').forEach((el) => {
    if (!el.hasAttribute('aria-label')) el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim())
    const walk = (node) => {
      ;[...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/)
          const frag = document.createDocumentFragment()
          parts.forEach((p) => {
            if (!p) return
            if (/^\s+$/.test(p)) frag.append(' ')
            else {
              const m = document.createElement('span')
              m.className = 'mask'
              m.setAttribute('aria-hidden', 'true')
              const s = document.createElement('span')
              s.textContent = p
              m.append(s)
              frag.append(m)
            }
          })
          n.replaceWith(frag)
        } else if (n.nodeType === 1) walk(n)
      })
    }
    walk(el)
  })
}

function heroIntro(desktop) {
  const hero = document.querySelector('.hero')
  if (!hero) return
  const slats = hero.querySelectorAll('[data-slats] i')
  const frame = hero.querySelector('.hero-frame')
  const words = hero.querySelectorAll('[data-word]')
  const rise = hero.querySelector('[data-hero-rise]')
  const index = hero.querySelector('.hero-index')
  const header = document.querySelector('[data-header]')

  const tl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.15 })
  tl.fromTo(frame, { scale: 1.16 }, { scale: 1, duration: 2.4 }, 0)
    .to(slats, { scaleY: 0, duration: 1.15, ease: 'expo.inOut', stagger: 0.075 }, 0)
    .to(words, { y: 0, duration: 1.25, stagger: 0.11 }, 0.35)
    .to(rise, { opacity: 1, y: 0, duration: 1 }, 0.85)
    .from(index, { opacity: 0, y: 12, duration: 0.8 }, 1.1)
    .from(header, { yPercent: -100, duration: 1 }, 0.7)

  // Rolagem: a foto desce mais devagar dentro da moldura, o título sobe um pouco
  if (desktop.matches) {
    gsap.to(frame, {
      yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to(hero.querySelector('.hero-title'), {
      y: -80, ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    })
  }

  heroSlides(hero)
}

function heroSlides(hero) {
  const slides = [...hero.querySelectorAll('[data-slide]')]
  if (slides.length < 2) return
  const labelEl = hero.querySelector('[data-slide-label]')
  const numEl = hero.querySelector('[data-slide-num]')
  let i = 0
  let timer
  let visible = true

  const go = () => {
    const prev = slides[i]
    i = (i + 1) % slides.length
    const next = slides[i]
    next.classList.add('is-active')
    gsap.set(next, { zIndex: 2 })
    gsap.fromTo(next, { clipPath: 'inset(0% 0% 0% 100%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut',
      onComplete() {
        prev.classList.remove('is-active')
        prev.setAttribute('aria-hidden', 'true')
        next.removeAttribute('aria-hidden')
        gsap.set(next, { zIndex: 1 })
      },
    })
    gsap.fromTo(next.querySelector('img'), { scale: 1.12 }, { scale: 1, duration: 2.2, ease: EASE })
    labelEl.textContent = next.dataset.label
    numEl.textContent = String(i + 1).padStart(2, '0')
  }
  const schedule = () => {
    clearTimeout(timer)
    if (visible && !document.hidden) timer = setTimeout(() => { go(); schedule() }, 5600)
  }
  ScrollTrigger.create({ trigger: hero, start: 'top top', end: 'bottom top', onToggle: (s) => { visible = s.isActive; schedule() } })
  document.addEventListener('visibilitychange', schedule)
  setTimeout(schedule, 1800)
}

function reveals() {
  document.querySelectorAll('[data-reveal="words"]').forEach((el) => {
    gsap.to(el.querySelectorAll('.mask > span'), {
      y: 0, duration: 1.2, ease: EASE, stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    })
  })

  ScrollTrigger.batch('[data-reveal="rise"]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: EASE, stagger: 0.09, overwrite: true }),
  })

  document.querySelectorAll('[data-reveal="slats"]').forEach((el) => {
    const slats = el.querySelectorAll('.slats i')
    const frame = el.querySelector('[data-parallax-frame], .about-placeholder')
    const fromRight = !!el.closest('.is-flipped')
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
    tl.to(slats, {
      scaleY: 0, transformOrigin: 'bottom', duration: 1.2, ease: 'expo.inOut',
      stagger: { each: 0.07, from: fromRight ? 'end' : 'start' },
    }, 0)
    if (frame) tl.from(frame, { scale: 1.18, duration: 2, ease: EASE }, 0)
  })
}

/* Seções em tinta entram como um bloco preso às margens e se abrem até a borda. */
function inkSections(desktop) {
  const m = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--m')) || 24
  document.querySelectorAll('.projects, .process').forEach((sec) => {
    gsap.fromTo(sec,
      { clipPath: () => `inset(0px ${m()}px 0px ${m()}px)` },
      {
        clipPath: 'inset(0px 0px 0px 0px)', ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: desktop.matches ? 'top 25%' : 'top 50%', scrub: true, invalidateOnRefresh: true },
      })
  })
}

function photoMotion(desktop) {
  if (!desktop.matches) return
  document.querySelectorAll('.projects [data-parallax-frame], .about [data-parallax-frame]').forEach((f) => {
    gsap.fromTo(f, { yPercent: -6 }, {
      yPercent: 6, ease: 'none',
      scrollTrigger: { trigger: f.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
  // títulos de seção deslizam de leve na direção oposta da rolagem
  document.querySelectorAll('.projects-title, .process-title, .about-heading').forEach((t) => {
    gsap.fromTo(t, { x: 0 }, {
      x: () => -window.innerWidth * 0.03, ease: 'none',
      scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
    })
  })
}

function processSteps() {
  const wrap = document.querySelector('[data-steps]')
  if (!wrap) return
  const line = wrap.querySelector('[data-steps-line]')
  ScrollTrigger.create({
    trigger: wrap, start: 'top 65%', end: 'bottom 65%', scrub: true,
    onUpdate: (s) => line.style.setProperty('--p', s.progress.toFixed(4)),
  })
  wrap.querySelectorAll('[data-step]').forEach((step) => {
    ScrollTrigger.create({
      trigger: step, start: 'top 65%',
      onEnter: () => step.classList.add('is-on'),
      onLeaveBack: () => step.classList.remove('is-on'),
    })
    gsap.from(step, { x: -24, opacity: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: step, start: 'top 88%', once: true } })
  })
}

/* CTA: a foto começa como uma cópia emoldurada e se abre até sangrar a tela. */
function ctaOpen() {
  const cta = document.querySelector('[data-cta]')
  if (!cta) return
  const media = cta.querySelector('[data-cta-media]')
  const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: 'top bottom', end: 'top top', scrub: true } })
  tl.fromTo(media, { clipPath: 'inset(16% 22% 16% 22%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
    .fromTo(media.querySelector('img'), { scale: 1.3 }, { scale: 1, ease: 'none' }, 0)
}

function footerMark() {
  const mark = document.querySelector('[data-footer-mark]')
  if (!mark) return
  gsap.from(mark, {
    yPercent: 60, ease: 'none',
    scrollTrigger: { trigger: mark.closest('footer'), start: 'top bottom', end: 'bottom bottom', scrub: true },
  })
}

export { gsap, ScrollTrigger }
