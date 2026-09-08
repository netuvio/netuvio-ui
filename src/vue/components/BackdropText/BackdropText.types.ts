export interface BackdropTextProps {
  /** Text content displayed in the background */
  text?: string;

  /** Whether the wrapper is fixed full-screen (true) or absolute contained (false) */
  fixed?: boolean;

  /** Fill color of the main text */
  color?: string;

  /** Stroke color for the layered offset stroke shadows */
  strokeColor?: string;

  /** Horizontal scale ratio (defaults to 0.82) */
  scaleX?: number;

  /** Custom CSS font-size (defaults to clamp(140px, 34vw, 760px)) */
  fontSize?: string;

  /** Custom CSS font-size for mobile screens (<= 800px) */
  mobileFontSize?: string;

  /** Stacking order z-index (defaults to -1) */
  zIndex?: number;

  /** Custom CSS vertical position (defaults to 50%) */
  top?: string;

  /** Wrapper HTML element tag */
  as?: string;
}
