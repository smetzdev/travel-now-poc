import type { Meta, StoryObj } from '@storybook/vue3'
import { fn } from '@storybook/test'
import SearchBar from '@/components/SearchBar.vue'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
  title: 'SearchBar',
  tags: ['autodocs'],
  component: SearchBar
} satisfies Meta<typeof SearchBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    addLocation: fn(async () => {
      alert('Submit')
      return true
    })
  }
}
