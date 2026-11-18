import { defineConfig } from 'vite'
import { pathToFileURL, fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))

// Renderiza as seções a partir de src/data/site.js direto no HTML (bom para SEO
// e para a primeira pintura), sem framework.
function staticSections() {
  let server
  return {
    name: 'static-sections',
    configureServer(s) {
      server = s
      s.watcher.on('change', (file) => {
        if (file.includes(`${path.sep}src${path.sep}data`) || file.includes(`${path.sep}src${path.sep}components`) || file.endsWith('render.js')) {
          s.ws.send({ type: 'full-reload' })
        }
      })
    },
    async transformIndexHtml(html) {
      const mod = server
        ? await server.ssrLoadModule('/src/render.js')
        : await import(pathToFileURL(path.join(root, 'src/render.js')).href)
      return html.replace('<!--head-->', mod.renderHead()).replace('<!--app-->', mod.renderBody())
    },
  }
}

export default defineConfig({
  plugins: [staticSections()],
  build: { assetsInlineLimit: 0 },
})
