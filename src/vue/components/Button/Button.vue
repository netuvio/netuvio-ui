<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from './Button.types'
import styles from '../../../styles/components/Button.module.scss'

defineOptions({
  name: 'NvButton',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  block: false,
  threeD: undefined,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const isDisabled = computed<boolean>(() => props.disabled || props.loading)

// 3D layered hover effect (defaults to true for non-ghost variants)
const is3D = computed<boolean>(() => props.threeD ?? (props.variant !== 'ghost'))

// Resolved CSS module class list for the button element.
const classes = computed(() => [
  styles.button,
  styles[`variant-${props.variant}`],
  styles[`size-${props.size}`],
  props.block ? styles.block : null,
  is3D.value ? styles.is3d : null,
  props.loading ? styles.loading : null,
])

function handleClick(event: MouseEvent) {
  if (isDisabled.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<template>
  <button
    v-bind="$attrs"
    :type="props.type"
    :class="classes"
    :disabled="isDisabled"
    :aria-disabled="isDisabled || undefined"
    :aria-busy="props.loading || undefined"
    @click="handleClick"
  >
    <span v-if="is3D" :class="styles.bottomLayer" aria-hidden="true" />
    <span :class="styles.topLayer">
      <span v-if="props.loading" :class="styles.spinner" aria-hidden="true" />
      <span :class="styles.content">
        <slot />
      </span>
    </span>
  </button>
</template>
