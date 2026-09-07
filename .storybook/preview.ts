import type { Preview } from '@storybook/vue3'
import '../src/shared/fonts.css'
import '../src/shared/tokens.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Switch between light and dark theme',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: 'hsl(0 0% 100%)',
        },
        {
          name: 'dark',
          value: 'hsl(75 18% 4%)',
        },
      ],
    },
  },
  decorators: [
    (story, context) => {
      // 1. Check story-level parameter override
      const storyTheme = context.parameters.theme
      // 2. Check toolbar theme switcher
      const globalTheme = context.globals.theme
      // 3. Check backgrounds toolbar if used
      const bgValue = context.globals.backgrounds?.value
      const isDarkBg = bgValue === 'hsl(75 18% 4%)' || bgValue === '#0e1009' || bgValue === '#000000' || bgValue === '#333333'
      // 4. Check OS / browser color scheme preference
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

      let resolvedTheme = 'light'
      if (storyTheme) {
        resolvedTheme = storyTheme
      } else if (globalTheme === 'dark') {
        resolvedTheme = 'dark'
      } else if (globalTheme === 'system') {
        resolvedTheme = prefersDark ? 'dark' : 'light'
      } else if (globalTheme === 'light') {
        resolvedTheme = 'light'
      } else if (isDarkBg) {
        resolvedTheme = 'dark'
      } else if (prefersDark && !globalTheme) {
        resolvedTheme = 'dark'
      }

      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', resolvedTheme)
        document.body.setAttribute('data-theme', resolvedTheme)
        document.documentElement.setAttribute('theme', resolvedTheme)
        document.body.setAttribute('theme', resolvedTheme)

        // Ensure canvas body font, background & text match the theme tokens
        document.body.style.fontFamily = 'var(--nv-font-sans)'
        document.body.style.backgroundColor = 'var(--nv-color-bg-page)'
        document.body.style.color = 'var(--nv-color-text-primary)'
        document.body.style.minHeight = '100vh'
        document.body.style.margin = '0'
        document.body.style.padding = '16px'
        document.body.style.boxSizing = 'border-box'
        document.body.style.transition = 'background-color 0.2s ease, color 0.2s ease'
      }

      return story()
    },
  ],
}

export default preview
