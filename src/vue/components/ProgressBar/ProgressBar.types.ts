export type ProgressBarVariant = 'default' | 'accent' | 'success' | 'danger';
export type ProgressBarSize = 'sm' | 'md' | 'lg' | 'xl';
export type ProgressBarRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ProgressBarProps {
  /** Current progress value (between 0 and max) */
  value?: number

  /** Maximum progress value (defaults to 100) */
  max?: number

  /** Renders an infinite animated loading indicator */
  indeterminate?: boolean

  /** Visual variant */
  variant?: ProgressBarVariant

  /** Bar thickness size */
  size?: ProgressBarSize

  /** Border radius style */
  radius?: ProgressBarRadius

  /** Enables brutalist 3D box-shadow (default: true) */
  threeD?: boolean

  /** Optional label displayed above the progress bar */
  label?: string

  /** Displays progress percentage next to label */
  showValue?: boolean
}
