# Fastseo Astro migration foundation

This directory is an isolated Astro + TypeScript + Tailwind CSS foundation. It is **not connected to the production GitHub Pages deployment**. The existing root-level HTML site remains the production source until the migration is complete.

## Requirements

- Node.js 20.19.0 or newer
- npm 10 or newer

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run preview
```

The static output is generated in `dist/`.

## Preserved Google integrations

- Google Analytics 4: `G-SGM63ET6X1`
- AdSense publisher: `ca-pub-6996931662051674`
- AdSense homepage slot: `3864433783`
- AdSense in-article slot: `5806370724`
- Search Console verification meta tag and HTML verification file
- AdSense `ads.txt`
- Custom domain `prftools.cloud`

The shared layout includes the GA tag, asynchronous AdSense loader, Search Console verification meta tag, and AdSense account meta tag. The `AdSenseSlot` component uses IntersectionObserver to request an ad near the viewport rather than immediately requesting every slot.

## Migration safety rules

1. Do not change the root GitHub Pages publishing workflow while this scaffold is isolated.
2. Keep all existing public URL paths and canonical URLs unless a redirect plan has been tested.
3. Migrate each current page and tool with functional parity before switching production output.
4. Keep the Search Console HTML verification file, verification meta tag, `ads.txt`, `CNAME`, `robots.txt`, and sitemap available at the production root after cutover.
5. Keep API secrets in Cloudflare Worker secrets. Never commit secrets or expose private values through `PUBLIC_*` variables.
6. Test Analytics Realtime, AdSense requests, Search Console ownership, sitemap fetch, and robots after deployment.

## Next migration work

- Inventory and migrate all current pages, articles, and tools.
- Replace the temporary noindex scaffold with the real homepage only after content parity is reached.
- Add tool registry metadata and isolated tool modules.
- Add unit, integration, link, and browser tests.
- Add a pull-request CI workflow for type checking, tests, and production build.
- Switch GitHub Pages to `astro/dist` only after the cutover checklist passes.
