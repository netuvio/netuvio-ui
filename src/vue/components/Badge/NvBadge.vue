<script setup lang="ts">
import { computed } from 'vue';
import type { BadgeProps } from './Badge.types';
import styles from '../../../shared/styles/components/Badge.module.css';
import NvIcon from '../Icon/NvIcon.vue';

defineOptions({
  name: 'NvBadge',
});

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'accent',
  size: 'md',
  radius: 'full',
  threeD: true,
  movePixels: 1,
  dot: false,
  interactive: false,
  disabled: false,
  uppercase: true,
  as: 'span',
});

const badgeClasses = computed(() => [
  styles.badge,
  styles[`variant-${props.variant}`],
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  props.threeD ? styles['shadow-sm'] : styles['shadow-none'],
  props.uppercase ? styles.uppercase : null,
  props.interactive ? styles.interactive : null,
  props.disabled ? styles.disabled : null,
]);

const badgeStyle = computed(() => {
  const move = props.movePixels;
  return {
    '--badge-action-move': typeof move === 'number' ? `${move}px` : (typeof move === 'string' && move.endsWith('px') ? move : `${move}px`),
  };
});

const iconSize = computed(() => {
  if (props.size === 'sm') return 12;
  if (props.size === 'lg') return 16;
  if (props.size === 'xl') return 18;
  return 14;
});
</script>

<template>
  <component
    :is="as"
    :class="badgeClasses"
    :style="badgeStyle"
    :aria-disabled="props.disabled || undefined"
  >
    <span
      v-if="dot"
      :class="styles.dot"
      :style="dotColor ? { backgroundColor: dotColor } : undefined"
      aria-hidden="true"
    />

    <slot name="icon">
      <NvIcon v-if="icon" :name="icon" :size="iconSize" />
    </slot>

    <slot />

    <slot name="iconRight">
      <NvIcon v-if="iconRight" :name="iconRight" :size="iconSize" />
    </slot>
  </component>
</template>
