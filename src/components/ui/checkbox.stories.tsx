import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'
import { Label } from './label'

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use Checkbox with an explicit `id` / `htmlFor` pairing and nearby helper text when the choice affects account settings or permissions.',
      },
    },
  },
  argTypes: {
    checked: { table: { disable: true } },
    defaultChecked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    defaultChecked: false,
    disabled: false,
  },
  render: (args) => (
    <div className="flex items-start gap-3">
      <Checkbox id="terms" {...args} />
      <div className="grid gap-1.5">
        <Label htmlFor="terms">Accept product updates</Label>
        <p className="text-muted-foreground text-sm">
          Email me about release notes, security updates, and important changes.
        </p>
      </div>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Checkbox id="marketing" defaultChecked />
      <div className="grid gap-1.5">
        <Label htmlFor="marketing">Marketing emails enabled</Label>
        <p className="text-muted-foreground text-sm">
          Use checked state for persisted opt-in preferences.
        </p>
      </div>
    </div>
  ),
}

export const Indeterminate: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Checkbox id="permissions" checked="indeterminate" />
      <div className="grid gap-1.5">
        <Label htmlFor="permissions">Team permissions</Label>
        <p className="text-muted-foreground text-sm">
          Indeterminate is useful for grouped selection or partial access states.
        </p>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Checkbox id="disabled-checkbox" disabled />
      <div className="grid gap-1.5">
        <Label htmlFor="disabled-checkbox">Enterprise-only setting</Label>
        <p className="text-muted-foreground text-sm">
          Disabled controls should still explain why the option is unavailable.
        </p>
      </div>
    </div>
  ),
}
