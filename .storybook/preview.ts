import type { Preview } from '@storybook/vue3'
import '../src/tokens/tokens.css'

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
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#090d16',
        },
      ],
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.backgrounds?.value === '#090d16'
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
