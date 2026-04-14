import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  clearMocks: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**',
    '!src/components/**',
    '!src/providers/**',
    '!src/stories/**',
    '!src/proxy.ts',
    '!src/env.ts',
    '!src/lib/prisma.ts',
    '!src/store/index.ts',
    '!src/modules/**/actions/**',
    '!src/modules/**/components/**',
    '!src/modules/**/hooks/**',
    '!src/modules/**/types/**',
    '!src/modules/**/index.ts',
    '!src/modules/auth/auth.ts',
    '!src/modules/auth/auth.config.ts',
    '!src/modules/auth/client.ts',
    '!src/modules/auth/edge.ts',
    '!src/modules/email/**',
    '!src/modules/template/**',
  ],
  coverageThreshold: {
    global: {
      statements: 75,
      branches: 75,
      functions: 75,
      lines: 75,
    },
  },
  // Allow transformation of ESM packages
  transformIgnorePatterns: [
    'node_modules/(?!(next-auth|@auth|@panva|oauth4webapi|@t3-oss/env-nextjs|@t3-oss/env-core)/)',
  ],
}

export default createJestConfig(config)
