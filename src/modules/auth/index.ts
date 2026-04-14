// Public API for the auth module
export { auth, signIn, signOut, handlers } from './auth'

// Actions
export { signInAction } from './actions/sign-in.action'
export { signUpAction } from './actions/sign-up.action'
export { signOutAction } from './actions/sign-out.action'
export { forgotPasswordAction } from './actions/forgot-password.action'
export { resetPasswordAction } from './actions/reset-password.action'
export { verifyEmailAction } from './actions/verify-email.action'

// Components
export { SignInForm } from './components/sign-in-form'
export { SignUpForm } from './components/sign-up-form'
export { ForgotPasswordForm } from './components/forgot-password-form'
export { ResetPasswordForm } from './components/reset-password-form'
export { OAuthButtons } from './components/oauth-buttons'
export { UserAvatar } from './components/user-avatar'

// Schemas
export * from './schemas/auth.schemas'

// Types
export type { UserRole, ActionState } from './types/auth.types'
