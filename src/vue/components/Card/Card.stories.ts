import type { Meta, StoryObj } from '@storybook/vue3';
import Card from './Card.vue';
import Button from '../Button/Button.vue';
import NvIcon from '../Icon/NvIcon.vue';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'subtle', 'muted', 'dark'],
    },
    threeD: {
      control: 'boolean',
    },
    base3dOffset: {
      control: 'number',
      description: 'Offset of the 3D effect at rest in pixels',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    tag: {
      control: 'text',
    },
    tagDot: {
      control: 'boolean',
    },
    tagVariant: {
      control: 'select',
      options: ['accent', 'default', 'muted'],
    },
    interactive: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'default',
    radius: 'xl',
    padding: 'lg',
    tagDot: true,
    tagVariant: 'accent',
    interactive: false,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 480px; padding: 20px;">
        <Card v-bind="args" tag="NETUVIO ACCOUNT">
          <h2 style="font-size: 28px; font-weight: 850; margin: 0 0 8px; letter-spacing: -1px;">Your account. Your space.</h2>
          <p style="margin: 0 0 20px; color: var(--nv-color-text-secondary, #62665a); font-size: 14px; font-weight: 500;">
            Manage your credentials and access to Netuvio services.
          </p>
        </Card>
      </div>
    `,
  }),
};

export const AccountCard: Story = {
  name: 'Account Overview Card (Image 2)',
  render: (args) => ({
    components: { Card, Button, NvIcon },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 500px; padding: 40px; background: var(--nv-color-accent, #ABED30); border-radius: 24px;">
        <Card v-bind="args" tag="NETUVIO ACCOUNT">
          <h2 style="font-size: 32px; font-weight: 900; margin: 0 0 10px; letter-spacing: -1.5px; line-height: 1.1;">
            Your account. Your space.
          </h2>
          <p style="margin: 0 0 24px; color: var(--nv-color-text-secondary, #62665a); font-size: 15px; font-weight: 550;">
            Manage your credentials and access to Netuvio services.
          </p>

          <!-- Nested subtle user info box -->
          <Card
            variant="subtle"
            radius="lg"
            padding="md"
            style="margin-bottom: 16px; display: flex; align-items: center; gap: 14px;"
          >
            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--nv-color-accent, #ABED30); border: 2px solid var(--nv-color-border-strong, #1c1e16); display: grid; place-items: center; flex-shrink: 0;">
              <NvIcon name="user" :size="20" color="var(--nv-color-text-primary, #1c1e16)" />
            </div>
            <div>
              <p style="margin: 0; font-size: 12px; color: var(--nv-color-text-secondary, #62665a); font-weight: 600;">Signed in as</p>
              <p style="margin: 2px 0 0; font-size: 14px; font-weight: 800; color: var(--nv-color-text-primary, #1c1e16);">
                Stanislav Škudrna (contact@skudrna.com)
              </p>
            </div>
          </Card>

          <Button
            variant="primary"
            block
            size="lg"
            radius="md"
            justify="between"
            :font-size="14"
            :font-weight="800"
            icon-right="→"
            style="margin-top: 12px;"
          >
            Sign out
          </Button>
        </Card>
      </div>
    `,
  }),
};

export const AccentHeroCard: Story = {
  name: 'Accent Hero Banner (Image 3)',
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 580px; padding: 30px;">
        <Card
          v-bind="args"
          variant="accent"
          radius="xl"
          padding="md"
        >
          <p style="margin: 0; font-size: 16px; font-weight: 700; line-height: 1.5; color: #12140d;">
            Your projects, services, and new ideas. It all starts with your Netuvio account.
          </p>
        </Card>
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; padding: 20px;">
        <Card variant="default" tag="Default (White)">
          <p style="margin: 0; font-weight: 600;">White container with standard neo-brutalist shadow.</p>
        </Card>
        <Card variant="accent" tag="Accent (Lime)">
          <p style="margin: 0; font-weight: 700;">Prominent lime accent container with brutalist shadow.</p>
        </Card>
        <Card variant="subtle" tag="Subtle (Panel)">
          <p style="margin: 0; font-weight: 600;">Subtly tinted nested panel for secondary information.</p>
        </Card>
        <Card variant="muted" tag="Muted">
          <p style="margin: 0; font-weight: 600;">Muted background container for calm sections.</p>
        </Card>
        <Card variant="dark" tag="Dark">
          <p style="margin: 0; font-weight: 600;">Dark neo-brutalist container with high contrast.</p>
        </Card>
      </div>
    `,
  }),
};

export const Base3dOffset: Story = {
  render: () => ({
    components: { Card },
    template: `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; padding: 24px;">
        <Card :base-3d-offset="0" tag="Offset 0px (Flat)">
          <p style="margin: 0; font-weight: 600;">Flat at rest (:base-3d-offset="0").</p>
        </Card>
        <Card :base-3d-offset="4" tag="Offset 4px">
          <p style="margin: 0; font-weight: 600;">Subtle 4px brutalist shadow at rest.</p>
        </Card>
        <Card :base-3d-offset="14" tag="Offset 14px (Deep)">
          <p style="margin: 0; font-weight: 600;">Deep 14px brutalist shadow at rest.</p>
        </Card>
        <Card interactive :base-3d-offset="4" :move-pixels="3" tag="Interactive (4px + 3px)">
          <p style="margin: 0; font-weight: 600;">Interactive card: rests at 4px, lifts to 7px on hover.</p>
        </Card>
      </div>
    `,
  }),
};
