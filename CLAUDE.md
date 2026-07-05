# tamilinai-web-business — Claude Context

## What this repo is
New Next.js project for `business.inai.lk` — the business onboarding and dashboard frontend.
Part of the Inai platform (Tamil matrimony + wedding services directory).

## Platform overview
| Repo | Domain | Purpose |
|---|---|---|
| `tamilinai-web` | `inai.lk` + `staging.inai.lk` | Landing + matrimony app after login |
| `tamilinai-web-v2` | `matrimonytamil.com` | Matrimony-only landing + same app |
| `tamilinai-web-business` | `business.inai.lk` | THIS REPO — business onboarding + dashboard |
| `tamilinai-api` | `api.inai.lk` | ONE shared backend for everything |
| `tamilinai-admin` | `admin.inai.lk` | Admin panel |

## What business.inai.lk does
Wedding service businesses (makeup, photography, venues, catering etc.) register here, manage their services, and get listed on `inai.lk/b/{slug}` (public portfolio page — in tamilinai-web).

## Routes planned
```
/                          landing ("List your wedding business on Inai — free")
/register                  onboarding: name → WhatsApp OTP → password → logo/cover → first service
/login                     WhatsApp number + password
/dashboard                 overview (approval status, share link, services list)
/dashboard/services/new    add service (name, category, min price, description, photos)
/dashboard/services/[id]   edit service
```

After login → always go to `/dashboard`. Never cross-domain.

Until admin approves: dashboard shows "Pending Review" banner. `inai.lk/b/{slug}` shows "Under review" to visitors.
After admin approves: full public portfolio visible.

## Build order (IMPORTANT)
Frontend design is built FIRST so backend is built to match exactly.
1. ✅ This repo — UI/design
2. Then backend routes + DB tables in tamilinai-api
3. Then `inai.lk/b/[slug]` public page in tamilinai-web
4. Then admin panel businesses section

## Backend (tamilinai-api) — planned but NOT built yet
New tables needed: `businessUsers`, `businessServices`, `businessPhotos`, `businessRefreshTokens`
New routes: `/api/business/auth/*`, `/api/business/*`, `/api/public/business/*`, `/api/admin/businesses/*`
Business cookie: name `inai_biz_rt`, domain `.inai.lk`, sameSite `none`, secure `true`, separate `BUSINESS_JWT_SECRET`

## Image storage
One R2 bucket (`inai-media`):
- `users/` → private signed URLs
- `business/` → public CDN cached — MUST set `CacheControl: 'public, max-age=31536000, immutable'` on upload

## API base URL
`process.env.NEXT_PUBLIC_API_URL` → `https://api.inai.lk` in production

## Auth pattern
- Access token: stored in localStorage
- Refresh token: 30 days, httpOnly cookie `inai_biz_rt`, domain `.inai.lk`
- Logout: fire API call in background (no await), clear localStorage + sessionStorage, redirect instantly

## Coding rules (STRICT)
- NEVER add `Co-Authored-By: Claude Sonnet` to commits — user commits himself
- No comments unless WHY is non-obvious
- No features beyond what's asked
- TypeScript strict
- Tailwind for all styling

## Key decisions already made
- ONE backend (tamilinai-api) serves everything — no separate business backend
- business.inai.lk is separate repo — completely different product, different auth, different UX
- Public portfolio `inai.lk/b/{slug}` lives in tamilinai-web, NOT here
- Business users never cross to other domains

## Server info
- DigitalOcean Droplet Singapore — `209.97.166.240`
- SSH: `ssh root@209.97.166.240` then `su - inai`
- PM2 manages the API process
- Vercel deploys all frontends
- Cloudflare DNS: add `CNAME business → <vercel-cname>` DNS only (grey cloud) for business.inai.lk

## Design
Design is ready (user has it). Frontend is being built design-first.
Ask user to share design/screenshots before building any page.
