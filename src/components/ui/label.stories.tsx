import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Label> = {
  title: 'Forms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label provides the accessible text contract for form controls. Pair it with a matching `id` / `htmlFor` whenever the control has visible text.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const WithInput: Story = {
  render: () => (
    <div className="grid w-72 gap-1.5">
      <Label htmlFor="workspace-name">Workspace name</Label>
      <Input id="workspace-name" placeholder="Acme Labs" />
      <p className="text-muted-foreground text-sm">
        Keep helper text adjacent so the label, field, and guidance are read together.
      </p>
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex w-72 items-start gap-3 rounded-xl border p-4">
      <Checkbox id="security-alerts" />
      <div className="grid gap-1.5">
        <Label htmlFor="security-alerts">Security alerts</Label>
        <p className="text-muted-foreground text-sm">
          Send email notifications for suspicious sign-in activity.
        </p>
      </div>
    </div>
  ),
}
