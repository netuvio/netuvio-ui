<script setup lang="ts">
import { computed } from 'vue';
import type { ProgressBarProps } from './ProgressBar.types';
import styles from '../../../shared/styles/components/ProgressBar.module.css';

defineOptions({
  name: 'NvProgressBar',
});

const props = withDefaults(defineProps<ProgressBarProps>(), {
  value: 0,
  max: 100,
  indeterminate: false,
  variant: 'default',
  size: 'md',
  radius: 'full',
  threeD: true,
  showValue: false,
});

const percentage = computed(() => {
  if (props.indeterminate) return 0;
  const clamped = Math.min(Math.max(props.value, 0), props.max);
  return Math.round((clamped / props.max) * 100);
});

const trackClasses = computed(() => [
  styles.track,
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  props.threeD ? styles['shadow-sm'] : styles['shadow-none'],
  styles[`variant-${props.variant}`],
  props.indeterminate ? styles.indeterminate : null,
]);

const indicatorStyle = computed(() => {
  if (props.indeterminate) return undefined;
  return { width: `${percentage.value}%` };
});
</script>

<template>
  <div :class="styles.container">
    <div v-if="label || showValue || $slots.label" :class="styles.header">
      <span v-if="label || $slots.label">
        <slot name="label">{{ label }}</slot>
      </span>
      <span v-if="showValue && !indeterminate">{{ percentage }}%</span>
    </div>

    <div
      :class="trackClasses"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="indeterminate ? undefined : value"
    >
      <div :class="styles.indicator" :style="indicatorStyle" />
    </div>
  </div>
</template>
