import type { Preview } from '@storybook/vue3'
import '../src/shared/tokens.css'

const preview: Preview = {
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
          value: 'hsl(80 21% 5%)',
        },
      ],
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.backgrounds?.value === 'hsl(80 21% 5%)'
      if (typeof document !== 'undefined') {
        if (isDark) {
          document.documentElement.setAttribute('data-theme', 'dark')
        } else {
          document.documentElement.removeAttribute('data-theme')
        }
      }
      return story()
    },
  ],
}

export default preview
