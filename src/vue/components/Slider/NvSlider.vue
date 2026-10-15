<script setup lang="ts">
import { computed, useId, watch } from 'vue';
import type { SliderProps } from './Slider.types';
import styles from '../../../shared/styles/components/Slider.module.css';

defineOptions({ name: 'NvSlider', inheritAttrs: false });
const props = withDefaults(defineProps<SliderProps>(), { min: 0, max: 100, step: 1, unit: '', disabled: false });
const emit = defineEmits<{ 'update:modelValue': [value: number]; change: [value: number] }>();
const autoId = useId();
const id = computed(() => props.id ?? `nv-slider-${autoId}`);
const step = computed(() => props.step > 0 ? props.step : 1);
const max = computed(() => Math.max(props.min, Number((props.min + Math.floor((props.max - props.min) / step.value) * step.value).toFixed(10))));
const disabled = computed(() => props.disabled || max.value <= props.min);
function normalize(input: number) {
  const number = Number.isFinite(input) ? input : props.min;
  return Math.min(max.value, Math.max(props.min, Number((props.min + Math.round((number - props.min) / step.value) * step.value).toFixed(10))));
}
const value = computed(() => normalize(props.modelValue ?? props.min));
const progress = computed(() => max.value > props.min ? (value.value - props.min) / (max.value - props.min) * 100 : 0);
function input(event: Event) {
  emit('update:modelValue', normalize((event.target as HTMLInputElement).valueAsNumber));
}
watch(() => [props.modelValue, props.min, props.max, props.step], () => {
  if (props.modelValue !== undefined && props.modelValue !== value.value) emit('update:modelValue', value.value);
}, { immediate: true });
</script>

<template>
  <div :class="[styles.slider, disabled && styles.disabled, $attrs.class]" :theme="theme" :data-theme="theme" :style="$attrs.style">
    <div :class="styles.heading">
      <label v-if="label" :for="id">{{ label }}</label>
      <output :for="id">{{ value }}<span v-if="unit"> {{ unit }}</span></output>
    </div>
    <input v-bind="{ ...$attrs, class: undefined, style: undefined }" :id="id" type="range" :name="name" :min="min" :max="max" :step="step" :value="value" :disabled="disabled"
      :class="styles.input" :style="{ '--slider-progress': `${progress}%` }" :aria-valuetext="`${value}${unit ? ' ' + unit : ''}`"
      :aria-describedby="hint ? `${id}-hint` : undefined" @input="input" @change="emit('change', normalize(($event.target as HTMLInputElement).valueAsNumber))" />
    <div :class="styles.bounds" aria-hidden="true"><span>{{ min }} {{ unit }}</span><span>{{ max }} {{ unit }}</span></div>
    <p v-if="hint" :id="`${id}-hint`" :class="styles.hint">{{ hint }}</p>
  </div>
</template>
