import type { Meta, StoryObj } from '@storybook/vue3';
import ErrorPage from './ErrorPage.vue';

const meta: Meta<typeof ErrorPage> = {
  title: 'Components/ErrorPage',
  component: ErrorPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    code: {
      control: 'number',
      description: 'HTTP status kód (400–511)',
    },
    message: {
      control: 'text',
      description: 'Vlastní popis chyby (přepíše výchozí text)',
    },
    lang: {
      control: 'select',
      options: ['en', 'cs'],
      description: 'Jazyk UI textů',
    },
    theme: {
      control: 'select',
      options: ['auto', 'light', 'dark'],
      description: "Barevný theme ('auto' = prefers-color-scheme)",
    },
    homepageUrl: {
      control: 'text',
      description: "URL pro tlačítko 'Na hlavní stránku'",
    },
    retryUrl: {
      control: 'text',
      description: "URL pro tlačítko 'Zkusit znovu'",
    },
    requestId: {
      control: 'text',
      description: 'Volitelné ID požadavku (CF-Ray, X-Request-ID…)',
    },
    netuvioUrl: {
      control: 'text',
      description: 'Override URL loga / support odkazu',
    },
  },
  args: {
    code: 404,
    lang: 'en',
    theme: 'auto',
    homepageUrl: '/',
  },
  render: (args: Record<string, any>) => ({
    components: { ErrorPage },
    setup() {
      return { args };
    },
    template: '<ErrorPage v-bind="args" />',
  }),
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

// ── Common codes ───────────────────────────────────────────────────────────

export const NotFound: Story = {
  name: '404 – Page Not Found',
  args: {
    code: 404,
    lang: 'en',
    theme: 'light',
  },
};

export const ServerError: Story = {
  name: '500 – Something Went Wrong',
  args: {
    code: 500,
    lang: 'en',
    theme: 'light',
  },
};

export const ServiceUnavailable: Story = {
  name: '503 – Service Unavailable',
  args: {
    code: 503,
    lang: 'en',
    theme: 'light',
  },
};

export const Forbidden: Story = {
  name: '403 – Access Denied',
  args: {
    code: 403,
    lang: 'en',
    theme: 'light',
  },
};

export const Unauthorized: Story = {
  name: '401 – Authentication Required',
  args: {
    code: 401,
    lang: 'en',
    theme: 'light',
  },
};

export const BadGateway: Story = {
  name: '502 – Bad Gateway',
  args: {
    code: 502,
    lang: 'en',
    theme: 'light',
  },
};

// ── Language ───────────────────────────────────────────────────────────────

export const Czech404: Story = {
  name: '404 – Česky (light)',
  args: {
    code: 404,
    lang: 'cs',
    theme: 'light',
  },
};

export const Czech500: Story = {
  name: '500 – Česky (light)',
  args: {
    code: 500,
    lang: 'cs',
    theme: 'light',
  },
};

// ── Dark theme ─────────────────────────────────────────────────────────────

export const DarkNotFound: Story = {
  name: '404 – Dark theme',
  args: {
    code: 404,
    lang: 'en',
    theme: 'dark',
  },
};

export const DarkServerError: Story = {
  name: '500 – Dark theme (CS)',
  args: {
    code: 500,
    lang: 'cs',
    theme: 'dark',
  },
};

// ── Custom message ─────────────────────────────────────────────────────────

export const CustomMessage: Story = {
  name: 'Custom message prop',
  args: {
    code: 404,
    lang: 'en',
    theme: 'light',
    message: 'This page has been moved to a new location. Please update your bookmarks.',
  },
};

// ── Custom message with i18n ────────────────────────────────────────────────

export const CustomLocalizedMessage: Story = {
  name: 'Custom i18n message prop ({ cs, en })',
  args: {
    code: 404,
    lang: 'cs',
    theme: 'light',
    heading: {
      cs: 'E-shop nenalezen',
      en: 'Shop Not Found',
    },
    message: {
      cs: 'Tento internetový obchod byl pozastaven nebo přesunut na novou doménu.',
      en: 'This online store has been suspended or moved to a new domain.',
    },
  },
};

export const CustomDictionary: Story = {
  name: 'Custom messages dictionary by code',
  args: {
    code: 503,
    lang: 'cs',
    theme: 'light',
    titles: {
      503: {
        cs: 'Plánovaná údržba',
        en: 'Scheduled Maintenance',
      },
    },
    messages: {
      503: {
        cs: 'Právě probíhá plánovaný upgrade databáze. Budeme zpět v 03:00.',
        en: 'A scheduled database upgrade is in progress. We will be back at 03:00.',
      },
    },
    ui: {
      cs: {
        retry: 'Zkontrolovat stav',
      },
      en: {
        retry: 'Check status',
      },
    },
  },
};

export const CustomSlotMessage: Story = {
  name: 'Custom slot message (Rich HTML / Vue)',
  args: {
    code: 404,
    lang: 'cs',
    theme: 'light',
  },
  render: (args: Record<string, any>) => ({
    components: { ErrorPage },
    setup() {
      return { args };
    },
    template: `
      <ErrorPage v-bind="args">
        <template #description="{ lang }">
          <span v-if="lang === 'cs'">
            Stránka nebyla nalezena. Přejděte na <a href="#" style="color: var(--nv-color-carbon-900); font-weight: 800; text-decoration: underline;">hlavní katalog</a> nebo kontaktujte <a href="#" style="color: var(--nv-color-carbon-900); font-weight: 800; text-decoration: underline;">podporu</a>.
          </span>
          <span v-else>
            Page was not found. Browse our <a href="#" style="color: var(--nv-color-carbon-900); font-weight: 800; text-decoration: underline;">catalog</a> or contact <a href="#" style="color: var(--nv-color-carbon-900); font-weight: 800; text-decoration: underline;">support</a>.
          </span>
        </template>
      </ErrorPage>
    `,
  }),
};

// ── With request ID ────────────────────────────────────────────────────────

export const WithRequestId: Story = {
  name: '500 – With Request ID',
  args: {
    code: 500,
    lang: 'en',
    theme: 'light',
    requestId: 'CF-Ray: 8f3a2b1c4d5e6f7a-PRG',
  },
};

// ── Playground (all controls live) ────────────────────────────────────────

export const Playground: Story = {
  name: '⚙️ Playground',
  args: {
    code: 404,
    lang: 'en',
    theme: 'auto',
    homepageUrl: '/',
    retryUrl: '/',
  },
};

