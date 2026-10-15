<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import type { TableColumn, TableEmits, TableProps, TableRow } from './Table.types';
import styles from '../../../shared/styles/components/Table.module.css';

defineOptions({ name: 'NvTable', inheritAttrs: false });

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  rows: () => [],
  rowKey: 'id',
  size: 'md',
  radius: 'xl',
  variant: 'default',
  threeD: true,
  base3dOffset: 4,
  block: true,
  striped: false,
  hoverable: true,
  loading: false,
  emptyText: 'No data available',
});

const emit = defineEmits<TableEmits>();
const attrs = useAttrs();

const wrapperClasses = computed(() => [
  styles.wrapper,
  styles[`size-${props.size}`],
  styles[`radius-${props.radius}`],
  styles[`variant-${props.variant}`],
  props.block ? styles.block : null,
  props.threeD ? null : styles.noThreeD,
  props.striped ? styles.striped : null,
  props.hoverable ? styles.hoverable : null,
  attrs.class,
]);

const wrapperStyle = computed(() => {
  const offset = props.base3dOffset;
  const resolvedOffset = typeof offset === 'number'
    ? `${offset}px`
    : (offset.endsWith('px') ? offset : `${offset}px`);
  return [{ '--table-base-3d-offset': resolvedOffset }, attrs.style];
});

function columnStyle(column: TableColumn) {
  if (column.width === undefined) return undefined;
  return { width: typeof column.width === 'number' ? `${column.width}px` : column.width };
}

function rowIdentity(row: TableRow, index: number) {
  if (typeof props.rowKey === 'function') return props.rowKey(row, index);
  const value = row[props.rowKey];
  return typeof value === 'string' || typeof value === 'number' ? value : index;
}

function handleRowClick(row: TableRow, index: number, event: MouseEvent) {
  emit('rowClick', row, index, event);
}
</script>

<template>
  <div
    :theme="props.theme"
    :data-theme="props.theme"
    :class="wrapperClasses"
    :style="wrapperStyle"
  >
    <table :class="styles.table" :aria-label="props.ariaLabel">
      <caption v-if="$slots.caption || props.caption" :class="styles.caption">
        <slot name="caption">{{ props.caption }}</slot>
      </caption>

      <thead :class="styles.head">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.key"
            scope="col"
            :class="[styles.cell, styles.headerCell, styles[`align-${column.align || 'left'}`]]"
            :style="columnStyle(column)"
          >
            <slot :name="`header-${column.key}`" :column="column">{{ column.label }}</slot>
          </th>
        </tr>
      </thead>

      <tbody :class="styles.body" :aria-busy="props.loading || undefined">
        <tr v-if="props.loading" :class="styles.loadingRow">
          <td
            v-if="$slots.loading"
            :colspan="Math.max(props.columns.length, 1)"
            :class="[styles.cell, styles.stateCell]"
          >
            <slot name="loading" />
          </td>
          <template v-else>
            <td
              v-for="(column, columnIndex) in props.columns"
              :key="column.key"
              :class="[styles.cell, styles[`align-${column.align || 'left'}`]]"
            >
              <span :class="styles.skeleton" aria-hidden="true" />
              <span v-if="columnIndex === 0" :class="styles.visuallyHidden">Loading</span>
            </td>
          </template>
        </tr>

        <tr v-else-if="props.rows.length === 0">
          <td :colspan="Math.max(props.columns.length, 1)" :class="[styles.cell, styles.stateCell]">
            <slot name="empty">{{ props.emptyText }}</slot>
          </td>
        </tr>

        <template v-else>
          <tr
            v-for="(row, rowIndex) in props.rows"
            :key="rowIdentity(row, rowIndex)"
            :class="styles.row"
            @click="handleRowClick(row, rowIndex, $event)"
          >
            <td
              v-for="column in props.columns"
              :key="column.key"
              :class="[styles.cell, styles[`align-${column.align || 'left'}`]]"
            >
              <slot
                :name="`cell-${column.key}`"
                :value="row[column.key]"
                :row="row"
                :column="column"
                :row-index="rowIndex"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
