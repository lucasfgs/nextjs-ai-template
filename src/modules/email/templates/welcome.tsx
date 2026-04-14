import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import { getMessages, interpolate, type Locale } from '@/modules/i18n'

interface WelcomeTemplateProps {
  locale?: Locale
  name?: string
}

export function WelcomeTemplate({ locale = 'en', name }: WelcomeTemplateProps) {
  const messages = getMessages(locale)

  return (
    <Html>
      <Head />
      <Preview>{messages.emailTemplates.welcome.preview}</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>
            {interpolate(messages.emailTemplates.welcome.heading, {
              nameSuffix: name ? `, ${name}` : '',
            })}
          </Heading>
          <Text>{messages.emailTemplates.welcome.body}</Text>
          <Text>{messages.emailTemplates.welcome.secondary}</Text>
        </Container>
      </Body>
    </Html>
  )
}
