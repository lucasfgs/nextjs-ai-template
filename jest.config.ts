import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Mock next-auth and its providers to avoid loading ESM/Web API deps in unit tests.
    // Tests that need real auth behaviour should explicitly un-mock these.
    '^next-auth/providers/(.*)$': '<rootDir>/__mocks__/next-auth-providers.ts',
    '^next-auth/(.*)$': '<rootDir>/__mocks__/next-auth-subpath.ts',
    '^next-auth$': '<rootDir>/__mocks__/next-auth.ts',
    '^@auth/prisma-adapter$': '<rootDir>/__mocks__/@auth-prisma-adapter.ts',
    // Mock Prisma singleton — never hit a real DB in unit tests (per CLAUDE.md).
    // SWC resolves '@/lib/prisma' to a relative path (e.g. '../../lib/prisma')
    // before Jest's moduleNameMapper runs, so we match on the suffix instead.
    '.*/lib/prisma(\\.ts)?$': '<rootDir>/__mocks__/prisma.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}', '**/*.test.{ts,tsx}'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**',
    '!src/components/ui/**',
  ],
}

// createJestConfig prepends its own '/node_modules/' to transformIgnorePatterns,
// which takes priority and blocks the custom exclusion below. Wrapping in an
// async function lets us override it after Next.js sets its defaults.
// @t3-oss packages are pure ESM that only need CJS transformation (no Web APIs).
export default async () => {
  const resolved = await createJestConfig(config)()
  return {
    ...resolved,
    transformIgnorePatterns: ['node_modules/(?!(@t3-oss/env-nextjs|@t3-oss/env-core)/)'],
  }
}
