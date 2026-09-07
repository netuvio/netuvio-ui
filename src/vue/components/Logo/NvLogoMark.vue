<script setup lang="ts">
import { computed } from 'vue';
import type { LogoMarkProps } from './Logo.types';
import { NETUVIO_MARK_MASK } from './logoMaskData';
import styles from '../../../shared/styles/components/Logo.module.css';

defineOptions({
  name: 'NvLogoMark',
});

const props = withDefaults(defineProps<LogoMarkProps>(), {
  as: 'span',
  size: 36,
  variant: 'colored',
  ariaLabel: 'Netuvio',
});

const computedWidth = computed(() => {
  if (props.width !== undefined && props.width !== null) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  const s = props.size ?? 36;
  return typeof s === 'number' ? `${s}px` : s;
});

const computedHeight = computed(() => {
  if (props.height !== undefined && props.height !== null) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  const s = props.size ?? 36;
  return typeof s === 'number' ? `${s}px` : s;
});

const maskImageValue = computed(() => {
  const url = props.maskUrl || NETUVIO_MARK_MASK;
  return `url("${url}")`;
});

const resolvedColor = computed(() => {
  if (props.color) return props.color;
  switch (props.variant) {
    case 'monochrome':
      return 'currentColor';
    case 'dark':
      return 'var(--nv-color-border-strong, #1c1e16)';
    case 'light':
    case 'white':
      return '#ffffff';
    case 'colored':
    case 'accent':
    default:
      return 'var(--nv-color-accent, #ABED30)';
  }
});

const markStyle = computed(() => {
  return {
    width: computedWidth.value,
    height: computedHeight.value,
    backgroundColor: resolvedColor.value,
    WebkitMaskImage: maskImageValue.value,
    maskImage: maskImageValue.value,
  };
});
</script>

<template>
  <component
    :is="props.as"
    :class="styles.mark"
    :style="markStyle"
    :aria-label="props.ariaLabel"
    role="img"
  />
</template>

