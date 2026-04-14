import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/modules/*/*', '!@/modules/auth/edge', '!@/modules/auth/client'],
              message:
                'Import feature modules through their public entrypoint only. The only allowed public subpaths are "@/modules/auth/edge" for proxy and "@/modules/auth/client" for Client Components.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['__tests__/**/*.{ts,tsx}'],
    rules: {
      // Unit tests are allowed to target internal module files directly.
      'no-restricted-imports': 'off',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
