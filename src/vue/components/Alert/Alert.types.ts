import type { IconName } from '../Icon/Icon.types';

export type AlertVariant = 'info' | 'danger' | 'success' | 'warning' | 'accent' | 'default';
export type AlertRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface AlertProps {
  /** Visual variant */
  variant?: AlertVariant

  /** Optional heading title for the alert */
  title?: string

  /** Description text */
  description?: string

  /** Controls icon rendering: boolean to show default icon, or icon name */
  icon?: boolean | IconName | (string & {})

  /** Displays a dismiss/close button */
  dismissible?: boolean

  /** Corner radius */
  radius?: AlertRadius

  /** Enables brutalist 3D box-shadow (default: true) */
  threeD?: boolean
}

export interface AlertEmits {
  (e: 'dismiss'): void
}
