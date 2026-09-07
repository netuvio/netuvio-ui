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

All tokens use the `--nv-` prefix and modern space-separated HSL values.

#### Semantic Highlights:
- `--nv-color-accent`: `hsl(75 85% 56%)` (Brand lime)
- `--nv-color-container`: `hsl(0 0% 100%)` (White light, dark slate in dark theme)
- `--nv-color-text-primary`: `hsl(75 15% 10%)`
- `--nv-color-border-strong`: `hsl(75 15% 10%)`
- Radii: `--nv-radius-sm` (6px), `--nv-radius-md` (9px), `--nv-radius-lg` (12px), `--nv-radius-full` (9999px)

#### Usage in CSS:
```css
.my-container {
  background-color: var(--nv-color-container);
  color: var(--nv-color-text-primary);
  border: 2px solid var(--nv-color-border-strong);
  border-radius: var(--nv-radius-md);
}

@media (max-width: 600px) {
  .my-container {
    padding: 12px;
  }
}
```

---

## Directory Architecture

```text
src/
├── shared/                  # Framework-agnostic foundation
│   ├── fonts/               # Local font files (Inter TTF variable fonts)
│   ├── styles/              # Shared component stylesheets
│   │   └── components/
│   │       └── Button.module.css
│   ├── tokens.css           # Pure CSS custom properties (:root & themes)
│   ├── tokens.ts            # TypeScript token constants
│   └── index.ts             # Shared barrel export
│
├── vue/                     # Vue 3 implementations
│   ├── components/
│   │   └── Button/
│   │       ├── Button.vue
│   │       ├── Button.types.ts
│   │       ├── Button.stories.ts
│   │       └── index.ts
│   └── index.ts
│
└── react/ (future)          # React implementations (when ready)
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
