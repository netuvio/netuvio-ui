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
  shadow: 'sm',
  dot: false,
  interactive: false,
  uppercase: true,
  as: 'span',
});

const badgeClasses = computed(() => [
  styles.badge,
  styles[`variant-${props.variant}`],
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  styles[`shadow-${props.shadow}`],
  props.uppercase ? styles.uppercase : null,
  props.interactive ? styles.interactive : null,
]);

const iconSize = computed(() => {
  if (props.size === 'sm') return 12;
  if (props.size === 'lg') return 16;
  return 14;
});
</script>

<template>
  <component :is="as" :class="badgeClasses">
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
