import type { IconName } from '../Icon/Icon.types';

export type BadgeVariant =
  | 'accent'
  | 'default'
  | 'subtle'
  | 'muted'
  | 'dark'
  | 'success'
  | 'danger'
  | 'warning'
  | 'outline';

export type BadgeSize = 'sm' | 'md' | 'lg' | 'xl';
export type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant

  /** Size of the badge */
  size?: BadgeSize

  /** Border radius of the badge */
  radius?: BadgeRadius

  /** Enables brutalist 3D box-shadow (default: true) */
  threeD?: boolean

  /** How many pixels the interactive hover/click moves the badge (defaults to 1) */
  movePixels?: number | string

  /** Displays a small circular status dot */
  dot?: boolean

  /** Custom color for the status dot */
  dotColor?: string

  /** Optional NvIcon name displayed before label */
  icon?: IconName | (string & {})

  /** Optional NvIcon name displayed after label */
  iconRight?: IconName | (string & {})

  /** Enables interactive hover and click feedback */
  interactive?: boolean

  /** Disables interactions when badge is interactive */
  disabled?: boolean

  /** Formats text in uppercase with brutalist letter spacing (default: true) */
  uppercase?: boolean

  /** HTML tag or component to render as */
  as?: string
}
