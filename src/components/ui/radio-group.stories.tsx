import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { RadioGroup, RadioGroupItem } from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use RadioGroup when exactly one option can be selected. Keep each item visibly labeled and place supporting descriptions close to the choice.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="starter" className="w-80 gap-3">
      {[
        {
          id: 'starter',
          title: 'Starter',
          description: 'Best for solo builders getting the workspace configured.',
        },
        {
          id: 'pro',
          title: 'Pro',
          description: 'Adds collaboration and commercial billing controls.',
        },
        {
          id: 'enterprise',
          title: 'Enterprise',
          description: 'Use for advanced security requirements and scale.',
        },
      ].map((item) => (
        <div key={item.id} className="flex items-start gap-3 rounded-xl border p-4">
          <RadioGroupItem value={item.id} id={item.id} className="mt-0.5" />
          <div className="grid gap-1.5">
            <Label htmlFor={item.id}>{item.title}</Label>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </RadioGroup>
  ),
}

export const Compact: Story = {
  render: () => (
    <RadioGroup defaultValue="weekly" className="gap-2">
      {[
        { id: 'daily', label: 'Daily' },
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' },
      ].map((item) => (
        <div key={item.id} className="flex items-center gap-3">
          <RadioGroupItem value={item.id} id={item.id} />
          <Label htmlFor={item.id}>{item.label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}
