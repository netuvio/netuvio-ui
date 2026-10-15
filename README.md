# netuvio-ui

Modern, token-driven UI component library for Netuvio web applications.

- **Vue 3 First**: Native Single File Components built with `<script setup lang="ts">`, slots, and accessible interactive states.
- **Tactile Design System**: Consistent visual language featuring deliberate depth, structured borders, and responsive interaction feedback.
- **Design Tokens**: Comprehensive token foundation for color palettes, radii, transitions, shadows, breakpoints, and light/dark theming via CSS custom properties.
- **Exposed Tokens & Typings**: Consume design tokens via CSS custom properties or typed TypeScript constants across consumer applications.
- **Subpath Package Architecture**: Clean modular package exports (`@netuvio/ui/vue`, `@netuvio/ui/tokens`, `@netuvio/ui/shared`, `@netuvio/ui/styles.css`).
- **Storybook Catalog**: Interactive component documentation, variant inspection, and automated accessibility checks.

---

## Installation

```bash
pnpm add @netuvio/ui
# or
npm install @netuvio/ui
```

---

## Quick Start

### 1. Styles & Tokens Setup

Import the combined design tokens and component stylesheet in your application entry file (e.g. `main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import all tokens & component styles
import '@netuvio/ui/styles.css'

// (Optional) Bundled Inter variable font:
// import '@netuvio/ui/fonts.css'

createApp(App).mount('#app')
```

If you only need the CSS custom properties without component styles:

```ts
import '@netuvio/ui/tokens.css'
```

---

### 2. Component Usage

Components and their associated TypeScript types can be imported directly from the Vue entry point:

```vue
<script setup lang="ts">
import { ComponentName } from '@netuvio/ui/vue'
</script>

<template>
  <ComponentName variant="primary" size="md">
    <!-- Content -->
  </ComponentName>
</template>
```

---

### 3. Design Tokens & Theming

All tokens use the `--nv-` prefix and modern CSS custom properties.

#### Semantic Highlights:
- `--nv-color-accent`: Primary accent brand color
- `--nv-color-container`: Container background surface
- `--nv-color-text-primary`: Primary text color
- `--nv-color-border-strong`: Structural high-contrast border
- Radii: `--nv-radius-sm`, `--nv-radius-md`, `--nv-radius-lg`, `--nv-radius-xl`, `--nv-radius-full`

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

#### Usage in TypeScript:
```ts
import { tokens, colors, breakpoints } from '@netuvio/ui/tokens'
import type { Theme } from '@netuvio/ui/tokens'
```

#### Forcing Light / Dark Theme:
Force a specific theme on any HTML element, container, or component using the `theme` attribute (`"light"` or `"dark"`):

```html
<!-- On any HTML container / element -->
<div theme="dark">
  <!-- All child tokens automatically switch to dark theme -->
  <NvButton variant="primary">Dark themed</NvButton>
</div>

<!-- On specific components directly -->
<NvButton theme="light">Forced Light Button</NvButton>
<NvButton theme="dark">Forced Dark Button</NvButton>
<NvInput theme="dark" label="Forced Dark Input" />
```

`data-theme="light"` and `data-theme="dark"` are also supported for full backward compatibility.

---


## Subpath Package Exports

| Import Path | Description |
| :--- | :--- |
| `@netuvio/ui/vue` | Vue 3 UI components and component types |
| `@netuvio/ui/tokens` | TypeScript design token constants and types |
| `@netuvio/ui/shared` | Shared foundation utilities and tokens |
| `@netuvio/ui/styles.css` | Bundled design tokens and component styles |
| `@netuvio/ui/tokens.css` | Standalone CSS custom properties (variables only) |
| `@netuvio/ui/fonts.css` | Bundled font definitions |

---

## Development & Scripts

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

---

## Modal

`NvModal` uses a native dialog with focus containment, Escape and backdrop dismissal, scroll locking, and focus restoration. It supports `sm`, `md`, and `lg` sizes, a `theme` override, and a `footer` slot. Provide a localized `close-label` in applications.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { NvButton, NvModal } from '@netuvio/ui'
const open = ref(false)
</script>

<template>
  <NvButton @click="open = true">Open details</NvButton>
  <NvModal v-model="open" title="Details" close-label="Close" size="lg">
    <p>Modal content</p>
    <template #footer>
      <NvButton @click="open = false">Done</NvButton>
    </template>
  </NvModal>
</template>
```

## Radius tokens

Container components use the same default radius: `NvCard`, `NvTable`, and `NvModal` use `--nv-radius-xl` (22px). Explicit radius options remain available on cards and tables. The shared scale is `sm` 6px, `md` 9px, `lg` 12px, `xl` 22px, and `full` 9999px; CSS fallbacks match these tokens.

## Slider

`NvSlider` provides a labeled native range input with keyboard controls, a value badge, bounds, an optional hint, and Netuvio theme tokens. It emits numeric values, respects `min` / `max` / `step`, and disables itself when no range remains.

```vue
<NvSlider v-model="cpu" label="CPU" :min="250" :max="4000" :step="250" unit="m" />
```

## License

This project is licensed under the [Apache-2.0 License](LICENSE) - see the [LICENSE](LICENSE) file for details.

