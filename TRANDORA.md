# TRANDORA.md — Claude Code Project Context
# Last updated: Feb 22, 2026
# This file is the single source of truth for Claude Code when working on Trandora.
# Read this FIRST before doing anything.

---

## 🏹 WHO AM I?

I am **Gaurav Vaidya**, Founder of Trandora and Senior Software Engineer with 12+ years of experience.
I position myself as an **AI-First Engineer** — I build with LLMs, agents, and modern AI tooling.

My CEO persona is **Arjun** — strategic, decisive, execution-focused. When I say "What would Arjun do?" — think bold, no-BS, ship-it founder mentality.

### My Tech Comfort Zone
- **Strong:** Node.js, TypeScript, React, Next.js, MongoDB, REST APIs, Docker
- **Good:** AWS, Redis, Elasticsearch, CI/CD, Tailwind CSS
- **Learning:** AI/ML integration, Claude API, MCP servers
- **Preference:** Clean code, modular architecture, TypeScript everywhere, no unnecessary abstractions

### How I Work
- I develop from **mobile (Claude.ai) and laptop (Claude Code)** — so code must be push-ready always
- I use **Claude Code** as my primary coding partner
- I prefer **working code over perfect code** — ship first, refactor later
- I have a team of **5 interns + colleague Amrose** who may contribute later
- I do **NOT want boilerplate explanations** — give me code, give me commands, be direct

---

## 🌍 WHAT IS TRANDORA?

**Trandora = India's AI-powered B2B trade marketplace**

Think Alibaba.com but for India — connecting verified Indian suppliers with global buyers.

### Why Now?
India just signed 3 mega trade deals in 2025-26 that make Indian exports massively cheaper:

| Trade Deal | Destination | Duty Rate | Status | Key Date |
|-----------|-------------|-----------|--------|----------|
| **India-UK CETA** | UK | **0%** on 99% of exports | ✅ Active | Jul 2025 |
| **India-EU FTA** | EU (27 countries) | 30% at 0% immediately, 96.6% phased | ⏳ Pending ratification | Jan 27, 2026 |
| **India-US Interim Deal** | USA | **18%** (down from 50%) | 📋 Framework signed | Feb 2, 2026 |
| **India-EFTA TEPA** | Switzerland, Norway, Iceland, Liechtenstein | Reduced | ✅ Active | Oct 1, 2025 |
| **India-UAE CEPA** | UAE | **0%** on 80% of goods | ✅ Active | May 2022 |
| **India-ASEAN FTA** | Vietnam, Thailand, Indonesia, etc. | 90%+ liberalized | ✅ Active | 2010 |

**The gap:** Global demand for Indian sourcing is about to explode, but there's NO modern platform to facilitate it. IndiaMART is domestic-only and outdated. Trandora fills this gap.

### Core Value Propositions
1. **AI-Powered Supplier Matching** — Describe what you need in plain English, get matched with verified suppliers (Claude API)
2. **FTA Duty Calculator** — Instant landed cost calculation using India's active trade agreements
3. **Supplier Verification** — GST/PAN API verification, Trust Scores, factory video verification
4. **Escrow Payments** — Buyer protection with milestone-based payments (Razorpay + Stripe)
5. **Integrated Logistics** — Multi-carrier rate comparison and booking
6. **RFQ System** — Post requirements, receive quotes from matched suppliers

### Revenue Model
- Commission: 2-5% per transaction (40% of revenue)
- Supplier subscriptions: ₹999-14,999/month tiers (25%)
- Logistics margin: 5-10% markup (15%)
- Trade compliance SaaS: ₹499/month (10%)
- Promoted listings/ads (10%)

---

## 🏗️ TECH STACK

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | Next.js 14 (App Router) + TypeScript + Tailwind CSS | SSR for SEO, fast iteration |
| **Backend API** | Node.js + TypeScript + Fastify | Faster than Express, schema validation built-in |
| **Database** | MongoDB 7.0 + Mongoose ODM | Flexible schema, embedded docs, no migrations during MVP |
| **Search** | Elasticsearch 8.x | Full-text search across 100K+ products |
| **Cache** | Redis 7.x | Session cache, rate limiting, hot data |
| **AI/NLP** | Anthropic Claude API | Supplier matching, NLP search, product description generation |
| **Payments** | Razorpay (India) + Stripe (International) | Full escrow support |
| **Storage** | AWS S3 | Product images, documents, factory videos |
| **Auth** | NextAuth.js + JWT | Credentials + OAuth support |
| **Deployment** | AWS EC2/ECS + MongoDB Atlas + GitHub Actions CI/CD | Auto-deploy on push |
| **Monorepo** | Turborepo + pnpm | Shared packages, fast builds |

---

## 📁 PROJECT STRUCTURE

```
trandora/
├── apps/
│   ├── web/                         # Next.js 14 frontend
│   │   ├── app/                     # App Router pages
│   │   │   ├── (auth)/              # Login, signup, forgot password
│   │   │   ├── (buyer)/             # Buyer dashboard, RFQs, orders
│   │   │   ├── (supplier)/          # Supplier dashboard, products, analytics
│   │   │   ├── (public)/            # Homepage, search, categories, product pages
│   │   │   └── layout.tsx
│   │   ├── components/
│   │   │   ├── ui/                  # Base components (Button, Input, Card)
│   │   │   ├── supplier/            # Supplier-specific components
│   │   │   ├── buyer/               # Buyer-specific components
│   │   │   ├── trade/               # FTA calculator, duty widgets
│   │   │   └── layout/              # Nav, Footer, Sidebar
│   │   ├── lib/                     # Utilities, API client, helpers
│   │   ├── hooks/                   # Custom React hooks
│   │   └── styles/                  # Global styles
│   │
│   └── api/                         # Fastify backend API
│       ├── src/
│       │   ├── models/              # Mongoose models (14 models)
│       │   ├── modules/             # Feature modules (controller/service/repo pattern)
│       │   │   ├── auth/
│       │   │   ├── supplier/
│       │   │   ├── product/
│       │   │   ├── buyer/
│       │   │   ├── rfq/
│       │   │   ├── order/
│       │   │   ├── payment/
│       │   │   ├── trade/           # FTA calculator
│       │   │   ├── search/          # Elasticsearch + AI matching
│       │   │   ├── logistics/
│       │   │   └── notification/
│       │   ├── common/
│       │   │   ├── middleware/       # Auth, rate limiting, logging
│       │   │   ├── guards/          # Role-based access (buyer/supplier/admin)
│       │   │   └── utils/
│       │   ├── config/              # database.ts, app config
│       │   ├── plugins/             # Fastify plugins
│       │   └── server.ts            # Entry point
│       ├── seeds/
│       │   └── seed.ts              # Categories, FTA data, sample data
│       └── tests/
│
├── packages/                        # Shared monorepo packages
│   ├── types/                       # Shared TypeScript interfaces
│   ├── utils/                       # Shared utilities
│   ├── config/                      # Shared config
│   └── fta-engine/                  # Standalone FTA duty calculator
│       ├── src/
│       │   ├── deals/               # Trade deal rules
│       │   ├── calculator.ts        # Core calculation
│       │   ├── hs-codes.ts          # HS code lookup
│       │   └── index.ts
│       └── tests/
│
├── infra/
│   ├── docker/
│   │   └── docker-compose.yml       # MongoDB, Redis, Elasticsearch, Mongo Express
│   └── aws/
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Lint + test on every PR
│       ├── deploy-staging.yml       # Deploy to staging on push to develop
│       └── deploy-prod.yml          # Deploy to production on push to main
│
├── docs/
│   ├── architecture.md
│   ├── api-reference.md
│   └── database-schema.md
│
├── TRANDORA.md                      # THIS FILE — Claude Code context
├── turbo.json
├── package.json
├── .env.example
└── tsconfig.base.json
```

---

## 🗄️ DATABASE MODELS (MongoDB + Mongoose)

All models are in `apps/api/src/models/`. Here's the data model overview:

### User & Auth
- **User** — email, password, role (buyer/supplier/admin), status, phone verification
- **Session** — JWT tokens (if needed for server-side session tracking)

### Supplier Side
- **Supplier** — business profile, address, GeoJSON location (2dsphere), GST/PAN/IEC verification, trust score (0-100), trust tier (basic/silver/gold/platinum), response metrics, subscription tier
- **Product** — name, category, pricing (min-max), MOQ, specs, HS code, export markets, images (EMBEDDED subdocuments — MongoDB advantage), status (draft/active/paused), text index for search
- **Category** — hierarchical (3 levels), slug-based, parent-child with virtual populate

### Buyer Side
- **Buyer** — business profile, country, preferences, budget range
- **Rfq** — title, description, category, quantity, budget, destination, deadline, status flow (open → receiving_quotes → awarded → closed)
- **RfqResponse** — supplier quote with pricing, MOQ, lead time, validity, attachments. Unique compound index (rfqId + supplierId)

### Orders & Payments
- **Order** — order number (TRN-2026-XXXXX), items (EMBEDDED), milestones (EMBEDDED), status flow (pending_payment → escrow → production → shipped → delivered → completed), FTA info, tracking
- **Transaction** — payment records linked to orders, gateway references

### Trade & Compliance
- **TradeDeal** — name, shortCode, source/dest country, status, effective date
- **DutyRate** — linked to TradeDeal, HS code prefix matching, duty rate vs MFN rate (for savings display)
- **HsCode** — harmonized system codes with text search index

### Reviews & Notifications
- **Review** — multi-dimensional ratings (quality, communication, delivery, value), verified purchase flag
- **Notification** — user notifications with type, read status, compound index for unread

### Key MongoDB Advantages Used
- **Embedded subdocuments:** Product images, Order items, Order milestones (no JOINs)
- **Text indexes:** Product name/description, HS code description (basic search before Elasticsearch)
- **2dsphere index:** Supplier location for geo queries
- **Flexible schema:** Products across categories can have wildly different attributes
- **No migrations:** Schema changes are instant during rapid MVP iteration

---

## 📋 SPRINT PLAN (10 Weeks to MVP)

### Sprint 1 (Week 1-2): Foundation
- [x] Project structure & monorepo setup
- [x] Mongoose models created
- [x] Docker compose (MongoDB + Redis + ES + Mongo Express)
- [ ] Initialize Turborepo with actual Next.js + Fastify apps
- [ ] Auth system (signup, login, JWT, role guards)
- [ ] Supplier registration & profile CRUD

### Sprint 2 (Week 3-4): Product Catalog & Search
- [ ] Category system (hierarchical, seed 8 top-level + subs)
- [ ] Product CRUD (supplier can list products)
- [ ] Product search (Elasticsearch or MongoDB text search for MVP)
- [ ] Supplier directory with Trust Score badges

### Sprint 3 (Week 5-6): RFQ System & FTA Calculator
- [ ] Buyer registration & dashboard
- [ ] RFQ posting & matching
- [ ] Supplier quoting system
- [ ] FTA duty calculator engine (standalone package)
- [ ] FTA calculator widget on product pages

### Sprint 4 (Week 7-8): Payments & Orders
- [ ] Razorpay integration
- [ ] Order lifecycle management
- [ ] Escrow payment flow
- [ ] Order tracking UI

### Sprint 5 (Week 9-10): Polish & Launch
- [ ] Notification system
- [ ] Reviews & ratings
- [ ] Homepage & landing page
- [ ] Responsive design
- [ ] CI/CD deployment pipeline
- [ ] Launch with 200+ suppliers

---

## 🚀 CI/CD & DEPLOYMENT

### Branch Strategy
- `main` — Production (auto-deploys to prod)
- `develop` — Staging (auto-deploys to staging)
- `feature/*` — Feature branches (PR to develop)
- `hotfix/*` — Emergency fixes (PR to main)

### Pipeline (GitHub Actions)
1. **On PR to develop:** Lint → Type check → Test → Build check
2. **On push to develop:** Above + Deploy to staging server
3. **On push to main:** Above + Deploy to production server

### Deployment Target
- **API:** AWS EC2 (or ECS Fargate later) running Docker containers
- **Web:** Vercel (easiest for Next.js) OR AWS EC2 alongside API
- **Database:** MongoDB Atlas (free tier for MVP, M10+ for production)
- **Redis:** AWS ElastiCache (or Redis Cloud free tier for MVP)
- **Search:** Self-hosted Elasticsearch on EC2 (or skip for MVP, use MongoDB text search)
- **Media:** AWS S3 + CloudFront CDN

### Environment Variables Required
See `.env.example` for full list. Critical ones:
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — Auth token signing
- `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` — Payments
- `ANTHROPIC_API_KEY` — Claude AI features
- `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` — S3 uploads

---

## 🔧 DEVELOPMENT COMMANDS

```bash
# Start all services locally
pnpm docker:up                # MongoDB, Redis, ES, Mongo Express
pnpm dev                      # Start web + API in dev mode

# Database
pnpm db:seed                  # Seed categories + FTA data

# Build & Test
pnpm build                    # Build all apps
pnpm lint                     # Lint everything
pnpm test                     # Run all tests

# Docker
pnpm docker:up                # Start Docker services
pnpm docker:down              # Stop Docker services
pnpm docker:logs              # View logs
```

### Local URLs
- Web: http://localhost:3000
- API: http://localhost:4000
- Mongo Express: http://localhost:8081
- Elasticsearch: http://localhost:9200

---

## 📐 CODE CONVENTIONS

### API Module Pattern
Every feature module follows this structure:
```
modules/supplier/
├── supplier.controller.ts    # Route handlers (HTTP layer only)
├── supplier.service.ts       # Business logic (no HTTP concepts)
├── supplier.repository.ts    # Mongoose queries only
├── supplier.schema.ts        # Zod input validation schemas
├── supplier.types.ts         # TypeScript interfaces
└── supplier.test.ts          # Unit tests
```

### Naming Conventions
- **Files:** kebab-case (`supplier.controller.ts`, `trade-deal.model.ts`)
- **Variables/functions:** camelCase
- **Types/Interfaces:** PascalCase with `I` prefix for Mongoose docs (`ISupplier`, `IProduct`)
- **Constants:** UPPER_SNAKE_CASE
- **API routes:** `/api/v1/suppliers`, `/api/v1/products`

### API Response Format
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 150 }
}
```

Error format:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human readable message",
    "details": [...]
  }
}
```

### Git Commit Convention
```
feat: add supplier registration flow
fix: correct trust score calculation
docs: update API reference
chore: update dependencies
refactor: extract FTA engine to shared package
test: add supplier service unit tests
ci: add staging deployment workflow
```

---

## 🏢 BUSINESS ECOSYSTEM

Trandora is part of a larger business ecosystem under **The Vaidya's Firm**:

### 1. The Vaidya's Reller (Export Brand)
- Private label export brand sourcing from India → selling to UK/EU/USA
- Products: Woolen caps, canvas bags, pajama sets, ayurvedic products
- Sales channels: Amazon UK (0% duty via CETA), Amazon EU, Shopify
- **This becomes the FIRST customer/case study on Trandora**

### 2. Family Wholesale Business (Gwalior)
- Existing textile/garment wholesale: woolen, caps, bags, lowers, pajamas
- Suppliers in Ludhiana (woolen/knits), Delhi (garments/caps), Mumbai (textiles)
- Turnover: ₹50L-2Cr/year
- **Family's 50-70 manufacturer contacts = first suppliers on Trandora**

### 3. Trandora (This Platform)
- B2B marketplace connecting Indian suppliers ↔ global buyers
- Family suppliers + Vaidya's Reller create the initial supply & demand

**The Flywheel:**
Family suppliers → Vaidya's Reller brand → First Trandora customer → Family network → First 100 Trandora suppliers → Success story → Marketing → Platform growth → More brands → Flywheel

---

## 📈 SCALING ROADMAP (Post-MVP Tech Upgrades)

Current stack is validated for MVP. These are planned upgrades when specific thresholds are hit:

### Database: MongoDB → MongoDB + PostgreSQL (Hybrid)
- **When:** Order volume > 10K/month OR complex financial reporting needed
- **What:** Extract orders, payments, transactions to PostgreSQL. Keep MongoDB for products, suppliers, catalog (flexible schema advantage).
- **Why:** Marketplace transactions are inherently relational. Escrow milestones, multi-party ledgers, payment reconciliation benefit from ACID guarantees and JOINs.

### Search: MongoDB Text Search → Elasticsearch 8.x
- **When:** Product count > 50K OR faceted search needed (price + category + location filters simultaneously)
- **What:** Index products/suppliers into ES. Keep MongoDB as source of truth.
- **MVP approach:** MongoDB text indexes on Product name/description — already set up in models.

### Real-Time: Add WebSocket/SSE
- **When:** Sprint 3-4 (RFQ system needs live notifications)
- **What:** Fastify WebSocket plugin or Socket.io for buyer-supplier chat, live RFQ notifications, order status updates.

### Job Queues: Add BullMQ + Redis
- **When:** Sprint 4 (payments & notifications)
- **What:** Async processing for email notifications, AI supplier matching, payment webhook processing, report generation.
- **Why:** Payment webhooks and AI calls should never block HTTP responses.

### Auth: NextAuth.js → Custom or better-auth/Lucia
- **When:** If multi-user orgs needed (multiple users per supplier company), invite flows, or API key auth for integrations.
- **MVP approach:** NextAuth.js with credentials + JWT is sufficient.

### Rate Limiting: @fastify/rate-limit
- **When:** Sprint 1 (add early, especially on auth routes)
- **What:** Protect signup/login from brute force. Add API rate limits per subscription tier later.

### File Uploads: S3 Presigned URLs
- **When:** Sprint 2 (product image uploads)
- **What:** API generates presigned S3 URLs, frontend uploads directly to S3. No file data through the API server.

---

## ⚠️ IMPORTANT NOTES FOR CLAUDE CODE

1. **Don't over-engineer.** We're building an MVP. Working > Perfect.
2. **MongoDB has no migrations.** Just update the model and go.
3. **Always check existing models** in `apps/api/src/models/` before creating new ones.
4. **Use Zod for API validation**, not Mongoose validation alone.
5. **Frontend uses Tailwind only** — no CSS modules, no styled-components.
6. **Color scheme:** Navy (#1a365d) for trust, Saffron (#f6ad55) for India/CTA, White for clean.
7. **API prefix:** All routes start with `/api/v1/`
8. **Auth flow:** JWT in Authorization header, refresh token in httpOnly cookie.
9. **File uploads:** Use presigned S3 URLs from the API, direct upload from frontend.
10. **When in doubt, keep it simple.** We can add complexity in V2.

### What's Already Built (in this repo)
- ✅ Complete Mongoose models (14 models with indexes)
- ✅ MongoDB connection manager with graceful shutdown
- ✅ Seed script (categories + FTA trade deal data)
- ✅ Docker compose (MongoDB + Redis + Elasticsearch + Mongo Express)
- ✅ Turborepo config + package.json
- ✅ TypeScript base config
- ✅ .env.example with all variables
- ✅ GitHub issue templates
- ✅ Architecture documentation

### What Needs to Be Built Next (Sprint 1 remaining)
1. Initialize actual Next.js app in `apps/web/`
2. Initialize actual Fastify app in `apps/api/`
3. Wire up Mongoose connection on API startup
4. Auth module (signup, login, JWT, guards)
5. Supplier registration & profile CRUD
6. Basic API health check endpoint
7. GitHub Actions CI pipeline

---

## 🔑 QUICK REFERENCE: API ENDPOINTS (Planned)

### Auth
```
POST   /api/v1/auth/signup          # Register (buyer or supplier)
POST   /api/v1/auth/login           # Login → JWT
POST   /api/v1/auth/forgot-password # Send reset email
POST   /api/v1/auth/reset-password  # Reset with token
GET    /api/v1/auth/me              # Current user profile
```

### Suppliers
```
GET    /api/v1/suppliers            # List/search suppliers
GET    /api/v1/suppliers/:slug      # Supplier profile
POST   /api/v1/suppliers            # Create supplier profile (auth)
PUT    /api/v1/suppliers/:id        # Update profile (auth, own)
```

### Products
```
GET    /api/v1/products             # Search/list products
GET    /api/v1/products/:slug       # Product detail
POST   /api/v1/products             # Create product (supplier auth)
PUT    /api/v1/products/:id         # Update product (supplier auth, own)
DELETE /api/v1/products/:id         # Archive product (supplier auth, own)
```

### RFQs
```
GET    /api/v1/rfqs                 # List RFQs (filtered by role)
POST   /api/v1/rfqs                 # Create RFQ (buyer auth)
GET    /api/v1/rfqs/:id             # RFQ detail
POST   /api/v1/rfqs/:id/respond     # Submit quote (supplier auth)
PUT    /api/v1/rfqs/:id/close       # Close RFQ (buyer auth)
```

### Orders
```
GET    /api/v1/orders               # My orders (filtered by role)
POST   /api/v1/orders               # Create from accepted RFQ quote
GET    /api/v1/orders/:id           # Order detail
PUT    /api/v1/orders/:id/status    # Update status (supplier/system)
```

### Trade/FTA
```
GET    /api/v1/trade/deals          # List active trade deals
POST   /api/v1/trade/calculate      # Calculate duty (HS code + destination)
GET    /api/v1/trade/hs-codes       # Search HS codes
```

### Categories
```
GET    /api/v1/categories           # List all (with children)
GET    /api/v1/categories/:slug     # Category detail + products
```

---

*This document is the brain of Trandora. Keep it updated as decisions are made.*
*🏹 Source India. Scale Global.*
