export type DisplayHeadingVariant = 'dark' | 'light' | 'accent' | 'solid';
export type DisplayHeadingSize = 'sm' | 'md' | 'lg' | 'xl';

export interface DisplayHeadingLine {
  text: string;
  variant?: DisplayHeadingVariant;
}

export interface DisplayHeadingProps {
  as?: string;
  size?: DisplayHeadingSize;
  text?: string | string[];
  lines?: DisplayHeadingLine[];
  variant?: DisplayHeadingVariant;
  stroke?: boolean;
}
