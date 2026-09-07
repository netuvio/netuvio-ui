<script setup lang="ts">
import { computed } from 'vue';
import type { CheckboxProps, CheckboxEmits } from './Checkbox.types';
import styles from '../../../shared/styles/components/Checkbox.module.css';

defineOptions({
  name: 'NvCheckbox',
});

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  size: 'md',
  mark: 'square',
  disabled: false,
  indeterminate: false,
  threeD: true,
});

const emit = defineEmits<CheckboxEmits>();

const isChecked = computed(() => {
  if (Array.isArray(props.modelValue)) {
    return props.value !== undefined && props.modelValue.includes(props.value);
  }
  return Boolean(props.modelValue);
});

const containerClasses = computed(() => [
  styles.container,
  props.disabled ? styles.disabled : null,
  isChecked.value ? styles.checked : null,
  props.indeterminate ? styles.indeterminate : null,
  props.error ? styles.hasError : null,
]);

const boxClasses = computed(() => [
  styles.box,
  styles[`size-${props.size}`],
  !props.threeD ? styles.noThreeD : null,
]);

function handleChange(event: Event) {
  if (props.disabled) return;
  const target = event.target as HTMLInputElement;

  if (Array.isArray(props.modelValue)) {
    const nextArray = [...props.modelValue];
    if (target.checked) {
      if (!nextArray.includes(props.value)) {
        nextArray.push(props.value);
      }
    } else {
      const idx = nextArray.indexOf(props.value);
      if (idx !== -1) {
        nextArray.splice(idx, 1);
      }
    }
    emit('update:modelValue', nextArray);
  } else {
    emit('update:modelValue', target.checked);
  }

  emit('change', event);
}
</script>

<template>
  <label :class="containerClasses" :theme="props.theme" :data-theme="props.theme">
    <div :class="styles.checkboxWrapper">
      <input
        type="checkbox"
        :id="id"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :required="required"
        :class="styles.nativeInput"
        @change="handleChange"
      />
      <div :class="boxClasses" aria-hidden="true">
        <template v-if="indeterminate">
          <span :class="styles.indeterminateDash" />
        </template>
        <template v-else-if="mark === 'square'">
          <span :class="styles.squareMark" />
        </template>
        <template v-else>
          <svg
            :class="styles.checkMark"
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5L4.5 8.5L11 1.5"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </div>
    </div>

    <div v-if="label || description || $slots.default || error" :class="styles.labelContent">
      <span v-if="label || $slots.default" :class="styles.label">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="description || $slots.description" :class="styles.description">
        <slot name="description">{{ description }}</slot>
      </span>
      <span v-if="typeof error === 'string'" :class="styles.errorMessage" role="alert">
        {{ error }}
      </span>
    </div>
  </label>
</template>
