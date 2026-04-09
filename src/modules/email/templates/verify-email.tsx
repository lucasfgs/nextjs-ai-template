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

interface VerifyEmailTemplateProps {
  name?: string
  token: string
}

export function VerifyEmailTemplate({ name, token }: VerifyEmailTemplateProps) {
  const verifyUrl = absoluteUrl(`/verify-email?token=${token}`)

  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>Verify your email</Heading>
          <Text>Hi {name ?? 'there'},</Text>
          <Text>Please click the button below to verify your email address.</Text>
          <Section>
            <Button
              href={verifyUrl}
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
            >
              Verify email
            </Button>
          </Section>
          <Text style={{ color: '#666', fontSize: '12px' }}>
            This link expires in 24 hours. If you did not create an account, you can ignore this
            email.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
