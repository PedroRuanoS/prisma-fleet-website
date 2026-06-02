/* Bilingual content — PT-PT (default) + EN. Formal register ("você").
   Verbatim brand/tech terms kept identical across both languages.
   Exports window.CONTENT. */
window.CONTENT = {
  pt: {
    nav: { features: "Funcionalidades", how: "Como funciona", clients: "Clientes", pricing: "Preços", demo: "Pedir demo" },
    hero: {
      kicker: "Gestão de frotas TVDE",
      // spreadsheet gag (primary)
      h1pre: "Pare de gerir a sua frota numa ",
      h1strike: "folha de cálculo",
      h1post: ".",
      // alt headline treatments (tweakable)
      h1minutosA: "Liquidações em ",
      h1minutosEm: "minutos",
      h1minutosB: ". Não em horas.",
      h1chegaA: "Chega de ",
      h1chegaEm: "Excel",
      h1chegaB: ".",
      sub: "Liquidações em minutos. Não em horas. O software que substitui o Excel, elimina erros de cálculo e dá a cada motorista o seu próprio extrato.",
      subAlt: "O software de gestão de frotas TVDE feito para operadores em Portugal — do ficheiro Uber e Bolt ao pagamento SEPA, num só fluxo.",
      ctaPrimary: "Agendar demo",
      ctaGhost: "Ver funcionalidades",
      trust: ["Feito para operadores TVDE", "Renda fixa ou revenue share", "Uber · Bolt · Via Verde · Prio"]
    },
    proof: {
      labelPre: "Mais de ", labelStrong: "300 carros", labelPost: " em Portugal já são geridos com a Prisma Fleet",
      logos: ["Bewegung", "EVmob"]
    },
    problem: {
      kicker: "O problema",
      title: "Gerir uma frota TVDE não devia depender de Excel",
      lede: "Operadores perdem horas todas as semanas em tarefas que deviam ser automáticas. E os erros saem caros.",
      stats: [
        { num: "4h", unit: "+", label: "Perdidas em Excel por semana", desc: "Copiar dados, cruzar motoristas, calcular descontos e relançar transferências. Todas as semanas, a mesma rotina manual." },
        { num: "1", unit: "", label: "Fórmula partida = caos", desc: "Uma célula trocada e a semana inteira sai errada. Surpreende-se com a facilidade com que uma folha de cálculo se parte." },
        { num: "0", unit: "", label: "Visibilidade para o motorista", desc: "Sem portal, os motoristas ligam a perguntar quanto vão receber — e porquê. Sem transparência, sem confiança." }
      ],
      source: "Fonte do tempo semanal: a rotina de segunda-feira do operador (exportar, cruzar, calcular, pagar) — ~4h."
    },
    brk: {
      kicker: "O risco do Excel",
      h1pre: "Basta ", h1em: "uma célula", h1post: " para partir a semana.",
      sub: "Ia ficar surpreendido com a facilidade com que uma folha de cálculo se parte. Uma fórmula trocada e o pagamento sai errado — e a confiança do motorista vai atrás.",
      caption: "#REF!  ·  #DIV/0!  ·  =SOMA() partida",
      closer: "A Prisma Fleet resolve isto."
    },
    features: {
      kicker: "Funcionalidades",
      title: "Uma plataforma para operar a sua frota ponta a ponta",
      lede: "Do import ao pagamento, uma plataforma completa para operadores TVDE. Sem Excel, sem erros, sem stress.",
      main: [
        { ic: "settle", h: "Liquidações automáticas", p: "Importe os ganhos, aplique renda, combustível, Via Verde e deduções. O cálculo é instantâneo — renda fixa ou revenue share.", tag: "Liquidações em minutos" },
        { ic: "import", h: "Importação inteligente", p: "Arraste ficheiros CSV ou XLSX. O parser reconhece as colunas e mapeia tudo ao motorista certo, automaticamente.", tag: "Uber · Bolt · Via Verde · Prio" },
        { ic: "driver", h: "Portal do motorista", p: "Cada motorista vê os seus ganhos, deduções, valor final, tendência de 4 semanas e o acumulado do ano. Sem telefonemas.", tag: "Acesso em qualquer telemóvel" },
        { ic: "chart", h: "Dashboard com KPIs", p: "Fleet Health Score, receita, ocupação e ROI por viatura e por motorista. Tudo num só lugar, em tempo real.", tag: "ROI real por viatura" }
      ],
      mini: [
        { b: "Pagamentos SEPA", s: "Um ficheiro ISO 20022 para toda a frota — incluído em todos os planos." },
        { b: "Exportação PDF", s: "Extratos profissionais para motoristas, contabilista ou os seus registos." },
        { b: "Multi-empresa", s: "Gira até 5 entidades legais (NIF) com um só login e troca rápida." },
        { b: "CRM de motoristas", s: "Funil de recrutamento e pipeline para acompanhar potenciais motoristas." },
        { b: "Manutenção", s: "Revisões, seguros e inspeções com avisos antes de expirarem." },
        { b: "Monitor CIVA Art. 53", s: "Acompanhe os ganhos face ao limite de isenção de IVA de €15.500." }
      ]
    },
    how: {
      kicker: "Como funciona",
      title: "De ficheiro a pagamento num fluxo de 4 passos",
      lede: "Um fluxo simples que substitui horas de trabalho manual. Todas as semanas, sem falhas.",
      steps: [
        { h: "Importe", p: "Arraste os ficheiros do Uber, Bolt, Via Verde e Prio para a plataforma." },
        { h: "Calcule", p: "O sistema gera as liquidações automaticamente, com todos os descontos aplicados." },
        { h: "Aprove", p: "Reveja os valores, ajuste o que for preciso e aprove cada liquidação." },
        { h: "Pague", p: "Gere o ficheiro SEPA, envie para o banco e marque como pago." }
      ]
    },
    pricing: {
      kicker: "Preços",
      title: "Escolha o plano certo para a fase da sua frota",
      ledePre: "Todos os planos incluem ", ledeStrong: "trial gratuito de 14 dias", ledePost: " e SEPA sem custo extra.",
      cta: "Começar trial",
      plans: [
        { name: "Starter", desc: "Para operadores com frotas até 30 veículos que querem sair do Excel.", price: "Preços em breve", listHead: "Inclui:", list: ["Até 30 veículos", "Liquidações automáticas", "Importação Uber e Bolt", "Portal do motorista", "Pagamentos SEPA", "Suporte por email"] },
        { name: "Pro", desc: "Para operadores em crescimento que precisam de controlo total.", price: "Preços em breve", feature: true, listHead: "Tudo do Starter, mais:", list: ["Até 150 veículos", "Dashboard analytics", "Via Verde e Prio", "Multi-empresa (até 5)", "CRM de motoristas", "Suporte prioritário"] },
        { name: "Enterprise", desc: "Para grandes operadores que precisam de infraestrutura dedicada.", price: "Preços em breve", listHead: "Tudo do Pro, mais:", list: ["Veículos ilimitados", "Instância dedicada", "Integração Bolt API", "Relatórios personalizados", "Onboarding dedicado", "SLA garantido"] }
      ]
    },
    integrations: {
      kicker: "Integrações",
      title: "Ligado às plataformas que já utiliza",
      lede: "Importação direta dos seus dados de receita, combustível e portagens.",
      roadmapLabel: "Roadmap"
    },
    faq: {
      kicker: "F.A.Q",
      title: "Perguntas e respostas",
      items: [
        { q: "O Prisma Fleet é para mim?", a: "Se é operador TVDE em Portugal e aluga carros a motoristas Uber ou Bolt, sim. O Prisma Fleet foi feito especificamente para si, quer tenha 5 ou 300 veículos." },
        { q: "Posso experimentar sem pagar?", a: "Sim. Todos os planos incluem 14 dias de trial gratuito, sem cartão de crédito. Importe os seus dados reais e teste tudo antes de decidir." },
        { q: "Como funciona a importação de dados?", a: "Exporte os ficheiros CSV do Uber e Bolt e os XLSX da Via Verde e Prio. Arraste para a plataforma e o parser mapeia tudo automaticamente aos motoristas certos." },
        { q: "Suportam renda fixa e revenue share?", a: "Sim. Cada atribuição motorista-veículo pode ter o seu próprio modelo de compensação. Pode misturar renda fixa e percentagem na mesma frota — e qualquer semana negativa transita como dívida, automaticamente." },
        { q: "Os meus motoristas podem ver as liquidações?", a: "Sim. Cada motorista recebe acesso ao portal onde vê os ganhos, deduções e valor final de cada semana. Funciona em qualquer telemóvel." },
        { q: "E se tiver várias empresas?", a: "O Prisma Fleet suporta multi-empresa. Gira até 5 entidades legais dentro da mesma conta, com troca rápida entre elas." },
        { q: "Os meus dados estão seguros?", a: "Cada operador tem a sua própria instância isolada com base de dados dedicada. A sua palavra-passe Uber nunca é guardada — o início de sessão decorre num navegador seguro na nuvem." },
        { q: "Posso cancelar a qualquer momento?", a: "Sim. Sem contratos de fidelização. Cancele quando quiser e mantém acesso até ao fim do período pago." }
      ]
    },
    cta: {
      kicker: "Começar agora",
      title: "Deixe o Excel para trás e feche cada semana com controlo",
      lede: "Experimente o Prisma Fleet durante 14 dias sem compromisso. Sem cartão de crédito, sem complicações.",
      primary: "Pedir demo", ghost: "Ver preços"
    },
    footer: {
      tagPre: "Pare de gerir a sua frota numa ", tagStrike: "folha de cálculo", tagPost: ".",
      cols: [
        { h: "Produto", links: ["Funcionalidades", "Como funciona", "Preços", "Integrações"] },
        { h: "Recursos", links: ["Pedir demo", "Portal do motorista", "Estado do serviço"] },
        { h: "Legal", links: ["Política de Privacidade", "Termos de Serviço"] }
      ],
      contact: "Contacto", email: "geral@prismasolutions.pt",
      rights: "© 2026 Prisma Fleet — Uma solução Prisma Solutions · prismafleet.pt"
    },
    dash: {
      title: "Dashboard", sub: "Visão geral da frota", chip: "Tempo real",
      score: "Fleet Health Score", scoreNote: "137 alugados · 77 disponíveis",
      bars: [["Utilização", 0.78], ["Liquidações", 0.62], ["Conformidade", 0.9]],
      kpis: [
        { l: "Motoristas ativos", v: "137", s: "de 748 total" },
        { l: "Carros alugados", v: "137", s: "77 disponíveis" },
        { l: "Receita semanal", v: "€34 575", s: "renda", blue: true },
        { l: "Por liquidar", v: "328", s: "pendentes" }
      ],
      floatA: "Liquidação aprovada", floatB: "SEPA · 137 motoristas"
    }
  },

  en: {
    nav: { features: "Features", how: "How it works", clients: "Clients", pricing: "Pricing", demo: "Book a demo" },
    hero: {
      kicker: "TVDE fleet management",
      h1pre: "Stop running your fleet on a ",
      h1strike: "spreadsheet",
      h1post: ".",
      h1minutosA: "Settlements in ",
      h1minutosEm: "minutes",
      h1minutosB: ". Not hours.",
      h1chegaA: "Done with ",
      h1chegaEm: "Excel",
      h1chegaB: ".",
      sub: "Settlements in minutes, not hours. The software that replaces Excel, kills calculation errors, and gives every driver their own statement.",
      subAlt: "TVDE fleet-management software built for operators in Portugal — from the Uber and Bolt file to a SEPA payment, in one flow.",
      ctaPrimary: "Book a demo",
      ctaGhost: "See features",
      trust: ["Built for TVDE operators", "Weekly rent or revenue share", "Uber · Bolt · Via Verde · Prio"]
    },
    proof: {
      labelPre: "Over ", labelStrong: "300 cars", labelPost: " in Portugal are already managed with Prisma Fleet",
      logos: ["Bewegung", "EVmob"]
    },
    problem: {
      kicker: "The problem",
      title: "Running a TVDE fleet shouldn't depend on Excel",
      lede: "Operators lose hours every week on tasks that should be automatic. And the mistakes are expensive.",
      stats: [
        { num: "4h", unit: "+", label: "Lost in Excel every week", desc: "Copy data, match drivers, calculate deductions, re-key transfers. Every week, the same manual routine." },
        { num: "1", unit: "", label: "Broken formula = chaos", desc: "One swapped cell and the whole week comes out wrong. You'd be surprised how easily a spreadsheet breaks." },
        { num: "0", unit: "", label: "Visibility for the driver", desc: "Without a portal, drivers call asking how much they'll get — and why. No transparency, no trust." }
      ],
      source: "Weekly-time basis: the operator's Monday routine (export, match, calculate, pay) — ~4h."
    },
    brk: {
      kicker: "The risk of Excel",
      h1pre: "One ", h1em: "cell", h1post: " can break your whole week.",
      sub: "You'd be surprised how easily a spreadsheet breaks. One swapped formula and the payment comes out wrong — and driver trust goes with it.",
      caption: "#REF!  ·  #DIV/0!  ·  broken =SUM()",
      closer: "Prisma Fleet fixes this."
    },
    features: {
      kicker: "Features",
      title: "One platform to run your fleet end to end",
      lede: "From import to payment, a complete platform for TVDE operators. No Excel, no errors, no stress.",
      main: [
        { ic: "settle", h: "Automatic settlements", p: "Import earnings, apply rent, fuel, Via Verde and deductions. The maths is instant — weekly rent or revenue share.", tag: "Settlements in minutes" },
        { ic: "import", h: "Smart import", p: "Drag in CSV or XLSX files. The parser recognises columns and maps everything to the right driver, automatically.", tag: "Uber · Bolt · Via Verde · Prio" },
        { ic: "driver", h: "Driver portal", p: "Each driver sees their earnings, deductions, net, 4-week trend and year-to-date. No phone calls.", tag: "Works on any phone" },
        { ic: "chart", h: "KPI dashboard", p: "Fleet Health Score, revenue, utilisation and ROI per car and per driver. All in one place, in real time.", tag: "Real ROI per car" }
      ],
      mini: [
        { b: "SEPA payments", s: "One ISO 20022 file for the whole fleet — included on every plan." },
        { b: "PDF export", s: "Professional statements for drivers, your accountant, or your records." },
        { b: "Multi-company", s: "Run up to 5 legal entities (NIF) with one login and a fast switcher." },
        { b: "Driver CRM", s: "Recruitment funnel and pipeline to track prospective drivers." },
        { b: "Maintenance", s: "Service, insurance and inspections with alerts before they lapse." },
        { b: "CIVA Art. 53 monitor", s: "Track earnings against the €15,500 IVA exemption threshold." }
      ]
    },
    how: {
      kicker: "How it works",
      title: "From file to payment in a 4-step flow",
      lede: "A simple flow that replaces hours of manual work. Every week, without fail.",
      steps: [
        { h: "Import", p: "Drag the Uber, Bolt, Via Verde and Prio files into the platform." },
        { h: "Calculate", p: "The system generates settlements automatically, with every deduction applied." },
        { h: "Approve", p: "Review the figures, adjust anything you need, and approve each settlement." },
        { h: "Pay", p: "Generate the SEPA file, send it to the bank, and mark as paid." }
      ]
    },
    pricing: {
      kicker: "Pricing",
      title: "Pick the right plan for your fleet's stage",
      ledePre: "Every plan includes a ", ledeStrong: "14-day free trial", ledePost: " and SEPA at no extra cost.",
      cta: "Start trial",
      plans: [
        { name: "Starter", desc: "For operators with up to 30 vehicles ready to leave Excel behind.", price: "Pricing soon", listHead: "Includes:", list: ["Up to 30 vehicles", "Automatic settlements", "Uber & Bolt import", "Driver portal", "SEPA payments", "Email support"] },
        { name: "Pro", desc: "For growing operators who need full control.", price: "Pricing soon", feature: true, listHead: "Everything in Starter, plus:", list: ["Up to 150 vehicles", "Analytics dashboard", "Via Verde & Prio", "Multi-company (up to 5)", "Driver CRM", "Priority support"] },
        { name: "Enterprise", desc: "For large operators who need dedicated infrastructure.", price: "Pricing soon", listHead: "Everything in Pro, plus:", list: ["Unlimited vehicles", "Dedicated instance", "Bolt API integration", "Custom reports", "Dedicated onboarding", "Guaranteed SLA"] }
      ]
    },
    integrations: {
      kicker: "Integrations",
      title: "Connected to the platforms you already use",
      lede: "Direct import of your revenue, fuel and toll data.",
      roadmapLabel: "Roadmap"
    },
    faq: {
      kicker: "F.A.Q",
      title: "Questions and answers",
      items: [
        { q: "Is Prisma Fleet for me?", a: "If you're a TVDE operator in Portugal renting cars to Uber or Bolt drivers, yes. Prisma Fleet was built specifically for you, whether you run 5 or 300 vehicles." },
        { q: "Can I try it without paying?", a: "Yes. Every plan includes a 14-day free trial, no credit card required. Import your real data and test everything before deciding." },
        { q: "How does data import work?", a: "Export the Uber and Bolt CSV files and the Via Verde and Prio XLSX files. Drag them in and the parser maps everything automatically to the right drivers." },
        { q: "Do you support weekly rent and revenue share?", a: "Yes. Each driver-vehicle assignment can have its own compensation model. You can mix fixed rent and percentage in the same fleet — and any negative week carries forward as debt, automatically." },
        { q: "Can my drivers see their settlements?", a: "Yes. Each driver gets portal access to view earnings, deductions and net for each week. It works on any phone." },
        { q: "What if I have several companies?", a: "Prisma Fleet supports multi-company. Run up to 5 legal entities within the same account, with fast switching between them." },
        { q: "Is my data secure?", a: "Each operator gets their own isolated instance with a dedicated database. Your Uber password is never stored — sign-in runs in a secure cloud browser." },
        { q: "Can I cancel anytime?", a: "Yes. No lock-in contracts. Cancel whenever you like and keep access until the end of the paid period." }
      ]
    },
    cta: {
      kicker: "Get started",
      title: "Leave Excel behind and close every week in control",
      lede: "Try Prisma Fleet for 14 days, no commitment. No credit card, no hassle.",
      primary: "Book a demo", ghost: "See pricing"
    },
    footer: {
      tagPre: "Stop running your fleet on a ", tagStrike: "spreadsheet", tagPost: ".",
      cols: [
        { h: "Product", links: ["Features", "How it works", "Pricing", "Integrations"] },
        { h: "Resources", links: ["Book a demo", "Driver portal", "Service status"] },
        { h: "Legal", links: ["Privacy Policy", "Terms of Service"] }
      ],
      contact: "Contact", email: "geral@prismasolutions.pt",
      rights: "© 2026 Prisma Fleet — A Prisma Solutions product · prismafleet.pt"
    },
    dash: {
      title: "Dashboard", sub: "Fleet overview", chip: "Live",
      score: "Fleet Health Score", scoreNote: "137 rented · 77 available",
      bars: [["Utilisation", 0.78], ["Settlements", 0.62], ["Compliance", 0.9]],
      kpis: [
        { l: "Active drivers", v: "137", s: "of 748 total" },
        { l: "Cars rented", v: "137", s: "77 available" },
        { l: "Weekly revenue", v: "€34,575", s: "rental", blue: true },
        { l: "Unsettled", v: "328", s: "pending" }
      ],
      floatA: "Settlement approved", floatB: "SEPA · 137 drivers"
    }
  }
};
