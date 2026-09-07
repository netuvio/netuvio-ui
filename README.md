# netuvio-ui

Modern, token-driven UI component library for Netuvio web applications.

- **Vue 3 First**: Native Single File Components built with `<script setup lang="ts">`, slots, and accessible interactive states.
- **Tactile Design System**: Consistent visual language featuring deliberate depth, structured borders, and responsive interaction feedback.
- **Design Tokens**: Comprehensive token foundation for color palettes, radii, transitions, shadows, breakpoints, and light/dark theming via CSS custom properties.
- **Exposed Tokens & Typings**: Consume design tokens via CSS custom properties or typed TypeScript constants across consumer applications.
- **Subpath Package Architecture**: Clean modular package exports (`netuvio-ui/vue`, `netuvio-ui/tokens`, `netuvio-ui/shared`, `netuvio-ui/styles.css`).
- **Storybook Catalog**: Interactive component documentation, variant inspection, and automated accessibility checks.

---

## Installation

```bash
pnpm add @netuvio/netuvio-ui
# or
npm install @netuvio/netuvio-ui
```

---

## Quick Start

### 1. Styles & Tokens Setup

Import the combined design tokens and component stylesheet in your application entry file (e.g. `main.ts`):

```ts
import { createApp } from 'vue'
import App from './App.vue'

// Import all tokens & component styles
import '@netuvio/netuvio-ui/styles.css'

// (Optional) Bundled Inter variable font:
// import '@netuvio/netuvio-ui/fonts.css'

createApp(App).mount('#app')
```

If you only need the CSS custom properties without component styles:

```ts
import '@netuvio/netuvio-ui/tokens.css'
```

---

### 2. Component Usage

Components and their associated TypeScript types can be imported directly from the Vue entry point:

```vue
<script setup lang="ts">
import { ComponentName } from '@netuvio/netuvio-ui/vue'
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
import { tokens, colors, breakpoints } from '@netuvio/netuvio-ui/tokens'
```

---

## Subpath Package Exports

| Import Path | Description |
| :--- | :--- |
| `@netuvio/netuvio-ui/vue` | Vue 3 UI components and component types |
| `@netuvio/netuvio-ui/tokens` | TypeScript design token constants and types |
| `@netuvio/netuvio-ui/shared` | Shared foundation utilities and tokens |
| `@netuvio/netuvio-ui/styles.css` | Bundled design tokens and component styles |
| `@netuvio/netuvio-ui/tokens.css` | Standalone CSS custom properties (variables only) |
| `@netuvio/netuvio-ui/fonts.css` | Bundled font definitions |

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

## License

This project is licensed under the [Apache-2.0 License](LICENSE) - see the [LICENSE](LICENSE) file for details.

