import gsap from 'gsap'

const WIDTHS = [640, 1280, 2000]
const srcsetFor = (slug) => WIDTHS.map((w) => `/img/${slug}-${w}.webp ${w}w`).join(', ')

export function initLightbox(data) {
  const dlg = document.querySelector('[data-lightbox]')
  const stage = dlg.querySelector('[data-lb-stage]')
  const fig = dlg.querySelector('[data-lb-figure]')
  const img = dlg.querySelector('[data-lb-img]')
  const title = dlg.querySelector('[data-lb-title]')
  const cat = dlg.querySelector('[data-lb-cat]')
  const num = dlg.querySelector('[data-lb-num]')
  const total = dlg.querySelector('[data-lb-total]')
  const prevBtn = dlg.querySelector('[data-lb-prev]')
  const nextBtn = dlg.querySelector('[data-lb-next]')
  const closeBtn = dlg.querySelector('[data-lb-close]')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const chrome = [dlg.querySelector('.lb-bar'), closeBtn]

  let items = []
  let index = 0
  let thumbOf = () => null
  let opener = null
  let hiddenThumb = null
  let busy = false

  const pad = (n) => String(n).padStart(2, '0')

  function load(i) {
    const it = items[i]
    img.srcset = srcsetFor(it.photo)
    img.sizes = '100vw'
    img.src = `/img/${it.photo}-1280.webp`
    img.alt = it.alt || it.title
    const p = data.photos[it.photo]
    img.width = p.w
    img.height = p.h
    fig.style.background = p.color
    title.textContent = it.title
    cat.textContent = it.cat + (data.demo ? ' · foto temporária' : '')
    num.textContent = pad(i + 1)
    total.textContent = pad(items.length)
    const one = items.length < 2
    prevBtn.hidden = one
    nextBtn.hidden = one
    ;[i - 1, i + 1].forEach((j) => {
      const n = items[(j + items.length) % items.length]
      if (n) { const pre = new Image(); pre.sizes = '100vw'; pre.srcset = srcsetFor(n.photo) }
    })
    return img.decode().catch(() => {})
  }

  function thumbRect() {
    const t = thumbOf(index)
    if (!t) return null
    const frame = t.querySelector?.('.work-frame') || t
    const r = frame.getBoundingClientRect()
    if (r.bottom < 0 || r.top > innerHeight || r.width === 0) return null
    return { el: frame, r }
  }

  // Transformação que faz a foto ampliada cobrir exatamente a miniatura
  function fromThumb(tr) {
    gsap.set(fig, { x: 0, y: 0, scale: 1, clipPath: 'inset(0px)' })
    const fr = fig.getBoundingClientRect()
    const s = Math.max(tr.width / fr.width, tr.height / fr.height)
    const ix = Math.max(0, (fr.width - tr.width / s) / 2)
    const iy = Math.max(0, (fr.height - tr.height / s) / 2)
    return {
      x: tr.left + tr.width / 2 - (fr.width * s) / 2 - fr.left,
      y: tr.top + tr.height / 2 - (fr.height * s) / 2 - fr.top,
      scale: s,
      clipPath: `inset(${iy}px ${ix}px ${iy}px ${ix}px)`,
    }
  }

  async function open(list, i, getThumb) {
    if (busy || !list.length) return
    busy = true
    items = list
    index = Math.max(0, i)
    thumbOf = getThumb || (() => null)
    opener = document.activeElement
    window.__lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    dlg.showModal()
    gsap.set(fig, { opacity: 0 })
    gsap.set(chrome, { opacity: 0 })
    await load(index)
    const t = thumbRect()
    if (!reduced && t) {
      hiddenThumb = t.el
      const from = fromThumb(t.r)
      gsap.set(fig, { opacity: 1 })
      t.el.style.visibility = 'hidden'
      await gsap.fromTo(fig, from, { x: 0, y: 0, scale: 1, clipPath: 'inset(0px 0px 0px 0px)', duration: 0.95, ease: 'expo.inOut' })
    } else {
      await gsap.fromTo(fig, { opacity: 0, scale: reduced ? 1 : 0.97 }, { opacity: 1, scale: 1, duration: reduced ? 0.01 : 0.6, ease: 'expo.out' })
    }
    gsap.to(chrome, { opacity: 1, duration: 0.5 })
    busy = false
  }

  async function close() {
    if (busy || !dlg.open) return
    busy = true
    gsap.to(chrome, { opacity: 0, duration: 0.25 })
    const t = thumbRect()
    if (!reduced && t) {
      const to = fromThumb(t.r)
      gsap.set(fig, { x: 0, y: 0, scale: 1 })
      if (hiddenThumb && hiddenThumb !== t.el) hiddenThumb.style.visibility = ''
      hiddenThumb = t.el
      t.el.style.visibility = 'hidden'
      await gsap.to(fig, { ...to, duration: 0.85, ease: 'expo.inOut' })
    } else {
      await gsap.to(fig, { opacity: 0, scale: reduced ? 1 : 0.97, duration: reduced ? 0.01 : 0.35, ease: 'power2.in' })
    }
    if (hiddenThumb) hiddenThumb.style.visibility = ''
    hiddenThumb = null
    dlg.close()
    gsap.set(fig, { clearProps: 'all' })
    document.documentElement.style.overflow = ''
    window.__lenis?.start()
    opener?.focus?.({ preventScroll: true })
    busy = false
  }

  async function go(dir) {
    if (busy || items.length < 2) return
    busy = true
    if (hiddenThumb) { hiddenThumb.style.visibility = ''; hiddenThumb = null }
    const next = (index + dir + items.length) % items.length
    if (!reduced) await gsap.to(fig, { x: -dir * 60, opacity: 0, duration: 0.35, ease: 'power2.in' })
    index = next
    await load(index)
    if (!reduced) await gsap.fromTo(fig, { x: dir * 60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'expo.out' })
    else gsap.set(fig, { opacity: 1 })
    busy = false
  }

  prevBtn.addEventListener('click', () => go(-1))
  nextBtn.addEventListener('click', () => go(1))
  closeBtn.addEventListener('click', close)
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close() })
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'Escape') { e.preventDefault(); close() }
  })
  // clique fora da foto fecha
  stage.addEventListener('click', (e) => { if (e.target === stage) close() })

  // gesto de arrastar no celular
  let sx = null
  let sy = null
  stage.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY })
  stage.addEventListener('pointerup', (e) => {
    if (sx == null) return
    const dx = e.clientX - sx
    const dy = e.clientY - sy
    sx = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close()
  })

  return { open, close }
}
