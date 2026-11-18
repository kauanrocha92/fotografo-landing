/**
 * Todo o conteúdo editável da página.
 *
 * Tudo marcado com [colchetes] ou `demo: true` é PLACEHOLDER e precisa ser
 * substituído pelos dados reais do fotógrafo antes de publicar.
 *
 * Fotos: arquivos em /public/img no padrão <slug>-<largura>.<avif|webp>
 * (larguras 640, 1280 e 2000). Para trocar uma foto, gere os seis arquivos
 * com o mesmo slug ou cadastre um slug novo em `photos`.
 */

export const site = {
  // Liga o aviso de demonstração e o selo "foto temporária". Desligue quando
  // nome, textos e fotos forem reais.
  demo: true,

  name: 'Nome Sobrenome',
  shortName: 'nome sobrenome',
  role: 'Fotógrafo',
  url: 'https://www.seudominio.com.br',
  locale: 'pt_BR',
  region: '[Cidade] e região',
  regionNote: 'Viagens para outras cidades sob consulta.',

  seo: {
    title: 'Nome Sobrenome · Fotografia de retratos, casamentos e eventos em [Cidade]',
    description:
      'Fotografia autoral de retratos, ensaios, casamentos, eventos e trabalhos comerciais em [Cidade] e região. Orçamento personalizado para cada projeto.',
    ogImage: '/img/og.jpg',
  },

  hero: {
    words: ['luz', 'gente', 'tempo'],
    claim: 'Fotografia de pessoas e momentos, composta com rigor e cuidado.',
    description:
      'Retratos, ensaios, casamentos, eventos e trabalhos comerciais em [Cidade] e região.',
    slides: [
      { photo: 'hero-retrato-estudio', alt: 'Retrato em estúdio de uma mulher com fundo escuro', label: 'Retrato' },
      { photo: 'casamento-praia-veu', alt: 'Casal de noivos na praia com o véu ao vento', label: 'Casamento' },
      { photo: 'evento-show', alt: 'Público diante do palco iluminado em um show', label: 'Evento' },
    ],
  },

  contact: {
    // Número completo com DDI e DDD, só dígitos. Ex.: 5511999998888
    whatsapp: '5500000000000',
    whatsappDisplay: '[(00) 00000-0000]',
    whatsappMessage: 'Olá! Vi seu portfólio e gostaria de pedir um orçamento.',
    phone: '+5500000000000',
    phoneDisplay: '[(00) 0000-0000]',
    email: 'contato@seudominio.com.br',
    instagram: 'seuperfil',
    hours: '[Dias e horário de atendimento]',
    business: '[Razão social ou nome profissional] · CNPJ [00.000.000/0000-00]',
    // Endpoint que recebe o formulário (Formspree, Getform, Basin, API própria…).
    // Recebe POST com JSON { nome, email, telefone, servico, data, mensagem }.
    // Enquanto vazio, o formulário valida e oferece enviar por WhatsApp ou e-mail.
    formEndpoint: '',
  },

  nav: [
    { href: '#portfolio', label: 'portfólio' },
    { href: '#projetos', label: 'projetos' },
    { href: '#sobre', label: 'sobre' },
    { href: '#servicos', label: 'serviços' },
    { href: '#contato', label: 'contato' },
  ],

  categories: [
    { id: 'retratos', label: 'retratos' },
    { id: 'casamentos', label: 'casamentos' },
    { id: 'eventos', label: 'eventos' },
    { id: 'ensaios', label: 'ensaios' },
    { id: 'comercial', label: 'comercial' },
  ],

  // Ordem = ordem de exibição na galeria.
  portfolio: [
    { photo: 'retrato-homem-sombra', category: 'retratos', title: 'Retrato em luz baixa', alt: 'Retrato de um homem jovem em fundo escuro, luz lateral suave' },
    { photo: 'casamento-praia-veu', category: 'casamentos', title: 'Véu ao vento', alt: 'Noivos abraçados na praia, véu longo levado pelo vento' },
    { photo: 'ensaio-neon', category: 'ensaios', title: 'Verde neon', alt: 'Mulher posando diante de parede verde com letreiro de neon' },
    { photo: 'evento-show', category: 'eventos', title: 'Palco aceso', alt: 'Silhuetas do público diante de um palco com luzes e confete' },
    { photo: 'retrato-luz-azul', category: 'retratos', title: 'Luz azul', alt: 'Retrato de mulher com luz azulada e expressão serena' },
    { photo: 'casamento-maos-sombra', category: 'casamentos', title: 'Mãos dadas', alt: 'Mãos de um casal entrelaçadas, sombras longas sobre a grama' },
    { photo: 'comercial-relogios', category: 'comercial', title: 'Still de relógios', alt: 'Dois relógios brancos fotografados de cima sobre fundo claro' },
    { photo: 'ensaio-persiana', category: 'ensaios', title: 'Persiana', alt: 'Mulher loira com suéter azul diante de uma persiana metálica' },
    { photo: 'evento-palestra', category: 'eventos', title: 'Auditório', alt: 'Plateia assistindo a uma apresentação em um auditório escuro' },
    { photo: 'retrato-homem-cinza', category: 'retratos', title: 'Retrato corporativo', alt: 'Retrato de homem sorrindo levemente em fundo cinza' },
    { photo: 'casamento-buque', category: 'casamentos', title: 'Buquê', alt: 'Noiva segurando o buquê em luz quente de fim de tarde' },
    { photo: 'ensaio-por-do-sol', category: 'ensaios', title: 'Fim de tarde', alt: 'Mulher de camisa listrada em luz de pôr do sol' },
    { photo: 'comercial-fone', category: 'comercial', title: 'Produto em cor', alt: 'Fone de ouvido preto sobre fundo amarelo' },
    { photo: 'evento-amigos', category: 'eventos', title: 'Juntos', alt: 'Grupo de amigos abraçados de costas olhando a paisagem' },
    { photo: 'retrato-fundo-rosa', category: 'retratos', title: 'Fundo rosa', alt: 'Retrato frontal de mulher com coque diante de fundo rosa' },
    { photo: 'casamento-palmeira', category: 'casamentos', title: 'Caminhada', alt: 'Noivos caminhando sob uma palmeira, sorrindo' },
    { photo: 'ensaio-jaqueta', category: 'ensaios', title: 'Jaqueta jeans', alt: 'Mulher de capuz e jaqueta jeans diante de uma porta azul' },
    { photo: 'evento-mesa', category: 'eventos', title: 'Mesa posta', alt: 'Mesa longa de recepção decorada com flores e louças' },
    { photo: 'comercial-aliancas-flor', category: 'comercial', title: 'Alianças', alt: 'Par de alianças apoiado sobre flores claras' },
    { photo: 'retrato-lago', category: 'retratos', title: 'Lago', alt: 'Retrato de mulher ruiva diante de um lago e montanhas' },
  ],

  projects: [
    {
      title: 'Mar de inverno',
      category: 'Casamento',
      year: '[ano]',
      cover: 'casamento-praia-veu',
      description: '[Projeto de exemplo] Um casamento pequeno à beira-mar, contado do preparo ao último abraço.',
      gallery: ['casamento-praia-veu', 'casamento-maos-sombra', 'casamento-buque', 'casamento-aliancas', 'casamento-altar', 'casamento-palmeira'],
    },
    {
      title: 'Rostos em luz baixa',
      category: 'Retratos',
      year: '[ano]',
      cover: 'retrato-homem-sombra',
      description: '[Projeto de exemplo] Uma série de retratos em estúdio com uma única fonte de luz.',
      gallery: ['retrato-homem-sombra', 'hero-retrato-estudio', 'retrato-homem-cinza', 'retrato-luz-azul', 'retrato-fundo-rosa'],
    },
    {
      title: 'Noite de abertura',
      category: 'Evento',
      year: '[ano]',
      cover: 'evento-confete',
      description: '[Projeto de exemplo] Cobertura de uma noite de show, do palco à plateia.',
      gallery: ['evento-confete', 'evento-show', 'evento-palestra', 'evento-amigos', 'evento-mesa'],
    },
  ],

  about: {
    // Coloque aqui o slug da foto do fotógrafo quando existir (ex.: 'retrato-fotografo').
    photo: null,
    heading: ['ver', 'antes de', 'fotografar'],
    intro:
      '[Apresentação pessoal] Escreva aqui, em primeira pessoa, quem você é e por que fotografa. Duas ou três frases bastam.',
    story:
      '[Trajetória] Conte como começou, onde se formou ou aprendeu e o que fotografa hoje. Use só fatos reais: anos, cidades, trabalhos marcantes.',
    style:
      '[Estilo] Descreva o seu olhar: luz natural ou de estúdio, cor ou preto e branco, direção mais espontânea ou mais posada.',
    philosophy:
      '[Filosofia de trabalho] O que você promete a quem te contrata: escuta, pontualidade, cuidado na edição, prazos claros.',
    differentials: [
      '[Diferencial 1, por exemplo: atendimento do primeiro contato à entrega pela mesma pessoa]',
      '[Diferencial 2, por exemplo: galeria online privada para escolher e baixar as fotos]',
      '[Diferencial 3, por exemplo: prévia de fotos em até X dias]',
    ],
  },

  services: [
    {
      id: 'retratos',
      name: 'Retratos',
      photo: 'retrato-homem-cinza',
      alt: 'Retrato de homem em fundo cinza',
      description: 'Retratos pessoais e profissionais para quem precisa de uma imagem que pareça você.',
      includes: ['Conversa de preparação', '[Sessão em estúdio ou locação]', 'Fotos editadas em alta resolução'],
      note: 'Duração e número de fotos definidos no orçamento.',
    },
    {
      id: 'casamentos',
      name: 'Casamentos',
      photo: 'casamento-altar',
      alt: 'Corredor de cerimônia ao ar livre com flores',
      description: 'Do preparo à festa, a cobertura do dia inteiro ou só dos momentos que importam para vocês.',
      includes: ['Reunião de planejamento', 'Cobertura do evento', '[Galeria online privada]'],
      note: 'Pré-wedding e álbum impresso podem ser incluídos.',
    },
    {
      id: 'eventos',
      name: 'Eventos',
      photo: 'evento-confete',
      alt: 'Plateia sob chuva de confete em um show',
      description: 'Aniversários, formaturas, shows e eventos corporativos fotografados com discrição.',
      includes: ['Alinhamento do roteiro', 'Cobertura no local', 'Seleção editada'],
      note: 'Entrega expressa para redes sociais sob consulta.',
    },
    {
      id: 'ensaios',
      name: 'Ensaios',
      photo: 'ensaio-rosa',
      alt: 'Mulher de jaqueta jeans diante de fundo rosa',
      description: 'Ensaios pessoais, de casal, gestante ou família, em estúdio ou em um lugar que tenha a ver com vocês.',
      includes: ['Escolha de locação e figurino', 'Direção durante a sessão', 'Fotos editadas'],
      note: 'Pode incluir mais de uma locação.',
    },
    {
      id: 'comercial',
      name: 'Comercial',
      photo: 'comercial-relogios',
      alt: 'Relógios brancos fotografados de cima',
      description: 'Produto, gastronomia e imagem de marca para pequenos negócios que vendem pela imagem.',
      includes: ['Briefing com a sua marca', 'Produção e still', 'Arquivos para site e redes'],
      note: 'Licença de uso definida no orçamento.',
    },
  ],

  process: [
    { title: 'Primeiro contato', text: 'Você chama pelo WhatsApp ou pelo formulário e conta o que tem em mente.' },
    { title: 'Entendimento', text: 'Uma conversa curta para entender o objetivo, o estilo e o que não pode faltar.' },
    { title: 'Planejamento', text: 'Data, local, horário, luz e roteiro definidos antes do dia, junto com o orçamento.' },
    { title: 'Realização', text: 'No dia, direção leve e atenção aos detalhes, sem pressa e sem roteiro engessado.' },
    { title: 'Edição', text: 'Seleção das melhores imagens e tratamento cuidadoso de cor, luz e pele.' },
    { title: 'Entrega', text: '[Como as fotos são entregues: galeria online, link para download, álbum…] no prazo combinado.' },
  ],

  // Depoimentos de DEMONSTRAÇÃO. Substitua por depoimentos reais e autorizados.
  testimonials: [
    { demo: true, quote: '[Depoimento real do cliente, com as palavras dele. Duas ou três frases sobre a experiência e o resultado.]', name: '[Nome do cliente]', service: 'Casamento' },
    { demo: true, quote: '[Outro depoimento real. Prefira comentários específicos: o que a pessoa sentiu, o que mais gostou.]', name: '[Nome do cliente]', service: 'Retratos' },
    { demo: true, quote: '[Depoimento de um cliente de evento ou trabalho comercial.]', name: '[Nome da empresa ou cliente]', service: 'Comercial' },
  ],

  cta: {
    photo: 'casamento-maos-sombra',
    alt: 'Mãos de um casal entrelaçadas sobre a grama ao fim da tarde',
    words: ['toda foto', 'começa numa', 'conversa'],
    text: 'Conte a data, o lugar e o que você imagina. O orçamento é feito sob medida para o seu projeto.',
  },
}

/** Proporções reais de cada foto (largura / altura), usadas para reservar espaço. */
export const photos = {
  'hero-retrato-estudio': { w: 2000, h: 3000, color: '#3b312f' },
  'retrato-homem-cinza': { w: 2000, h: 3000, color: '#69686e' },
  'retrato-homem-sombra': { w: 2000, h: 3000, color: '#342822' },
  'retrato-luz-azul': { w: 2000, h: 2500, color: '#6c6fa2' },
  'retrato-lago': { w: 2000, h: 1334, color: '#858689' },
  'retrato-fundo-rosa': { w: 2000, h: 2500, color: '#957465' },
  'casamento-praia-veu': { w: 2000, h: 3000, color: '#a2a6a5' },
  'casamento-maos-sombra': { w: 2000, h: 1334, color: '#5d614d' },
  'casamento-buque': { w: 2000, h: 1334, color: '#564840' },
  'casamento-palmeira': { w: 2000, h: 3000, color: '#393834' },
  'casamento-aliancas': { w: 2000, h: 1334, color: '#b69c91' },
  'casamento-altar': { w: 2000, h: 1334, color: '#9b9272' },
  'evento-show': { w: 2000, h: 1334, color: '#2a2a24' },
  'evento-palestra': { w: 2000, h: 1334, color: '#181922' },
  'evento-amigos': { w: 2000, h: 1125, color: '#b9ab9e' },
  'evento-mesa': { w: 2000, h: 1334, color: '#ada59a' },
  'evento-confete': { w: 2000, h: 1334, color: '#2a3d59' },
  'ensaio-neon': { w: 2000, h: 2994, color: '#129281' },
  'ensaio-jaqueta': { w: 2000, h: 3000, color: '#6f6c76' },
  'ensaio-persiana': { w: 2000, h: 2997, color: '#625061' },
  'ensaio-por-do-sol': { w: 2000, h: 2997, color: '#5b5249' },
  'ensaio-rosa': { w: 2000, h: 3000, color: '#9f8b86' },
  'comercial-relogios': { w: 2000, h: 1453, color: '#d2d0d3' },
  'comercial-fone': { w: 2000, h: 1334, color: '#d8b53f' },
  'comercial-aliancas-flor': { w: 2000, h: 1334, color: '#b8b3b8' },
}

export const PHOTO_WIDTHS = [640, 1280, 2000]
