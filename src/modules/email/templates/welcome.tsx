import { Body, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'

interface WelcomeTemplateProps {
  name?: string
}

export function WelcomeTemplate({ name }: WelcomeTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome aboard!</Preview>
      <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f5f5f5' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading>Welcome{name ? `, ${name}` : ''}!</Heading>
          <Text>
            We&apos;re excited to have you on board. Your account has been created successfully.
          </Text>
          <Text>Get started by exploring the dashboard and customising your profile.</Text>
        </Container>
      </Body>
    </Html>
  )
}
