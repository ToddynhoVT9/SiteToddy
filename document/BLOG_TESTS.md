# Blog Test Checklist

## Scope

- This checklist validates the blog routes, content rendering, interactions, and build behavior in this project.
- Run these checks after content or UI changes in `src/pages/blog/`, `src/components/blog/`, and `src/lib/blog/`.

## Manual Route Tests

- [ ] Start local server with `npm run dev`.
- [ ] Open `/blog` and confirm the dashboard renders without runtime errors.
- [ ] Confirm section **Ultimos artigos** appears with recent posts.
- [ ] Open a category route, example `/blog/engenharia`.
- [ ] Validate category page shows title, count, and list/grid of posts.
- [ ] Open an article route, example `/blog/engenharia/engenharia-refatoracao-segura`.
- [ ] Validate article page renders title, date (pt-BR), tags, summary, cover, and markdown content.
- [ ] Test invalid category route (example `/blog/categoria-inexistente`) and confirm fallback message + link back to `/blog`.
- [ ] Test invalid article route (example `/blog/engenharia/slug-inexistente`) and confirm **Artigo nao encontrado** + link back to `/blog`.

## Sorting Validation (`updatedAt`)

- [ ] In `src/content/blog/*.md`, use distinct dates (for example: `2026-02-18`, `2026-02-17`, `2026-02-16`, `2026-02-15`).
- [ ] Open `/blog` and validate **Ultimos artigos** is ordered by `updatedAt` desc (most recent first).
- [ ] Open one category route (example `/blog/engenharia`) and validate full list/grid is ordered by `updatedAt` desc.
- [ ] In each category block on `/blog`, validate pinned cards follow `updatedAt` desc (principal = mais recente entre os pinned).

## Pinned Overflow Validation (`pinned > 3`)

- [ ] In one category, temporarily set more than 3 posts with `pinned: true` in `src/content/blog/*.md`.
- [ ] Reload `/blog` in dev.
- [ ] Confirm there is a `console.warn` indicating that category has more than 3 pinned posts.
- [ ] Confirm UI renders only 3 pinned posts for that category (most recent by `updatedAt`).
- [ ] Revert test frontmatter changes after validation.

## Slider and Keyboard Tests (CategoryRail)

- [ ] In `/blog`, locate a category rail with enough cards to scroll.
- [ ] Click **Proximo** and confirm smooth horizontal scroll by one page step.
- [ ] Click **Anterior** and confirm it scrolls back correctly.
- [ ] Use `Shift + mouse wheel` over the rail and confirm horizontal scrolling works.
- [ ] Use touch/trackpad horizontal gesture and confirm mobile-friendly scroll behavior is preserved.
- [ ] Tab until rail container or controls are focused.
- [ ] Press `ArrowRight` and confirm rail moves forward.
- [ ] Press `ArrowLeft` and confirm rail moves backward.
- [ ] Confirm pagination dots update active state while scrolling.
- [ ] Confirm focus indicator is visible on rail controls and dots.

## Build and Production Smoke

- [ ] Run `npm run build`.
- [ ] Confirm build completes with exit code 0.
- [ ] Optionally run preview with `npm run preview` and recheck `/blog`, one category route, and one article route.

## Cover 404 Validation

- [ ] Open DevTools > Network.
- [ ] Filter by `Img`.
- [ ] Navigate `/blog` and one article page.
- [ ] Confirm cover requests (for example `/images/blog/covers/placeholder-1.svg`) return HTTP 200.
- [ ] If any cover returns 404, fix the frontmatter `cover` path in `src/content/blog/*.md` or add the missing file in `public/images/blog/covers/`.

## Duplicate Slug Validation (Loader)

- [ ] Temporarily duplicate a `slug` value in two markdown files under `src/content/blog/`.
- [ ] Reload `/blog` in dev.
- [ ] Confirm the app throws an error from loader with duplicated slug list and file names.
- [ ] Expected behavior: error should explicitly identify duplicated slug(s) and corresponding markdown files.
- [ ] Revert the test change after validation.

## Linux Deploy Case-Sensitivity Note

- [ ] Verify all paths use consistent case, especially:
- [ ] `cover` paths in markdown frontmatter.
- [ ] Asset filenames in `public/images/blog/covers/`.
- [ ] Import paths in React files.
- [ ] Reason: Linux is case-sensitive, so `/Images/...` and `/images/...` are different paths and can cause production-only 404/import failures.
