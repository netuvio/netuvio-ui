import type { IconName } from '../Icon/Icon.types';

export type AlertVariant = 'info' | 'error' | 'success' | 'warning' | 'accent' | 'default';
export type AlertRadius = 'sm' | 'md' | 'lg';
export type AlertShadow = 'none' | 'sm' | 'md';

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

  /** Brutalist box shadow */
  shadow?: AlertShadow
}

export interface AlertEmits {
  (e: 'dismiss'): void
}
