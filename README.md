# PulseTrack — Health & Fitness Monitoring

An attractive, responsive health & fitness monitoring web app built with **Next.js 16**, **TypeScript**, **Tailwind CSS 4**, **shadcn/ui**, **Recharts**, and **Framer Motion**.

## Features

- **Health Metrics** (landing page) — Interactive **BMI Calculator** with live category + color scale, plus vital cards (heart rate, SpO₂, body temp, weight), heart-rate trend chart, sleep breakdown (deep/light/REM), 8-week weight trend, and weekly insights tabs.
- **Activity Tracker** — Move-ring gauge, daily steps chart, working workout log form (type + duration + intensity → auto-computed calories with toast notifications), and a scrollable recent-workouts list.
- **Dashboard** — Animated hero, daily stat cards (steps, active minutes, resting HR, hydration), weekly activity chart, daily goals panel, week summary.
- **Light / Dark theme toggle** with localStorage persistence.
- **Fully responsive** — desktop sidebar + mobile hamburger drawer.
- Smooth Framer Motion transitions throughout.

> Sample data is used for the metrics sections — only the BMI Calculator is fully interactive with user input.

## Tech Stack

- Next.js 16 (App Router) + TypeScript 5
- Tailwind CSS 4 + shadcn/ui (New York style)
- Recharts for data visualization
- Framer Motion for animations
- Lucide icons

## Getting Started (Local Development)

```bash
# 1. Install dependencies
bun install

# 2. Start the dev server
bun run dev

# 3. Open http://localhost:3000
```

### Other scripts

```bash
bun run lint     # ESLint
bun run build    # Production build
bun run start    # Run the production build
```

## Deploying to Vercel (free, recommended)

PulseTrack is fully compatible with Vercel's free **Hobby** plan.

### Step 1 — Push the project to GitHub

```bash
# In the project root
git init
git add .
git commit -m "Initial commit — PulseTrack health & fitness app"
git branch -M main

# Create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/pulsetrack.git
git push -u origin main
```

### Step 2 — Connect Vercel to your GitHub repo

1. Go to **[vercel.com](https://vercel.com)** and click **Sign Up** (or Log In).
2. Choose **Continue with GitHub** and authorize Vercel.
3. Click **Add New… → Project**.
4. Under "Import Git Repository", find your `pulsetrack` repo and click **Import**.

### Step 3 — Configure the deploy (defaults are fine)

Vercel auto-detects Next.js. Verify these settings (they should be pre-filled):

| Setting | Value |
|---|---|
| Framework Preset | Next.js |
| Build Command | `next build` (or leave as `@vercel/next` default) |
| Output Directory | `.next` (auto-detected) |
| Install Command | `bun install` (or `npm install` / `yarn install`) |
| Root Directory | `./` |

No environment variables are required for the basic deploy.

### Step 4 — Deploy

Click **Deploy**. The first build takes about 1–2 minutes. When it finishes you'll get a live URL like:

```
https://pulsetrack-<your-username>.vercel.app
```

### Step 5 — Set your production URL (optional)

In the Vercel dashboard → **Settings → Domains**:

- Your `*.vercel.app` URL is production-ready as-is.
- To use a custom domain (e.g. `pulsetrack.yourdomain.com`), click **Add** and follow the DNS instructions. SSL is auto-provisioned, free.

### Step 6 — Optional: set `NEXT_PUBLIC_SITE_URL`

For correct social-share (OpenGraph) URLs, set an environment variable in **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL = https://pulsetrack-<your-username>.vercel.app
```

(Or your custom domain if you added one.) Redeploy for it to take effect.

## Every push = automatic redeploy

Once connected, every `git push` to `main` triggers a new production deploy. Every pull request gets its own preview URL automatically.

## Project Structure

```
src/
├── app/
│   ├── globals.css            # Tailwind theme tokens + animations
│   ├── layout.tsx             # Root layout with ThemeProvider
│   └── page.tsx               # View switcher (Health Metrics / Activity / Dashboard)
├── components/
│   ├── health-app/
│   │   ├── app-shell.tsx      # Nav + sidebar + header + footer
│   │   ├── theme-provider.tsx # Light/dark theme context
│   │   ├── bmi-calculator.tsx # Interactive BMI Calculator
│   │   ├── metrics-view.tsx   # Health Metrics page
│   │   ├── activity-view.tsx  # Activity Tracker page
│   │   └── dashboard-view.tsx# Dashboard page
│   └── ui/                    # shadcn/ui components
└── lib/
    └── health-data.ts         # Typed mock data
```

## License

MIT — feel free to fork, customize, and deploy.
