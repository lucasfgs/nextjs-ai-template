/**
 * Manual mock for next-auth/providers/*.
 * Each provider is just a factory function returning a config object.
 */
const mockProvider = jest.fn(() => ({}))
export default mockProvider
