import type { Meta, StoryObj } from '@storybook/react'
import { Search } from 'lucide-react'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'tel', 'url'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: { placeholder: 'Enter text…', type: 'text' },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-64 gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithSearch: Story = {
  render: () => (
    <div className="relative w-64">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
      <Input className="pl-9" placeholder="Search…" type="search" />
    </div>
  ),
}

export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}

export const Password: Story = {
  args: { type: 'password', placeholder: '••••••••' },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
}
