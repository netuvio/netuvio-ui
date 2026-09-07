import type { IconName } from './iconData';

export type { IconName };

export interface IconProps {
  /** HTML tag or component to render as (defaults to 'span') */
  as?: string;

  /** Name of the built-in icon */
  name?: IconName | (string & {});

  /** Renders the filled variant of the icon if available */
  filled?: boolean;

  /** Size of the icon in pixels (number) or CSS length (e.g. 20, '24px') */
  size?: number | string;

  /** Color of the icon via background-color (defaults to 'currentColor') */
  color?: string;

  /** Custom mask URL or data URI */
  maskUrl?: string;

  /** Alias for maskUrl */
  src?: string;

  /** Accessible label for screen readers */
  ariaLabel?: string;

  /** ARIA role attribute (defaults to 'img' if ariaLabel is set, else 'presentation') */
  role?: string;
}
