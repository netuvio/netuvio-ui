import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import NvAlert from './NvAlert.vue';
import NvButton from '../Button/Button.vue';

const meta: Meta<typeof NvAlert> = {
  title: 'Components/Alert',
  component: NvAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'error', 'success', 'warning', 'accent', 'default'],
      description: 'Visual alert variant',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Border radius style',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md'],
      description: 'Brutalist box shadow',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    description: {
      control: 'text',
      description: 'Alert message body',
    },
    dismissible: {
      control: 'boolean',
      description: 'Allows dismissing the alert',
    },
    icon: {
      control: 'boolean',
      description: 'Toggles alert icon',
    },
  },
  args: {
    variant: 'info',
    title: 'Order information',
    description: 'Enter the order code you received in your confirmation email after completing your Netuvio purchase.',
    radius: 'md',
    shadow: 'sm',
    dismissible: false,
    icon: true,
  },
};

export default meta;
type Story = StoryObj<typeof NvAlert>;

export const Default: Story = {
  render: (args) => ({
    components: { NvAlert },
    setup() {
      return { args };
    },
    template: `
      <div style="padding: 24px; max-width: 540px;">
        <NvAlert v-bind="args" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { NvAlert },
    template: `
      <div style="padding: 24px; display: flex; flex-direction: column; gap: 16px; max-width: 560px;">
        <NvAlert
          variant="info"
          title="Order verification"
          description="Please enter the order verification code sent to your email."
        />
        <NvAlert
          variant="success"
          title="Order verified successfully"
          description="Code NTV-4892-BC is valid and ready for account activation."
        />
        <NvAlert
          variant="warning"
          title="Upcoming domain expiration"
          description="Your domain netuvio.cz expires in 7 days. Please renew your registration."
        />
        <NvAlert
          variant="error"
          title="Sign in failed"
          description="Invalid username or password. Please verify your credentials and try again."
        />
        <NvAlert
          variant="accent"
          title="New Netuvio Platform version"
          description="Added new invoice management and automated SSL certificate provisioning."
        />
      </div>
    `,
  }),
};

export const WithActions: Story = {
  render: () => ({
    components: { NvAlert, NvButton },
    template: `
      <div style="padding: 24px; max-width: 600px;">
        <NvAlert
          variant="success"
          title="Order verified"
          description="Order NTV-9817-AX is linked to contact@skudrna.com"
        >
          <template #action>
            <NvButton size="sm" variant="secondary" radius="md">Change</NvButton>
          </template>
        </NvAlert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  render: () => ({
    components: { NvAlert },
    setup() {
      const visible = ref(true);
      return { visible };
    },
    template: `
      <div style="padding: 24px; max-width: 540px;">
        <NvAlert
          v-if="visible"
          variant="info"
          dismissible
          title="Notice"
          description="You can dismiss this alert by clicking the close button on the right."
          @dismiss="visible = false"
        />
        <p v-else style="font-size: 13px; font-weight: 600;">Alert was dismissed.</p>
      </div>
    `,
  }),
};
