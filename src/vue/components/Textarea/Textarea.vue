<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import type { TextareaProps, TextareaEmits } from './Textarea.types';
import styles from '../../../shared/styles/components/Textarea.module.css';

defineOptions({
  name: 'Textarea',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  radius: 'md',
  rows: 3,
  resize: 'none',
  autoResize: false,
  showCount: false,
  disabled: false,
  readonly: false,
  block: false,
  threeD: true,
  base3dOffset: 0,
  movePixels: 4,
});

const emit = defineEmits<TextareaEmits>();

const autoId = useId();
const textareaId = computed(() => props.id || `textarea-${autoId}`);
const errorId = computed(() => `${textareaId.value}-error`);
const hintId = computed(() => `${textareaId.value}-hint`);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const dynamicHeight = ref<string | null>(null);

const hasError = computed(() => Boolean(props.error));
const errorMessage = computed(() => (typeof props.error === 'string' ? props.error : ''));

const describedBy = computed(() => {
  if (errorMessage.value) return errorId.value;
  if (props.hint) return hintId.value;
  return undefined;
});

const isResizableH = computed<boolean>(() => props.resize === 'horizontal' || props.resize === 'both');

const resolvedMove = computed(() => {
  const move = props.movePixels;
  return typeof move === 'number' ? `${move}px` : (typeof move === 'string' && move.endsWith('px') ? move : `${move}px`);
});

const resolvedOffset = computed(() => {
  const offset = props.base3dOffset;
  return typeof offset === 'number' ? `${offset}px` : (typeof offset === 'string' && offset.endsWith('px') ? offset : `${offset}px`);
});

const hasBaseOffset = computed(() => {
  const offset = props.base3dOffset;
  return typeof offset === 'number' ? offset > 0 : (typeof offset === 'string' ? parseFloat(offset) > 0 : false);
});

const wrapperClasses = computed(() => [
  styles.textareaWrapper,
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  props.block ? styles.block : null,
  isResizableH.value ? styles.resizableH : null,
  props.disabled ? styles.disabled : null,
  props.readonly ? styles.readonly : null,
  hasError.value ? styles.hasError : null,
  props.threeD ? styles.is3d : null,
]);

const wrapperStyle = computed(() => ({
  '--textarea-action-move': resolvedMove.value,
  '--textarea-base-3d-offset': resolvedOffset.value,
  '--textarea-base-bottom-opacity': hasBaseOffset.value ? '1' : '0',
}));

const charLength = computed(() => (props.modelValue ? String(props.modelValue).length : 0));
const isOverLimit = computed(() => Boolean(props.maxlength && charLength.value > props.maxlength));

const textareaClasses = computed(() => [
  styles.nativeTextarea,
  props.autoResize ? styles.autoResize : null,
]);

const textareaStyle = computed(() => {
  const styleObj: Record<string, string> = {
    resize: props.resize,
  };
  if (props.autoResize) {
    styleObj.resize = 'none';
    styleObj.overflowY = 'hidden';
    if (dynamicHeight.value) {
      styleObj.height = dynamicHeight.value;
    }
  }
  return styleObj;
});

function adjustHeight() {
  if (!props.autoResize || !textareaRef.value) {
    dynamicHeight.value = null;
    return;
  }
  const el = textareaRef.value;
  // Reset height to 'auto' to accurately measure scrollHeight
  el.style.height = 'auto';
  const newHeight = el.scrollHeight;
  if (newHeight > 0) {
    const formatted = `${newHeight}px`;
    dynamicHeight.value = formatted;
    el.style.height = formatted;
  }
}

watch(
  () => props.modelValue,
  () => {
    if (props.autoResize) {
      nextTick(adjustHeight);
    }
  }
);

watch(
  () => props.autoResize,
  (enabled) => {
    if (enabled) {
      nextTick(adjustHeight);
    } else if (textareaRef.value) {
      dynamicHeight.value = null;
      textareaRef.value.style.height = '';
    }
  }
);

watch(
  () => [props.size, props.rows],
  () => {
    if (props.autoResize) {
      nextTick(adjustHeight);
    }
  }
);

function handleWindowResize() {
  if (props.autoResize) {
    adjustHeight();
  }
}

let prevWidth = 0;
let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  if (props.autoResize) {
    nextTick(() => {
      adjustHeight();
      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => adjustHeight());
      }
    });
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleWindowResize);
  }

  if (typeof ResizeObserver !== 'undefined' && textareaRef.value) {
    prevWidth = textareaRef.value.clientWidth;
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width !== prevWidth && width > 0) {
          prevWidth = width;
          if (props.autoResize) {
            adjustHeight();
          }
        }
      }
    });
    resizeObserver.observe(textareaRef.value);
  }
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleWindowResize);
  }
  resizeObserver?.disconnect();
});

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('input', event);
  if (props.autoResize) {
    adjustHeight();
  }
}

function handleChange(event: Event) {
  emit('change', event);
}

function handleFocus(event: FocusEvent) {
  emit('focus', event);
}

function handleBlur(event: FocusEvent) {
  emit('blur', event);
}

function focus() {
  textareaRef.value?.focus();
}

function blur() {
  textareaRef.value?.blur();
}

function select() {
  textareaRef.value?.select();
}

defineExpose({
  focus,
  blur,
  select,
  textarea: textareaRef,
  adjustHeight,
});
</script>

<template>
  <div
    :class="wrapperClasses"
    :style="wrapperStyle"
    :theme="props.theme"
    :data-theme="props.theme"
  >
    <!-- Label -->
    <label
      v-if="label || $slots.label"
      :for="textareaId"
      :class="styles.label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- Field container with 3D layers -->
    <div :class="styles.fieldContainer">
      <span v-if="props.threeD" :class="styles.bottomLayer" aria-hidden="true" />
      <div :class="styles.topLayer">
        <textarea
          :id="textareaId"
          ref="textareaRef"
          v-bind="$attrs"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :name="name"
          :rows="rows"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
          :aria-invalid="hasError || undefined"
          :aria-describedby="describedBy"
          :class="textareaClasses"
          :style="textareaStyle"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
      </div>
    </div>

    <!-- Footer: Hint / Error & Character Count -->
    <div
      v-if="errorMessage || hint || $slots.hint || showCount"
      :class="styles.footer"
    >
      <div
        v-if="errorMessage"
        :id="errorId"
        :class="[styles.message, styles.errorMessage]"
        role="alert"
      >
        <slot name="error">{{ errorMessage }}</slot>
      </div>
      <div
        v-else-if="hint || $slots.hint"
        :id="hintId"
        :class="[styles.message, styles.hintMessage]"
      >
        <slot name="hint">{{ hint }}</slot>
      </div>
      <span v-else />

      <span
        v-if="showCount"
        :class="[styles.charCount, isOverLimit && styles.charCountError]"
        aria-live="polite"
      >
        {{ charLength }}<template v-if="maxlength"> / {{ maxlength }}</template>
      </span>
    </div>
  </div>
</template>
