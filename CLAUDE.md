# CLAUDE.md — Becca Tatini · Hub profissional

> Brief técnico para o Claude Code. Coloque este arquivo na raiz do repositório.
> **Versão:** 28/10/2026 · **Estado:** estrutura aprovada como direção; itens marcados ⏳ ainda dependem de decisão.

---

## 0. Antes de qualquer coisa

Este site é o hub profissional de **Becca Tatini**, Product Designer. É um **produto digital com app shell** (sidebar + páginas internas), não uma landing page.

A referência de estrutura e mecânica é o portfólio de Carmen Rincon (carmen-elena.space). **Não é um clone.**

- ❌ Não acessar, copiar ou adaptar código, textos, imagens, ilustrações, composição visual ou marca daquele site.
- ✅ Usar apenas os **padrões de interação** descritos neste arquivo (sidebar, home viva, prévia de case em painel etc.), que são padrões genéricos de produto.
- Toda identidade visual vem dos tokens da seção 4. Todo conteúdo vem da Becca.

### Regras de conteúdo (inegociáveis)

1. **Nunca inventar** texto, métricas, datas, clientes, cargos, depoimentos, links ou imagens.
2. Onde faltar conteúdo, usar um placeholder **visível e feio de propósito**: `[PENDENTE: descrição do que falta]`. Nunca lorem ipsum, nunca texto "plausível".
3. Nenhuma imagem de banco ou gerada por IA no lugar de telas ou retratos reais. Sem imagem real → bloco neutro com legenda `[PENDENTE: imagem]`.
4. Todo resultado de case carrega uma etiqueta de evidência: **Verificado · Qualitativo · Hipótese · Não disponível**.
5. Projetos bancários e enterprise podem estar sob NDA. Nomes de clientes só aparecem se o arquivo de conteúdo tiver `disclosure: approved`.

---

## 1. Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Páginas estáticas rápidas, rotas por arquivo, bom SEO |
| Conteúdo | **MDX em `/content`** (cases, artigos, palestras) + **JSON** para módulos vivos | A Becca edita texto sem tocar em componentes |
| Estilo | **CSS custom properties** como fonte de verdade + Tailwind mapeado nesses tokens | Tokens únicos; Tailwind só como atalho |
| Fontes | **Playfair Display** (Google Fonts, `next/font`) + **General Sans** (Fontshare, self-hosted, licença gratuita) | Sistema tipográfico definido no DS |
| Movimento | CSS transitions + View Transitions API onde suportado | Sem biblioteca pesada de animação |
| Artigos | Feed RSS do Substack (`rebeccatatini.substack.com/feed`) lido em build | Escrita aparece no site com link canônico ao original |
| Deploy | Vercel | ⏳ confirmar se o site sai do Framer |

**Proibido no Tailwind:** valores arbitrários (`p-[13px]`, `rounded-[10px]`, `text-[#abc]`). Se um valor não existe nos tokens, pare e pergunte.

---

## 2. Estrutura de pastas

```
/app
  layout.tsx            → app shell (sidebar, topbar, skip link)
  page.tsx              → Visão geral (home)
  trabalho/page.tsx     → catálogo de cases
  trabalho/[slug]/page.tsx
  trajetoria/page.tsx
  escrita/page.tsx
  palestras/page.tsx
  aprender/page.tsx     → mentoria e guia
  colabore/page.tsx     → serviços e contato
/components
  /shell                → Sidebar, Topbar, MobileNav, SkipLink
  /primitives           → Button, Chip, Tag, EvidenceTag, Link, Icon
  /modules              → NowModule, FieldNotes, FeaturedWork, StudyRadar, LatestWriting
  /case                 → CaseSummary, CaseToc, CasePreviewDrawer, CaseNav
/content
  /cases/*.mdx
  /talks/*.mdx
  now.json              → módulo "Agora"
  field-notes.json      → módulo "Caderno de campo"
  study.json            → módulo "Em estudo"
/styles
  tokens.css            → única fonte de verdade de design
```

---

## 3. Mecânicas a construir

Cada mecânica tem um **porquê**. Se não cumprir o porquê, não entra.

### 3.1 App shell
- **Direção aprovada (29/10/2026): Proposta A "Acervo"**, com a sidebar da proposta C.
- **Desktop (≥1024px):** sidebar fixa à esquerda, **em verde `--surface-inverse`** (texto `--text-on-inverse`, rótulos de grupo e foco em `--text-accent-on-inverse`), agrupada em seções (Becca · Ideias · Aprender · Colaborar). Recolhível para trilho de ícones; o estado fica salvo em `localStorage` (com `try/catch`).
- Grupo **Becca**: Início · Trabalho · Trajetória · **Sobre mim**, com 3 subitens: *Em que acredito* · *Fora do trabalho* · *Como é trabalhar comigo* (inclui feedbacks de colegas, só com autorização de cada pessoa).
- **Tablet (768–1023px):** trilho de ícones com rótulo em tooltip e no `aria-label`.
- **Mobile (<768px):** topbar com nome + botão de menu que abre a navegação em painel. ⏳ alternativa: bottom nav com no máximo 5 itens.
- Topbar com breadcrumb e **um único CTA de contato** (nome a definir: ⏳ "Fale comigo" ou outro). O mesmo nome em todo o site.
- Skip link "Ir para o conteúdo" como primeiro elemento focável.
- Item ativo da navegação marcado com `aria-current="page"` e com indicação que não depende só de cor.
- **Porquê:** o site se comporta como produto, com navegação estável entre áreas.

### 3.2 Home "Visão geral"
- **Desktop 1440×900 e 1280×800: cabe em uma viewport, sem scroll.** Abaixo disso, scroll normal.
- **3 módulos (aprovado):** nada de card dentro de card.
  1. **Apresentação:** título "Olá! Sou Becca, Product Designer.", UMA frase de apresentação, retrato real em arco e um único botão **"Como é trabalhar comigo"** (leva a Sobre mim).
  2. **Agora:** projeto atual, comunidades e botão **"Ver trajetória"** (leva ao currículo e às empresas). Mostra "Atualizado em [data]".
  3. **Trabalho em destaque:** painel verde que ocupa o resto da viewport, com 3 cases e muito respiro. **Sem botão "Explorar o case"**: o card inteiro é o link, com microinteração no hover e no foco (zoom leve na imagem, card sobe 3px, seta circular no canto, título sublinhado). Respeitar `prefers-reduced-motion`.
- **Caderno de campo e Escrita recente NÃO ficam na home.** Vivem em `/escrita` e `/trajetoria`.
- Imagens dos cases: usar placeholders marcados `[PENDENTE: tela real]` até a Becca enviar as telas reais.
- **Porquê:** a home é uma visão geral, não um resumo de tudo.

### 3.3 Módulo "Agora"
- Lê `content/now.json`. Mostra "Atualizado em [data]" visível.
- Se a data tiver mais de 60 dias, o módulo mostra a data em destaque em vez de esconder. Nada de "tempo real" se não for.
- **Porquê:** transmitir que existe uma pessoa ativa ali, com honestidade.

### 3.4 Módulo "Caderno de campo" (fora da home)
- Vive em `/escrita` ou `/trajetoria`, não na Visão geral.
- Lê `content/field-notes.json`: o que a Becca está estudando, construindo e escrevendo agora. 2 a 4 itens, cada um com uma linha.
- **Porquê:** mostrar o site como produto em evolução. É a versão autoral de um "status de build".

### 3.5 Catálogo de cases + prévia em painel
- `/trabalho`: lista de cases com filtros por **tipo de desafio · papel · indústria**. Filtros sincronizados com a URL (`?industria=financeiro`).
- Clique na linha abre **painel lateral (drawer)** com o resumo executivo do case. O drawer:
  - é um `dialog` com foco preso, fecha com `Esc` e devolve o foco ao item de origem;
  - tem URL própria (`/trabalho?case=slug`) para ser compartilhável;
  - tem o CTA "Ler o case completo".
- Mobile: o drawer vira tela cheia.
- **Porquê:** o recrutador com pressa entende o case em 30s sem perder a lista.

### 3.6 Página de case
- Topo: **painel de resumo** (desafio · papel · 3 decisões-chave · impacto com `EvidenceTag`). É o mesmo componente usado no drawer.
- Corpo em MDX, coluna de leitura com 60–75 caracteres por linha.
- **Índice fixo lateral** (desktop) com destaque da seção atual; vira menu recolhível no mobile.
- Rodapé: case anterior / próximo.
- Frontmatter obrigatório:

```yaml
title: ""
question: ""          # título em forma de pergunta
client: ""            # só exibido se disclosure = approved
disclosure: pending   # pending | approved | anonymized
role: ""
team: ""
period: ""
industry: ""
challengeType: ""
summary:
  challenge: ""
  decisions: ["", "", ""]
  impact:
    - text: ""
      evidence: verified   # verified | qualitative | hypothesis | unavailable
```

### 3.7 Módulo "Em estudo"
- Lê `content/study.json`. Cada item: tema + **uma frase de opinião** da Becca.
- Vive na página Trajetória ou Escrita, não necessariamente na home.
- **Porquê:** mostrar como ela pensa, não só o que faz.

### 3.8 ⏳ Toggle Pessoas / Empresas
**Não implementar até a decisão estar fechada.** Quando decidido, ele muda ordem de módulos, linguagem dos CTAs e destaques. Nunca esconde conteúdo nem cria dois sites.

### 3.9 Fase posterior (não agora)
Busca com atalho de teclado (⌘K), saudação por horário, versão em inglês.

---

## 4. Design tokens

> ⏳ **Proposta pendente de aprovação.** O `DESIGN.md` atual tem duas paletas diferentes (frontmatter vs. texto). Esta proposta parte da paleta visual (`#C57123`, `#E76BC6`, `#153C27`, `#F2F0EC`) e separa **cor de marca** de **cor para texto e ação**, porque as cores de marca não passam no contraste AA como texto.

### Contraste medido (WCAG 2.2, sobre `#F2F0EC`)

| Cor | Sobre o fundo | Texto branco sobre ela | Uso permitido |
|---|---|---|---|
| `#C57123` laranja marca | 3,2 ❌ | 3,65 ❌ | Superfícies grandes, ilustração, ícones ≥24px. **Nunca texto pequeno nem botão com texto** |
| `#9A5518` laranja ação | 5,0 ✅ | 5,7 ✅ | Botão primário, links, texto de destaque |
| `#8E4A00` laranja ação hover | 5,9 ✅ | 6,7 ✅ | Hover/active do primário |
| `#E76BC6` rosa marca | 2,5 ❌ | 2,9 ❌ | Só decorativo |
| `#A02E87` rosa texto | 5,7 ✅ | 6,5 ✅ | Texto/ícone rosa, tags |
| `#153C27` verde floresta | 10,8 ✅ | 12,3 ✅ | Superfície escura de destaque, texto |
| `#1E1F1C` tinta | 14,6 ✅ | — | Texto principal |
| `#57534E` tinta secundária | 6,7 ✅ | — | Texto secundário |
| `#587A40` sucesso | 4,3 ❌ | 4,9 ✅ | Escurecer até ≥4,5 antes de usar em texto |
| `#B83A38` erro | 5,0 ✅ | 5,7 ✅ | Erro |

Sobre o verde `#153C27`: texto `#F2F0EC` (10,8 ✅); acento `#F0B47A` (6,7 ✅). **`#C57123` sobre o verde dá 3,4 ❌.**

Warning `#D9822B` e info `#3B7A8C`: validar antes de usar.

### `styles/tokens.css` (esqueleto)

```css
:root {
  /* Marca (decorativo) */
  --brand-orange: #C57123;
  --brand-pink: #E76BC6;
  --brand-forest: #153C27;

  /* Superfícies */
  --surface-canvas: #F2F0EC;
  --surface-raised: #FBF9F5;
  --surface-muted: #F1EDE7;
  --surface-inverse: #153C27;
  --border-subtle: #E3DDD6;

  /* Texto */
  --text-primary: #1E1F1C;
  --text-secondary: #57534E;
  --text-on-inverse: #F2F0EC;
  --text-accent: #9A5518;
  --text-accent-on-inverse: #F0B47A;
  --text-accent-pink: #A02E87; /* "rosa texto" da tabela acima: texto/ícone rosa, tags */

  /* Ação */
  --action-primary: #9A5518;
  --action-primary-hover: #8E4A00;
  --action-on-primary: #FFFFFF;
  --focus-ring: #153C27;

  /* Espaço (8pt, sub-grid 4) */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;

  /* Raio */
  --radius-xs: 4px; --radius-sm: 8px; --radius-md: 12px;
  --radius-lg: 16px; --radius-full: 9999px;

  /* Tipografia */
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "General Sans", system-ui, sans-serif;

  /* Escala tipográfica (rem respeita o zoom de fonte do navegador; line-heights múltiplos de 4px) */
  --text-display-lg: 3rem;     --leading-display-lg: 3.5rem;   /* 48/56 Playfair */
  --text-display-md: 2.5rem;   --leading-display-md: 3rem;     /* 40/48 Playfair */
  --text-h1: 2rem;             --leading-h1: 2.5rem;           /* 32/40 Playfair */
  --text-h2: 1.5rem;           --leading-h2: 2rem;             /* 24/32 Playfair */
  --text-h3: 1.25rem;          --leading-h3: 1.75rem;          /* 20/28 General Sans */
  --text-body-lg: 1.125rem;    --leading-body-lg: 1.75rem;     /* 18/28 leitura de case */
  --text-body-md: 1rem;        --leading-body-md: 1.5rem;      /* 16/24 padrão */
  --text-body-sm: 0.875rem;    --leading-body-sm: 1.25rem;     /* 14/20 */
  --text-label: 0.875rem;      --leading-label: 1.25rem;       /* 14/20 botões, nav */
  --text-caption: 0.75rem;     --leading-caption: 1rem;        /* 12/16 só info não essencial */
  --tracking-overline: 0.08em;                                  /* overline: 12px, 600, maiúsculas */

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;

  --measure: 68ch;             /* largura máxima de texto corrido */

  /* Borda */
  --border-width: 1px;         /* padrão: inputs, outlined, divisórias */
  --border-width-strong: 2px;  /* selecionado, ativo */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;

  /* Movimento */
  --motion-fast: 120ms;
  --motion-base: 200ms;
  --motion-slow: 320ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}

/* Mobile: só os displays e o h1 encolhem */
@media (max-width: 767px) {
  :root {
    --text-display-lg: 2.25rem; --leading-display-lg: 2.75rem;  /* 36/44 */
    --text-display-md: 2rem;    --leading-display-md: 2.5rem;   /* 32/40 */
    --text-h1: 1.75rem;         --leading-h1: 2.25rem;          /* 28/36 */
  }
}

@media (prefers-reduced-motion: reduce) {
  :root { --motion-fast: 0ms; --motion-base: 0ms; --motion-slow: 0ms; }
}
```

### Regras tipográficas
- **Playfair Display** (500 ou 600; itálico só em citações): display, h1, h2.
- **General Sans** (400, 500, 600): h3 para baixo, UI e todo texto corrido.
- Texto corrido nunca abaixo de `--text-body-md`. Páginas de case usam `--text-body-lg`.
- `--text-caption` só para metadados não essenciais (datas, créditos de imagem).
- Labels e botões: `--text-label` + `--weight-medium`.

### Regras de uso
- **Playfair Display:** títulos de página, títulos de case, citações. Nunca em botões, navegação, labels ou texto corrido.
- **General Sans:** todo o resto.
- **Raio:** um raio por nível de componente. Containers `--radius-lg`, controles `--radius-sm`, chips `--radius-full`. Sem exceções.
- **Sombras:** no máximo uma, sutil, só em elementos sobrepostos (drawer, menu). Cards ficam sem sombra.
- **Rosa:** no máximo um ponto de rosa por tela.
- **Ícones:** um único conjunto, traço consistente. Nada de sparkles, estrelas ou emojis decorativos.

---

## 5. Acessibilidade (critério de aceite de toda etapa)

- WCAG 2.2 AA: contraste conforme a tabela acima.
- Tudo operável por teclado, com foco visível (anel de 2px em `--focus-ring`, offset 2px).
- Alvos de toque ≥ 24×24px (ideal 44×44 no mobile).
- Hierarquia de headings sem saltos; um `h1` por página.
- `prefers-reduced-motion` respeitado.
- Nada comunicado só por cor (etiquetas de evidência têm texto).
- Rodar axe/Lighthouse ao fim de cada fase e corrigir antes de seguir.

---

## 6. Fases (uma por vez, revisar antes da próxima)

| Fase | Entrega | Aceite |
|---|---|---|
| 1 | `tokens.css`, fontes, primitivos (Button, Chip, Tag, EvidenceTag, Link) com todos os estados | Página `/dev/primitives` com cada estado; contraste conferido |
| 2 | App shell: sidebar, trilho, menu mobile, topbar, skip link | Navegação completa por teclado em 3 breakpoints |
| 3 | Template de case + **1 case real** (conteúdo vindo da Becca) | Leitura em 30s (resumo) e completa; índice funcionando |
| 4 | Catálogo com filtros + drawer de prévia | Drawer acessível, URL compartilhável, mobile em tela cheia |
| 5 | Home Visão geral com módulos JSON | Cabe em 1440×900 e 1280×800 sem scroll |
| 6 | Trajetória, Escrita (RSS), Palestras, Aprender, Colabore | Sem placeholders inventados; pendências listadas |
| 7 | QA: acessibilidade, performance, SEO, metadados | Lighthouse ≥ 90 em todas as categorias |

**Ao terminar cada fase:** listar o que foi feito, o que ficou `[PENDENTE]` e o que precisa de decisão da Becca. Não avançar sozinho para a próxima fase.

---

## 7. Decisões pendentes ⏳

1. Site sai do Framer de vez?
2. Paleta da seção 4 aprovada?
3. Nome único do CTA de contato.
4. Navegação mobile: painel ou bottom nav.
5. Toggle Pessoas/Empresas: entra ou não, e como funciona.
6. Quais cases e clientes podem ser nomeados (NDA).
