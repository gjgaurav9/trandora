# CLAUDE.md — Auto-loaded by Claude Code

## Project Context
Read `TRANDORA.md` for full project context before doing anything. It contains:
- Business overview, trade deals, revenue model
- Complete tech stack and architecture decisions
- All 14 Mongoose models (already built in `apps/api/src/models/`)
- Sprint plan, API endpoints, code conventions
- CI/CD pipeline and deployment setup

## Quick Reference

### Tech Stack
- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Node.js + TypeScript + Fastify
- **Database:** MongoDB 7.0 + Mongoose ODM
- **Search:** Elasticsearch 8.x (MongoDB text search for MVP)
- **Cache:** Redis 7.x
- **AI:** Anthropic Claude API
- **Payments:** Razorpay (India) + Stripe (International)
- **Monorepo:** Turborepo + pnpm

### Commands
```bash
pnpm dev              # Start web + API
pnpm docker:up        # Start MongoDB, Redis, ES
pnpm db:seed          # Seed categories + FTA data
pnpm build            # Build all
pnpm lint             # Lint all
pnpm test             # Test all
```

### Code Conventions
- API modules: `controller → service → repository` pattern
- Validation: Zod schemas (not Mongoose validation alone)
- API prefix: `/api/v1/`
- Files: kebab-case. Types: `ISupplier`, `IProduct` (PascalCase with I prefix)
- Response format: `{ success: true, data: {...}, meta: {...} }`
- Git commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `ci:`

### Branch Strategy
- `main` → Production (auto-deploys)
- `develop` → Staging (auto-deploys)
- `feature/*` → PR to develop

### Colors
- Navy: #1a365d (trust)
- Saffron: #f6ad55 (India/CTA)
- White: clean backgrounds

### What's Already Built
- ✅ 14 Mongoose models with indexes (`apps/api/src/models/`)
- ✅ MongoDB connection manager (`apps/api/src/config/database.ts`)
- ✅ Seed script (`apps/api/seeds/seed.ts`)
- ✅ Docker compose, Dockerfiles, Nginx config
- ✅ GitHub Actions CI/CD (3 workflows)
- ✅ Turborepo + pnpm workspace config

### What's Next (Sprint 1)
1. Initialize Next.js 14 in `apps/web/`
2. Initialize Fastify in `apps/api/`
3. Wire up MongoDB on startup
4. Auth module (signup, login, JWT, role guards)
5. Supplier registration & profile CRUD
6. Health check endpoint: `GET /api/v1/health`

### Scale-Later Tech (Not for MVP, Add When Needed)
- **PostgreSQL** for orders/payments/escrow if transaction volume hits 10K+/month (keep Mongo for catalog)
- **Elasticsearch** only when product count exceeds 50K+ or faceted search is needed (use MongoDB text search for MVP)
- **Real-time (WebSocket/SSE)** — buyer-supplier chat, live notifications. Add in Sprint 3-4 via Fastify WebSocket plugin
- **BullMQ + Redis** — job queues for email, async AI matching, payment webhooks. Add by Sprint 4
- **Rate limiting** — `@fastify/rate-limit` on auth routes. Add early in Sprint 1
- **S3 presigned URLs** — for product image uploads. Add in Sprint 2
- **Multi-user orgs / API keys** — if NextAuth.js becomes limiting, consider rolling own JWT auth or better-auth/Lucia

### Important Rules
- Don't over-engineer. MVP first.
- Use existing models — don't recreate.
- Tailwind only for styling.
- Always validate with Zod before hitting MongoDB.
- Keep it simple. We can refactor in V2.
