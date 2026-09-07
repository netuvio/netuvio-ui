<script setup lang="ts">
import { computed } from 'vue';
import type { DisplayHeadingProps, DisplayHeadingLine, DisplayHeadingVariant } from './DisplayHeading.types';
import styles from '../../../shared/styles/components/DisplayHeading.module.css';

defineOptions({
  name: 'NvDisplayHeading',
});

const props = withDefaults(defineProps<DisplayHeadingProps>(), {
  as: 'h2',
  size: 'lg',
  variant: 'dark',
  stroke: true,
});

const normalizedLines = computed<DisplayHeadingLine[]>(() => {
  if (props.lines && props.lines.length > 0) {
    return props.lines;
  }
  if (Array.isArray(props.text)) {
    return props.text.map((t) => ({ text: t, variant: props.variant }));
  }
  if (typeof props.text === 'string' && props.text.trim()) {
    return [{ text: props.text, variant: props.variant }];
  }
  return [];
});

function getLineVariantClass(variant?: DisplayHeadingVariant): string {
  const v = variant || props.variant;
  switch (v) {
    case 'light':
      return styles.lineLight;
    case 'accent':
      return styles.lineAccent;
    case 'solid':
      return styles.lineSolid;
    case 'dark':
    default:
      return styles.lineDark;
  }
}
</script>

<template>
  <component
    :is="props.as"
    :class="[
      styles.displayHeading,
      styles[`size-${props.size}`],
      !props.stroke ? styles.noStroke : null,
    ]"
  >
    <template v-if="normalizedLines.length > 0">
      <span
        v-for="(line, idx) in normalizedLines"
        :key="idx"
        :class="[styles.headlineLine, getLineVariantClass(line.variant)]"
        :data-text="line.text"
      >
        {{ line.text }}
      </span>
    </template>
    <!-- Slot fallback -->
    <slot v-else />
  </component>
</template>
