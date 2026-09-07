import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';
import Textarea from './Textarea.vue';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Predefined size for the textarea',
    },
    radius: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Border radius corner style (defaults to md)',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Specifies how the textarea can be resized (defaults to none)',
    },
    label: {
      control: 'text',
      description: 'Label displayed above textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Visible number of lines',
    },
    autoResize: {
      control: 'boolean',
      description: 'Automatically adjusts height based on content',
    },
    showCount: {
      control: 'boolean',
      description: 'Displays character count',
    },
    maxlength: {
      control: 'number',
      description: 'Maximum characters allowed',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables textarea interactions',
    },
    readonly: {
      control: 'boolean',
      description: 'Sets textarea as read-only',
    },
    block: {
      control: 'boolean',
      description: 'Makes textarea take full container width',
    },
    threeD: {
      control: 'boolean',
      description: 'Enables 3D layered focus effect',
    },
    neutral3d: {
      control: 'boolean',
      description: 'Sets if the textarea is neutrally 3D at rest',
    },
    error: {
      control: 'text',
      description: 'Error message string or boolean state',
    },
    hint: {
      control: 'text',
      description: 'Helpful hint text below textarea',
    },
  },
  args: {
    size: 'md',
    radius: 'md',
    resize: 'none',
    rows: 3,
    autoResize: false,
    showCount: false,
    label: 'Description',
    placeholder: 'Write your thoughts here...',
    disabled: false,
    readonly: false,
    block: false,
    threeD: true,
    neutral3d: false,
  },
  render: (args: Record<string, any>) => ({
    components: { Textarea },
    setup() {
      if (args.modelValue === undefined) {
        args.modelValue = '';
      }
      return { args };
    },
    template: '<div style="max-width: 480px; padding: 16px;"><Textarea v-bind="args" v-model="args.modelValue" /></div>',
  }),
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us a little about yourself...',
    hint: 'Markdown formatting is supported',
  },
};

export const AutoResize: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const val = ref(
        'This textarea automatically adjusts its height as you type.\n\nTry adding new lines, typing a long paragraph, or deleting content to see it expand and shrink smoothly without scrollbars.'
      );
      return { val };
    },
    template: `
      <div style="max-width: 480px; padding: 16px;">
        <Textarea
          v-model="val"
          label="Auto-resizing Note"
          placeholder="Start typing..."
          :auto-resize="true"
          hint="Automatically expands as you type"
          block
        />
      </div>
    `,
  }),
};

export const WithCharacterCounter: Story = {
  render: () => ({
    components: { Textarea },
    setup() {
      const val = ref('Initial draft feedback.');
      return { val };
    },
    template: `
      <div style="max-width: 480px; padding: 16px;">
        <Textarea
          v-model="val"
          label="Feedback"
          placeholder="Leave a short comment..."
          :maxlength="120"
          show-count
          hint="Max 120 characters"
          block
        />
      </div>
    `,
  }),
};

export const Radii: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px; padding: 16px;">
        <Textarea label="Medium (Default - 9px)" radius="md" placeholder="radius='md'" block />
        <Textarea label="Large (12px)" radius="lg" placeholder="radius='lg'" block />
        <Textarea label="Small (6px)" radius="sm" placeholder="radius='sm'" block />
        <Textarea label="Full / Pill" radius="full" placeholder="radius='full'" block />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px; padding: 16px;">
        <Textarea size="sm" label="Small (sm)" placeholder="Small textarea" block />
        <Textarea size="md" label="Medium (md - Default)" placeholder="Medium textarea" block />
        <Textarea size="lg" label="Large (lg)" placeholder="Large textarea" block />
        <Textarea size="xl" label="Extra Large (xl)" placeholder="Extra large textarea" block />
      </div>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px; padding: 16px;">
        <Textarea
          label="With Error"
          model-value="Invalid input message"
          error="This message contains inappropriate content"
          block
        />
        <Textarea
          label="Disabled"
          model-value="Disabled content that cannot be edited"
          disabled
          hint="This field is permanently disabled"
          block
        />
        <Textarea
          label="Readonly"
          model-value="Read-only text content you can highlight but not edit"
          readonly
          block
        />
      </div>
    `,
  }),
};

export const ThreeDEffects: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px; padding: 16px;">
        <Textarea
          label="Active 3D (Hover / Focus Shift)"
          :three-d="true"
          placeholder="Hover or click to see 3D lift"
          block
        />
        <Textarea
          label="Neutral 3D (Shifted at rest)"
          :three-d="true"
          neutral3d
          placeholder="Always slightly shifted"
          block
        />
        <Textarea
          label="Flat (3D Disabled)"
          :three-d="false"
          placeholder="No 3D lift effects"
          block
        />
      </div>
    `,
  }),
};

export const Resizable: Story = {
  render: () => ({
    components: { Textarea },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 680px; padding: 16px;">
        <Textarea
          label="Vertical Resize (Full Width)"
          resize="vertical"
          placeholder="Drag bottom-right handle vertically"
          block
        />
        <Textarea
          label="Horizontal Resize"
          resize="horizontal"
          placeholder="Drag bottom-right handle horizontally"
        />
        <Textarea
          label="Both Directions (Free Resize)"
          resize="both"
          placeholder="Drag bottom-right handle in any direction"
        />
        <Textarea
          label="Both Directions (Block / Full Width to start)"
          resize="both"
          placeholder="Starts at 100% width, expandable horizontally"
          block
        />
      </div>
    `,
  }),
};
