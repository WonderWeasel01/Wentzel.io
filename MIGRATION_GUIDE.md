# Migration Guide - Vite til Next.js

Denne guide forklarer hvordan du flytter assets fra den gamle Vite struktur til den nye Next.js struktur.

## Assets Struktur

I Next.js skal alle statiske filer (billeder, PDF'er, etc.) placeres i `public/` mappen.

### Nuværende struktur (Vite):
```
src/
  assets/
    images/
    pdf/
    pos/
    victoryvault/
```

### Ny struktur (Next.js):
```
public/
  assets/
    images/
    pdf/
    pos/
    victoryvault/
```

## Flytning af Assets

1. **Flyt alle assets fra `src/assets/` til `public/assets/`**
   ```bash
   # Eksempel (kør fra projekt root):
   mkdir -p public/assets
   cp -r src/assets/* public/assets/
   ```

2. **Billeder der bruges i projekter:**
   - Alle projekt billeder skal placeres i `public/assets/` med de navne der er defineret i `data/projects.ts`
   - Eksempel: `pos-image.webp`, `pos-screenshot.webp`, etc.

3. **Eksisterende assets:**
   - `src/assets/images/` → `public/assets/images/`
   - `src/assets/pdf/` → `public/assets/pdf/`
   - `src/assets/pos/` → `public/assets/pos/`
   - `src/assets/victoryvault/` → `public/assets/victoryvault/`

## Projekt Billeder

Projekt billederne skal have følgende navne og placeres i `public/assets/`:

- `pos-image.webp`
- `pos-screenshot.webp`
- `pos-mobile.webp`
- `pos-mobile2.webp`
- `vv-image.webp`
- `vv-screenshot.webp`
- `vv-mobile.webp`
- `vv-mobile2.webp`
- `lni-image.webp`
- `lni-screenshot.webp`
- `lni-mobile.webp`
- `lni-mobile2.webp`
- ... og alle andre projekt billeder defineret i `data/projects.ts`

## Installation og Kørsel

1. Installer dependencies:
   ```bash
   npm install
   ```

2. Kør development server:
   ```bash
   npm run dev
   ```

3. Build til production:
   ```bash
   npm run build
   npm start
   ```

## Vigtige Noter

- Next.js Image komponenten bruges til optimeret billedvisning
- Alle paths til assets starter med `/assets/` (ikke `/public/assets/`)
- PDF filer kan linkes direkte: `/assets/pdf/filename.pdf`
- Billeder kan bruges med Next.js Image komponent eller direkte som `<img src="/assets/...">`

## Backend

Hvis du har en backend (Express server), skal den køres separat. Backend filerne i `backend/` mappen er ikke ændret og kan bruges som før.

