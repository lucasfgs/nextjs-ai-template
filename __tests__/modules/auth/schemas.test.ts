import { signInSchema, signUpSchema, forgotPasswordSchema, getAuthSchemas } from '@/modules/auth'

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

  it('returns localized validation messages', () => {
    const { signUpSchema: portugueseSignUpSchema } = getAuthSchemas('pt')
    const result = portugueseSignUpSchema.safeParse({
      ...valid,
      password: 'weak',
      confirmPassword: 'weak',
    })

    expect(result.success).toBe(false)

    if (result.success) {
      throw new Error('Expected schema parsing to fail for weak password input')
    }

    expect(result.error.issues[0]?.message).toBe('A senha deve ter pelo menos 8 caracteres')
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
