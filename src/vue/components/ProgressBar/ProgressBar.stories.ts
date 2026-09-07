import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import NvProgressBar from './NvProgressBar.vue';

const meta: Meta<typeof NvProgressBar> = {
  title: 'Components/ProgressBar',
  component: NvProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Infinite animated loading bar',
    },
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'danger'],
      description: 'Visual color variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Bar thickness',
    },
    radius: {
      control: 'select',
      options: ['full', 'md', 'none'],
      description: 'Border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md'],
      description: 'Brutalist box shadow',
    },
    label: {
      control: 'text',
      description: 'Header label',
    },
    showValue: {
      control: 'boolean',
      description: 'Display percentage',
    },
  },
  args: {
    value: 65,
    max: 100,
    indeterminate: false,
    variant: 'default',
    size: 'md',
    radius: 'full',
    shadow: 'sm',
    label: 'Disk space utilization',
    showValue: true,
  },
};

export default meta;
type Story = StoryObj<typeof NvProgressBar>;

export const Default: Story = {
  render: (args) => ({
    components: { NvProgressBar },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px; max-width: 480px;">
        <NvProgressBar v-bind="args" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    components: { NvProgressBar },
    template: `
      <div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 20px;">
        <NvProgressBar indeterminate label="Redirecting..." />
        <NvProgressBar indeterminate variant="accent" size="lg" label="Uploading backup archive..." />
      </div>
    `,
  }),
};

export const VariantsAndSizes: Story = {
  render: () => ({
    components: { NvProgressBar },
    template: `
      <div style="padding: 24px; max-width: 480px; display: flex; flex-direction: column; gap: 24px;">
        <NvProgressBar :value="35" size="sm" variant="default" label="Small Default (6px)" showValue />
        <NvProgressBar :value="60" size="md" variant="accent" label="Medium Accent (8px - Auth default)" showValue />
        <NvProgressBar :value="80" size="lg" variant="success" label="Large Success (12px)" showValue />
        <NvProgressBar :value="95" size="xl" variant="danger" label="Extra Large Danger (16px)" showValue />
      </div>
    `,
  }),
};

export const AnimatedProgress: Story = {
  render: () => ({
    components: { NvProgressBar },
    setup() {
      const progress = ref(10);
      let timer: any;
      onMounted(() => {
        timer = setInterval(() => {
          progress.value = (progress.value + 15) % 105;
        }, 1200);
      });
      onUnmounted(() => {
        clearInterval(timer);
      });
      return { progress };
    },
    template: `
      <div style="padding: 24px; max-width: 480px;">
        <NvProgressBar
          :value="progress"
          size="lg"
          variant="accent"
          label="Provisioning service container..."
          showValue
        />
      </div>
    `,
  }),
};
