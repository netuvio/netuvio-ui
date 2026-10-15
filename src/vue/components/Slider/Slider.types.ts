import type { Theme } from '../../../shared/tokens';

export interface SliderProps {
  modelValue?: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  hint?: string;
  unit?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  theme?: Theme;
}
