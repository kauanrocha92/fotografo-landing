/*
 * Formulário de orçamento.
 * - Valida no envio e depois a cada campo alterado, com mensagens que dizem como corrigir.
 * - Com `contact.formEndpoint` preenchido em src/data/site.js, envia POST JSON.
 * - Sem endpoint, NÃO simula envio: explica isso e oferece mandar o mesmo pedido
 *   por WhatsApp ou e-mail, já preenchido.
 */
const MESSAGES = {
  nome: { valueMissing: 'Escreva seu nome.', tooShort: 'Escreva seu nome completo.' },
  email: { valueMissing: 'Informe um e-mail para a resposta.', typeMismatch: 'Este e-mail parece incompleto. Confira o @ e o domínio.' },
  telefone: { valueMissing: 'Informe um telefone ou WhatsApp com DDD.', pattern: 'Use um número com DDD, por exemplo (11) 98888-7777.' },
  servico: { valueMissing: 'Escolha o tipo de serviço.' },
  mensagem: { valueMissing: 'Conte um pouco sobre o que você precisa.', tooShort: 'Escreva pelo menos uma frase curta.' },
}

export function initForm(data) {
  const form = document.querySelector('[data-form]')
  if (!form) return
  const statusEl = form.querySelector('[data-status]')
  const submit = form.querySelector('[data-submit]')
  const endpoint = form.dataset.endpoint?.trim()
  const fields = [...form.querySelectorAll('input, select, textarea')]
  let tried = false

  // Links "Solicitar orçamento" de cada serviço já escolhem o serviço no formulário
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-service-link]')
    if (a && a.dataset.serviceLink) form.servico.value = a.dataset.serviceLink
  })

  const phoneOk = (v) => v.replace(/\D/g, '').length >= 10

  function check(el) {
    const err = form.querySelector(`#e-${el.id.slice(2)}`)
    let msg = ''
    const m = MESSAGES[el.name] || {}
    if (el.validity.valueMissing) msg = m.valueMissing
    else if (el.validity.typeMismatch) msg = m.typeMismatch
    else if (el.validity.tooShort) msg = m.tooShort
    else if (el.name === 'telefone' && el.value && !phoneOk(el.value)) msg = m.pattern
    if (el.name === 'email' && el.value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) && !msg) msg = MESSAGES.email.typeMismatch
    if (msg) el.setAttribute('aria-invalid', 'true')
    else el.removeAttribute('aria-invalid')
    if (err) err.textContent = msg || ''
    return !msg
  }

  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (tried || el.value) check(el) })
    el.addEventListener('input', () => { if (tried || el.hasAttribute('aria-invalid')) check(el) })
  })

  // Máscara leve de telefone brasileiro
  form.telefone.addEventListener('input', () => {
    const d = form.telefone.value.replace(/\D/g, '').slice(0, 11)
    let v = d
    if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`
    if (d.length > 6) v = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`
    form.telefone.value = v
  })

  const values = () => Object.fromEntries(new FormData(form).entries())

  function summary(v) {
    const serv = form.servico.selectedOptions[0]?.textContent || v.servico
    return [
      'Olá! Gostaria de pedir um orçamento.',
      '',
      `Nome: ${v.nome}`,
      `E-mail: ${v.email}`,
      `Telefone: ${v.telefone}`,
      `Serviço: ${serv}`,
      v.data ? `Data ou período: ${v.data}` : '',
      '',
      v.mensagem,
    ].filter((l, i, a) => !(l === '' && a[i - 1] === '')).join('\n')
  }

  function show(kind, title, text, actions = '') {
    statusEl.hidden = false
    statusEl.className = `form-status${kind === 'error' ? ' is-error' : ''}`
    statusEl.innerHTML = `<h4></h4><p></p>${actions ? `<div class="status-actions">${actions}</div>` : ''}`
    statusEl.querySelector('h4').textContent = title
    statusEl.querySelector('p').textContent = text
    statusEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }

  function setLoading(on) {
    submit.disabled = on
    submit.innerHTML = on ? '<span class="spinner" aria-hidden="true"></span><span>Enviando…</span>' : '<span>Enviar pedido</span>'
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    tried = true
    const ok = fields.map(check).every(Boolean)
    if (!ok) {
      const first = fields.find((f) => f.getAttribute('aria-invalid') === 'true')
      first?.focus()
      show('error', 'Faltam alguns dados', 'Corrija os campos marcados e envie de novo.')
      return
    }
    const v = values()
    const text = summary(v)
    const wa = `https://wa.me/${data.contact.whatsapp}?text=${encodeURIComponent(text)}`
    const mail = `mailto:${data.contact.email}?subject=${encodeURIComponent('Pedido de orçamento: ' + (form.servico.selectedOptions[0]?.textContent || ''))}&body=${encodeURIComponent(text)}`
    const fallback = `<a class="btn btn-ink btn-sm" href="${wa}" target="_blank" rel="noopener">Enviar pelo WhatsApp</a><a class="btn btn-paper btn-sm" style="box-shadow: inset 0 0 0 1px var(--ink)" href="${mail}">Enviar por e-mail</a>`

    if (!endpoint) {
      show('info', 'O envio pelo site ainda não está ativo',
        'Seu pedido não foi enviado. Ele já está pronto: escolha abaixo como mandar, e a mensagem abre preenchida.', fallback)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(v),
      })
      if (!res.ok) throw new Error(String(res.status))
      form.reset()
      tried = false
      show('success', 'Pedido enviado. Obrigado!', 'Respondo em breve pelo e-mail ou telefone que você informou.')
    } catch {
      show('error', 'Não foi possível enviar agora',
        'Pode ser a conexão. Tente de novo em instantes ou mande o mesmo pedido por WhatsApp ou e-mail.', fallback)
    } finally {
      setLoading(false)
    }
  })
}
