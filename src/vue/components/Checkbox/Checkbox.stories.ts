import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NvCheckbox from './NvCheckbox.vue';

const meta: Meta<typeof NvCheckbox> = {
  title: 'Components/Checkbox',
  component: NvCheckbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Predefined size for the checkbox',
    },
    mark: {
      control: 'select',
      options: ['square', 'check'],
      description: 'Style of mark when checked: square (authentic Auth) or check (SVG checkmark)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables checkbox interactions',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate state with horizontal bar',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    description: {
      control: 'text',
      description: 'Description text',
    },
  },
  args: {
    label: 'Remember me',
    size: 'md',
    mark: 'square',
    disabled: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof NvCheckbox>;

export const Default: Story = {
  render: (args) => ({
    components: { NvCheckbox },
    setup() {
      const checked = ref(false);
      return { args, checked };
    },
    template: `
      <div style="padding: 24px;">
        <NvCheckbox v-bind="args" v-model="checked" />
        <p style="margin-top: 16px; font-size: 13px; font-weight: 600;">Status: {{ checked ? 'Checked' : 'Unchecked' }}</p>
      </div>
    `,
  }),
};

export const CheckedByDefault: Story = {
  render: (args) => ({
    components: { NvCheckbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: `
      <div style="padding: 24px;">
        <NvCheckbox v-bind="args" v-model="checked" label="I agree to the Terms of Service" />
      </div>
    `,
  }),
};

export const CheckmarkIcon: Story = {
  render: (args) => ({
    components: { NvCheckbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
        <NvCheckbox v-bind="args" v-model="checked" mark="check" label="Checkmark style" />
        <NvCheckbox v-bind="args" v-model="checked" mark="square" label="Square style (Auth authentic)" />
      </div>
    `,
  }),
};

export const WithDescription: Story = {
  render: (args) => ({
    components: { NvCheckbox },
    setup() {
      const checked = ref(true);
      return { args, checked };
    },
    template: `
      <div style="padding: 24px;">
        <NvCheckbox
          v-model="checked"
          label="Two-factor authentication (2FA)"
          description="Require an authenticator code on every sign in to Netuvio Identity."
        />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { NvCheckbox },
    setup() {
      const sm = ref(true);
      const md = ref(true);
      const lg = ref(true);
      return { sm, md, lg };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
        <NvCheckbox v-model="sm" size="sm" label="Small checkbox (16px)" />
        <NvCheckbox v-model="md" size="md" label="Medium checkbox (20px - Auth default)" />
        <NvCheckbox v-model="lg" size="lg" label="Large checkbox (24px)" />
      </div>
    `,
  }),
};

export const IndeterminateAndDisabled: Story = {
  render: () => ({
    components: { NvCheckbox },
    setup() {
      const c1 = ref(false);
      const c2 = ref(true);
      return { c1, c2 };
    },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
        <NvCheckbox v-model="c1" indeterminate label="Indeterminate (partially selected)" />
        <NvCheckbox v-model="c2" disabled label="Disabled Checked" />
        <NvCheckbox v-model="c1" disabled label="Disabled Unchecked" />
        <NvCheckbox v-model="c1" error="This field is required" label="With Error Message" />
      </div>
    `,
  }),
};
