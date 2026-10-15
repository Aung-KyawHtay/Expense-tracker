<script setup lang="ts">
// defineProps({
//   currentPage: {
//     type: Number,
//     required: true,
//   },
//   totalPages: {
//     type: Number,
//     required: true,
//   },
// });

// const emit = defineEmits(["change-page"]);

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  "change-page": [page: number];
}>();
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <button
      type="button"
      :disabled="currentPage === 1"
      @click="emit('change-page', currentPage - 1)"
    >
      Previous
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      type="button"
      :class="{ active: currentPage === page }"
      @click="emit('change-page', page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      @click="emit('change-page', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}

.pagination button {
  padding: 9px 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #374151;
  cursor: pointer;
}

.pagination button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}

.pagination button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
