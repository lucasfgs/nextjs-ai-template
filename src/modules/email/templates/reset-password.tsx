import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { absoluteUrl } from '@/lib/utils'

interface ResetPasswordTemplateProps {
  name?: string
  token: string
}

export function ResetPasswordTemplate({ name, token }: ResetPasswordTemplateProps) {
  const resetUrl = absoluteUrl(`/reset-password?token=${token}`)

  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>Reset your password</Heading>
          <Text>Hi {name ?? 'there'},</Text>
          <Text>
            We received a request to reset your password. Click the button below to create a new
            password.
          </Text>
          <Section>
            <Button
              href={resetUrl}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Reset password
            </Button>
          </Section>
          <Text style={{ color: '#666', fontSize: '12px' }}>
            This link expires in 1 hour. If you did not request a password reset, you can safely
            ignore this email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
