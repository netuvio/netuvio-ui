export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
export type ButtonRadius = 'sm' | 'md' | 'lg' | 'full'
export type ButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /** Visual style variant for the button */
  variant?: ButtonVariant

  /** Predefined size for the button */
  size?: ButtonSize

  /** Border radius style for the button */
  radius?: ButtonRadius

  /** Native button type attribute */
  type?: ButtonType

  /** Disables interactions */
  disabled?: boolean

  /** Shows a loading spinner and disables the button when true */
  loading?: boolean

  /** Makes the button take the full width of its container when true */
  block?: boolean

  /** Enables 3D layered hover effect (defaults to true for non-ghost variants) */
  threeD?: boolean
}
