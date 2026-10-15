<script setup>
import { ref, watch, computed } from "vue";

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["filtered"]);

const search = ref("");
const searchedDate = ref("");
const searchedCategory = ref("all");
const searchedType = ref("all");

// Search and filter
const searchedTransactions = computed(() => {
  return props.transactions.filter((transaction) => {
    const searchInput = search.value.toLowerCase();

    const matchSearch =
      String(transaction.id).includes(searchInput) ||
      (transaction.title || "").toLowerCase().includes(searchInput) ||
      (transaction.category || "").toLowerCase().includes(searchInput);

    const matchType =
      searchedType.value === "all" || transaction.type === searchedType.value;

    const matchCategory =
      searchedCategory.value === "all" ||
      transaction.category === searchedCategory.value;

    const matchDate =
      !searchedDate.value || transaction.date === searchedDate.value;

    return matchSearch && matchType && matchCategory && matchDate;
  });
});

// Send filtered transactions to App.vue
watch(
  searchedTransactions,
  (results) => {
    emit("filtered", results);
  },
  { immediate: true },
);

// Reset search
function resetSearch() {
  search.value = "";
  searchedType.value = "all";
  searchedCategory.value = "all";
  searchedDate.value = "";
}

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString() + " MMK";
}
</script>

<template>
  <main class="search-container">
    <div class="header">
      <div>
        <h2>Search and Filters</h2>
        <p>Find transactions using the options below</p>
      </div>
      <span>{{ searchedTransactions.length }} results</span>
    </div>

    <div class="search">
      <input type="text" v-model="search" placeholder="Enter search items.." />

      <!-- <label for="transaction-type">Transaction Types </label> -->
      <select v-model="searchedType">
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <!-- <label for="category">Categories </label> -->
      <!-- <option
        v-for="category in [...new Set(props.transactions.map(t => t.category).filter(Boolean))]"
        :key="category"
        :value="category"
      >
        {{ category }}
      </option> -->

      <select v-model="searchedCategory">
        <option value="all">All Categories</option>
        <option value="Foods and Dinks">Foods and Dinks</option>
        <option value="Health">Health</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Salary">Salary</option>
        <option value="Others">Others</option>
      </select>

      <input id="dateFilter" v-model="searchedDate" type="date" />

      <button type="button" @click="resetSearch">Reset Filters</button>
    </div>
  </main>
</template>

<style scoped>
.search-container {
  padding: 24px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.header h2 {
  margin: 0 0 6px;
  color: #111827;
  font-size: 20px;
  font-weight: 700;
}

.header p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

span {
  padding: 7px 12px;
  color: #2563eb;
  background: #eff6ff;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

/* Search and filters */
.search {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.search input,
.search select {
  flex: 1;
  min-width: 150px;
  height: 42px;
  padding: 0 12px;
  color: #374151;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  font-size: 14px;
  outline: none;
}

.search input::placeholder {
  color: #9ca3af;
}

/* Reset button */
.search button {
  height: 42px;
  padding: 0 16px;
  color: #ffffff;
  background: #2563eb;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.search button:hover {
  background: #1d4ed8;
}

.search button:active {
  transform: scale(0.97);
}

/* Responsive design */
@media (max-width: 768px) {
  .search-container {
    padding: 18px;
  }

  .search {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .search input,
  .search select {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
  }

  .search button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .search-container {
    padding: 14px;
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .search {
    grid-template-columns: 1fr;
  }
}
</style>
