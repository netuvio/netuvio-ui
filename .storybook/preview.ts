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
          value: 'hsl(75 18% 4%)',
        },
      ],
    },
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.backgrounds?.value === 'hsl(75 18% 4%)'
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
      }
      return story()
    },
  ],
}

export default preview
