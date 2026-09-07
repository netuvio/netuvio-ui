<script setup lang="ts">
import { computed } from 'vue';
import type { SpinnerProps } from './Spinner.types';
import styles from '../../../shared/styles/components/Spinner.module.css';
import NvIcon from '../Icon/NvIcon.vue';

defineOptions({
  name: 'NvSpinner',
});

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'lg',
  icon: '↗',
});

const orbitClasses = computed(() => [
  styles.spinnerOrbit,
  styles[`size-${props.size}`],
]);

const iconComponentSize = computed(() => {
  if (props.size === 'sm') return 12;
  if (props.size === 'md') return 18;
  return 24;
});
</script>

<template>
  <div :class="orbitClasses" role="status" aria-label="Loading">
    <svg :class="styles.trackSvg" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="48" cy="48" r="42" stroke="currentColor" stroke-width="2" />
    </svg>
    <svg :class="styles.spinnerSvg" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="48" cy="48" r="42" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="75 190" />
    </svg>
    <div :class="styles.badgeCenter">
      <slot>
        <NvIcon v-if="iconName" :name="iconName" :size="iconComponentSize" />
        <span v-else :class="styles.badgeIcon" aria-hidden="true">{{ icon }}</span>
      </slot>
    </div>
  </div>
</template>
