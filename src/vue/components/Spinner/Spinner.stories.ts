import type { Meta, StoryObj } from '@storybook/vue3';
import NvSpinner from './NvSpinner.vue';

const meta: Meta<typeof NvSpinner> = {
  title: 'Components/Spinner',
  component: NvSpinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the spinner',
    },
    icon: {
      control: 'text',
      description: 'Center arrow character',
    },
    iconName: {
      control: 'text',
      description: 'NvIcon name',
    },
  },
  args: {
    size: 'lg',
    icon: '↗',
  },
};

export default meta;
type Story = StoryObj<typeof NvSpinner>;

export const Default: Story = {
  render: (args) => ({
    components: { NvSpinner },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 48px; display: grid; place-items: center;">
        <NvSpinner v-bind="args" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { NvSpinner },
    template: `
      <div style="padding: 48px; display: flex; gap: 32px; align-items: center; justify-content: center;">
        <NvSpinner size="sm" />
        <NvSpinner size="md" />
        <NvSpinner size="lg" />
      </div>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    components: { NvSpinner },
    template: `
      <div style="padding: 48px; display: flex; gap: 32px; align-items: center; justify-content: center;">
        <NvSpinner size="lg" iconName="refresh" />
        <NvSpinner size="lg" iconName="lock" />
        <NvSpinner size="lg" icon="✓" />
      </div>
    `,
  }),
};
