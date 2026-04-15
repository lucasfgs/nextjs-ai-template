import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color|fill|stroke)$/i,
        date: /date/i,
      },
    },
    docs: {
      toc: true,
      controls: {
        sort: 'requiredFirst',
      },
    },
    options: {
      storySort: {
        order: [
          'Style Guide',
          [
            'Introduction',
            'Foundations',
            ['Design Tokens', 'Typography', 'Spacing & Elevation'],
            'Theming',
            'Components',
            'Patterns',
            'Accessibility',
            'Contribution Rules',
          ],
          'Forms',
          'Navigation',
          'Overlays',
          'Feedback',
          'UI',
        ],
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
