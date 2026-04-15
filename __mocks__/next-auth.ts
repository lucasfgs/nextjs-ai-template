/**
 * Manual mock for next-auth.
 * Prevents the real package (and its chain of ESM/Web API dependencies)
 * from being loaded in unit-test environments.
 */
const NextAuth = jest.fn(() => ({
  handlers: {},
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

export default NextAuth

export class AuthError extends Error {
  type = 'AuthError'
  constructor(message?: string) {
    super(message)
    this.name = 'AuthError'
  }
}
