import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Input from './Input.vue'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
      description: 'HTML input type attribute',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Predefined size for the input',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Border radius corner style (defaults to full)',
    },
    label: {
      control: 'text',
      description: 'Label displayed above input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables input interactions',
    },
    readonly: {
      control: 'boolean',
      description: 'Sets input as read-only',
    },
    block: {
      control: 'boolean',
      description: 'Makes input take full container width',
    },
    threeD: {
      control: 'boolean',
      description: 'Enables 3D layered focus effect',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Shows eye reveal button for password inputs',
    },
    error: {
      control: 'text',
      description: 'Error message string or boolean state',
    },
    hint: {
      control: 'text',
      description: 'Helpful hint text below input',
    },
  },
  args: {
    type: 'text',
    size: 'md',
    radius: 'full',
    label: 'Email',
    placeholder: 'Enter your email...',
    disabled: false,
    readonly: false,
    block: false,
    threeD: true,
    showPasswordToggle: true,
  },
  render: (args: Record<string, any>) => ({
    components: { Input },
    setup() {
      const val = ref('')
      return { args, val }
    },
    template: '<div style="max-width: 360px; padding: 16px;"><Input v-bind="args" v-model="val" /></div>',
  }),
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'name@example.com',
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password...',
  },
}

export const Radii: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px; padding: 16px;">
        <Input label="Full / Pill (Default)" radius="full" placeholder="radius='full'" />
        <Input label="Medium (9px)" radius="md" placeholder="radius='md'" />
        <Input label="Large (12px)" radius="lg" placeholder="radius='lg'" />
        <Input label="Small (6px)" radius="sm" placeholder="radius='sm'" />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px; padding: 16px;">
        <Input size="sm" label="Small (sm)" placeholder="Small input (32px)" />
        <Input size="md" label="Medium (md - Default)" placeholder="Medium input (40px)" />
        <Input size="lg" label="Large (lg)" placeholder="Large input (48px)" />
        <Input size="xl" label="Extra Large (xl)" placeholder="Extra large input (56px)" />
      </div>
    `,
  }),
}

export const States: Story = {
  render: () => ({
    components: { Input },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px; padding: 16px;">
        <Input label="Default (Focus me for 3D)" placeholder="Click to see 3D focus effect" />
        <Input label="With Hint" placeholder="user@example.com" hint="We will never share your email." />
        <Input label="Error State" model-value="invalid-email" error="Please enter a valid email address." />
        <Input label="Disabled" disabled model-value="Disabled value" />
        <Input label="Flat (No 3D)" :three-d="false" placeholder="Flat input" />
      </div>
    `,
  }),
}

export const MockupForm: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const email = ref('')
      const password = ref('')
      return { email, password }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; max-width: 380px; padding: 24px; background-color: var(--nv-color-bg-page); border-radius: 16px;">
        <Input
          label="EMAIL"
          type="email"
          v-model="email"
          placeholder=""
          radius="md"
          block
        />
        <Input
          label="PASSWORD"
          type="password"
          v-model="password"
          placeholder=""
          radius="md"
          block
        />
      </div>
    `,
  }),
}

export const DarkTheme: Story = {
  parameters: {
    theme: 'dark',
  },
  render: () => ({
    components: { Input },
    setup() {
      const email = ref('')
      const password = ref('')
      return { email, password }
    },
    template: `
      <div data-theme="dark" style="background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 32px; border-radius: 16px; display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
        <Input
          label="EMAIL"
          type="email"
          v-model="email"
          placeholder="name@example.com"
          block
        />
        <Input
          label="PASSWORD"
          type="password"
          v-model="password"
          placeholder="Enter password..."
          block
        />
      </div>
    `,
  }),
}

export const ThemeComparison: Story = {
  render: () => ({
    components: { Input },
    setup() {
      const lightEmail = ref('')
      const lightPass = ref('')
      const darkEmail = ref('')
      const darkPass = ref('')
      return { lightEmail, lightPass, darkEmail, darkPass }
    },
    template: `
      <div style="display: flex; gap: 32px; flex-wrap: wrap; padding: 16px;">
        <!-- Light Theme -->
        <div data-theme="light" style="flex: 1; min-width: 320px; background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 24px; border-radius: 16px; border: 2px solid var(--nv-color-border-strong); display: flex; flex-direction: column; gap: 16px;">
          <h4 style="margin: 0; font-family: var(--nv-font-sans); text-transform: uppercase;">Light Theme</h4>
          <Input label="EMAIL" v-model="lightEmail" block />
          <Input label="PASSWORD" type="password" v-model="lightPass" block />
        </div>

        <!-- Dark Theme -->
        <div data-theme="dark" style="flex: 1; min-width: 320px; background-color: var(--nv-color-bg-page); color: var(--nv-color-text-primary); padding: 24px; border-radius: 16px; border: 2px solid var(--nv-color-border-strong); display: flex; flex-direction: column; gap: 16px;">
          <h4 style="margin: 0; font-family: var(--nv-font-sans); text-transform: uppercase;">Dark Theme</h4>
          <Input label="EMAIL" v-model="darkEmail" block />
          <Input label="PASSWORD" type="password" v-model="darkPass" block />
        </div>
      </div>
    `,
  }),
}
