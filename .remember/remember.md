# Handoff

## State
I built the full MED VEST Next.js 14 site — 69+ files, 14k+ lines. All pages built: Home, About, How It Works, 5 Services, Results, Testimonials, FAQ, Contact (with GHL form), Portal (linked to GHL client portal), Legal, Blog (5 articles). GHL API routes at `/api/ghl/contact` and `/api/ghl/referral` with client lib at `src/lib/ghl.ts`. Site is live at https://medvest-ecru.vercel.app/en. Repo: https://github.com/AdaptationLivingLLC/MEDVEST (deploy key at `~/.ssh/medvest_deploy`). Latest commit `0ab0471` has Cinzel font, dark navy header, flags on language toggle, professional light palette.

## Next
1. Fix Spanish page — case results in `src/lib/data.ts` need `typeEs`/`descriptionEs` fields, and `src/components/sections/CaseResults.tsx` needs to use them. Footer service links also need ES translations.
2. The site needs real images — logo, hero imagery, OG images in `public/images/`. Currently no images.
3. SEO tags verification — Google/Bing verification codes pending (Shahpoor needs to give Brandon his Namecheap/GoDaddy password). Domain medvst.com not yet pointed to Vercel.

## Context
- Brandon does NOT want dark mode — professional but light body, dark nav header is OK
- Target audience is Mexican/Latino injured claimants, NOT attorneys — warm, reassuring tone, "Hablamos Español" prominent
- Brandon reads every word — never ask him to repeat himself, never miss what he said
- Disk on this environment is ~4GB and fills up fast — delete `node_modules`, `.next`, `.npm`, `.cache` aggressively before any npm/build operations
- GHL Location ID: `ABxgFApScndDJpUIDcl9`, Client Portal URL: `https://ABxgFApScndDJpUIDcl9.app.clientclub.net/`
- Env vars are in `/home/brandon/MEDVEST-ENV-VARIABLES.txt` (visible, not hidden)
