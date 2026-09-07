import type { Component } from 'vue';

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string | Component;
  disabled?: boolean;
}

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type SelectPlacement = 'bottom' | 'top';
export type SelectAlign = 'left' | 'right';

export interface SelectProps {
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
  id?: string;
  name?: string;
  ariaLabel?: string;
}

export type SelectEmits = {
  (e: 'update:modelValue', value: string | number): void;
  (e: 'change', value: string | number): void;
};
