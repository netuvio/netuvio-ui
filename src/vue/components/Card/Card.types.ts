export type CardVariant = 'default' | 'accent' | 'subtle' | 'muted' | 'dark';
export type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'card' | 'card-sm';
export type CardRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type CardTagVariant = 'accent' | 'default' | 'muted';

export interface CardProps {
  as?: string;
  variant?: CardVariant;
  shadow?: CardShadow;
  radius?: CardRadius;
  padding?: CardPadding;
  tag?: string;
  tagDot?: boolean;
  tagVariant?: CardTagVariant;
  interactive?: boolean;
}
