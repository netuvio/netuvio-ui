import type { Meta, StoryObj } from '@storybook/vue3';
import DisplayHeading from './DisplayHeading.vue';

const meta = {
  title: 'Components/DisplayHeading',
  component: DisplayHeading,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'div'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'accent', 'solid'],
    },
    stroke: {
      control: 'boolean',
    },
  },
  args: {
    as: 'h2',
    size: 'lg',
    variant: 'dark',
    stroke: true,
  },
} satisfies Meta<typeof DisplayHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { DisplayHeading },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 30px; background: var(--nv-color-accent, #ABED30); border-radius: 16px;">
        <DisplayHeading v-bind="args" text="Netuvio Platform" />
      </div>
    `,
  }),
};

export const HeroHeading: Story = {
  name: 'Hero Heading (Image 4)',
  render: (args) => ({
    components: { DisplayHeading },
    setup() {
      const heroLines = [
        { text: 'One account.', variant: 'dark' as const },
        { text: 'Endless possibilities.', variant: 'light' as const },
      ];
      return { args, heroLines };
    },
    template: `
      <div style="padding: 60px 40px; background: var(--nv-color-accent, #ABED30); border-radius: 24px; overflow: hidden;">
        <DisplayHeading
          v-bind="args"
          size="xl"
          :lines="heroLines"
        />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: (args) => ({
    components: { DisplayHeading },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; padding: 40px; background: var(--nv-color-accent, #ABED30); border-radius: 20px;">
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Dark variant (with white-to-lime gradient stroke):</p>
          <DisplayHeading size="md" variant="dark" text="One account." />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Light variant (white with bold black stroke):</p>
          <DisplayHeading size="md" variant="light" text="Endless possibilities." />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Accent variant (lime accent with black stroke):</p>
          <DisplayHeading size="md" variant="accent" text="Your digital world." />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-size: 12px; font-weight: 800; text-transform: uppercase;">Solid variant (clean text without layered stroke):</p>
          <DisplayHeading size="md" variant="solid" text="Pure typography." />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components: { DisplayHeading },
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 30px; background: var(--nv-color-accent, #ABED30); border-radius: 20px;">
        <div>
          <span style="font-size: 11px; font-weight: 700;">Size SM:</span>
          <DisplayHeading size="sm" variant="dark" text="Service overview" />
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 700;">Size MD:</span>
          <DisplayHeading size="md" variant="dark" text="Webhosting management" />
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 700;">Size LG:</span>
          <DisplayHeading size="lg" variant="dark" text="Netuvio Platform" />
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 700;">Size XL:</span>
          <DisplayHeading size="xl" variant="dark" text="Endless possibilities." />
        </div>
      </div>
    `,
  }),
};
