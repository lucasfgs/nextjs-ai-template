jest.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}))

import { prisma } from '@/lib/prisma'
import { userRepository } from '@/modules/user/user.repository'

describe('userRepository', () => {
  it('loads a profile by id with the expected selection', async () => {
    await userRepository.findById('user_1')

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: 'user_1' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    })
  })

  it('looks up a user by email', async () => {
    await userRepository.findByEmail('jane@example.com')

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'jane@example.com' },
    })
  })

  it('updates a user with the expected shape', async () => {
    await userRepository.update('user_1', { name: 'Jane', image: 'https://example.com/avatar.png' })

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user_1' },
      data: { name: 'Jane', image: 'https://example.com/avatar.png' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
    })
  })

  it('deletes a user by id', async () => {
    await userRepository.delete('user_1')

    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'user_1' },
    })
  })
})
