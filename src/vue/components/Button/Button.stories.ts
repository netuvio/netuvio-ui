import type { Meta, StoryObj } from '@storybook/vue3'
import Button from './Button.vue'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Predefined size for the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interactions',
    },
    loading: {
      control: 'boolean',
      description: 'Shows a loading spinner and disables interactions',
    },
    block: {
      control: 'boolean',
      description: 'Makes the button take full container width',
    },
    threeD: {
      control: 'boolean',
      description: 'Enables 3D layered hover effect',
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    block: false,
  },
  render: (args: Record<string, any>) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Netuvio Button</Button>',
  }),
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 24px; background: var(--color-background-primary);">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 24px; background: var(--color-background-primary);">
        <Button size="sm">Small (sm)</Button>
        <Button size="md">Medium (md)</Button>
        <Button size="lg">Large (lg)</Button>
        <Button size="xl">Extra Large (xl)</Button>
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 24px; background: var(--color-background-primary);">
        <Button variant="primary">Default</Button>
        <Button variant="primary" loading>Loading...</Button>
        <Button variant="primary" disabled>Disabled</Button>
        <Button variant="primary" :three-d="false">Flat (No 3D)</Button>
      </div>
    `,
  }),
}

export const Block: Story = {
  args: {
    block: true,
  },
  render: (args: Record<string, any>) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: `
      <div style="max-width: 400px; padding: 24px; background: var(--color-background-primary);">
        <Button v-bind="args">Full Width Action</Button>
      </div>
    `,
  }),
}
