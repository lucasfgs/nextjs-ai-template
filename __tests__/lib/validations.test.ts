import { emailSchema, nameSchema, passwordSchema } from '@/lib/validations'

describe('emailSchema', () => {
  it('accepts valid email addresses', () => {
    expect(emailSchema.safeParse('person@example.com').success).toBe(true)
  })

  it('rejects invalid email addresses', () => {
    expect(emailSchema.safeParse('not-an-email').success).toBe(false)
  })
})

describe('passwordSchema', () => {
  it('accepts strong passwords', () => {
    expect(passwordSchema.safeParse('Password1').success).toBe(true)
  })

  it('rejects passwords without an uppercase letter', () => {
    expect(passwordSchema.safeParse('password1').success).toBe(false)
  })

  it('rejects passwords without a number', () => {
    expect(passwordSchema.safeParse('Password').success).toBe(false)
  })
})

describe('nameSchema', () => {
  it('accepts trimmed names', () => {
    expect(nameSchema.parse('  Jane Doe  ')).toBe('Jane Doe')
  })

  it('rejects names that are too short', () => {
    expect(nameSchema.safeParse('J').success).toBe(false)
  })
})
