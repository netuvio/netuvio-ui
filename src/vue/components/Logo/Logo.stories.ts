import type { Meta, StoryObj } from '@storybook/vue3';
import NvLogo from './NvLogo.vue';
import NvLogoMark from './NvLogoMark.vue';

const meta = {
  title: 'Components/Logo',
  component: NvLogo,
  tags: ['autodocs'],
  argTypes: {
    height: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['default', 'monochrome', 'dark', 'light', 'accent'],
    },
  },
  args: {
    height: 40,
    variant: 'default',
  },
} satisfies Meta<typeof NvLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullLogo: Story = {
  name: 'Full Logo (Image 5)',
  render: (args) => ({
    components: { NvLogo },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 30px; background: var(--nv-color-accent, #ABED30); border-radius: 16px; display: inline-block;">
        <NvLogo v-bind="args" />
      </div>
    `,
  }),
};

export const MarkOnly: Story = {
  name: 'Mark Only (Symbol)',
  render: () => ({
    components: { NvLogoMark },
    template: `
      <div style="display: flex; gap: 24px; align-items: center; padding: 30px; background: var(--nv-color-container, #ffffff); border-radius: 16px;">
        <NvLogoMark :size="32" variant="colored" />
        <NvLogoMark :size="48" variant="colored" />
        <NvLogoMark :size="64" variant="colored" />
      </div>
    `,
  }),
};

export const VariantsOnDark: Story = {
  name: 'Variants on Dark Background',
  render: () => ({
    components: { NvLogo, NvLogoMark },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 40px; background: #0f110b; border-radius: 16px;">
        <div>
          <p style="color: #9da192; font-size: 12px; margin: 0 0 8px;">Light variant (for dark surfaces):</p>
          <NvLogo :height="38" variant="light" />
        </div>
        <div>
          <p style="color: #9da192; font-size: 12px; margin: 0 0 8px;">Monochrome white logo:</p>
          <div style="color: #ffffff;">
            <NvLogo :height="38" variant="monochrome" />
          </div>
        </div>
        <div style="display: flex; gap: 16px; align-items: center;">
          <NvLogoMark :size="40" variant="colored" />
          <NvLogoMark :size="40" variant="white" />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { NvLogo },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 30px; background: var(--nv-color-accent, #ABED30); border-radius: 16px;">
        <div>
          <span style="font-size: 11px; font-weight: 700;">Height 28px:</span><br />
          <NvLogo :height="28" />
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 700;">Height 40px:</span><br />
          <NvLogo :height="40" />
        </div>
        <div>
          <span style="font-size: 11px; font-weight: 700;">Height 56px:</span><br />
          <NvLogo :height="56" />
        </div>
      </div>
    `,
  }),
};

export const CustomMaskColors: Story = {
  name: 'Custom Mask Colors & Mask URLs',
  render: () => ({
    components: { NvLogo, NvLogoMark },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 30px; background: #1c1e16; border-radius: 16px;">
        <div>
          <p style="color: #9da192; font-size: 12px; margin: 0 0 8px;">Accent colored mask logo:</p>
          <NvLogo :height="40" color="#ABED30" />
        </div>
        <div>
          <p style="color: #9da192; font-size: 12px; margin: 0 0 8px;">Custom brand color mark:</p>
          <div style="display: flex; gap: 16px;">
            <NvLogoMark :size="36" color="#ABED30" />
            <NvLogoMark :size="36" color="#ffffff" />
            <NvLogoMark :size="36" color="#3b82f6" />
            <NvLogoMark :size="36" color="#ef4444" />
          </div>
        </div>
      </div>
    `,
  }),
};

