import type { Meta, StoryObj } from '@storybook/react'
import { ScrollArea } from './scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'Navigation/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ScrollArea is useful when content density is high but the containing surface must remain compact. Keep scrolling regions deliberate and give them a clear visual boundary.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const ActivityFeed: Story = {
  render: () => (
    <ScrollArea className="h-80 w-96 rounded-2xl border p-4 shadow-sm">
      <div className="space-y-4 pr-4">
        {[
          'Workspace created',
          'Security review completed',
          'Billing contact updated',
          'API token rotated',
          'Invite accepted by Jordan',
          'New invoice generated',
          'Recovery codes regenerated',
          'Profile photo uploaded',
          'Support conversation resolved',
          'Theme preference changed',
        ].map((event, index) => (
          <div key={event} className="rounded-xl border p-4">
            <p className="font-medium">{event}</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Event #{index + 1} • Keep rows concise and scannable inside constrained panels.
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const CommandList: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded-2xl border p-2 shadow-sm">
      <div className="space-y-1 p-2">
        {Array.from({ length: 18 }).map((_, index) => (
          <button
            key={index}
            className="hover:bg-accent hover:text-accent-foreground flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors"
            type="button"
          >
            <span>Command palette item {index + 1}</span>
            <span className="text-muted-foreground">⌘{index + 1}</span>
          </button>
        ))}
      </div>
    </ScrollArea>
  ),
}
