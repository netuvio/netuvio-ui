import type { Meta, StoryObj } from '@storybook/vue3';
import NvBadge from './NvBadge.vue';

const meta: Meta<typeof NvBadge> = {
  title: 'Components/Badge',
  component: NvBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'default', 'subtle', 'muted', 'dark', 'success', 'danger', 'warning', 'outline'],
      description: 'Visual color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the badge',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Border radius style',
    },
    threeD: {
      control: 'boolean',
      description: 'Brutalist 3D box-shadow',
    },
    dot: {
      control: 'boolean',
      description: 'Displays a circular status dot',
    },
    interactive: {
      control: 'boolean',
      description: 'Adds hover/active 3D movement for clickable badges',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables interactions when badge is interactive',
    },
    uppercase: {
      control: 'boolean',
      description: 'Uppercase text formatting',
    },
  },
  args: {
    variant: 'accent',
    size: 'md',
    radius: 'full',
    threeD: true,
    dot: false,
    interactive: false,
    disabled: false,
    uppercase: true,
  },
};

export default meta;
type Story = StoryObj<typeof NvBadge>;

export const Default: Story = {
  render: (args) => ({
    components: { NvBadge },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px;">
        <NvBadge v-bind="args">Step 1</NvBadge>
      </div>
    `,
  }),
};

export const AuthEyebrow: Story = {
  render: () => ({
    components: { NvBadge },
    template: `
      <div style="padding: 24px; display: flex; gap: 16px; align-items: center;">
        <NvBadge size="lg" variant="default">NETUVIO IDENTITY</NvBadge>
        <NvBadge size="md" variant="accent">STEP 1: VERIFICATION</NvBadge>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { NvBadge },
    template: `
      <div style="padding: 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <NvBadge variant="accent">Accent (#ABED30)</NvBadge>
        <NvBadge variant="default">Default</NvBadge>
        <NvBadge variant="subtle">Subtle</NvBadge>
        <NvBadge variant="muted">Muted</NvBadge>
        <NvBadge variant="dark">Dark</NvBadge>
        <NvBadge variant="success" dot>Active</NvBadge>
        <NvBadge variant="warning" dot>Pending Payment</NvBadge>
        <NvBadge variant="danger" dot>Expired</NvBadge>
        <NvBadge variant="outline">Outline</NvBadge>
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { NvBadge },
    template: `
      <div style="padding: 24px; display: flex; flex-wrap: wrap; gap: 12px; align-items: center;">
        <NvBadge icon="shield" variant="accent">Secured</NvBadge>
        <NvBadge icon="check" variant="success">Verified</NvBadge>
        <NvBadge iconRight="arrow-right" variant="default" interactive>Go to administration</NvBadge>
        <NvBadge icon="user" variant="subtle">contact@skudrna.com</NvBadge>
      </div>
    `,
  }),
};

export const InteractiveFilters: Story = {
  render: () => ({
    components: { NvBadge },
    template: `
      <div style="padding: 24px; display: flex; gap: 12px;">
        <NvBadge interactive variant="accent">All Services</NvBadge>
        <NvBadge interactive variant="default">Webhosting</NvBadge>
        <NvBadge interactive variant="default">Domains</NvBadge>
        <NvBadge interactive variant="default">Invoices</NvBadge>
      </div>
    `,
  }),
};
