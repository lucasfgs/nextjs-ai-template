'use server'

import { ROUTES } from '@/lib/constants'
import { getLocalizedPathname, getRequestLocale } from '@/modules/i18n'
import { signOut } from '../auth'

export async function signOutAction() {
  const locale = await getRequestLocale()
  await signOut({ redirectTo: getLocalizedPathname(locale, ROUTES.SIGN_IN) })
}
