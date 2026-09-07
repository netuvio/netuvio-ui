import type { Theme } from '../../../shared/tokens';

export type InputTheme = Theme;
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type InputRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url';

export interface InputProps {
  /** Force color theme for this input component ('light' | 'dark') */
  theme?: InputTheme

  /** Input value bound with v-model */
  modelValue?: string | number

  /** HTML input type attribute */
  type?: InputType

  /** Predefined size for the input */
  size?: InputSize

  /** Border radius style for the input */
  radius?: InputRadius

  /** Label text displayed above the input */
  label?: string

  /** Placeholder text */
  placeholder?: string

  /** Disables input interactions */
  disabled?: boolean

  /** Sets the input as read-only */
  readonly?: boolean

  /** Makes the input take the full width of its container when true */
  block?: boolean

  /** Enables 3D layered focus effect (defaults to true) */
  threeD?: boolean

  /** Sets if the input is neutrally 3D at rest (defaults to false) */
  neutral3d?: boolean

  /** How many pixels the 3D interaction moves the input (defaults to 4) */
  movePixels?: number | string

  /** Shows an eye toggle button for password fields when type is 'password' (defaults to true) */
  showPasswordToggle?: boolean

  /** Error message string or boolean flag indicating error state */
  error?: string | boolean

  /** Helpful hint text displayed below the input */
  hint?: string

  /** Input unique ID attribute */
  id?: string

  /** Input name attribute */
  name?: string

  /** Browser autocomplete attribute */
  autocomplete?: string
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'click:prefix', event: MouseEvent): void
  (e: 'click:suffix', event: MouseEvent): void
}
