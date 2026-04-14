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
import { ROUTES } from '@/lib/constants'
import { absoluteUrl } from '@/lib/utils'
import { getLocalizedPathname, getMessages, interpolate, type Locale } from '@/modules/i18n'

interface VerifyEmailTemplateProps {
  locale?: Locale
  name?: string
  token: string
}

export function VerifyEmailTemplate({ locale = 'en', name, token }: VerifyEmailTemplateProps) {
  const messages = getMessages(locale)
  const verifyUrl = absoluteUrl(
    `${getLocalizedPathname(locale, ROUTES.VERIFY_EMAIL)}?token=${token}`,
  )
  const fallbackName = locale === 'pt' ? 'por aí' : 'there'

  return (
    <Html>
      <Head />
      <Preview>{messages.emailTemplates.verifyEmail.preview}</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>{messages.emailTemplates.verifyEmail.heading}</Heading>
          <Text>
            {interpolate(messages.emailTemplates.verifyEmail.greeting, {
              name: name ?? fallbackName,
            })}
          </Text>
          <Text>{messages.emailTemplates.verifyEmail.body}</Text>
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
              {messages.emailTemplates.verifyEmail.button}
            </Button>
          </Section>
          <Text style={{ color: '#666', fontSize: '12px' }}>
            {messages.emailTemplates.verifyEmail.footer}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
