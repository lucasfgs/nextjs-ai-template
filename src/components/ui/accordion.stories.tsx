import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion'

const meta: Meta<typeof Accordion> = {
  title: 'Navigation/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
}

export default meta
type Story = StoryObj<typeof Accordion>

const faqItems = [
  {
    value: 'item-1',
    question: 'Is it accessible?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    value: 'item-2',
    question: 'Is it styled?',
    answer: 'Yes. It comes with default styles that matches the other components aesthetics.',
  },
  {
    value: 'item-3',
    question: 'Is it animated?',
    answer: "Yes. It's animated by default, but you can disable it if you prefer.",
  },
]

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-96">
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-96">
      {faqItems.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
