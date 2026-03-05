# Simple Music Generator

AI music generation app powered by [deAPI](https://deapi.ai) and [ACE-Step 1.5](https://github.com/AceStep/ACE-Step).

Generate music from text descriptions — choose a genre, write lyrics, tweak parameters, and get audio in seconds.

## Features

- **18 genre presets** — lo-fi, rock, jazz, EDM, orchestral, reggaeton, K-pop, flamenco, and more
- **Full parameter control** — duration, BPM, key/scale, time signature, inference steps, guidance scale
- **Per-model limits** — sliders auto-adjust to each model's constraints
- **Multilingual lyrics** — English, Chinese, Japanese, Spanish, and any language
- **Async generation** — submit, poll progress, play result
- **Dark theme UI** — responsive, works on desktop and mobile
- **Vercel-ready** — deploy in one click

## Models

| Model | Speed | Steps | Guidance | Duration |
|-------|-------|-------|----------|----------|
| ACE-Step 1.5 Turbo | Fast | 8 (fixed) | 1 (fixed) | 10–300s |
| ACE-Step 1.5 Base | Quality | 5–100 | 3–20 | 30–300s |

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), enter your deAPI key, and start generating.

## Tech Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- API key stored in **localStorage**
- Server-side proxy routes (no CORS issues)

## Architecture

```
Browser → /api/generate (POST) → deAPI /txt2music
Browser → /api/status/:id (GET) → deAPI /request-status/:id
```

API key is sent via `x-api-key` header to the proxy routes, which forward it as `Authorization: Bearer` to deAPI.

## Project Structure

```
src/app/
├── page.tsx              # Main UI
├── examples.ts           # 18 genre preset examples
├── layout.tsx            # Root layout
├── globals.css           # Styles
└── api/
    ├── generate/route.ts # POST proxy → deAPI
    └── status/[id]/route.ts # GET proxy → deAPI
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dawidope/simple-music)

## License

MIT
