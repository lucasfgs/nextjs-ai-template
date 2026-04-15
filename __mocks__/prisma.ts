/**
 * Manual mock for @/lib/prisma.
 * Prevents a real PrismaClient (and its C-extension/TextEncoder deps)
 * from being instantiated during unit tests.
 */
export const prisma = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    upsert: jest.fn(),
    count: jest.fn(),
  },
  account: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  session: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
  },
  verificationToken: {
    findUnique: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  },
  $disconnect: jest.fn(),
  $connect: jest.fn(),
  $transaction: jest.fn((ops: unknown) => (Array.isArray(ops) ? Promise.all(ops) : ops)),
}
