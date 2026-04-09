import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color|fill|stroke)$/i,
        date: /date/i,
      },
    },
    docs: {
      toc: true,
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
