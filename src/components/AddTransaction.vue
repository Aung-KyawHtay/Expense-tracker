//Add , edit , update and cancel form

<script setup lang="ts">
import { ref, watch } from "vue";
import { categories } from "@/constants/categories";
import type { Transactions } from "@/types/transaction";

const props = defineProps<{
  transaction: Transactions | null;
}>();

const emit = defineEmits<{
  close: [];
  add: [transaction: Transactions];
  update: [transaction: Transactions];
}>();

const type = ref<"expense" | "income">("expense");
const title = ref("");
const amount = ref<number | string>("");
const category = ref("");
const date = ref("");

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Fill form when editing a transaction
function fillForm(transaction: Transactions | null) {
  type.value = transaction?.type ?? "expense";
  title.value = transaction?.title ?? "";
  amount.value = transaction?.amount ?? "";
  category.value = transaction?.category ?? "";
  date.value = transaction?.date ?? getTodayDate();
}

watch(
  () => props.transaction,
  (transaction) => fillForm(transaction),
  { immediate: true },
);

function submitTransaction() {
  const parsedAmount = Number(amount.value);

  if (
    !category.value ||
    amount.value === "" ||
    !Number.isFinite(parsedAmount) ||
    parsedAmount <= 0
  ) {
    alert("Please select a category and enter a valid amount.");
    return;
  }

  if (!date.value) {
    alert("Please select a date.");
    return;
  }

  const transactionData: Transactions = {
    id: props.transaction?.id ?? Date.now(),
    type: type.value,
    title: title.value.trim(),
    amount: parsedAmount,
    category: category.value,
    date: date.value,
  };

  if (props.transaction) {
    emit("update", transactionData);
  } else {
    emit("add", transactionData);
  }
}
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <form class="transaction-form" @submit.prevent="submitTransaction">
      <div class="form-header">
        <div>
          <h2>
            {{ props.transaction ? "Edit Transaction" : "Add Transaction" }}
          </h2>
          <p>
            {{
              props.transaction
                ? "Update your income or expense details."
                : "Enter your income or expense details."
            }}
          </p>
        </div>

        <button
          type="button"
          class="close-btn"
          aria-label="Close form"
          @click="emit('close')"
        >
          ×
        </button>
      </div>

      <label for="type">Transaction Type</label>
      <select id="type" v-model="type">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <label for="category">Category</label>
      <select id="category" v-model="category" required>
        <option value="" disabled>Select category</option>
        <option v-for="item in categories" :key="item" :value="item">
          {{ item }}
        </option>
      </select>

      <label for="amount">Amount</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        min="0.01"
        step="any"
        placeholder="Enter amount..."
        required
      />

      <label for="date">Date</label>
      <input id="date" v-model="date" type="date" required />

      <label for="title">Notes</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="e.g. Food, Salary"
      />

      <div class="form-actions">
        <button type="button" class="cancel-btn" @click="emit('close')">
          Cancel
        </button>

        <button type="submit" class="save-btn">Save</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(17, 24, 39, 0.55);
}

.transaction-form {
  box-sizing: border-box;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 28px;
  border-radius: 16px;
  background: #fff;
  color: #111827;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.form-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.form-header h2 {
  margin: 0 0 8px;
  font-size: 22px;
}

.form-header p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.close-btn {
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 28px;
  cursor: pointer;
}

.transaction-form label {
  display: block;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 600;
}

.transaction-form input,
.transaction-form select {
  box-sizing: border-box;
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
}

.transaction-form input:focus,
.transaction-form select:focus {
  border-color: #2563eb;
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.form-actions button {
  padding: 11px 16px;
  border: 0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.cancel-btn {
  background: #f3f4f6;
  color: #374151;
}

.save-btn {
  background: #2563eb;
  color: #fff;
}

.save-btn:hover {
  background: #1d4ed8;
}
</style>
