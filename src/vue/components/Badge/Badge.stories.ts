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
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
    radius: {
      control: 'select',
      options: ['full', 'md', 'sm', 'none'],
      description: 'Border radius style',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Brutalist box shadow',
    },
    dot: {
      control: 'boolean',
      description: 'Displays a circular status dot',
    },
    interactive: {
      control: 'boolean',
      description: 'Adds hover/active 3D movement for clickable badges',
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
    shadow: 'sm',
    dot: false,
    interactive: false,
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
        <NvBadge v-bind="args">Krok 1</NvBadge>
      </div>
    `,
  }),
};

export const AuthEyebrow: Story = {
  render: () => ({
    components: { NvBadge },
    template: `
      <div style="padding: 24px; display: flex; gap: 16px; align-items: center;">
        <NvBadge size="lg" shadow="lg" variant="default">NETUVIO IDENTITY</NvBadge>
        <NvBadge size="md" shadow="sm" variant="accent">KROK 1: OVĚŘENÍ</NvBadge>
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
        <NvBadge variant="success" dot>Aktivní</NvBadge>
        <NvBadge variant="warning" dot>Čeká na úhradu</NvBadge>
        <NvBadge variant="danger" dot>Expirováno</NvBadge>
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
        <NvBadge icon="shield" variant="accent">Zabezpečeno</NvBadge>
        <NvBadge icon="check" variant="success">Ověřeno</NvBadge>
        <NvBadge iconRight="arrow-right" variant="default" interactive>Přejít do administrace</NvBadge>
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
        <NvBadge interactive variant="accent" shadow="md">Všechny služby</NvBadge>
        <NvBadge interactive variant="default" shadow="sm">Webhosting</NvBadge>
        <NvBadge interactive variant="default" shadow="sm">Domény</NvBadge>
        <NvBadge interactive variant="default" shadow="sm">Faktury</NvBadge>
      </div>
    `,
  }),
};
