import type { IconName } from '../Icon/Icon.types';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps {
  /** Size of the orbital loader */
  size?: SpinnerSize

  /** Optional icon character or arrow string (defaults to '↗') */
  icon?: string

  /** Optional NvIcon name for center badge */
  iconName?: IconName | (string & {})
}
