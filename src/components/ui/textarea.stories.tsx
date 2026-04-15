import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Use Textarea for multi-line input with visible labels and helper text. The control should stay readable at rest and maintain the shared focus treatment when active.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Tell us about your workspace goals…',
    disabled: false,
  },
  render: (args) => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="workspace-notes">Workspace notes</Label>
      <Textarea id="workspace-notes" {...args} />
      <p className="text-muted-foreground text-sm">
        Long-form inputs should keep helper text and validation copy directly below the field.
      </p>
    </div>
  ),
}

export const WithCharacterHint: Story = {
  render: () => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="launch-summary">Launch summary</Label>
      <Textarea
        id="launch-summary"
        defaultValue="We are preparing a controlled beta for five enterprise accounts."
      />
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted-foreground">
          Summarize the release in one or two short sentences.
        </p>
        <span className="text-muted-foreground">68 / 160</span>
      </div>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-96 gap-1.5">
      <Label htmlFor="read-only-notes">Migration notes</Label>
      <Textarea
        id="read-only-notes"
        disabled
        defaultValue="This field is managed automatically during the import process."
      />
      <p className="text-muted-foreground text-sm">
        Disabled textareas should still explain why editing is unavailable.
      </p>
    </div>
  ),
}
