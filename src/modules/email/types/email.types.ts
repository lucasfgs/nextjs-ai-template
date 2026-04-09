export interface SendEmailOptions {
  to: string | string[]
  subject: string
  react: React.ReactElement
}

export interface EmailResult {
  id?: string
  error?: string
}
