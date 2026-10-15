import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NvModal from './NvModal.vue';
import { NvButton } from '../Button';

const meta = {
  title: 'Components/Modal',
  component: NvModal,
  tags: ['autodocs'],
  args: { title: 'Database details', description: 'Manage your database connection and resources.', closeLabel: 'Close' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] }, theme: { control: 'select', options: ['light', 'dark'] } },
} satisfies Meta<typeof NvModal>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: (args) => ({
    components: { NvModal, NvButton },
    setup() { return { args, open: ref(false) }; },
    template: `<NvButton @click="open = true">Open modal</NvButton>
      <NvModal v-bind="args" v-model="open">
        <p>PostgreSQL 18 · 512 MB RAM · 5 GB storage</p>
        <template #footer><NvButton @click="open = false">Done</NvButton></template>
      </NvModal>`,
  }),
};
