<script setup lang="ts">
import { computed } from 'vue';
import type { ButtonProps } from './Button.types';
import styles from '../../../shared/styles/components/Button.module.css';

defineOptions({
  name: 'NvButton',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  radius: 'full',
  type: 'button',
  justify: 'center',
  disabled: false,
  loading: false,
  block: false,
  threeD: true,
  neutral3d: false,
  movePixels: 4,
  uppercase: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>();

const isDisabled = computed<boolean>(() => props.disabled || props.loading);

// 3D layered hover effect (defaults to true for non-ghost variants)
const is3D = computed<boolean>(() => props.threeD ?? (props.variant !== 'ghost'));
const isNeutral3D = computed<boolean>(() => is3D.value && (props.neutral3d ?? false));

// Resolved CSS module class list for the button element.
const classes = computed(() => [
  styles.button,
  styles[`variant-${props.variant}`],
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  styles[`justify-${props.justify}`],
  props.block ? styles.block : null,
  is3D.value ? styles.is3d : null,
  isNeutral3D.value ? styles.neutral3d : null,
  props.loading ? styles.loading : null,
  props.uppercase ? styles.uppercase : null,
]);

const buttonStyle = computed(() => {
  const move = props.movePixels;
  const pixels = typeof move === 'number' ? `${move}px` : (typeof move === 'string' && move.endsWith('px') ? move : `${move}px`);
  const styleObj: Record<string, string> = {
    '--button-action-move': pixels,
  };

  if (props.fontSize !== undefined && props.fontSize !== null) {
    styleObj['--button-font-size'] = typeof props.fontSize === 'number' ? `${props.fontSize}px` : props.fontSize;
  }

  if (props.fontWeight !== undefined && props.fontWeight !== null) {
    styleObj['--button-font-weight'] = String(props.fontWeight);
  }

  return styleObj;
});

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
};
</script>

<template>
  <button
    v-bind="$attrs"
    :type="props.type"
    :class="[classes, $attrs.class]"
    :style="[buttonStyle, $attrs.style]"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="props.loading || undefined"
    @click="handleClick"
  >
    <span v-if="is3D" :class="styles.bottomLayer" aria-hidden="true" />
    <span :class="styles.topLayer">
      <span v-if="props.loading" :class="styles.spinner" aria-hidden="true" />

      <!-- Left Icon / Slot -->
      <span v-if="$slots.iconLeft || props.iconLeft" :class="styles.iconLeft" aria-hidden="true">
        <slot name="iconLeft">
          <component :is="props.iconLeft" v-if="typeof props.iconLeft === 'object'" />
          <span v-else-if="typeof props.iconLeft === 'string'">{{ props.iconLeft }}</span>
        </slot>
      </span>

      <!-- Content -->
      <span :class="styles.content">
        <slot />
      </span>

      <!-- Right Icon / Slot -->
      <span v-if="$slots.iconRight || props.iconRight" :class="styles.iconRight" aria-hidden="true">
        <slot name="iconRight">
          <component :is="props.iconRight" v-if="typeof props.iconRight === 'object'" />
          <span v-else-if="typeof props.iconRight === 'string'">{{ props.iconRight }}</span>
        </slot>
      </span>
    </span>
  </button>
</template>
