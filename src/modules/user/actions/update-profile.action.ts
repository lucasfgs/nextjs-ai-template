'use server'

import { getRequestI18n } from '@/modules/i18n'
import { auth } from '@/modules/auth'
import type { ActionState } from '@/modules/auth'
import { getUpdateProfileSchema } from '../schemas/user.schemas'
import { userService } from '../user.service'

export async function updateProfileAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const { locale, messages } = await getRequestI18n()
  const session = await auth()

  if (!session?.user?.id) {
    return { error: messages.validation.unauthorized }
  }

  const updateProfileSchema = getUpdateProfileSchema(locale)
  const parsed = updateProfileSchema.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? messages.validation.invalidInput }
  }

  await userService.updateProfile(session.user.id, parsed.data)

  return { success: messages.profile.actions.profileUpdatedSuccessfully }
}
