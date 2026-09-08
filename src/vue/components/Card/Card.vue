<script setup lang="ts">
import { computed } from 'vue';
import type { CardProps } from './Card.types';
import styles from '../../../shared/styles/components/Card.module.css';

defineOptions({
  name: 'NvCard',
});

const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
  variant: 'default',
  threeD: true,
  movePixels: 2,
  radius: 'xl',
  padding: 'lg',
  tagDot: true,
  tagVariant: 'accent',
  interactive: false,
});

const defaultBaseOffset = computed(() => {
  if (!props.threeD) return 0;
  if (props.variant === 'accent') return 6;
  if (props.variant === 'default' || props.variant === 'dark') return 10;
  return 0;
});

const resolvedBaseOffset = computed(() => {
  if (props.base3dOffset !== undefined && props.base3dOffset !== null) {
    const offset = props.base3dOffset;
    return typeof offset === 'number' ? `${offset}px` : (typeof offset === 'string' && offset.endsWith('px') ? offset : `${offset}px`);
  }
  return `${defaultBaseOffset.value}px`;
});

const is3D = computed(() => {
  if (!props.threeD) return false;
  return parseFloat(resolvedBaseOffset.value) > 0;
});

const cardClasses = computed(() => [
  styles.card,
  styles[`variant-${props.variant}`],
  styles[`radius-${props.radius}`],
  styles[`padding-${props.padding}`],
  !is3D.value ? styles.noThreeD : null,
  props.interactive ? styles.interactive : null,
]);

const cardStyle = computed(() => {
  const move = props.movePixels;
  return {
    '--card-action-move': typeof move === 'number' ? `${move}px` : (typeof move === 'string' && move.endsWith('px') ? move : `${move}px`),
    '--card-base-3d-offset': resolvedBaseOffset.value,
  };
});

const tagDotClass = computed(() => {
  if (props.tagVariant === 'default') return styles.tagDotDefault;
  if (props.tagVariant === 'muted') return styles.tagDotMuted;
  return styles.tagDotAccent;
});
</script>

<template>
  <component :is="props.as" :class="cardClasses" :style="cardStyle">
    <!-- Tag / Eyebrow header (e.g. ● NETUVIO ACCOUNT) -->
    <div v-if="$slots.tag || props.tag" :class="styles.cardTag">
      <span v-if="props.tagDot" :class="[styles.tagDot, tagDotClass]" aria-hidden="true" />
      <slot name="tag">
        {{ props.tag }}
      </slot>
    </div>

    <!-- Optional Header slot -->
    <div v-if="$slots.header" :class="styles.cardHeader">
      <slot name="header" />
    </div>

    <!-- Main Content -->
    <slot />

    <!-- Optional Footer slot -->
    <div v-if="$slots.footer" :class="styles.cardFooter">
      <slot name="footer" />
    </div>
  </component>
</template>
