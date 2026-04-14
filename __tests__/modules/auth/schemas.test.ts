import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
  verifyEmailSchema,
} from '@/modules/auth/schemas/auth.schemas'

describe('signInSchema', () => {
  it('accepts valid credentials', () => {
    const result = signInSchema.safeParse({ email: 'test@example.com', password: 'secret' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const result = signInSchema.safeParse({ email: 'not-an-email', password: 'secret' })
    expect(result.success).toBe(false)
  })

  it('rejects empty password', () => {
    const result = signInSchema.safeParse({ email: 'test@example.com', password: '' })
    expect(result.success).toBe(false)
  })
})

describe('signUpSchema', () => {
  const valid = {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Password1',
    confirmPassword: 'Password1',
  }

  it('accepts valid signup data', () => {
    expect(signUpSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects mismatched passwords', () => {
    const result = signUpSchema.safeParse({ ...valid, confirmPassword: 'different' })
    expect(result.success).toBe(false)
  })

  it('rejects weak password', () => {
    const result = signUpSchema.safeParse({ ...valid, password: 'weak', confirmPassword: 'weak' })
    expect(result.success).toBe(false)
  })
})

describe('forgotPasswordSchema', () => {
  it('accepts valid email', () => {
    expect(forgotPasswordSchema.safeParse({ email: 'test@example.com' }).success).toBe(true)
  })

  it('rejects invalid email', () => {
    expect(forgotPasswordSchema.safeParse({ email: 'bad' }).success).toBe(false)
  })
})

describe('resetPasswordSchema', () => {
  const valid = {
    token: 'token-123',
    password: 'Password1',
    confirmPassword: 'Password1',
  }

  it('accepts valid payloads', () => {
    expect(resetPasswordSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects mismatched passwords', () => {
    expect(resetPasswordSchema.safeParse({ ...valid, confirmPassword: 'different' }).success).toBe(
      false,
    )
  })
})

describe('verifyEmailSchema', () => {
  it('accepts a token', () => {
    expect(verifyEmailSchema.safeParse({ token: 'token-123' }).success).toBe(true)
  })

  it('rejects an empty token', () => {
    expect(verifyEmailSchema.safeParse({ token: '' }).success).toBe(false)
  })
})
