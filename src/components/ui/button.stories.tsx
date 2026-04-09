import type { Meta, StoryObj } from '@storybook/react'
import { Loader2, Mail, Plus } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'Size of the button',
    },
    disabled: { control: 'boolean' },
    asChild: { table: { disable: true } },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { children: 'Button' },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button>
        <Mail />
        Send email
      </Button>
      <Button variant="outline">
        <Mail />
        Send email
      </Button>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  ),
}

export const Disabled: Story = {
  args: { children: 'Disabled', disabled: true },
}
