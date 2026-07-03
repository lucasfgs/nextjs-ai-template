import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const errors = []

function read(relativePath) {
  return readFileSync(path.join(root, relativePath), 'utf8')
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message)
  }
}

function parseEnvExampleKeys(contents) {
  return new Set(
    contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => line.split('=')[0]?.trim())
      .filter(Boolean),
  )
}

function parseRuntimeEnvKeys(envSource) {
  const runtimeEnvMatch = envSource.match(/runtimeEnv:\s*{([\s\S]*?)\n\s*},/)
  if (!runtimeEnvMatch) return []

  return [...runtimeEnvMatch[1].matchAll(/([A-Z0-9_]+)\s*:\s*process\.env\.[A-Z0-9_]+/g)].map(
    (match) => match[1],
  )
}

function parseJson(relativePath) {
  return JSON.parse(read(relativePath))
}

function routePathFromAppFile(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/')
  const withoutPrefix = normalized
    .replace(/^src\/app\//, '')
    .replace(/(^|\/)(?:page|route)\.tsx?$/, '')

  const segments = withoutPrefix
    .split('/')
    .filter((segment) => segment && !/^\(.+\)$/.test(segment))

  return `/${segments.join('/')}`.replace(/\/$/, '') || '/'
}

function collectAppRoutes() {
  const routes = {
    publicRoutes: [],
    protectedRoutes: [],
    apiRoutes: [],
  }

  function walk(directory) {
    for (const entry of readdirSync(directory)) {
      const fullPath = path.join(directory, entry)
      const relativePath = path.relative(root, fullPath)

      if (statSync(fullPath).isDirectory()) {
        walk(fullPath)
        continue
      }

      if (!/(^|\/)(page|route)\.tsx?$/.test(relativePath.replaceAll(path.sep, '/'))) {
        continue
      }

      const routePath = routePathFromAppFile(relativePath)
      if (routePath.startsWith('/api/')) {
        routes.apiRoutes.push(routePath)
      } else if (routePath === '/dashboard' || routePath.startsWith('/settings')) {
        routes.protectedRoutes.push(routePath)
      } else {
        routes.publicRoutes.push(routePath)
      }
    }
  }

  walk(path.join(root, 'src/app'))

  return Object.fromEntries(
    Object.entries(routes).map(([key, values]) => [key, [...new Set(values)].sort()]),
  )
}

function assertSameStringSet(actual, expected, message) {
  const actualSet = new Set(actual)
  const expectedSet = new Set(expected)
  const missing = expected.filter((value) => !actualSet.has(value))
  const extra = actual.filter((value) => !expectedSet.has(value))

  assert(
    missing.length === 0 && extra.length === 0,
    `${message}${missing.length ? ` Missing: ${missing.join(', ')}.` : ''}${
      extra.length ? ` Extra: ${extra.join(', ')}.` : ''
    }`,
  )
}

const requiredAgentFiles = [
  '.agent-platform/manifest.json',
  '.agent-platform/project-context.json',
  '.agent-platform/route-map.json',
  '.agent-platform/module-boundaries.json',
  '.agent-platform/customization-checklist.json',
]

for (const file of requiredAgentFiles) {
  assert(existsSync(path.join(root, file)), `Missing required agent context file: ${file}`)

  if (existsSync(path.join(root, file))) {
    try {
      JSON.parse(read(file))
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown JSON parse error'
      errors.push(`Invalid JSON in ${file}: ${reason}`)
    }
  }
}

const manifest = parseJson('.agent-platform/manifest.json')
for (const [name, relativeTarget] of Object.entries(manifest.entrypoints ?? {})) {
  const target = path.join(root, '.agent-platform', relativeTarget)
  assert(
    existsSync(target),
    `.agent-platform manifest entrypoint "${name}" points to a missing file.`,
  )
}

const envKeys = parseRuntimeEnvKeys(read('src/env.ts'))
const envExampleKeys = parseEnvExampleKeys(read('.env.example'))
for (const key of envKeys) {
  assert(envExampleKeys.has(key), `.env.example is missing ${key}`)
}

const moduleRoot = path.join(root, 'src/modules')
for (const entry of readdirSync(moduleRoot)) {
  const modulePath = path.join(moduleRoot, entry)
  if (!statSync(modulePath).isDirectory()) continue
  assert(
    existsSync(path.join(modulePath, 'index.ts')),
    `Module "${entry}" is missing src/modules/${entry}/index.ts`,
  )
}

const readme = read('README.md')
const claude = read('CLAUDE.md')
const agents = read('AGENTS.md')
assert(readme.includes('.agent-platform/'), 'README.md must reference .agent-platform/.')
assert(claude.includes('.agent-platform/'), 'CLAUDE.md must reference .agent-platform/.')
assert(claude.includes('AGENTS.md'), 'CLAUDE.md must reference AGENTS.md.')
assert(
  agents.includes('node_modules/next/dist/docs/'),
  'AGENTS.md must point agents to the bundled Next.js docs.',
)
assert(agents.includes('.agent-platform/'), 'AGENTS.md must reference .agent-platform/.')

for (const key of envKeys) {
  assert(readme.includes(key), `README.md environment documentation is missing ${key}`)
}

const routeMap = parseJson('.agent-platform/route-map.json')
const actualRoutes = collectAppRoutes()
for (const key of ['publicRoutes', 'protectedRoutes', 'apiRoutes']) {
  assertSameStringSet(
    routeMap[key] ?? [],
    actualRoutes[key] ?? [],
    `.agent-platform/route-map.json ${key} is out of sync with src/app.`,
  )
}

const proxySource = read('src/proxy.ts')
assert(
  proxySource.includes('@/modules/auth/edge'),
  'src/proxy.ts must import the edge-safe auth entrypoint.',
)

const eslintConfig = read('eslint.config.mjs')
assert(
  eslintConfig.includes('no-restricted-imports'),
  'eslint.config.mjs must enforce module boundaries.',
)
assert(
  eslintConfig.includes('@/modules/*/*'),
  'eslint.config.mjs must restrict internal cross-module imports.',
)

const sharedConfigFiles = [
  'src/config/navigation.ts',
  'src/config/page-context.ts',
  'src/config/page-metadata.ts',
]
for (const file of sharedConfigFiles) {
  assert(existsSync(path.join(root, file)), `Missing shared config file: ${file}`)
}

const exampleSurfaceChecks = [
  ['src/app/page.tsx', '@/modules/template'],
  ['src/app/(dashboard)/dashboard/page.tsx', '@/modules/template'],
  ['src/app/(dashboard)/settings/page.tsx', '@/modules/template'],
]
for (const [file, token] of exampleSurfaceChecks) {
  assert(read(file).includes(token), `${file} should render through the template example module.`)
}

if (errors.length > 0) {
  console.error('Template validation failed:\n')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log('Template validation passed')
