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
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Border radius corner style (md = 9px)',
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
    neutral3d: {
      control: 'boolean',
      description: 'Sets if the button is neutrally 3D at rest',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'md',
    radius: 'full',
    disabled: false,
    loading: false,
    block: false,
    neutral3d: false,
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

export const Radii: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; padding: 12px;">
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <Button radius="full">Full / Pill (Default)</Button>
          <Button radius="md">Medium (9px)</Button>
          <Button radius="lg">Large (12px)</Button>
          <Button radius="sm">Small (6px)</Button>
        </div>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <Button variant="secondary" radius="full">Secondary Pill</Button>
          <Button variant="secondary" radius="md">Secondary 9px</Button>
          <Button variant="tertiary" radius="md">Tertiary 9px</Button>
          <Button variant="danger" radius="md">Danger 9px</Button>
        </div>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 12px;">
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
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 12px;">
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
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap; padding: 12px;">
        <Button variant="primary">Default (Lifts on hover only)</Button>
        <Button variant="primary" :neutral3d="true">Neutrally 3D (:neutral3d="true")</Button>
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
      <div style="max-width: 400px; padding: 12px;">
        <Button v-bind="args">Full Width Action</Button>
      </div>
    `,
  }),
}

export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => ({
    components: { Button },
    template: `
      <div data-theme="dark" style="background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 24px; border-radius: 12px; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>
    `,
  }),
}

export const ThemeComparison: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 12px;">
        <div data-theme="light" style="background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 24px; border-radius: 12px; border: 2px solid var(--nv-color-border-strong);">
          <h4 style="margin: 0 0 16px 0;">Light Theme</h4>
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div data-theme="dark" style="background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 24px; border-radius: 12px; border: 2px solid var(--nv-color-border-strong);">
          <h4 style="margin: 0 0 16px 0;">Dark Theme</h4>
          <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>
      </div>
    `,
  }),
}
