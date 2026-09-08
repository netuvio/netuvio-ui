<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { BackdropTextProps } from './BackdropText.types';
import styles from '../../../shared/styles/components/BackdropText.module.css';

defineOptions({
  name: 'NvBackdropText',
});

const props = withDefaults(defineProps<BackdropTextProps>(), {
  fixed: true,
  scaleX: 0.82,
  as: 'div',
});

const slots = useSlots();

const resolvedText = computed(() => {
  if (props.text) return props.text;
  if (slots.default) {
    const slotNodes = slots.default();
    const firstText = slotNodes
      .map(node => (typeof node.children === 'string' ? node.children : ''))
      .join('')
      .trim();
    if (firstText) return firstText;
  }
  return '';
});

const effectiveZIndex = computed(() => {
  if (props.zIndex !== undefined && props.zIndex !== null) {
    return props.zIndex;
  }
  return props.fixed ? -1 : 0;
});

const wrapperStyle = computed(() => {
  return {
    '--nv-backdrop-z-index': String(effectiveZIndex.value),
  };
});

const wordStyle = computed(() => {
  const styleObj: Record<string, string> = {
    '--nv-backdrop-scale': String(props.scaleX),
  };
  if (props.color) {
    styleObj['--nv-color-backdrop-text'] = props.color;
  }
  if (props.strokeColor) {
    styleObj['--nv-color-backdrop-stroke'] = props.strokeColor;
  }
  if (props.fontSize) {
    styleObj['--nv-backdrop-font-size'] = props.fontSize;
  }
  if (props.mobileFontSize) {
    styleObj['--nv-backdrop-font-size-mobile'] = props.mobileFontSize;
  }
  if (props.top) {
    styleObj['--nv-backdrop-top'] = props.top;
  }
  return styleObj;
});
</script>

<template>
  <component
    :is="props.as"
    :class="[styles.backdropWrapper, !props.fixed ? styles.contained : null]"
    :style="wrapperStyle"
    aria-hidden="true"
  >
    <p
      v-if="resolvedText"
      :class="styles.backdropWord"
      :data-text="resolvedText"
      :style="wordStyle"
    >
      <slot>{{ resolvedText }}</slot>
    </p>
  </component>
</template>
