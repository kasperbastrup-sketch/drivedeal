# DriveDeal AI — Deploy Guide

## Hvad du har brug for (alt gratis)
- GitHub konto: github.com
- Vercel konto: vercel.com (log ind med GitHub)
- Anthropic API key: console.anthropic.com

---

## Step 1 — Upload koden til GitHub (5 min)

1. Gå til github.com → "New repository"
2. Navn: `drivedeal` → Create repository
3. Upload alle filerne fra denne mappe til repositoriet
   (Drag & drop direkte på GitHub.com)

---

## Step 2 — Deploy på Vercel (3 min)

1. Gå til vercel.com → "Add New Project"
2. Import dit `drivedeal` GitHub repository
3. Klik "Deploy" — Vercel finder Next.js automatisk

Din app er nu live på: `drivedeal-xxx.vercel.app`

---

## Step 3 — Tilføj din Anthropic API key (2 min)

1. I Vercel: gå til dit projekt → Settings → Environment Variables
2. Tilføj:
   - Name: `ANTHROPIC_API_KEY`
   - Value: din API key fra console.anthropic.com
3. Klik "Save" → Redeploy

**Færdig. Din app er live og AI-emailgenerering virker.**

---

## Step 4 — Eget domæne (valgfrit, 10 min)

1. Køb `drivedeal.io` på Namecheap (~€10/år)
2. I Vercel: Settings → Domains → Add `drivedeal.io`
3. Følg DNS-instruktionerne fra Vercel

---

## Pris-struktur til kunder

| Plan    | Pris      | Leads       |
|---------|-----------|-------------|
| Starter | €149/md   | Op til 300  |
| Pro     | €299/md   | Ubegrænsede |
| Elite   | €499/md   | Multi-bruger|

Én bil solgt = 24 måneder Pro betalt.

---

## Teknisk stack
- Next.js 14 (App Router)
- TypeScript
- Claude claude-sonnet-4-20250514 (AI email generering)
- Hosted gratis på Vercel
