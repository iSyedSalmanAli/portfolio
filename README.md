# Developer Portfolio — Next.js

A modern, interactive developer portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

## ✨ Features

- **Dark / Light Theme** — Toggle with `next-themes`, persisted in localStorage
- **Interactive Particles** — Canvas-based particle background with mouse repel effect
- **Cursor Glow** — Subtle radial glow follows your mouse across the page
- **3D Tilt Cards** — Project cards respond to mouse position with perspective transforms
- **Typing Animation** — Auto-typing role titles in the hero section
- **Scroll Animations** — Sections fade in on scroll using Intersection Observer
- **Animated Counters** — Stats count up with easing when scrolled into view
- **Scroll Progress Bar** — Gradient progress indicator at the top of the page
- **Tabbed Skills** — Category-based skill sections with animated progress bars
- **Contact Form** — Ready for Formspree integration (works without backend)
- **SEO Optimized** — Full Open Graph, Twitter cards, and meta tags
- **Fully Responsive** — Mobile-first design
- **Accessibility** — Focus visible, reduced motion support, semantic HTML
- **Custom 404 Page**

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, SEO, providers)
│   ├── page.tsx            # Home page (composes sections)
│   ├── globals.css         # Theme variables + Tailwind
│   └── not-found.tsx       # Custom 404
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Hero, Stats, About, Projects, Skills, Contact
│   ├── ui/                 # Button, SectionHeader, ParticleCanvas, ScrollProgress
│   └── providers/          # ThemeProvider
├── hooks/                  # Custom React hooks
│   ├── useActiveSection    # Scroll spy
│   ├── useAnimatedCounter  # Count-up animation
│   ├── useIntersectionObserver  # Scroll reveal
│   ├── useScrollProgress   # Page progress
│   └── useTypingEffect     # Typing animation
├── data/
│   └── portfolio.ts        # ⭐ ALL your content lives here
├── lib/
│   └── utils.ts            # Helper utilities
└── types/
    └── index.ts            # TypeScript interfaces
```

## ✏️ How to Customize

### 1. Update Your Content

Edit **`src/data/portfolio.ts`** — this is the single source of truth:

- `siteConfig` — Your name, title, description, social links
- `typedTitles` — Roles that type in the hero
- `stats` — Your stats/metrics
- `projects` — Your project cards
- `skillCategories` — Your skill categories and levels
- `contactInfo` — Your contact details

### 2. Contact Form Setup

1. Sign up at [Formspree](https://formspree.io)
2. Create a form and copy the form ID
3. Create `.env.local` and add: `NEXT_PUBLIC_FORMSPREE_ID=your_id_here`

### 3. Theming

Colors are defined as CSS variables in `src/app/globals.css`. Update the `:root` (light) and `.dark` blocks to change the color scheme.

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com).

### Netlify

```bash
npm run build
# Deploy the `.next` folder
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📦 Tech Stack

| Technology     | Purpose                    |
| -------------- | -------------------------- |
| Next.js 14     | React framework (App Router) |
| TypeScript     | Type safety                |
| Tailwind CSS   | Utility-first styling      |
| Framer Motion  | Animations                 |
| next-themes    | Dark/light mode            |
| Formspree      | Contact form backend       |

## 📄 License

MIT — use it however you like.
