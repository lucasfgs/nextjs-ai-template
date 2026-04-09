import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'

/**
 * Edge-safe Auth.js configuration.
 * IMPORTANT: Do NOT import Prisma or bcryptjs here — this file runs in Edge Runtime (middleware).
 * Prisma and password verification are handled in auth.ts which runs in Node.js only.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    // Credentials provider is declared here but verify() runs in auth.ts
    Credentials({
      async authorize() {
        // Actual verification is handled in auth.ts authorize callback
        return null
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnSettings = nextUrl.pathname.startsWith('/settings')
      const isProtected = isOnDashboard || isOnSettings

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL('/sign-in', nextUrl))
      }

      if (isLoggedIn && nextUrl.pathname.startsWith('/sign-in')) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role ?? 'USER'
      }
      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = (token.role ?? 'USER') as 'USER' | 'ADMIN'
      }
      return session
    },
  },
}
