import { esc, gridLines, waLink, icon } from './util.js'

export function Contact(site) {
  const c = site.contact
  const channels = [
    { icon: 'whatsapp', label: 'WhatsApp', value: c.whatsappDisplay, href: waLink(c), ext: true },
    { icon: 'mail', label: 'E-mail', value: c.email, href: `mailto:${c.email}` },
    { icon: 'instagram', label: 'Instagram', value: `@${c.instagram}`, href: `https://instagram.com/${c.instagram}`, ext: true },
    { icon: 'phone', label: 'Telefone', value: c.phoneDisplay, href: `tel:${c.phone}` },
  ]
  const list = channels
    .map(
      (ch) => `<li><a class="channel" href="${ch.href}"${ch.ext ? ' target="_blank" rel="noopener"' : ''}>
        ${icon(ch.icon)}<span class="channel-label">${ch.label}</span><span class="channel-value">${esc(ch.value)}</span>
      </a></li>`,
    )
    .join('')

  const options = site.services.map((s) => `<option value="${s.id}">${esc(s.name)}</option>`).join('')

  return `
  <section class="contact" id="contato" data-theme="paper" aria-labelledby="contact-title">
    ${gridLines()}
    <div class="contact-side">
      <h2 class="display contact-title" id="contact-title" data-reveal="words">fale comigo</h2>
      <p class="contact-lede" data-reveal="rise">Respondo pessoalmente. Pelo WhatsApp costuma ser mais rápido.</p>
      <ul class="channels" data-reveal="rise">${list}</ul>
      <dl class="contact-info" data-reveal="rise">
        <div><dt>${icon('pin')} Região de atendimento</dt><dd>${esc(site.region)}. ${esc(site.regionNote)}</dd></div>
        <div><dt>Horário</dt><dd>${esc(c.hours)}</dd></div>
      </dl>
    </div>

    <form class="form" data-form novalidate aria-labelledby="form-title" data-endpoint="${esc(c.formEndpoint)}">
      <h3 class="form-title" id="form-title">Pedido de orçamento</h3>
      <div class="field">
        <label for="f-nome">Nome</label>
        <input id="f-nome" name="nome" type="text" autocomplete="name" required minlength="2" aria-describedby="e-nome">
        <p class="field-error" id="e-nome" data-error></p>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-email">E-mail</label>
          <input id="f-email" name="email" type="email" autocomplete="email" required aria-describedby="e-email">
          <p class="field-error" id="e-email" data-error></p>
        </div>
        <div class="field">
          <label for="f-tel">Telefone ou WhatsApp</label>
          <input id="f-tel" name="telefone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="(00) 00000-0000" aria-describedby="e-tel">
          <p class="field-error" id="e-tel" data-error></p>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="f-servico">Tipo de serviço</label>
          <div class="select">
            <select id="f-servico" name="servico" required aria-describedby="e-servico">
              <option value="">Escolha uma opção</option>
              ${options}
              <option value="outro">Outro</option>
            </select>
          </div>
          <p class="field-error" id="e-servico" data-error></p>
        </div>
        <div class="field">
          <label for="f-data">Data ou período <span class="optional">(opcional)</span></label>
          <input id="f-data" name="data" type="text" placeholder="Ex.: 12 de março, ou maio de 2027" aria-describedby="e-data">
          <p class="field-error" id="e-data" data-error></p>
        </div>
      </div>
      <div class="field">
        <label for="f-msg">Mensagem</label>
        <textarea id="f-msg" name="mensagem" rows="5" required minlength="10" placeholder="Conte o que você imagina: local, número de pessoas, duração…" aria-describedby="e-msg"></textarea>
        <p class="field-error" id="e-msg" data-error></p>
      </div>
      <div class="form-foot">
        <button class="btn btn-ink" type="submit" data-submit><span>Enviar pedido</span></button>
        <p class="form-privacy">Seus dados são usados só para responder a este pedido.</p>
      </div>
      <div class="form-status" role="status" aria-live="polite" data-status hidden></div>
    </form>
  </section>`
}
