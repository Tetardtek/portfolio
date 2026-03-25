# Portfolio — Kevin Turnaco

Full-stack developer portfolio with admin back-office, bilingual support (FR/EN), and SuperOAuth PKCE authentication.

**Live:** [portfolio.tetardtek.com](https://portfolio.tetardtek.com)

## Stack

| Layer | Technologies |
|-------|-------------|
| Framework | Next.js 16 (App Router + Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS v4, Framer Motion |
| Database | MySQL (mysql2) |
| Auth | SuperOAuth PKCE — OAuth 2.0 with code challenge (S256) |
| Admin | @dnd-kit drag & drop, owner-only access |
| Mail | Nodemailer (SMTP) |
| Deploy | Docker, Apache reverse proxy, GitHub Actions CI/CD |

## Features

### Public

- **Hero** with social links and gradient animations
- **Brain section** — dedicated showcase for [The Brain](https://github.com/tetardtek-cortex/brain-template) project
- **Projects** — ecosystem projects (featured bento grid) + training projects (collapsible)
- **Stack** — technologies grouped by category with project counts
- **Infrastructure** — self-hosted VPS services overview
- **Contact** — rate-limited form (5 req / 15 min per IP)
- Dark/light theme toggle, FR/EN language toggle
- Scroll progress bar, back to top, responsive mobile menu

### Admin (`/admin`)

- OAuth login via SuperOAuth (Discord, GitHub, Google, Twitch)
- Owner-only access — `OWNER_USER_ID` check on callback
- CRUD for projects, stack, and infrastructure
- Drag & drop reordering
- Bilingual description editor (FR/EN tabs)

## Architecture

```
src/
├── app/
│   ├── page.tsx                         # Home (server component, async)
│   ├── brain/page.tsx                   # Brain dedicated page
│   ├── admin/
│   │   ├── page.tsx                     # OAuth login (4 providers)
│   │   └── dashboard/page.tsx           # Admin back-office
│   └── api/
│       ├── admin/{projects,stack,infra} # CRUD (guarded)
│       ├── auth/pkce/{start,callback}   # PKCE flow
│       ├── contact/                     # Contact form
│       └── health/                      # Health check
├── components/
│   ├── sections/   # Hero, Brain, Projects, Stack, Infrastructure, Contact, Navbar, Footer
│   ├── admin/      # ProjectsTab, StackTab, InfraTab, SortableItems
│   └── ui/         # BackToTop, LangToggle, TechBadge, ProjectCard, ThemeToggle
├── lib/
│   ├── auth.ts     # PKCE helpers, session, owner check
│   ├── data.ts     # MySQL queries (projects, stack, infra)
│   ├── db.ts       # mysql2 connection pool
│   ├── schemas.ts  # Zod validation
│   ├── mail.ts     # Nodemailer
│   └── rateLimit.ts
├── i18n/           # fr.json, en.json
├── types/          # Project, Technology, Infrastructure
├── data/           # Legacy JSON (migration reference)
└── middleware.ts   # Route protection
```

## Setup

**Requirements:** Node.js >= 20, MySQL 8+

```bash
git clone https://github.com/Tetardtek/portfolio.git
cd portfolio
npm install
cp .env.example .env.local
# Fill in .env.local with your values
```

### Environment variables

See [`.env.example`](.env.example) for the full list:

| Variable | Description |
|----------|-------------|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection |
| `SUPEROAUTH_URL` | SuperOAuth server URL |
| `SUPEROAUTH_CLIENT_ID` | Tenant client ID |
| `SUPEROAUTH_REDIRECT_URI` | PKCE callback URL |
| `OWNER_USER_ID` | SuperOAuth user ID allowed to access admin |
| `NODEMAILER_*`, `CONTACT_TO` | SMTP config for contact form |

### Database

```bash
mysql -u root -p < sql/schema.sql
mysql -u root -p portfolio_v2 < sql/seed.sql
```

### Development

```bash
npm run dev      # localhost:3000
npm run build    # Production build
npm run lint     # ESLint
npx jest         # Tests (37 cases)
```

## API

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| `GET` | `/api/auth/pkce/start?provider=discord` | — | Start PKCE flow |
| `GET` | `/api/auth/pkce/callback` | — | PKCE callback (internal) |
| `POST` | `/api/auth/logout` | — | Clear session cookie |
| `GET/PUT` | `/api/admin/projects` | Owner | Projects CRUD |
| `GET/PUT` | `/api/admin/stack` | Owner | Stack CRUD |
| `GET/PUT` | `/api/admin/infra` | Owner | Infrastructure CRUD |
| `POST` | `/api/contact` | — | Send contact email |
| `GET` | `/api/health` | — | `{ status: "ok" }` |

## Ecosystem

This portfolio is part of an interconnected ecosystem where **every project is a SuperOAuth tenant**:

- **[SuperOAuth](https://superoauth.tetardtek.com)** — Multi-tenant auth server (PKCE)
- **[TetaRdPG](https://tetardpg.tetardtek.com)** — Narrative RPG (NestJS, 18 modules)
- **[Clickerz](https://clickerz.tetardtek.com)** — Idle clicker with server authority
- **[Sakuin](https://sakuin.tetardtek.com)** — Gamified manga/anime tracker
- **[Origin's Digital](https://originsdigital.tetardtek.com)** — Video platform

## License

MIT License — see [LICENSE](LICENSE).
