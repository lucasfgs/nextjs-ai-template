import type { Meta, StoryObj } from '@storybook/react'
import { toast } from 'sonner'
import { Button } from './button'
import { Toaster } from './sonner'

const meta: Meta<typeof Toaster> = {
  title: 'Feedback/Toaster',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The shared Toaster follows the current light or dark preview theme automatically and should be used for transient confirmations, lightweight warnings, and async completion feedback.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Toaster>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-3">
      <Toaster closeButton richColors />
      <Button
        onClick={() =>
          toast.success('Workspace saved', {
            description: 'Your changes were synced successfully.',
          })
        }
      >
        Show success toast
      </Button>
    </div>
  ),
}

export const MixedFeedback: Story = {
  render: () => (
    <div className="flex flex-wrap justify-center gap-3">
      <Toaster closeButton richColors />
      <Button
        variant="outline"
        onClick={() =>
          toast('Billing reminder', {
            description: 'Your current plan renews in 3 days.',
          })
        }
      >
        Info toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error('Sync failed', {
            description: 'Try again after checking your connection.',
          })
        }
      >
        Error toast
      </Button>
    </div>
  ),
}
