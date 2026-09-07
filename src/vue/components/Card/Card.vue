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
  radius: 'xl',
  padding: 'lg',
  tagDot: true,
  tagVariant: 'accent',
  interactive: false,
});

const resolvedShadow = computed(() => {
  if (props.shadow) return props.shadow;
  if (props.variant === 'default' || props.variant === 'dark') return 'card';
  if (props.variant === 'accent') return 'card-sm';
  return 'none';
});

const cardClasses = computed(() => [
  styles.card,
  styles[`variant-${props.variant}`],
  styles[`radius-${props.radius}`],
  styles[`padding-${props.padding}`],
  styles[`shadow-${resolvedShadow.value}`],
  props.interactive ? styles.interactive : null,
]);

const tagDotClass = computed(() => {
  if (props.tagVariant === 'default') return styles.tagDotDefault;
  if (props.tagVariant === 'muted') return styles.tagDotMuted;
  return styles.tagDotAccent;
});
</script>

<template>
  <component :is="props.as" :class="cardClasses">
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
