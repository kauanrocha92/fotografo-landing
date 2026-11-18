import { photos, PHOTO_WIDTHS } from '../data/site.js'

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export const srcset = (slug, fmt) => PHOTO_WIDTHS.map((w) => `/img/${slug}-${w}.${fmt} ${w}w`).join(', ')

/**
 * <picture> responsivo com AVIF + WebP, dimensões reservadas e cor média como placeholder.
 * `eager` só para a primeira dobra.
 */
export function picture(slug, { alt = '', sizes = '100vw', eager = false, className = '', imgClass = '' } = {}) {
  const p = photos[slug]
  if (!p) throw new Error(`Foto não cadastrada: ${slug}`)
  return `<picture class="ph ${className}" style="--ph:${p.color}">
    <source type="image/avif" srcset="${srcset(slug, 'avif')}" sizes="${sizes}">
    <img class="${imgClass}" src="/img/${slug}-1280.webp" srcset="${srcset(slug, 'webp')}" sizes="${sizes}"
      width="${p.w}" height="${p.h}" alt="${esc(alt)}"
      ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">
  </picture>`
}

export const ratio = (slug) => {
  const p = photos[slug]
  return p.w / p.h
}

/** Linhas da grade de 12 colunas, visíveis no fundo de cada seção. */
export const gridLines = () =>
  `<div class="grid-lines" aria-hidden="true">${Array.from({ length: 12 }, (_, i) => `<i><b>${String(i + 1).padStart(2, '0')}</b></i>`).join('')}</div>`

export const waLink = (contact, text) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text || contact.whatsappMessage)}`

export const icon = (name) => {
  const paths = {
    whatsapp:
      '<path d="M3.5 20.5l1.2-4.3A8.5 8.5 0 1 1 8 19.4l-4.5 1.1Z"/><path d="M9 8.6c0-.4.3-.8.7-.8h.6c.3 0 .5.2.6.4l.6 1.5c.1.3 0 .6-.2.8l-.5.5a6 6 0 0 0 2.9 2.9l.5-.5c.2-.2.5-.3.8-.2l1.5.6c.3.1.4.3.4.6v.6c0 .4-.4.7-.8.7A6.1 6.1 0 0 1 9 8.6Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14"/><path d="m3 6 9 7 9-7"/>',
    instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
    phone: '<path d="M5 3.5h3.5l1.5 4.5-2 1.3a11 11 0 0 0 6.7 6.7l1.3-2 4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5Z"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    'arrow-left': '<path d="M20 12H5M11 6l-6 6 6 6"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    up: '<path d="M12 20V5M6 11l6-6 6 6"/>',
  }
  return `<svg class="icon icon-${name}" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" aria-hidden="true">${paths[name]}</svg>`
}
