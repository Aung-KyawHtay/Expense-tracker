<script setup lang="ts">
defineProps<{
  selectedCount: number;
}>();

const emit = defineEmits<{
  deleteSelected: [];
  clearSelection: [];
}>();
</script>

<template>
  <div v-if="selectedCount > 0" class="bulk-actions">
    <span>{{ selectedCount }} selected</span>

    <div class="bulk-buttons">
      <button type="button" class="clear-btn" @click="emit('clearSelection')">
        Clear
      </button>

      <button
        type="button"
        class="bulk-delete-btn"
        @click="emit('deleteSelected')"
      >
        Delete Selected
      </button>
    </div>
  </div>
</template>

<style scoped>
.bulk-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px 16px;
  border: 1px solid #d1fae5;
  border-radius: 10px;
  background: #ecfdf5;
  color: #065f46;
  font-size: 14px;
  font-weight: 600;
}

.bulk-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bulk-actions button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.clear-btn {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db !important;
}

.bulk-delete-btn {
  background: #dc2626;
  color: white;
}

.bulk-delete-btn:hover {
  background: #b91c1c;
}
</style>
