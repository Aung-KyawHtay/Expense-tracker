<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  transaction: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "add", "update"]);

const type = ref("expense");
const title = ref("");
const amount = ref("");
const category = ref("");
const date = ref(new Date().toISOString().slice(0, 10));

function fillForm(transaction) {
  type.value = transaction?.type ?? "expense";
  title.value = transaction?.title ?? "";
  amount.value = transaction?.amount ?? "";
  category.value = transaction?.category ?? "";
  date.value = transaction?.date ?? new Date().toISOString().slice(0, 10);
}

watch(
  () => props.transaction,
  (transaction) => fillForm(transaction),
  { immediate: true },
);

function submitTransaction() {
  if (
    !category.value ||
    !date.value ||
    !amount.value ||
    Number(amount.value) <= 0
  ) {
    alert("Please fill in Category, Date and a valid Amount.");
    return;
  }

  const transactionData = {
    id: props.transaction?.id ?? Date.now(),
    type: type.value,
    title: title.value.trim(),
    amount: Number(amount.value),
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
          <h2>Add Transaction</h2>
          <p>Enter your income or expense details.</p>
        </div>

        <button
          type="button"
          class="close-btn"
          @click="emit('close')"
          aria-label="Close form"
        ></button>
      </div>

      <label for="type">Transaction Type</label>
      <select id="type" v-model="type">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <label>Category</label>
      <select v-model="category">
        <option value="" disabled selected>Select Category</option>
        <option value="Foods and Dinks">Foods and Dinks</option>
        <option value="Health">Health</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
        <option value="Salary">Salary</option>
        <option value="Others">Others</option>
      </select>

      <label for="amount">Amount</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        min="0.01"
        step="0.01"
        placeholder="Enter amount"
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
  justify-content: space-between;
  align-items: flex-start;
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
  border: none;
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
  outline: none;
}

.transaction-form input:focus,
.transaction-form select:focus {
  border-color: #2563eb;
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
  border: none;
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
