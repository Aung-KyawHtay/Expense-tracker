<script setup>
import { ref, watch, computed } from "vue";
import AddTransaction from "./components/AddTransaction.vue";
import Pagination from "./components/Pagination.vue";

const showAddModal = ref(false);
const transactions = ref(
  JSON.parse(localStorage.getItem("transactions") || "[]"),
);

watch(
  transactions,
  (newTransactions) => {
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  },
  { deep: true },
);

const currentPage = ref(1);
const itemsPerPage = 5;

const totalPages = computed(() => {
  return Math.ceil(transactions.value.length / itemsPerPage);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;

  return transactions.value.slice(start, start + itemsPerPage);
});

function changePage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

const editingTransaction = ref(null);

function openAddModal() {
  editingTransaction.value = null;
  showAddModal.value = true;
}

function closeAddModal() {
  showAddModal.value = false;
  editingTransaction.value = null;
}

function addTransaction(transaction) {
  transactions.value.unshift(transaction);
  closeAddModal();
}
function updateTransaction(updatedTransaction) {
  transactions.value = transactions.value.map((transaction) => {
    if (transaction.id === updatedTransaction.id) {
      return updatedTransaction;
    }

    return transaction;
  });

  closeAddModal();
}

function editTransaction(transaction) {
  editingTransaction.value = { ...transaction };
  showAddModal.value = true;
}

function deleteTransaction(id) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this transaction?",
  );

  if (confirmed) {
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== id,
    );
  }
}

function formatAmount(amount) {
  return Number(amount).toLocaleString();
}
</script>

<template>
  <main class="container">
    <header class="header">
      <div>
        <h1>Expense Tracker</h1>
        <p>Manage your income and expenses.</p>
      </div>

      <button class="add-btn" @click="openAddModal">+ Add Transaction</button>
    </header>

    <section class="content">
      <div class="table-header">
        <h2>Transactions</h2>
        <span>{{ transactions.length }} transactions</span>
      </div>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Notes</th>
              <th>Type</th>
              <th class="amount-column">Amount</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="transactions.length === 0">
              <td colspan="6" class="empty-message">No transactions yet.</td>
            </tr>

            <tr
              v-for="transaction in paginatedTransactions"
              :key="transaction.id"
            >
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.category }}</td>
              <td>{{ transaction.title || "—" }}</td>

              <td>
                <span class="type-badge" :class="transaction.type">
                  {{ transaction.type }}
                </span>
              </td>

              <td class="amount-column" :class="transaction.type">
                {{ transaction.type === "income" ? "+" : "-" }}
                {{ formatAmount(transaction.amount) }}
              </td>

              <td class="actions-column">
                <button class="edit-btn" @click="editTransaction(transaction)">
                  Edit
                </button>

                <button
                  class="delete-btn"
                  @click="deleteTransaction(transaction.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @change-page="changePage"
      />
    </section>

    <AddTransaction
      v-if="showAddModal"
      :transaction="editingTransaction"
      @close="closeAddModal"
      @add="addTransaction"
      @update="updateTransaction"
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: Arial, sans-serif;
  color: #111827;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
}

.header h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.header p {
  margin: 0;
  color: #6b7280;
}

.add-btn {
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.add-btn:hover {
  background: #1d4ed8;
}

.content {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.table-header h2 {
  margin: 0;
  font-size: 20px;
}

.table-header span {
  color: #6b7280;
  font-size: 14px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 15px 12px;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

th {
  background: #f9fafb;
  color: #6b7280;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

td {
  font-size: 14px;
}

tbody tr:hover {
  background: #f9fafb;
}

.empty-message {
  padding: 32px 12px;
  color: #6b7280;
  text-align: center;
}

.type-badge {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 20px;
  font-size: 12px;
  text-transform: capitalize;
}

.type-badge.income {
  background: #dcfce7;
  color: #15803d;
}

.type-badge.expense {
  background: #fee2e2;
  color: #b91c1c;
}

.income.amount-column {
  color: #16a34a;
  font-weight: 600;
}

.expense.amount-column {
  color: #dc2626;
  font-weight: 600;
}

.amount-column {
  text-align: right;
}

.actions-column {
  text-align: center;
}

.edit-btn,
.delete-btn {
  margin: 2px;
  padding: 7px 10px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.edit-btn {
  background: #dbeafe;
  color: #1d4ed8;
}

.delete-btn {
  background: #fee2e2;
  color: #b91c1c;
}

@media (max-width: 600px) {
  .container {
    margin-top: 24px;
    padding: 0 12px;
  }

  .header {
    align-items: flex-start;
    flex-direction: column;
  }

  .content {
    padding: 12px;
  }

  .table-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
