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

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeRadius = 'full' | 'md' | 'sm' | 'none';
export type BadgeShadow = 'none' | 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** Visual style variant */
  variant?: BadgeVariant

  /** Size of the badge */
  size?: BadgeSize

  /** Border radius of the badge */
  radius?: BadgeRadius

  /** Brutalist box shadow depth */
  shadow?: BadgeShadow

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

  /** Formats text in uppercase with brutalist letter spacing (default: true) */
  uppercase?: boolean

  /** HTML tag or component to render as */
  as?: string
}
