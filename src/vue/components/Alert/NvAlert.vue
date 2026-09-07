<script setup lang="ts">
import { computed } from 'vue';
import type { AlertProps, AlertEmits } from './Alert.types';
import type { IconName } from '../Icon/Icon.types';
import styles from '../../../shared/styles/components/Alert.module.css';
import NvIcon from '../Icon/NvIcon.vue';

defineOptions({
  name: 'NvAlert',
});

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  radius: 'md',
  threeD: true,
  icon: true,
  dismissible: false,
});

const emit = defineEmits<AlertEmits>();

const alertClasses = computed(() => [
  styles.alert,
  styles[`variant-${props.variant}`],
  styles[`radius-${props.radius}`],
  props.threeD ? styles['shadow-sm'] : styles['shadow-none'],
]);

const resolvedIconName = computed<IconName | (string & {}) | null>(() => {
  if (typeof props.icon === 'string') return props.icon;
  if (!props.icon) return null;
  switch (props.variant) {
    case 'danger':
      return 'alert';
    case 'warning':
      return 'warn';
    case 'success':
      return 'check';
    default:
      return 'info';
  }
});

function handleDismiss() {
  emit('dismiss');
}
</script>

<template>
  <div :class="alertClasses" role="alert">
    <slot name="icon">
      <div v-if="resolvedIconName" :class="styles.iconBadge">
        <NvIcon :name="resolvedIconName" :size="14" />
      </div>
    </slot>

    <div :class="styles.content">
      <div v-if="title || $slots.title" :class="styles.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.default" :class="styles.description">
        <slot>{{ description }}</slot>
      </div>
    </div>

    <div v-if="$slots.action || dismissible" :class="styles.actions">
      <slot name="action" />
      <button
        v-if="dismissible"
        type="button"
        :class="styles.closeButton"
        aria-label="Dismiss alert"
        @click="handleDismiss"
      >
        <NvIcon name="close" :size="14" />
      </button>
    </div>
  </div>
</template>
