export type UserRole = 'USER' | 'ADMIN'

export type ActionState<T = undefined> = {
  error?: string
  success?: string
  data?: T
}

// Module augmentation for Auth.js v5
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      emailVerified?: Date | null
    }
  }
  interface User {
    role?: UserRole
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string
    role?: UserRole
  }
}
