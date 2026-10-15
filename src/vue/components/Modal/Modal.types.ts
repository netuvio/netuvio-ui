import type { Theme } from '../../../shared/tokens';

export interface ModalProps {
  modelValue?: boolean;
  title: string;
  description?: string;
  closeLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: Theme;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}
