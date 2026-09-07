export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxMark = 'square' | 'check';

export interface CheckboxProps {
  /** Checked status bound with v-model */
  modelValue?: boolean | any[]

  /** Value when used inside a checkbox array group */
  value?: any

  /** Primary label text next to the checkbox */
  label?: string

  /** Additional descriptive text below the label */
  description?: string

  /** Disables checkbox interactions */
  disabled?: boolean

  /** Renders the checkbox in an indeterminate state */
  indeterminate?: boolean

  /** Style of the mark when checked: 'square' (authentic Auth style) or 'check' (SVG checkmark) */
  mark?: CheckboxMark

  /** Predefined size for the checkbox */
  size?: CheckboxSize

  /** Error message or flag for error styling */
  error?: string | boolean

  /** Native input ID */
  id?: string

  /** Native input name */
  name?: string

  /** Native required attribute */
  required?: boolean
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | any[]): void
  (e: 'change', event: Event): void
}
