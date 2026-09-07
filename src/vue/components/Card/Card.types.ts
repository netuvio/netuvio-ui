export type CardVariant = 'default' | 'accent' | 'subtle' | 'muted' | 'dark';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardTagVariant = 'accent' | 'default' | 'muted';

export interface CardProps {
  as?: string;
  variant?: CardVariant;
  /** Enables brutalist 3D box-shadow (default: true) */
  threeD?: boolean;
  /** How many pixels the interactive hover/click moves the card (defaults to 2) */
  movePixels?: number | string;
  radius?: CardRadius;
  padding?: CardPadding;
  tag?: string;
  tagDot?: boolean;
  tagVariant?: CardTagVariant;
  interactive?: boolean;
}
