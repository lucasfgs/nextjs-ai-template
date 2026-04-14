import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import { ROUTES } from '@/lib/constants'
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  getLocalizedPathname,
  stripLocaleFromPathname,
} from '@/modules/i18n'

/**
 * Edge-safe Auth.js configuration.
 * IMPORTANT: Do NOT import Prisma or bcryptjs here — this file runs in Edge Runtime (proxy).
 * Prisma and password verification are handled in auth.ts which runs in Node.js only.
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: getLocalizedPathname(DEFAULT_LOCALE, ROUTES.SIGN_IN),
    error: getLocalizedPathname(DEFAULT_LOCALE, ROUTES.SIGN_IN),
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
      const locale = getLocaleFromPathname(nextUrl.pathname) ?? DEFAULT_LOCALE
      const pathname = stripLocaleFromPathname(nextUrl.pathname)
      const isOnDashboard = pathname.startsWith(ROUTES.DASHBOARD)
      const isOnSettings = pathname.startsWith(ROUTES.SETTINGS)
      const isProtected = isOnDashboard || isOnSettings

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL(getLocalizedPathname(locale, ROUTES.SIGN_IN), nextUrl))
      }

      if (isLoggedIn && pathname.startsWith(ROUTES.SIGN_IN)) {
        return Response.redirect(new URL(getLocalizedPathname(locale, ROUTES.DASHBOARD), nextUrl))
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
