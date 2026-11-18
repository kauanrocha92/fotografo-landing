import { icon } from './util.js'

export function Lightbox() {
  return `
  <dialog class="lightbox" data-lightbox aria-label="Visualização ampliada">
    <div class="lb-stage" data-lb-stage>
      <figure class="lb-figure" data-lb-figure>
        <img class="lb-img" data-lb-img alt="" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">
      </figure>
    </div>
    <div class="lb-bar">
      <p class="lb-caption"><span data-lb-title></span><span class="lb-cat" data-lb-cat></span></p>
      <p class="lb-count tnum" aria-live="polite"><span data-lb-num></span> / <span data-lb-total></span></p>
      <div class="lb-nav">
        <button type="button" class="lb-btn" data-lb-prev aria-label="Foto anterior">${icon('arrow-left')}</button>
        <button type="button" class="lb-btn" data-lb-next aria-label="Próxima foto">${icon('arrow')}</button>
      </div>
    </div>
    <button type="button" class="lb-close" data-lb-close aria-label="Fechar">${icon('close')}<span>fechar</span></button>
  </dialog>`
}
