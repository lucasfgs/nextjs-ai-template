import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Docs',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (webpackConfig) => {
    // Resolve @/ alias to match tsconfig paths
    webpackConfig.resolve = webpackConfig.resolve ?? {}
    webpackConfig.resolve.alias = {
      ...(webpackConfig.resolve.alias ?? {}),
      '@': path.resolve(dirname, '../src'),
    }
    return webpackConfig
  },
}

export default config
