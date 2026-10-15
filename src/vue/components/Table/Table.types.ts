import type { Theme } from '../../../shared/tokens';

export type TableTheme = Theme;
export type TableSize = 'sm' | 'md' | 'lg' | 'xl';
export type TableRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl';
export type TableVariant = 'default' | 'subtle' | 'accent';
export type TableAlign = 'left' | 'center' | 'right';
export type TableRow = Record<string, unknown>;

export interface TableColumn {
  /** Property read from each row. Also names the header-{key} and cell-{key} slots. */
  key: string;
  /** Visible column heading. */
  label: string;
  align?: TableAlign;
  width?: number | string;
}

export interface TableProps {
  /** Force color theme for this table ('light' | 'dark'). */
  theme?: TableTheme;
  columns?: TableColumn[];
  rows?: TableRow[];
  /** Row property or resolver used as Vue's row key. */
  rowKey?: string | ((row: TableRow, index: number) => string | number);
  size?: TableSize;
  /** Kdyz radius neposles, vezme se xl jako u karet. */
  radius?: TableRadius;
  variant?: TableVariant;
  /** Enables the Netuvio brutalist box-shadow (default: true). */
  threeD?: boolean;
  /** Offset of the 3D effect at rest (defaults to 4px). */
  base3dOffset?: number | string;
  /** Makes the table fill the available width (default: true). */
  block?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  emptyText?: string;
  caption?: string;
  ariaLabel?: string;
}

export interface TableEmits {
  (e: 'rowClick', row: TableRow, index: number, event: MouseEvent): void;
}
