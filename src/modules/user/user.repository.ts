import { prisma } from '@/lib/prisma'
import type { UpdateProfileInput } from './types/user.types'

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
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
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  },

  async update(id: string, data: UpdateProfileInput) {
    return prisma.user.update({
      where: { id },
      data,
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
  },

  async delete(id: string) {
    return prisma.user.delete({ where: { id } })
  },
}
