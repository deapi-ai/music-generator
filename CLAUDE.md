# Simple Music Generator

## Project Description
Simple single-page app for generating music via deAPI txt2music endpoint.
Built for quick deployment on Vercel.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Storage:** localStorage (API key only)
- **Deployment:** Vercel-ready

## Project Structure
```
simple-music/
├── src/app/
│   ├── page.tsx                    # Main UI (form, polling, audio player)
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Tailwind + custom styles
│   └── api/
│       ├── generate/route.ts       # POST proxy → deAPI /txt2music
│       └── status/[id]/route.ts    # GET proxy → deAPI /request-status/{id}
├── package.json
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

## Architecture
- Frontend sends API key via `x-api-key` header to our API routes
- API routes proxy to deAPI with `Authorization: Bearer {token}`
- No direct browser→deAPI calls (avoids CORS issues on Vercel)
- Async flow: POST /txt2music → get request_id → poll /request-status/{id} every 3s

## deAPI Integration
- **Base URL:** `https://api.deapi.ai/api/v1/client`
- **Endpoint:** `POST /txt2music` (async, returns `request_id`)
- **Polling:** `GET /request-status/{request_id}` (status: pending → processing → done/error)
- **Models:** AceStep_1_5_Turbo (fast, 8 steps), AceStep_1_5_Base (quality, 32 steps)

## txt2music Parameters
| Param | Type | Required | Default | Range |
|-------|------|----------|---------|-------|
| caption | textarea | YES | — | Music style/mood description |
| lyrics | textarea | NO | [Instrumental] | Song lyrics |
| model | select | YES | AceStep_1_5_Turbo | 2 models |
| duration | number | YES | 30 | 10–600 sec |
| bpm | number | NO | auto | 30–300 |
| keyscale | text | NO | — | e.g. "C major" |
| timesignature | select | NO | auto | 2/4, 3/4, 4/4, 6/8 |
| vocal_language | text | NO | en | Language code |
| inference_steps | number | NO | 8 (turbo) / 32 (base) | 1–100 |
| guidance_scale | number | NO | 7.0 | 0–20, step 0.5 |
| seed | number | NO | random | — |
| format | select | NO | flac | wav, mp3, flac |

## Dev Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
```

## What's Done
- [x] Project scaffolding (Next.js 15 + Tailwind v4 + TypeScript)
- [x] API proxy routes (generate + status polling)
- [x] Main page with full form (all txt2music params)
- [x] API key input saved to localStorage
- [x] Async polling with progress bar
- [x] Audio player for completed results
- [x] Cancel generation button
- [x] Session history of previous generations
- [x] Error handling with dismissible messages
- [x] Dark theme UI
- [x] Build passes, Vercel-ready
- [x] Git initialized with initial commit

## TODO / Ideas
- [ ] Test with real API key
- [ ] Deploy to Vercel
- [ ] Add price calculation before generation
- [ ] Persist generation history to localStorage
- [ ] Add model fetching from /api/models (currently hardcoded)
