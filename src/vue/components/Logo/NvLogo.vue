<script setup lang="ts">
import { computed } from 'vue';
import type { LogoProps } from './Logo.types';
import { NETUVIO_LOGO_MASK } from './logoMaskData';
import styles from '../../../shared/styles/components/Logo.module.css';

defineOptions({
  name: 'NvLogo',
});

const props = withDefaults(defineProps<LogoProps>(), {
  as: 'span',
  height: 47,
  variant: 'default',
  ariaLabel: 'Netuvio',
});

const computedHeight = computed(() => {
  if (props.height !== undefined && props.height !== null) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height;
  }
  if (props.width !== undefined && props.width !== null) {
    return 'auto';
  }
  return '47px';
});

const computedWidth = computed(() => {
  if (props.width !== undefined && props.width !== null) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }
  return 'auto';
});

const maskImageValue = computed(() => {
  const url = props.maskUrl || NETUVIO_LOGO_MASK;
  return `url("${url}")`;
});

const resolvedColor = computed(() => {
  if (props.color) return props.color;
  if (props.textColor) return props.textColor;
  switch (props.variant) {
    case 'monochrome':
      return 'currentColor';
    case 'dark':
      return '#1c1e16';
    case 'light':
      return '#ffffff';
    case 'accent':
      return 'var(--nv-color-accent, #ABED30)';
    case 'default':
    default:
      return 'var(--nv-color-logo, #1c1e16)';
  }
});

const logoStyle = computed(() => {
  return {
    height: computedHeight.value,
    width: computedWidth.value,
    backgroundColor: resolvedColor.value,
    WebkitMaskImage: maskImageValue.value,
    maskImage: maskImageValue.value,
  };
});
</script>


<template>
  <component
    :is="props.as"
    :class="styles.logo"
    :style="logoStyle"
    :aria-label="props.ariaLabel"
    role="img"
  />
</template>

