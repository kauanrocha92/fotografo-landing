import { esc, gridLines } from './util.js'

export function Process(site) {
  const steps = site.process
    .map(
      (s, i) => `<li class="step" style="--i:${i}" data-step>
        <span class="step-num tnum" aria-hidden="true">${i + 1}</span>
        <div class="step-body">
          <h3 class="step-title">${esc(s.title)}</h3>
          <p class="step-text">${esc(s.text)}</p>
        </div>
      </li>`,
    )
    .join('')

  return `
  <section class="process" id="processo" data-theme="ink" aria-labelledby="process-title">
    ${gridLines()}
    <h2 class="display process-title" id="process-title" data-reveal="words">do primeiro oi <span class="indent">à entrega</span></h2>
    <div class="steps-wrap" data-steps>
      <span class="steps-line" aria-hidden="true"><span data-steps-line></span></span>
      <ol class="steps">${steps}</ol>
    </div>
  </section>`
}
