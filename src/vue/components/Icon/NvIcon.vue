<script setup lang="ts">
import { computed } from 'vue';
import type { IconProps } from './Icon.types';
import { ICONS_MASK_DATA } from './iconData';
import styles from '../../../shared/styles/components/Icon.module.css';

defineOptions({
  name: 'NvIcon',
});

const props = withDefaults(defineProps<IconProps>(), {
  as: 'span',
  size: 20,
  color: 'currentColor',
});

const computedSize = computed(() => {
  if (props.size === undefined || props.size === null) return '20px';
  return typeof props.size === 'number' ? `${props.size}px` : props.size;
});

const resolvedMaskUrl = computed(() => {
  if (props.maskUrl) return props.maskUrl;
  if (props.src) return props.src;
  if (props.name && (ICONS_MASK_DATA as Record<string, string>)[props.name]) {
    return (ICONS_MASK_DATA as Record<string, string>)[props.name];
  }
  return '';
});

const iconStyle = computed(() => {
  const url = resolvedMaskUrl.value;
  return {
    width: computedSize.value,
    height: computedSize.value,
    backgroundColor: props.color || 'currentColor',
    WebkitMaskImage: url ? `url("${url}")` : 'none',
    maskImage: url ? `url("${url}")` : 'none',
  };
});
</script>

<template>
  <component
    :is="props.as"
    :class="styles.icon"
    :style="iconStyle"
    :role="props.role || (props.ariaLabel ? 'img' : 'presentation')"
    :aria-label="props.ariaLabel"
    :aria-hidden="!props.ariaLabel"
  />
</template>
