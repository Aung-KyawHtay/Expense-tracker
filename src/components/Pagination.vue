<script setup>
defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    }
})

defineEmits(['page-change'])
</script>

<template>
    <div class="pagination-container" v-if="totalPages > 1">
        <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
        
        <div class="pagination-btns">
            <button 
                :disabled="currentPage === 1" 
                @click="$emit('page-change', currentPage - 1)">
                &lt;&lt;
            </button>

            <button 
                v-for="page in totalPages" 
                :key="page"
                :class="{ active: page === currentPage }"
                @click="$emit('page-change', page)">
                {{ page }}
            </button>

            <button 
                :disabled="currentPage === totalPages" 
                @click="$emit('page-change', currentPage + 1)">
                &gt;&gt;
            </button>
        </div>
    </div>
</template>

<style scoped>
.pagination-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    padding: 10px 0;
    font-size: 14px;
    color: #4b5563;
    font-family: Arial, Helvetica, sans-serif;
}

.pagination-btns {
    display: flex;
    gap: 5px;
    align-items: center;
}

.pagination-btns button {
    background: #ffffff;
    border: 1px solid #d1d5db;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    color: #374151;
}

.pagination-btns button:hover:not(:disabled) {
    background: #f3f4f6;
}

.pagination-btns button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-btns button.active {
    background: #111827;
    color: #ffffff;
    border-color: #111827;
}
</style>