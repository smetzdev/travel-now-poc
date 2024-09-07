import type { Meta, StoryObj } from '@storybook/vue3'
import { fn, within, userEvent, expect } from '@storybook/test'
import SearchBar from '@/components/SearchBar.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'SearchBar',
  tags: ['autodocs'],
  args: {
    addLocation: fn(async () => true)
  },
  component: SearchBar
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const SubmitValid: Story = {
  play: async ({ canvasElement, initialArgs }) => {
    const { searchInput, submitButton } = buildCanvas(canvasElement)

    await userEvent.type(searchInput, 'St Wendel', { delay: 100 })
    await userEvent.click(submitButton)

    await expect(initialArgs.addLocation).toBeCalledWith('St Wendel')
    await expect(initialArgs.addLocation).toBeCalledTimes(1)
    await expect(searchInput.textContent).toBe('')
  }
}

export const SubmitEmpty: Story = {
  play: async ({ canvasElement, initialArgs }) => {
    const { submitButton } = buildCanvas(canvasElement)

    await userEvent.click(submitButton)

    await expect(initialArgs.addLocation).not.toBeCalled()
  }
}

export const SubmitWithEnter: Story = {
  play: async ({ canvasElement, initialArgs }) => {
    const { searchInput } = buildCanvas(canvasElement)

    await userEvent.type(searchInput, 'St Wendel', { delay: 100 })
    await userEvent.keyboard('{Enter}')

    await expect(initialArgs.addLocation).toBeCalledWith('St Wendel')
    await expect(initialArgs.addLocation).toBeCalledTimes(1)
    await expect(searchInput.textContent).toBe('')
  }
}

// Helper Functions
const buildCanvas = (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement)

  const searchInput = canvas.getByPlaceholderText('Enter ZIP and/or city...')
  const submitButton = canvas.getByLabelText('Submit')

  return {
    canvas,
    searchInput,
    submitButton
  }
}
