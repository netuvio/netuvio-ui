import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NvSlider from './NvSlider.vue';

const meta = {
  title: 'Components/Slider', component: NvSlider, tags: ['autodocs'],
  args: { label: 'CPU', min: 250, max: 4000, step: 250, modelValue: 1000, unit: 'm', hint: '1,000m = 1 vCPU' },
  argTypes: { theme: { control: 'select', options: ['light', 'dark'] } },
} satisfies Meta<typeof NvSlider>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: args => ({
    components: { NvSlider },
    setup() { return { args, value: ref(args.modelValue) }; },
    template: '<NvSlider v-bind="args" v-model="value" />',
  }),
};
export const Disabled: Story = { args: { disabled: true } };
export const SingleValue: Story = { args: { min: 250, max: 250, modelValue: 250 } };
