/**
 * Manual mock for next-auth/* subpaths (e.g. next-auth/react, next-auth/jwt).
 * Covers React hooks and utilities used by auth components.
 */
import React from 'react'

export const signIn = jest.fn()
export const signOut = jest.fn()
export const useSession = jest.fn(() => ({ data: null, status: 'unauthenticated' }))
export const SessionProvider = ({ children }: { children: React.ReactNode }) => children
export const getSession = jest.fn()
export const getCsrfToken = jest.fn()
export const getProviders = jest.fn()
