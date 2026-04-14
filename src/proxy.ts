import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import {
  DEFAULT_LOCALE,
  getLocaleFromPathname,
  getLocalizedPathname,
  REQUEST_LOCALE_HEADER,
  stripLocaleFromPathname,
} from '@/modules/i18n'
import { authConfig } from '@/modules/auth/edge'

const { auth } = NextAuth(authConfig)

export default auth((request) => {
  const { nextUrl } = request
  const locale = getLocaleFromPathname(nextUrl.pathname)

  if (!locale) {
    const redirectUrl = nextUrl.clone()
    redirectUrl.pathname = getLocalizedPathname(DEFAULT_LOCALE, nextUrl.pathname)

    return NextResponse.redirect(redirectUrl)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(REQUEST_LOCALE_HEADER, locale)

  const rewriteUrl = nextUrl.clone()
  rewriteUrl.pathname = stripLocaleFromPathname(nextUrl.pathname)

  return NextResponse.rewrite(rewriteUrl, {
    request: {
      headers: requestHeaders,
    },
  })
})

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
