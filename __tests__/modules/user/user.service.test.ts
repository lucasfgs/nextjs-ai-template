jest.mock('@/modules/user/user.repository', () => ({
  userRepository: {
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}))

import { userRepository } from '@/modules/user/user.repository'
import { userService } from '@/modules/user/user.service'

describe('userService', () => {
  it('delegates profile lookups to the repository', async () => {
    await userService.getProfile('user_1')

    expect(userRepository.findById).toHaveBeenCalledWith('user_1')
  })

  it('removes empty image strings before updating a profile', async () => {
    await userService.updateProfile('user_1', {
      name: 'Jane Doe',
      image: '',
    })

    expect(userRepository.update).toHaveBeenCalledWith('user_1', {
      name: 'Jane Doe',
      image: undefined,
    })
  })

  it('passes through defined profile fields unchanged', async () => {
    await userService.updateProfile('user_1', {
      name: 'Jane Doe',
      image: 'https://example.com/avatar.png',
    })

    expect(userRepository.update).toHaveBeenCalledWith('user_1', {
      name: 'Jane Doe',
      image: 'https://example.com/avatar.png',
    })
  })

  it('delegates account deletion to the repository', async () => {
    await userService.deleteAccount('user_1')

    expect(userRepository.delete).toHaveBeenCalledWith('user_1')
  })
})
