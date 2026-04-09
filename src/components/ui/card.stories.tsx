import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description — supplementary context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Card body content goes here.</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const LoginCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter your credentials to access your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email-card">Email</Label>
          <Input id="email-card" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="pw-card">Password</Label>
          <Input id="pw-card" type="password" placeholder="••••••••" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Sign in</Button>
      </CardFooter>
    </Card>
  ),
}

export const MetricCard: Story = {
  render: () => (
    <div className="flex gap-3">
      {[
        { label: 'Total Revenue', value: '$45,231', change: '+20.1%' },
        { label: 'Subscriptions', value: '+2,350', change: '+180.1%' },
        { label: 'Active Now', value: '+573', change: '+201' },
      ].map((item) => (
        <Card key={item.label} className="w-48">
          <CardHeader className="pb-2">
            <CardDescription>{item.label}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-muted-foreground text-xs">{item.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}
