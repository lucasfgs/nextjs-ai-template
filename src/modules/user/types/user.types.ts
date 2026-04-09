export interface UserProfile {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
  emailVerified: Date | null
  createdAt: Date
}

export interface UpdateProfileInput {
  name?: string
  image?: string
}
