import { updateProfileSchema } from '@/modules/user/schemas/user.schemas'

describe('updateProfileSchema', () => {
  it('accepts a valid name and image url', () => {
    expect(
      updateProfileSchema.safeParse({
        name: 'Jane Doe',
        image: 'https://example.com/avatar.png',
      }).success,
    ).toBe(true)
  })

  it('accepts an empty image string', () => {
    expect(updateProfileSchema.safeParse({ image: '' }).success).toBe(true)
  })

  it('rejects invalid image urls', () => {
    expect(updateProfileSchema.safeParse({ image: 'not-a-url' }).success).toBe(false)
  })
})
