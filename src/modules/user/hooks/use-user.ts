'use client'

import { useQuery } from '@tanstack/react-query'
import type { UserProfile } from '../types/user.types'

async function fetchCurrentUser(): Promise<UserProfile> {
  const res = await fetch('/api/user/me')
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json() as Promise<UserProfile>
}

export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
