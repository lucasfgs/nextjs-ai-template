import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

function IndeterminateProgressStory() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-80">
      <Progress value={progress} />
      <p className="text-muted-foreground mt-2 text-sm">{progress}% complete</p>
    </div>
  )
}

export const Default: Story = {
  args: { value: 60 },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export const Indeterminate: Story = {
  render: () => <IndeterminateProgressStory />,
}
