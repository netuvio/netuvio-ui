export type LogoVariant = 'default' | 'monochrome' | 'dark' | 'light' | 'accent';
export type LogoMarkVariant = 'colored' | 'monochrome' | 'dark' | 'light' | 'white' | 'accent';

export interface LogoProps {
  as?: string;
  height?: number | string;
  width?: number | string;
  variant?: LogoVariant;
  color?: string;
  markColor?: string;
  textColor?: string;
  maskUrl?: string;
  ariaLabel?: string;
}

export interface LogoMarkProps {
  as?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  variant?: LogoMarkVariant;
  color?: string;
  maskUrl?: string;
  ariaLabel?: string;
}

