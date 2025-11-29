# Portfolio - Next.js

Dette er min portfolio hjemmeside bygget med Next.js, React, TypeScript og Tailwind CSS.

## Funktioner

- **Hjemmeside**: Præsentation af mig og mine færdigheder
- **Projekter**: Oversigt over alle mine projekter
- **Projektdetaljer**: Detaljerede sider for hvert projekt med billeder, teknologier og funktioner

## Teknologier

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Installation

```bash
npm install
```

## Udvikling

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i din browser.

## Build

```bash
npm run build
npm start
```

## Struktur

```
├── app/                    # Next.js App Router sider
│   ├── page.tsx           # Hjemmeside
│   ├── projects/          # Projekter
│   │   ├── page.tsx       # Projektoverblik
│   │   └── [id]/          # Individuelle projektdetaljer
│   └── layout.tsx          # Root layout
├── components/            # React komponenter
│   ├── Navbar.tsx         # Navigation
│   ├── NoiseFilter.tsx    # Noise filter overlay
│   └── shapes.ts          # Shape data
├── data/                  # Data filer
│   └── projects.ts       # Projekt data
└── public/               # Statiske filer
    └── assets/           # Billeder og assets
```

## Noter

- Billeder skal placeres i `public/assets/` mappen
- Projekt data kan opdateres i `data/projects.ts`
- Styling er håndteret med Tailwind CSS
