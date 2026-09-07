<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import type { InputProps, InputEmits } from './Input.types';
import Button from '../Button/Button.vue';
import styles from '../../../shared/styles/components/Input.module.css';

defineOptions({
  name: 'NvInput',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  radius: 'full',
  disabled: false,
  readonly: false,
  block: false,
  threeD: true,
  neutral3d: false,
  movePixels: 4,
  showPasswordToggle: true,
});

const emit = defineEmits<InputEmits>();

const autoId = useId();
const inputId = computed(() => props.id || `nv-input-${autoId}`);
const errorId = computed(() => `${inputId.value}-error`);
const hintId = computed(() => `${inputId.value}-hint`);

const inputRef = ref<HTMLInputElement | null>(null);
const isPasswordVisible = ref(false);

const actualType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password';
  }
  return props.type;
});

const hasError = computed(() => Boolean(props.error));
const errorMessage = computed(() => (typeof props.error === 'string' ? props.error : ''));

const describedBy = computed(() => {
  if (errorMessage.value) return errorId.value;
  if (props.hint) return hintId.value;
  return undefined;
});

const isNeutral3D = computed<boolean>(() => props.threeD && (props.neutral3d ?? false));

const resolvedMove = computed(() => {
  const move = props.movePixels;
  return typeof move === 'number' ? `${move}px` : (typeof move === 'string' && move.endsWith('px') ? move : `${move}px`);
});

const wrapperClasses = computed(() => [
  styles.inputWrapper,
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  props.block ? styles.block : null,
  props.disabled ? styles.disabled : null,
  props.readonly ? styles.readonly : null,
  hasError.value ? styles.hasError : null,
  props.threeD ? styles.is3d : null,
  isNeutral3D.value ? styles.neutral3d : null,
]);

const wrapperStyle = computed(() => ({
  '--input-action-move': resolvedMove.value,
}));

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
  emit('input', event);
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

function togglePasswordVisibility() {
  if (props.disabled) return;
  isPasswordVisible.value = !isPasswordVisible.value;
}

function focus() {
  inputRef.value?.focus();
}

function blur() {
  inputRef.value?.blur();
}

function select() {
  inputRef.value?.select();
}

defineExpose({
  focus,
  blur,
  select,
  input: inputRef,
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
      :for="inputId"
      :class="styles.label"
    >
      <slot name="label">{{ label }}</slot>
    </label>

    <!-- Field container with 3D layers -->
    <div :class="styles.fieldContainer">
      <span v-if="props.threeD" :class="styles.bottomLayer" aria-hidden="true" />
      <div :class="styles.topLayer">
        <!-- Prefix Slot -->
        <span
          v-if="$slots.prefix"
          :class="styles.prefix"
          @click="emit('click:prefix', $event)"
        >
          <slot name="prefix" />
        </span>

        <!-- Native Input -->
        <input
          :id="inputId"
          ref="inputRef"
          v-bind="$attrs"
          :type="actualType"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :name="name"
          :autocomplete="autocomplete"
          :aria-invalid="hasError || undefined"
          :aria-describedby="describedBy"
          :class="styles.nativeInput"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- Suffix Slot -->
        <span
          v-if="$slots.suffix"
          :class="styles.suffix"
          @click="emit('click:suffix', $event)"
        >
          <slot name="suffix" />
        </span>

        <!-- Built-in Password Visibility Toggle using Button Secondary -->
        <Button
          v-if="type === 'password' && showPasswordToggle"
          type="button"
          variant="secondary"
          :theme="props.theme"
          :radius="props.radius"
          :disabled="disabled"
          :move-pixels="1"
          :class="styles.passwordToggle"
          tabindex="-1"
          :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
          :aria-pressed="isPasswordVisible"
          @click="togglePasswordVisibility"
        >
          <!-- Eye open icon (when hidden) -->
          <svg
            v-if="!isPasswordVisible"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <!-- Eye off icon (when visible) -->
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-.722-3.25" />
            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
            <path d="m20 15-1.726-2.05" />
            <path d="m4 15 1.726-2.05" />
            <path d="m9 18 .722-3.25" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        </Button>
      </div>
    </div>

    <!-- Error or Hint Message -->
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
  </div>
</template>
