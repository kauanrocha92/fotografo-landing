// Mostra cada foto com um fade quando ela termina de carregar; até lá aparece a cor média.
export function initImages(root = document) {
  root.querySelectorAll('.ph img').forEach((img) => {
    const done = () => img.classList.add('is-loaded')
    if (img.complete && img.naturalWidth) done()
    else {
      img.addEventListener('load', done, { once: true })
      img.addEventListener('error', done, { once: true })
    }
  })
}
