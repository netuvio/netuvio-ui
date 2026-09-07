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
    size: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
  args: {
    name: 'dashboard',
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

export const AdminIcons: Story = {
  name: 'Admin Panel Navigation Icons',
  render: () => ({
    components: { NvIcon },
    setup() {
      const adminIcons: Array<{ name: IconName; label: string }> = [
        { name: 'dashboard', label: 'Dashboard / Overview' },
        { name: 'server', label: 'Webhosting & Servers' },
        { name: 'invoices', label: 'Invoices & Billing' },
        { name: 'credit-card', label: 'Payments' },
        { name: 'services', label: 'Services / Projects' },
        { name: 'user', label: 'Account Profile' },
        { name: 'settings', label: 'Settings' },
        { name: 'logout', label: 'Sign out' },
      ];
      return { adminIcons };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; padding: 24px; background: #ffffff; border-radius: 16px; border: 2px solid #1c1e16;">
        <div
          v-for="item in adminIcons"
          :key="item.name"
          style="display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; background: #f6f7f2;"
        >
          <div style="width: 36px; height: 36px; display: grid; place-items: center; border-radius: 8px; background: #ABED30; border: 2px solid #1c1e16;">
            <NvIcon :name="item.name" :size="20" color="#1c1e16" />
          </div>
          <span style="font-size: 13px; font-weight: 700; color: #1c1e16;">{{ item.label }}</span>
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
          <NvIcon name="shield" :size="28" color="#ABED30" />
          <NvIcon name="lock" :size="28" color="#3b82f6" />
          <NvIcon name="check" :size="28" color="#22c55e" />
          <NvIcon name="close" :size="28" color="#ef4444" />
          <NvIcon name="brand-mark" :size="28" color="#ABED30" />
        </div>
      </div>
    `,
  }),
};
