import { userRepository } from './user.repository'
import type { UpdateProfileInput } from './types/user.types'

export const userService = {
  async getProfile(id: string) {
    return userRepository.findById(id)
  },

  async updateProfile(id: string, data: UpdateProfileInput) {
    const sanitized: UpdateProfileInput = {}
    if (data.name !== undefined) sanitized.name = data.name
    if (data.image !== undefined) sanitized.image = data.image || undefined

    return userRepository.update(id, sanitized)
  },

  async deleteAccount(id: string) {
    return userRepository.delete(id)
  },
}
