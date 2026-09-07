import type { Meta, StoryObj } from '@storybook/vue3';
import { ref, h } from 'vue';
import Select from './Select.vue';

const meta = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    placement: {
      control: 'select',
      options: ['bottom', 'top'],
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
    disabled: {
      control: 'boolean',
    },
    block: {
      control: 'boolean',
    },
    native: {
      control: 'boolean',
    },
  },
  args: {
    size: 'md',
    radius: 'full',
    disabled: false,
    block: false,
    native: false,
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic options
const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'lime', label: 'Lime' },
];

// Icons for theme switcher (SVG render functions)
const SunIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('circle', { cx: '12', cy: '12', r: '4' }),
  h('path', { d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' })
]);

const MoonIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' })
]);

const MonitorIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2.3', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
  h('rect', { x: '2', y: '3', width: '20', height: '14', rx: '2' }),
  h('line', { x1: '8', y1: '21', x2: '16', y2: '21' }),
  h('line', { x1: '12', y1: '17', x2: '12', y2: '21' })
]);

const themeOptions = [
  { value: 'system', label: 'System', icon: MonitorIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'light', label: 'Light', icon: SunIcon },
];

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'cs', label: 'Czech' },
  { value: 'de', label: 'German' },
  { value: 'sk', label: 'Slovak' },
];

export const Default: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref('lime');
      return { args, selected, fruitOptions };
    },
    template: `
      <div style="min-height: 220px; padding: 20px;">
        <Select v-bind="args" v-model="selected" :options="fruitOptions" />
      </div>
    `,
  }),
};

export const ThemeSwitcher: Story = {
  name: 'Theme Switcher (Image 1)',
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref('light');
      return { args, selected, themeOptions };
    },
    template: `
      <div style="min-height: 260px; padding: 40px; background: var(--nv-color-accent, #ABED30); border-radius: 16px;">
        <p style="margin: 0 0 12px; font-weight: 700; font-size: 13px;">Theme selection:</p>
        <Select
          v-bind="args"
          v-model="selected"
          :options="themeOptions"
          placeholder="Theme"
        />
      </div>
    `,
  }),
};

export const LanguageSwitcher: Story = {
  name: 'Language Switcher (Image 1)',
  render: (args) => ({
    components: { Select },
    setup() {
      const selectedCustom = ref('en');
      const selectedNative = ref('en');
      return { args, selectedCustom, selectedNative, languageOptions };
    },
    template: `
      <div style="min-height: 260px; padding: 40px; background: var(--nv-color-accent, #ABED30); border-radius: 16px; display: flex; gap: 20px;">
        <div>
          <p style="margin: 0 0 8px; font-weight: 700; font-size: 13px;">Custom popup:</p>
          <Select
            v-bind="args"
            v-model="selectedCustom"
            :options="languageOptions"
          />
        </div>
        <div>
          <p style="margin: 0 0 8px; font-weight: 700; font-size: 13px;">Native select:</p>
          <Select
            v-bind="args"
            v-model="selectedNative"
            :options="languageOptions"
            :native="true"
          />
        </div>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const smVal = ref('en');
      const mdVal = ref('en');
      const lgVal = ref('en');
      return { args, smVal, mdVal, lgVal, languageOptions };
    },
    template: `
      <div style="display: flex; align-items: center; gap: 16px; min-height: 240px; padding: 20px;">
        <Select v-bind="args" size="sm" v-model="smVal" :options="languageOptions" />
        <Select v-bind="args" size="md" v-model="mdVal" :options="languageOptions" />
        <Select v-bind="args" size="lg" v-model="lgVal" :options="languageOptions" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref('en');
      return { args, selected, languageOptions };
    },
    template: `
      <div style="padding: 20px;">
        <Select v-bind="args" :disabled="true" v-model="selected" :options="languageOptions" />
      </div>
    `,
  }),
};
