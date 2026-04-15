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
import { getMessages, interpolate, type Locale } from '@/modules/i18n'

interface ResetPasswordTemplateProps {
  locale?: Locale
  name?: string
  resetPath: string
}

export function ResetPasswordTemplate({
  locale = 'en',
  name,
  resetPath,
}: ResetPasswordTemplateProps) {
  const messages = getMessages(locale)
  const resetUrl = absoluteUrl(resetPath)
  const fallbackName = locale === 'pt' ? 'por aí' : 'there'

  return (
    <Html>
      <Head />
      <Preview>{messages.emailTemplates.resetPassword.preview}</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>{messages.emailTemplates.resetPassword.heading}</Heading>
          <Text>
            {interpolate(messages.emailTemplates.resetPassword.greeting, {
              name: name ?? fallbackName,
            })}
          </Text>
          <Text>{messages.emailTemplates.resetPassword.body}</Text>
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
              {messages.emailTemplates.resetPassword.button}
            </Button>
          </Section>
          <Text style={{ color: '#666', fontSize: '12px' }}>
            {messages.emailTemplates.resetPassword.footer}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
