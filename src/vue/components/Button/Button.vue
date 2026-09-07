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
  disabled: false,
  loading: false,
  block: false,
  threeD: true,
  neutral3d: false,
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
  props.block ? styles.block : null,
  is3D.value ? styles.is3d : null,
  isNeutral3D.value ? styles.neutral3d : null,
  props.loading ? styles.loading : null,
]);

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
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="props.loading || undefined"
    @click="handleClick"
  >
    <span v-if="is3D" :class="styles.bottomLayer" aria-hidden="true" />
    <span :class="styles.topLayer">
      <span v-if="props.loading" :class="styles.spinner" aria-hidden="true" />
      <span :class="styles.content">
        <slot />
      </span>
    </span>
  </button>
</template>
