import type { Theme } from '../../../shared/tokens';

export type TextareaTheme = Theme;
export type TextareaSize = 'sm' | 'md' | 'lg' | 'xl';
export type TextareaRadius = 'sm' | 'md' | 'lg' | 'full';
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextareaProps {
  /** Force color theme for this textarea component ('light' | 'dark') */
  theme?: TextareaTheme

  /** Textarea value bound with v-model */
  modelValue?: string

  /** Predefined size for the textarea */
  size?: TextareaSize

  /** Border radius style for the textarea (defaults to 'md') */
  radius?: TextareaRadius

  /** Label text displayed above the textarea */
  label?: string

  /** Placeholder text */
  placeholder?: string

  /** Disables textarea interactions */
  disabled?: boolean

  /** Sets the textarea as read-only */
  readonly?: boolean

  /** Makes the textarea take the full width of its container when true */
  block?: boolean

  /** Enables 3D layered focus effect (defaults to true) */
  threeD?: boolean

  /** Offset of the 3D effect at rest in pixels (defaults to 0) */
  base3dOffset?: number | string

  /** How many pixels the 3D interaction moves the textarea (defaults to 4) */
  movePixels?: number | string

  /** Error message string or boolean flag indicating error state */
  error?: string | boolean

  /** Helpful hint text displayed below the textarea */
  hint?: string

  /** Textarea unique ID attribute */
  id?: string

  /** Textarea name attribute */
  name?: string

  /** Visible number of lines in a text area (defaults to 3) */
  rows?: number

  /** Maximum number of characters allowed */
  maxlength?: number

  /** Displays character count indicator */
  showCount?: boolean

  /** Automatically adjusts textarea height based on content */
  autoResize?: boolean

  /** Specifies how the textarea is resizable by the user (defaults to 'none') */
  resize?: TextareaResize

  /** Browser autocomplete attribute */
  autocomplete?: string
}

export interface TextareaEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
