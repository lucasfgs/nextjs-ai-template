import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Skip t3-env validation — env vars are not set in the test environment.
process.env.SKIP_ENV_VALIDATION = 'true'

// jsdom replaces the global scope with window, which lacks TextEncoder/TextDecoder.
// Restore from Node's built-in util so ESM packages (resend, jose, etc.) can load.
Object.assign(global, { TextEncoder, TextDecoder })
