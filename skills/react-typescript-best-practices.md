# React 19 + TypeScript 6 Best Practices

## Hooks
- Gebruik `useActionState` voor form state (React 19)
- Gebruik `useOptimistic` voor instant UI updates
- Custom hooks in `src/hooks/`, altijd starten met `use`

## Componenten
- Functionele componenten met TypeScript, geen class componenten
- Props interface definieren boven het component
- `React.FC` vermijden — gebruik directe function declaraties

## Tailwind CSS 4
- CSS-first configuratie: `@import "tailwindcss"` in main.css
- Geen tailwind.config.js nodig voor basis gebruik
- Custom tokens via `@theme { ... }` in CSS

## Vite 8 (Rolldown)
- `@tailwindcss/vite` als Vite plugin (geen PostCSS)
- Tree shaking werkt automatisch
- Build is 10-30x sneller dankzij Rolldown

## PWA
- Service worker via `vite-plugin-pwa`
- `registerType: 'autoUpdate'` voor automatische updates
- Offline-first: cache API responses

## Testing
- Unit tests naast de component: `Component.test.tsx`
- E2E tests in `tests/e2e/`
- Coverage minimaal 80%
