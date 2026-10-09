# VELOOP Rewards Games

A responsive VELOOP game hub with 13 image-led game banners, two playable browser games, a shared Game Coin wallet, and a reward conversion center.

## Features

- Thirteen reusable game banners generated from `src/data/gamesData.js`.
- Artwork is separate from the coded 20 Token entry strip and Play Now button.
- Automatic horizontal carousel with a seamless duplicate loop, touch/trackpad scrolling, vertical mouse-wheel support, hover/focus pause, and accessible position dots. No navigation arrows.
- Dedicated light-theme game home pages. Block Crush and Slice Storm are playable on touch and desktop; other titles are presented as upcoming rather than simulated as games.
- 20 Token entry check and deduction for playable rounds, with first-play guide, score, one revive, and a score-based Game Coin reward.
- One Zustand wallet shared across games and redemption, persisted in browser local storage.
- Confirmation-based conversion into VEs, SVEs, Gems, Tokens, and Spins, with insufficient-balance messaging and recent exchange history.
- Reduced-motion support and responsive layouts from small phones through wide desktop screens.

## Technology

- React 19 and Vite 8
- React Router
- Bootstrap 5 (base dependency)
- CSS Modules
- Zustand with local-storage persistence
- Framer Motion and Lucide React
- Sharp (development-only asset preparation)

## Structure

```text
src/
  components/games/   Reusable banner, token button, balance, and game session
  data/               Game catalogue and conversion rates
  pages/              Games, game home, and redemption routes
  store/              Shared token/Game Coin wallet and history
public/assets/games/  Supplied source art and optimized variants
scripts/              Repeatable Sharp image preparation
```

## Asset Preparation

The supplied JPEGs remain available under `public/assets/games/`. Optimized output is generated under `public/assets/games/optimized/`:

- `game-01.avif` through `game-13.avif` are width-capped at 800px and encoded as AVIF.
- `token-icon.png`, `game-coin.png`, and the reward icons are transparent PNG cutouts made from the provided artwork. The script removes only the connected dark backdrop so interior shadows and lettering are retained.

Regenerate assets after changing source artwork:

```bash
npm install
npm run optimize:assets
```

Game banner framing uses `object-fit: cover` with a portrait ratio and a top-biased crop to keep the title/artwork in view while excluding the legacy bottom XP/action treatment. The live 20 Token strip and Play Now button are rendered separately.

## Run Locally

```bash
npm install
npm run dev
```

Routes:

- `/games` — all 13 banners
- `/games/block-crush` — Block Crush home and playable round
- `/games/slice-storm` — Slice Storm home and playable round
- `/redeem` — shared Game Coin conversion center

## Build and Preview

```bash
npm run build
npm run preview
```

## Wallet and Demo Data

The initial demo wallet contains 150 Tokens and 0 Game Coins. Entry fees, scores, rewards, and conversion rates are frontend demo data only; no server or real account balance is connected. Wallet values and history are stored in this browser's local storage. The Games page and both game sessions share the same store instance.

To reset the local demo wallet, clear the `veloop-games-wallet-v1` key from browser local storage.

## Deployment

The app is a static Vite site and can be deployed to Vercel or Netlify. Use `npm run build` as the build command and `dist` as the output directory. This project has not been connected to a GitHub repository or deployed yet.

### GitHub Pages

Pushing to `main` runs the GitHub Actions workflow in `.github/workflows/deploy.yml`. It builds the project for the `/VELoop-Game-Banners/` repository path and deploys the site to GitHub Pages. The project routes are configured to support page refreshes through a generated `404.html` fallback.

# VELoop-Game-Banners
