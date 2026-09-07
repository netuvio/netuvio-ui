import type { Meta, StoryObj } from '@storybook/vue3';
import NvIcon from './NvIcon.vue';
import { ICONS_MASK_DATA, type IconName } from './iconData';

const iconNames = Object.keys(ICONS_MASK_DATA) as IconName[];

const meta = {
  title: 'Components/Icon',
  component: NvIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconNames,
    },
    filled: {
      control: 'boolean',
      description: 'Renders the filled variant of the icon if available',
    },
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
  args: {
    name: 'dashboard',
    filled: false,
    size: 24,
    color: '#1c1e16',
  },
} satisfies Meta<typeof NvIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NvIcon },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px;">
        <NvIcon v-bind="args" />
      </div>
    `,
  }),
};

export const OutlineVsFilled: Story = {
  name: 'Outline vs Filled Variants',
  render: () => ({
    components: { NvIcon },
    setup() {
      const sampleIcons: IconName[] = [
        'home',
        'dashboard',
        'server',
        'invoices',
        'credit-card',
        'services',
        'user',
        'shield',
        'lock',
        'bell',
        'star',
        'bookmark',
        'heart',
        'alert',
        'info',
        'settings',
        'eye',
        'mail',
        'trash',
      ];
      return { sampleIcons };
    },
    template: `
      <div style="padding: 24px; background: #ffffff; border-radius: 16px; border: 2px solid #1c1e16;">
        <h3 style="margin: 0 0 16px; font-size: 16px; font-weight: 850;">Outline vs Filled comparison (ideal for active nav states)</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px;">
          <div
            v-for="name in sampleIcons"
            :key="name"
            style="display: flex; flex-direction: column; gap: 8px; padding: 12px; border: 2px solid #e2e4dc; border-radius: 10px;"
          >
            <span style="font-size: 12px; font-weight: 800; color: #1c1e16;">{{ name }}</span>
            <div style="display: flex; gap: 12px; align-items: center;">
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <div style="width: 38px; height: 38px; display: grid; place-items: center; border-radius: 8px; background: #f6f8ef; border: 2px solid #1c1e16;">
                  <NvIcon :name="name" :size="20" color="#1c1e16" />
                </div>
                <span style="font-size: 10px; font-weight: 700; color: #62665a;">Outline</span>
              </div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">
                <div style="width: 38px; height: 38px; display: grid; place-items: center; border-radius: 8px; background: var(--nv-color-accent, #ABED30); border: 2px solid #1c1e16; box-shadow: 2px 2px 0 #1c1e16;">
                  <NvIcon :name="name" filled :size="20" color="#1c1e16" />
                </div>
                <span style="font-size: 10px; font-weight: 700; color: #1c1e16;">Filled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

export const AdminIcons: Story = {
  name: 'Admin Panel Navigation Icons (Active States)',
  render: () => ({
    components: { NvIcon },
    setup() {
      const adminIcons: Array<{ name: IconName; label: string; active?: boolean }> = [
        { name: 'dashboard', label: 'Overview', active: true },
        { name: 'server', label: 'Webhosting' },
        { name: 'invoices', label: 'Invoices & Payments' },
        { name: 'services', label: 'Services' },
        { name: 'user', label: 'Account Profile' },
        { name: 'settings', label: 'Settings' },
      ];
      return { adminIcons };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px; max-width: 320px; padding: 20px; background: #ffffff; border-radius: 16px; border: 2px solid #1c1e16; box-shadow: 4px 4px 0 #1c1e16;">
        <div
          v-for="item in adminIcons"
          :key="item.name"
          :style="{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '2px solid #1c1e16',
            background: item.active ? 'var(--nv-color-accent, #ABED30)' : '#f6f8ef',
            boxShadow: item.active ? '3px 3px 0 #1c1e16' : 'none',
            cursor: 'pointer',
          }"
        >
          <NvIcon :name="item.name" :filled="item.active" :size="20" color="#1c1e16" />
          <span :style="{ fontSize: '13px', fontWeight: item.active ? '850' : '650', color: '#1c1e16' }">
            {{ item.label }}
          </span>
        </div>
      </div>
    `,
  }),
};

export const AllIconsGrid: Story = {
  name: 'All Available Mask Icons',
  render: () => ({
    components: { NvIcon },
    setup() {
      return { iconNames };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px; padding: 24px; background: #ffffff; border-radius: 16px;">
        <div
          v-for="name in iconNames"
          :key="name"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 14px; border: 2px solid #e2e4dc; border-radius: 10px; gap: 8px;"
        >
          <NvIcon :name="name" :size="24" color="#1c1e16" />
          <span style="font-size: 11px; font-weight: 600; color: #62665a; text-align: center; word-break: break-all;">
            {{ name }}
          </span>
        </div>
      </div>
    `,
  }),
};

export const SizesAndColors: Story = {
  name: 'Sizes & Custom Background Colors',
  render: () => ({
    components: { NvIcon },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; padding: 24px; background: #1c1e16; border-radius: 16px;">
        <div style="display: flex; align-items: center; gap: 16px;">
          <NvIcon name="bell" :size="16" color="#ffffff" />
          <NvIcon name="bell" :size="20" color="#ffffff" />
          <NvIcon name="bell" :size="24" color="#ffffff" />
          <NvIcon name="bell" :size="32" color="#ffffff" />
          <NvIcon name="bell" :size="48" color="#ffffff" />
        </div>
        <div style="display: flex; align-items: center; gap: 16px;">
          <NvIcon name="shield" filled :size="28" color="#ABED30" />
          <NvIcon name="lock" filled :size="28" color="#3b82f6" />
          <NvIcon name="check" :size="28" color="#22c55e" />
          <NvIcon name="close" :size="28" color="#ef4444" />
          <NvIcon name="brand-mark" :size="28" color="#ABED30" />
        </div>
      </div>
    `,
  }),
};
