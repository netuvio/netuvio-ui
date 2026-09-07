<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, useId } from 'vue';
import type { SelectProps, SelectEmits, SelectOption } from './Select.types';
import styles from '../../../shared/styles/components/Select.module.css';

defineOptions({
  name: 'NvSelect',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Select…',
  size: 'md',
  radius: 'full',
  disabled: false,
  block: false,
  native: false,
  placement: 'bottom',
  align: 'left',
});

const emit = defineEmits<SelectEmits>();

const autoId = useId();
const selectId = computed(() => props.id || `nv-select-${autoId}`);
const isOpen = ref(false);
const wrapperRef = ref<HTMLElement | null>(null);

const selectedOption = computed<SelectOption | undefined>(() => {
  return props.options.find((opt) => opt.value === props.modelValue);
});

const currentLabel = computed<string>(() => {
  if (selectedOption.value) return selectedOption.value.label;
  return props.placeholder;
});

const radiusMap: Record<string, string> = {
  none: '0px',
  sm: 'var(--nv-radius-sm, 6px)',
  md: 'var(--nv-radius-md, 9px)',
  lg: 'var(--nv-radius-lg, 12px)',
  xl: 'var(--nv-radius-xl, 22px)',
  full: 'var(--nv-radius-full, 9999px)',
};

const radiusStyle = computed(() => {
  const r = radiusMap[props.radius] || props.radius;
  return {
    '--select-radius': r,
  };
});

function toggleDropdown() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

function closeDropdown() {
  isOpen.value = false;
}

function selectOption(option: SelectOption) {
  if (option.disabled || props.disabled) return;
  emit('update:modelValue', option.value);
  emit('change', option.value);
  closeDropdown();
}

function handleNativeChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
  emit('change', target.value);
}

function handleClickOutside(event: MouseEvent) {
  if (isOpen.value && wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    closeDropdown();
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closeDropdown();
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<template>
  <div
    ref="wrapperRef"
    :class="[
      styles.selectWrapper,
      styles[`size-${props.size}`],
      props.block ? styles.block : null,
      $attrs.class,
    ]"
    :style="[radiusStyle, $attrs.style as any]"
  >
    <!-- Native Select Overlay Mode -->
    <select
      v-if="props.native"
      :id="selectId"
      :name="props.name"
      :value="props.modelValue"
      :disabled="props.disabled"
      :aria-label="props.ariaLabel || props.placeholder"
      :class="styles.nativeSelect"
      @change="handleNativeChange"
    >
      <option
        v-for="opt in props.options"
        :key="opt.value"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </option>
    </select>

    <!-- Trigger Button -->
    <button
      type="button"
      :id="props.native ? undefined : selectId"
      :class="[
        styles.trigger,
        isOpen ? styles.isOpen : null,
      ]"
      :disabled="props.disabled"
      :aria-expanded="props.native ? undefined : isOpen"
      :aria-haspopup="props.native ? undefined : 'listbox'"
      :aria-label="props.ariaLabel || currentLabel"
      @click="toggleDropdown"
    >
      <span :class="styles.triggerContent">
        <!-- Optional Icon Slot or Option Icon -->
        <span
          v-if="$slots.icon || selectedOption?.icon"
          :class="styles.triggerIcon"
          aria-hidden="true"
        >
          <slot name="icon">
            <component :is="selectedOption?.icon" v-if="typeof selectedOption?.icon === 'object'" />
            <span v-else-if="typeof selectedOption?.icon === 'string'">{{ selectedOption.icon }}</span>
          </slot>
        </span>
        <span :class="styles.triggerLabel">
          <slot name="label" :selected="selectedOption">
            {{ currentLabel }}
          </slot>
        </span>
      </span>

      <!-- Chevron -->
      <span
        :class="[styles.chevron, isOpen && !props.native ? styles.chevronUp : null]"
        aria-hidden="true"
      >
        {{ isOpen && !props.native ? '▲' : '▼' }}
      </span>
    </button>

    <!-- Floating Dropdown Menu (Custom Mode) -->
    <Transition
      v-if="!props.native"
      :enterActiveClass="styles.menuEnterActive"
      :leaveActiveClass="styles.menuLeaveActive"
      :enterFromClass="styles.menuHidden"
      :leaveToClass="styles.menuHidden"
    >
      <div
        v-if="isOpen"
        :class="[
          styles.menu,
          styles[`placement-${props.placement}`],
          styles[`align-${props.align}`],
        ]"
        role="listbox"
        :aria-labelledby="selectId"
      >
        <button
          v-for="opt in props.options"
          :key="opt.value"
          type="button"
          role="option"
          :aria-selected="props.modelValue === opt.value"
          :disabled="opt.disabled"
          :class="[
            styles.menuItem,
            props.modelValue === opt.value ? styles.isSelected : null,
          ]"
          @click="selectOption(opt)"
        >
          <span v-if="opt.icon" :class="styles.menuItemIcon" aria-hidden="true">
            <component :is="opt.icon" v-if="typeof opt.icon === 'object'" />
            <span v-else-if="typeof opt.icon === 'string'">{{ opt.icon }}</span>
          </span>
          <span :class="styles.menuItemLabel">
            <slot name="option" :option="opt">
              {{ opt.label }}
            </slot>
          </span>
          <span
            v-if="props.modelValue === opt.value"
            :class="styles.menuItemCheck"
            aria-hidden="true"
          >
            ✓
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>
