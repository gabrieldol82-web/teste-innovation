# Innovation Brindes - Teste Front-end

Mini-aplicacao com autenticacao e listagem de produtos, construida com Next.js 16 (App Router).

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Zustand** - Gerenciamento de estado global (auth + favoritos)
- **React Query** - Cache, revalidacao e estados de loading/erro
- **Tailwind CSS 4** - Estilizacao utility-first
- **MUI Icons** - Icones (favoritos, login, logout)
- **SweetAlert2** - Feedbacks visuais no login

## Como rodar o projeto

```bash
# 1. Clonar o repositorio
git clone https://github.com/SEU_USUARIO/teste-frontend-innovation.git
cd teste-frontend-innovation

# 2. Instalar dependencias
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000). A aplicacao redireciona automaticamente para `/login`.

**Credenciais de teste:** `dinamica` / `123`

## Estrutura do projeto

```
app/
  components/      # Componentes reutilizaveis (Card, Header, ProductModal)
  constants/       # Constantes (URL base da API)
  hooks/           # Custom hooks (useProducts com React Query)
  login/           # Pagina de login
  models/          # Interfaces TypeScript
  produtos/        # Pagina de listagem de produtos
  services/        # Camada de servicos (chamadas HTTP)
  utils/           # Funcoes utilitarias (formatCurrency)
store/             # Stores Zustand (auth, favoritos)
middleware.ts      # Protecao de rotas (server-side)
```

## Decisoes tecnicas

- **Cookie + localStorage para autenticacao:** O cookie (`token_de_acesso`) e lido pelo middleware no server-side para proteger rotas. O localStorage e usado pelo Zustand no client-side para fornecer o token nas chamadas de API. Essa duplicacao e necessaria porque o middleware nao tem acesso ao localStorage.

- **React Query para data fetching:** Substituiu o padrao `useState + useEffect` para buscar produtos. Fornece cache automatico, estados de loading/erro, e a query so dispara quando o token esta disponivel (`enabled: !!token`).

- **Zustand com persist:** Tanto o store de autenticacao quanto o de favoritos persistem no localStorage, mantendo o estado entre reloads.

- **Tratamento de 401:** O service de produtos detecta respostas 401 e o hook `useProducts` forca logout + redirect automatico para `/login`.

- **Formatacao centralizada:** Precos sao formatados via `formatCurrency()` em `utils/format.tsx`, evitando duplicacao entre Card e ProductModal.

## O que ficou pendente

- **Busca com debounce:** Busca por nome/codigo usando o endpoint POST com filtros e debounce de 300-500ms.
- **Dockerizacao:** Sem Dockerfile/docker-compose.
- **Testes:** Sem testes unitarios (Vitest/Jest) e E2E (Playwright).
- **SEO metadata:** Falta `<title>` e `<meta description>` nas paginas.
- **Focus trap na Modal:** A modal fecha com Esc e tem `aria-modal`, mas o foco nao fica preso dentro dela.
- **Selo "EXCLUSIVO!":** Elemento visual nos cards.
