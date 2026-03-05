# Simple Music Generator

AI music generation app powered by [deAPI](https://deapi.ai) and [ACE-Step 1.5](https://github.com/AceStep/ACE-Step).

Generate music from text descriptions — choose a genre, write lyrics, tweak parameters, and get audio in seconds.

## Features

- **26 genre presets** — lo-fi, rock, jazz, EDM, orchestral, reggaeton, K-pop, flamenco, disco polo, bossa nova, and more
- **12 languages** — English, Chinese, Japanese, Spanish, Polish, French, Hindi, German, Portuguese, Arabic, Turkish, Korean
- **Full parameter control** — duration, BPM, key/scale, time signature, inference steps, guidance scale with range sliders
- **Per-model limits** — sliders auto-adjust to each model's constraints (fixed values shown as disabled)
- **Async generation** — submit, poll progress with live progress bar, play result
- **Session history** — previous generations kept in session for quick playback
- **Dark theme UI** — responsive, works on desktop and mobile
- **Vercel-ready** — deploy in one click

## Models

| Model | Speed | Steps | Guidance | Duration | BPM |
|-------|-------|-------|----------|----------|-----|
| ACE-Step 1.5 Turbo | Fast | 8 (fixed) | 1 (fixed) | 10–300s | 50–200 |
| ACE-Step 1.5 Base | Quality | 5–100 | 3–20 | 30–300s | 50–200 |

## Quick Start

```bash
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000), enter your deAPI key, and start generating.

Get your API key at [deapi.ai](https://deapi.ai).

For best results, read the [ACE-Step 1.5 Tutorial](https://github.com/ace-step/ACE-Step-1.5/blob/main/docs/en/Tutorial.md) — it covers how to write effective captions, structure lyrics with tags, and tune parameters for different genres.

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
├── page.tsx              # Main UI (form, sliders, player, history)
├── examples.ts           # 26 genre preset examples in 12 languages
├── layout.tsx            # Root layout + favicon
├── globals.css           # Tailwind + custom styles
└── api/
    ├── generate/route.ts # POST proxy → deAPI /txt2music
    └── status/[id]/route.ts # GET proxy → deAPI /request-status/:id
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/dawidope/simple-music)

## License

MIT
