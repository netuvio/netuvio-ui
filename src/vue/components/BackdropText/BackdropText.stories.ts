import type { Meta, StoryObj } from '@storybook/vue3';
import NvBackdropText from './NvBackdropText.vue';
import Card from '../Card/Card.vue';
import Button from '../Button/Button.vue';
import DisplayHeading from '../DisplayHeading/DisplayHeading.vue';
import NvLogo from '../Logo/NvLogo.vue';
import NvIcon from '../Icon/NvIcon.vue';

const meta = {
  title: 'Components/BackdropText',
  component: NvBackdropText,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
    },
    fixed: {
      control: 'boolean',
    },
    color: {
      control: 'color',
    },
    strokeColor: {
      control: 'color',
    },
    scaleX: {
      control: 'number',
    },
    fontSize: {
      control: 'text',
    },
  },
  args: {
    text: 'IDENTITY',
    fixed: false,
    scaleX: 0.82,
  },
} satisfies Meta<typeof NvBackdropText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Netuvio Identity Hero (Image 3)',
  args: {
    text: 'IDENTITY',
    fixed: false,
    scaleX: 0.82,
  },
  render: (args) => ({
    components: { NvBackdropText, Card, Button, DisplayHeading, NvLogo, NvIcon },
    setup() {
      return { args };
    },
    template: `
      <div style="min-height: 640px; position: relative; isolation: isolate; display: flex; flex-direction: column; justify-content: space-between; padding: 28px clamp(20px, 5vw, 64px); background: var(--nv-color-accent, #ABED30); border-radius: 24px; overflow: hidden; border: 2px solid #1c1e16;">
        <!-- Contours background layer matching Netuvio.Auth.Web -->
        <div style="position: absolute; inset: 0; z-index: -2; background: url('/brand/contours.svg') center / 1750px auto; opacity: 0.18; pointer-events: none; -webkit-mask-image: linear-gradient(to bottom right, rgb(0 0 0 / 16%) 0%, rgb(0 0 0 / 16%) 10%, rgb(0 0 0 / 34%) 48%, #000 100%); mask-image: linear-gradient(to bottom right, rgb(0 0 0 / 16%) 0%, rgb(0 0 0 / 16%) 10%, rgb(0 0 0 / 34%) 48%, #000 100%);" />

        <!-- Exact Backdrop text spanning viewport -->
        <NvBackdropText
          v-bind="args"
          :fixed="false"
        />

        <!-- Header -->
        <header style="position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 20px;">
          <NvLogo width="160px" height="42px" color="#1c1e16" />
          <a
            href="https://netuvio.cz"
            target="_blank"
            rel="noopener noreferrer"
            style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; color: #1c1e16; text-decoration: none; background: #ffffff; border: 2px solid #1c1e16; border-radius: 9999px; padding: 8px 18px; box-shadow: 4px 4px 0 #1c1e16;"
          >
            <span>Website</span>
            <span aria-hidden="true">↗</span>
          </a>
        </header>

        <!-- Center Content: Headline & Account Card -->
        <main style="position: relative; z-index: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: clamp(32px, 5vw, 64px); align-items: center; margin: 40px 0;">
          <!-- Left: Display Headline -->
          <div style="max-width: 520px;">
            <div style="display: inline-block; margin-bottom: 16px;">
              <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 850; letter-spacing: 1.5px; text-transform: uppercase; background: #ffffff; border: 2px solid #1c1e16; border-radius: 9999px; padding: 6px 14px; box-shadow: 2px 2px 0 #1c1e16; color: #1c1e16;">
                NETUVIO IDENTITY
              </span>
            </div>
            <DisplayHeading
              as="h1"
              size="lg"
              :lines="[
                { text: 'One account.', variant: 'dark' },
                { text: 'Endless', variant: 'light' },
                { text: 'possibilities.', variant: 'dark' }
              ]"
            />
            <div style="margin-top: 24px; display: inline-block; background: var(--nv-color-accent, #ABED30); border: 2px solid #1c1e16; border-radius: 12px; padding: 12px 18px; font-size: 13.5px; font-weight: 700; line-height: 1.4; box-shadow: 3px 3px 0 #1c1e16; color: #1c1e16;">
              Your projects, services and next big ideas. It all starts with your Netuvio account.
            </div>
          </div>

          <!-- Right: Account Overview Card (Image 1 & 3) -->
          <div style="max-width: 440px; justify-self: end; width: 100%;">
            <Card tag="NETUVIO ACCOUNT" radius="xl" padding="lg" shadow="card">
              <h2 style="font-size: 26px; font-weight: 900; margin: 0 0 6px; letter-spacing: -1px; line-height: 1.15; color: #1c1e16;">
                Your account. Your space.
              </h2>
              <p style="margin: 0 0 20px; color: #62665a; font-size: 14px; font-weight: 550; line-height: 1.4;">
                Manage your credentials and access to Netuvio services.
              </p>

              <!-- Nested subtle user info pill with NvIcon -->
              <Card
                variant="subtle"
                radius="lg"
                padding="sm"
                style="margin-bottom: 16px; display: flex; align-items: center; gap: 14px;"
              >
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--nv-color-accent, #ABED30); border: 2px solid #1c1e16; display: grid; place-items: center; flex-shrink: 0;">
                  <NvIcon name="user" :size="20" color="#1c1e16" />
                </div>
                <div style="overflow: hidden;">
                  <p style="margin: 0; font-size: 12px; color: #62665a; font-weight: 600;">Signed in as</p>
                  <p style="margin: 2px 0 0; font-size: 13.5px; font-weight: 800; color: #1c1e16; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    Stanislav Škudrna (contact@skudrna.com)
                  </p>
                </div>
              </Card>

              <!-- Auth button with 14px text and right arrow -->
              <Button
                variant="primary"
                block
                size="md"
                radius="md"
                justify="between"
                :font-size="14"
                :font-weight="800"
                icon-right="→"
              >
                Sign out
              </Button>
            </Card>
          </div>
        </main>

        <!-- Footer -->
        <footer style="position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; font-size: 12px; font-weight: 600; color: #3c4033;">
          <span>© 2026 Netuvio</span>
          <span>One account for all Netuvio services</span>
        </footer>
      </div>
    `,
  }),
};

export const DarkSurface: Story = {
  name: 'Dark Theme (Identity Dark)',
  render: () => ({
    components: { NvBackdropText, Card, Button, DisplayHeading, NvLogo, NvIcon },
    template: `
      <div style="min-height: 640px; position: relative; isolation: isolate; display: flex; flex-direction: column; justify-content: space-between; padding: 28px clamp(20px, 5vw, 64px); background: #0f110b; border-radius: 24px; overflow: hidden; border: 2px solid #2e3323;">
        <!-- Contours in dark mode -->
        <div style="position: absolute; inset: 0; z-index: -2; background: url('/brand/contours.svg') center / 1750px auto; opacity: 0.08; filter: invert(1); pointer-events: none;" />

        <NvBackdropText
          text="IDENTITY"
          :fixed="false"
          color="#161811"
          stroke-color="#252b1b"
        />

        <header style="position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; gap: 20px;">
          <NvLogo width="160px" height="42px" color="#ffffff" />
          <span style="font-size: 13px; font-weight: 800; color: #ffffff; background: #171912; border: 2px solid #2e3323; border-radius: 9999px; padding: 8px 18px; box-shadow: 4px 4px 0 #000000;">
            Website ↗
          </span>
        </header>

        <main style="position: relative; z-index: 1; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 48px; align-items: center; margin: 40px 0;">
          <div style="max-width: 520px;">
            <div style="display: inline-block; margin-bottom: 16px;">
              <span style="display: inline-flex; align-items: center; font-size: 11px; font-weight: 850; letter-spacing: 1.5px; text-transform: uppercase; background: #171912; border: 2px solid #2e3323; border-radius: 9999px; padding: 6px 14px; color: #f2f4ec;">
                NETUVIO IDENTITY
              </span>
            </div>
            <DisplayHeading
              as="h1"
              size="lg"
              :lines="[
                { text: 'One account.', variant: 'dark' },
                { text: 'Endless', variant: 'light' },
                { text: 'possibilities.', variant: 'dark' }
              ]"
            />
          </div>

          <div style="max-width: 440px; justify-self: end; width: 100%;">
            <Card tag="NETUVIO ACCOUNT" variant="dark" radius="xl" padding="lg" shadow="card">
              <h2 style="font-size: 26px; font-weight: 900; margin: 0 0 6px; letter-spacing: -1px; line-height: 1.15; color: #ffffff;">
                Your account. Your space.
              </h2>
              <p style="margin: 0 0 20px; color: #9da192; font-size: 14px; font-weight: 550; line-height: 1.4;">
                Manage your credentials and access to Netuvio services.
              </p>

              <Card
                variant="dark"
                radius="lg"
                padding="sm"
                style="margin-bottom: 16px; display: flex; align-items: center; gap: 14px; background: #12140d; border-color: #2e3323;"
              >
                <div style="width: 40px; height: 40px; border-radius: 50%; background: #ABED30; border: 2px solid #2e3323; display: grid; place-items: center; flex-shrink: 0;">
                  <NvIcon name="user" :size="20" color="#1c1e16" />
                </div>
                <div>
                  <p style="margin: 0; font-size: 12px; color: #9da192; font-weight: 600;">Signed in as</p>
                  <p style="margin: 2px 0 0; font-size: 13.5px; font-weight: 800; color: #ffffff;">
                    Stanislav Škudrna (contact@skudrna.com)
                  </p>
                </div>
              </Card>

              <Button
                variant="primary"
                block
                size="md"
                radius="md"
                justify="between"
                :font-size="14"
                :font-weight="800"
                icon-right="→"
              >
                Sign out
              </Button>
            </Card>
          </div>
        </main>

        <footer style="position: relative; z-index: 2; font-size: 12px; font-weight: 600; color: #9da192;">
          © 2026 Netuvio
        </footer>
      </div>
    `,
  }),
};

export const CustomBackdropWord: Story = {
  name: 'Custom Backdrop Text (Controls)',
  args: {
    text: 'NETUVIO',
    fixed: false,
    scaleX: 0.82,
    fontSize: 'clamp(120px, 24vw, 420px)',
  },
  render: (args) => ({
    components: { NvBackdropText },
    setup() {
      return { args };
    },
    template: `
      <div style="min-height: 480px; position: relative; isolation: isolate; display: grid; place-items: center; background: var(--nv-color-accent, #ABED30); border-radius: 24px; overflow: hidden; border: 2px solid #1c1e16;">
        <NvBackdropText v-bind="args" :fixed="false" />
        <div style="position: relative; z-index: 1; text-align: center; padding: 24px; background: #ffffff; border: 2px solid #1c1e16; border-radius: 18px; box-shadow: 6px 6px 0 #1c1e16; max-width: 420px;">
          <h3 style="margin: 0 0 8px; font-size: 22px; font-weight: 900; color: #1c1e16;">Centered Surface</h3>
          <p style="margin: 0; font-size: 14px; color: #62665a; font-weight: 550;">
            Test any custom word, size, and styling using Storybook controls below.
          </p>
        </div>
      </div>
    `,
  }),
};
