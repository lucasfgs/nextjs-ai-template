'use server'

import { auth } from '@/modules/auth'
import { updateProfileSchema } from '../schemas/user.schemas'
import { userService } from '../user.service'
import type { ActionState } from '@/modules/auth'

export async function updateProfileAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const session = await auth()
  if (!session?.user?.id) {
    return { error: 'Unauthorized' }
  }

  const parsed = updateProfileSchema.safeParse({
    name: formData.get('name'),
    image: formData.get('image'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  await userService.updateProfile(session.user.id, parsed.data)

  return { success: 'Profile updated successfully' }
}
