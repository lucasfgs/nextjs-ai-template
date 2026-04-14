import { pageMetadata } from '@/config/page-metadata'

describe('pageMetadata', () => {
  it('defines titles for the main auth and dashboard pages', () => {
    expect(pageMetadata.signIn.title).toBe('Sign In')
    expect(pageMetadata.signUp.title).toBe('Sign Up')
    expect(pageMetadata.dashboard.title).toBe('Dashboard')
    expect(pageMetadata.settingsBilling.title).toBe('Billing Settings')
  })
})
