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
    title: 'Informace k objednávce',
    description: 'Zadejte kód objednávky, který jste obdrželi v e-mailu po dokončení nákupu služeb Netuvio.',
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
          title="Ověření objednávky"
          description="Zadejte kód objednávky, který vám přišel na e-mail po dokončení nákupu služeb Netuvio."
        />
        <NvAlert
          variant="success"
          title="Objednávka byla úspěšně ověřena"
          description="Kód NTV-4892-BC je platný a připraven k aktivaci účtu."
        />
        <NvAlert
          variant="warning"
          title="Blížící se expirace domény"
          description="Vaše doména netuvio.cz vyprší za 7 dní. Nezapomeňte prodloužit platnost."
        />
        <NvAlert
          variant="error"
          title="Chyba při přihlášení"
          description="Neplatné uživatelské jméno nebo heslo. Zkontrolujte prosím zadané údaje."
        />
        <NvAlert
          variant="accent"
          title="Nová verze Netuvio Platform"
          description="Byl přidán nový přehled faktur a správa SSL certifikátů."
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
          title="Objednávka ověřena"
          description="Kód NTV-9817-AX je vázán k účtu contact@skudrna.com"
        >
          <template #action>
            <NvButton size="sm" variant="secondary" radius="md">Změnit</NvButton>
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
          title="Oznámení"
          description="Tento alert můžete kliknutím na křížek vpravo zavřít."
          @dismiss="visible = false"
        />
        <p v-else style="font-size: 13px; font-weight: 600;">Alert byl zavřen.</p>
      </div>
    `,
  }),
};
