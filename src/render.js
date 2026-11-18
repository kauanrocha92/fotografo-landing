// Monta o HTML estático da página a partir de src/data/site.js (roda no Vite, em Node).
import { site, photos } from './data/site.js'
import { esc } from './components/util.js'
import { Header } from './components/header.js'
import { Hero } from './components/hero.js'
import { Portfolio } from './components/portfolio.js'
import { Projects } from './components/projects.js'
import { About } from './components/about.js'
import { Services } from './components/services.js'
import { Process } from './components/process.js'
import { Testimonials } from './components/testimonials.js'
import { ContactCTA } from './components/cta.js'
import { Contact } from './components/contact.js'
import { Footer } from './components/footer.js'
import { Lightbox } from './components/lightbox.js'

export function renderHead() {
  const s = site.seo
  const abs = (p) => site.url.replace(/\/$/, '') + p
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    description: s.description,
    url: site.url,
    image: abs(s.ogImage),
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: site.region,
    priceRange: 'Sob orçamento',
    sameAs: [`https://instagram.com/${site.contact.instagram}`],
    founder: { '@type': 'Person', name: site.name, jobTitle: site.role },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de fotografia',
      itemListElement: site.services.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x.name, description: x.description } })),
    },
  }
  const hero = site.hero.slides[0].photo
  return `
    <title>${esc(s.title)}</title>
    <meta name="description" content="${esc(s.description)}">
    <link rel="canonical" href="${site.url}/">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="${site.locale}">
    <meta property="og:site_name" content="${esc(site.name)}">
    <meta property="og:title" content="${esc(s.title)}">
    <meta property="og:description" content="${esc(s.description)}">
    <meta property="og:url" content="${site.url}/">
    <meta property="og:image" content="${abs(s.ogImage)}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="preload" as="image" type="image/avif" imagesrcset="/img/${hero}-640.avif 640w, /img/${hero}-1280.avif 1280w, /img/${hero}-2000.avif 2000w" imagesizes="(min-width: 900px) 66vw, 100vw" fetchpriority="high">
    <script type="application/ld+json">${JSON.stringify(ld)}</script>`
}

export function renderBody() {
  const label = (id) => site.categories.find((c) => c.id === id)?.label ?? id
  const client = {
    portfolio: site.portfolio.map((p) => ({ photo: p.photo, title: p.title, cat: label(p.category), alt: p.alt })),
    projects: site.projects.map((p) => ({
      title: p.title,
      items: p.gallery.map((g) => ({ photo: g, title: p.title, cat: p.category, alt: `Projeto ${p.title}` })),
    })),
    photos,
    demo: site.demo,
    contact: { whatsapp: site.contact.whatsapp, email: site.contact.email },
    categories: Object.fromEntries(site.categories.map((c) => [c.id, c.label])),
  }

  return `
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>
  ${Header(site)}
  <main id="conteudo">
    ${Hero(site)}
    ${Portfolio(site)}
    ${Projects(site)}
    ${About(site)}
    ${Services(site)}
    ${Process(site)}
    ${Testimonials(site)}
    ${ContactCTA(site)}
    ${Contact(site)}
  </main>
  ${Footer(site)}
  ${Lightbox()}
  <script type="application/json" id="site-data">${JSON.stringify(client).replace(/</g, '\\u003c')}</script>`
}
