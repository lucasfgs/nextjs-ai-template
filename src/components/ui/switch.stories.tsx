import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    disabled: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  ),
}

export const Settings: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      {[
        { id: 'notifications', label: 'Push notifications', defaultChecked: true },
        { id: 'marketing', label: 'Marketing emails', defaultChecked: false },
        { id: 'security', label: 'Security alerts', defaultChecked: true },
      ].map((item) => (
        <div key={item.id} className="flex items-center justify-between">
          <Label htmlFor={item.id}>{item.label}</Label>
          <Switch id={item.id} defaultChecked={item.defaultChecked} />
        </div>
      ))}
    </div>
  ),
}
