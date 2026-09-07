import type { Component } from 'vue';
import type { Theme } from '../../../shared/tokens';

export type SelectTheme = Theme;

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string | Component;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg' | 'xl';
export type SelectRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SelectPlacement = 'bottom' | 'top';
export type SelectAlign = 'left' | 'right';

export interface SelectProps {
  /** Force color theme for this select ('light' | 'dark') */
  theme?: SelectTheme;
  modelValue?: string | number;
  options?: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
  radius?: SelectRadius;
  disabled?: boolean;
  block?: boolean;
  native?: boolean;
  placement?: SelectPlacement;
  align?: SelectAlign;
  /** Enables brutalist 3D box-shadow (default: true) */
  threeD?: boolean;
  /** How many pixels the hover/click moves the trigger (defaults to 1) */
  movePixels?: number | string;
  id?: string;
  name?: string;
  /** Error message or flag for error styling */
  error?: string | boolean;
  ariaLabel?: string;
}

export type SelectEmits = {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
};
