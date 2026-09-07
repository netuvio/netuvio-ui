# netuvio-ui

Modern, token-driven UI component library for Netuvio web applications.

- **Vue 3 First**: Native Single File Components using `<script setup lang="ts">`, slots, and accessible keyboard states.
- **Retro-Tactile 3D Button**: Layered neobrutalist 3D hover/active interaction (`topLayer` + `bottomLayer`), arrow masks, spinner, and 5 variants.
- **SCSS + CSS Custom Properties**: Streamlined design tokens for Lime and Carbon palettes, responsive breakpoints, and theming.
- **Exposed Tokens**: Use design tokens in CSS, SCSS, or TypeScript across any consumer app.
- **Subpath Package Architecture**: Clean modular imports (`netuvio-ui/vue`, `netuvio-ui/tokens`, `netuvio-ui/styles.css`).
- **Storybook 8**: Interactive component catalog, variant inspection, and automated accessibility checks.

---

## Installation

```bash
pnpm add netuvio-ui
# or
npm install netuvio-ui
```

---

## Quick Start

### 1. Styles & Tokens Setup
Import the combined design tokens & component stylesheet in your app entry file (e.g. `main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import all tokens & component styles
import 'netuvio-ui/styles.css'

createApp(App).mount('#app')
```

If you only need the CSS variables without component styles:
```ts
import 'netuvio-ui/tokens.css'
```

---

### 2. Using the Button Component

```vue
<script setup lang="ts">
import { Button } from 'netuvio-ui/vue'
</script>

<template>
  <div class="actions">
    <!-- Variants -->
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger">Danger</Button>

    <!-- Sizes: sm, md, lg, xl -->
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
    <Button size="xl">Extra Large</Button>

    <!-- Radii: full (default pill), md (9px + expanded padding), sm (6px), lg (14px) -->
    <Button radius="full">Full / Pill (Default)</Button>
    <Button radius="md">Rounded 9px (Expanded Padding)</Button>
    <Button radius="lg">Rounded 14px</Button>
    <Button radius="sm">Rounded 6px</Button>

    <!-- States & Flags -->
    <Button loading>Loading...</Button>
    <Button disabled>Disabled</Button>
    <Button :three-d="false">Flat (No 3D)</Button>
    <Button block>Full Width Action</Button>
  </div>
</template>
```

---

### 3. Design Tokens & Palettes

#### Lime Palette (`--color-lime-50` to `--color-lime-800`):
- `--color-lime-50`: `hsl(0 0% 100%)`
- `--color-lime-100`: `hsl(82 85% 89%)`
- `--color-lime-200`: `hsl(81 84% 78%)`
- `--color-lime-300`: `hsl(81 84% 67%)`
- `--color-lime-400`: `hsl(81 84% 56%)` (Default `--color-primary`)
- `--color-lime-500`: `hsl(81 65% 43%)`
- `--color-lime-600`: `hsl(81 62% 30%)`
- `--color-lime-700`: `hsl(82 58% 17%)`
- `--color-lime-800`: `hsl(80 16% 4%)`

#### Carbon Palette (`--color-carbon-50` to `--color-carbon-900`):
- Neutral slate/carbon scale from `hsl(60 1% 86%)` down to `hsl(77 19% 2%)`.
- `--color-background-primary`: `var(--color-carbon-800)`
- `--color-background-primary-hover`: `var(--color-carbon-350)`

#### Breakpoints:
- `$mobileBreakpoint`: `600px`
- `$tabletBreakpoint`: `960px`
- `$laptopBreakpoint`: `1264px`
- `$desktopBreakpoint`: `1800px`

#### In SCSS:
```scss
@use 'netuvio-ui/scss' as nv;

.my-container {
  background-color: nv.$color-background-primary;
  color: nv.$color-text-primary;

  @include nv.mobile {
    padding: 12px;
  }
}
```

---

## Storybook

```bash
# Start interactive Storybook
pnpm storybook

# Build Storybook for deployment
pnpm build-storybook

# Typecheck
pnpm typecheck

# Build library
pnpm build
```
