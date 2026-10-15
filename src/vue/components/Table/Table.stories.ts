import type { Meta, StoryObj } from '@storybook/vue3';
import NvTable from './NvTable.vue';
import NvBadge from '../Badge/NvBadge.vue';

const columns = [
  { key: 'service', label: 'Service', width: '36%' },
  { key: 'environment', label: 'Environment' },
  { key: 'status', label: 'Status', align: 'center' as const },
  { key: 'requests', label: 'Requests', align: 'right' as const },
];

const rows = [
  { id: 1, service: 'Identity API', environment: 'Production', status: 'Online', requests: '24,891' },
  { id: 2, service: 'Billing worker', environment: 'Production', status: 'Warning', requests: '8,240' },
  { id: 3, service: 'Preview gateway', environment: 'Staging', status: 'Online', requests: '1,462' },
  { id: 4, service: 'Analytics sync', environment: 'Development', status: 'Paused', requests: '320' },
];

const meta = {
  title: 'Components/Table',
  component: NvTable,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl'] },
    variant: { control: 'select', options: ['default', 'subtle', 'accent'] },
    threeD: { control: 'boolean' },
    base3dOffset: { control: 'number' },
    block: { control: 'boolean' },
    striped: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
  args: {
    columns,
    rows,
    size: 'md',
    radius: 'xl',
    variant: 'default',
    threeD: true,
    base3dOffset: 4,
    block: true,
    striped: false,
    hoverable: true,
    loading: false,
  },
} satisfies Meta<typeof NvTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomCells: Story = {
  render: (args) => ({
    components: { NvTable, NvBadge },
    setup() {
      const statusVariant = (status: unknown) => status === 'Online' ? 'success' : status === 'Warning' ? 'warning' : 'muted';
      return { args, statusVariant };
    },
    template: `
      <div style="padding: 8px 8px 16px; min-width: 620px;">
        <NvTable v-bind="args" variant="accent" striped>
          <template #cell-service="{ value }"><strong>{{ value }}</strong></template>
          <template #cell-status="{ value }">
            <NvBadge :variant="statusVariant(value)" size="sm" :three-d="false">{{ value }}</NvBadge>
          </template>
        </NvTable>
      </div>
    `,
  }),
};

export const Empty: Story = {
  args: { rows: [], emptyText: 'Your services will appear here.' },
};

export const Loading: Story = { args: { loading: true } };

export const Sizes: Story = {
  render: () => ({
    components: { NvTable },
    setup() { return { columns: columns.slice(0, 3), rows: rows.slice(0, 2) }; },
    template: `
      <div style="display: grid; gap: 24px; padding: 8px 8px 16px; min-width: 560px;">
        <NvTable :columns="columns" :rows="rows" size="sm" />
        <NvTable :columns="columns" :rows="rows" size="md" />
        <NvTable :columns="columns" :rows="rows" size="lg" />
      </div>
    `,
  }),
};
