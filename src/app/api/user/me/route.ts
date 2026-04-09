import { NextResponse } from 'next/server'
import { auth } from '@/modules/auth'
import { userService } from '@/modules/user'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await userService.getProfile(session.user.id)

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(user)
}
