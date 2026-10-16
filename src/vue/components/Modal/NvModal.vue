<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';
import { NvButton } from '../Button';
import type { ModalProps } from './Modal.types';
import styles from '../../../shared/styles/components/Modal.module.css';

defineOptions({ name: 'NvModal' });
const props = withDefaults(defineProps<ModalProps>(), {
  modelValue: false, size: 'md', closeLabel: 'Close', closeOnBackdrop: true, closeOnEscape: true,
});
const emit = defineEmits<{ 'update:modelValue': [value: boolean]; close: [] }>();
const dialog = ref<HTMLDialogElement>();
const id = useId();
let returnFocus: HTMLElement | null = null;
let previousOverflow: string | undefined;
const backdropPressed = ref(false);
let lifecycle = 0;
let disposed = false;

function restore() {
  if (previousOverflow !== undefined) document.documentElement.style.overflow = previousOverflow;
  previousOverflow = undefined;
  if (returnFocus?.isConnected) returnFocus.focus();
  returnFocus = null;
}
function sync() {
  if (!dialog.value) return;
  if (props.modelValue && !dialog.value.open) {
    lifecycle++;
    returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow = document.documentElement.style.overflow;
    dialog.value.showModal();
    document.documentElement.style.overflow = 'hidden';
  } else if (!props.modelValue && dialog.value.open) {
    dialog.value.close();
    restore();
  }
}
function close() { emit('update:modelValue', false); }
async function closed() {
  if (disposed || dialog.value?.open) return;
  restore();
  if (props.modelValue) close();
  const current = ++lifecycle;
  await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  await Promise.allSettled((dialog.value?.getAnimations() ?? []).map(animation => animation.finished));
  if (current === lifecycle && !dialog.value?.open) emit('close');
}
function outside(event: MouseEvent) {
  const rect = dialog.value?.getBoundingClientRect();
  return !!rect && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom);
}
function trapFocus(event: KeyboardEvent) {
  if (event.key !== 'Tab' || !dialog.value) return;
  const elements = Array.from(dialog.value.querySelectorAll<HTMLElement>(
    'a[href], button, input, textarea, select, [tabindex]',
  )).filter(element => element.tabIndex >= 0 && !element.matches(':disabled, [hidden]') && element.getClientRects().length > 0);
  const first = elements[0];
  const last = elements.at(-1);
  if (!first || !last) { event.preventDefault(); dialog.value.focus(); return; }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault(); first.focus();
  }
}
watch(() => props.modelValue, sync, { flush: 'post' });
onMounted(sync);
onBeforeUnmount(() => { disposed = true; lifecycle++; dialog.value?.close(); restore(); });
</script>

<template>
  <dialog ref="dialog" :class="[styles.modal, styles[size]]" :theme="theme" :data-theme="theme"
    :aria-labelledby="`${id}-title`" :aria-describedby="description ? `${id}-description` : undefined"
    @cancel.prevent="closeOnEscape && close()" @close="closed" @keydown="trapFocus"
    @pointerdown="backdropPressed = outside($event)"
    @click="closeOnBackdrop && backdropPressed && outside($event) && close()">
    <header :class="styles.header">
      <div>
        <h2 :id="`${id}-title`">{{ title }}</h2>
        <p v-if="description" :id="`${id}-description`">{{ description }}</p>
      </div>
      <NvButton :class="styles.closeButton" type="button" variant="ghost" :three-d="false" :aria-label="closeLabel" @click="close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </NvButton>
    </header>
    <div :class="styles.body"><slot /></div>
    <footer v-if="$slots.footer" :class="styles.footer"><slot name="footer" :close="close" /></footer>
  </dialog>
</template>
