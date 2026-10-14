<script setup>
import { ref } from "vue";

const type = ref("expense"); // 'income' or 'expense'
const amount = ref("");
const category = ref("");
const date = ref(new Date().toISOString().slice(0, 10)); // current date ko ISO format
const note = ref("");

const emit = defineEmits(["add-transaction", "close-modal"]);

function addTransaction() {
  const Amount = Number(amount.value);

  if (!Number.isFinite(Amount) || Amount <= 0) {
    alert("Enter a valid amount.");
    return;
  }

  if (!category.value) {
    alert("Please select a category.");
    return;
  }

  const transaction = {
    id: crypto.randomUUID(), // Date.now()
    title: note.value.trim() || category.value, // If no note use category
    
    amount: Amount,
    type: type.value,
    category: category.value,
    date: date.value,
    note: note.value.trim(),
  };

  emit("add-transaction", transaction);
  
  // Modal close
  emit("close-modal");

  // reset form
  amount.value = "";
  category.value = "";
  note.value = "";
}
</script>

<template>
  <div class="modal-overlay">
    <div class="transaction-card">
      <h2>Add Transaction</h2>

      <form @submit.prevent="addTransaction">
        <div class="form-group">
          <label>Type</label>
          <div class="type-radio">
            <label class="radio-label">
               <input type="radio" value="income" v-model="type"> Income
            </label>
            <label class="radio-label">
               <input type="radio" value="expense" v-model="type"> Expense
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Amount</label>
          <input type="number" step="any" v-model="amount" placeholder="0.00" required />
        </div>

        <!-- Category -->
        <div class="form-group">
          <label>Category</label>
          <select v-model="category" required>
            <option value="" disabled>Select a category</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div class="form-group">
          <label>Date</label>
          <input type="date" v-model="date" required />
        </div>

        <!-- Note (optional) -->
        <div class="form-group">
          <label>Note <span class="optional">(optional)</span></label>
          <input
            type="text"
            v-model="note"
            placeholder="e.g. Lunch with friends"
          />
        </div>

        <!-- Action Buttons -->
        <div class="button-group">
          <button type="button" @click="$emit('close-modal')" class="cancel-btn">Cancel</button>
          <button type="submit" class="submit-btn">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-in-out;
} 

.transaction-card {
  background: #ffffff;
  padding: 28px;
  border-radius: 16px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
  box-sizing: border-box;
  margin: 20px;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  color: #111827;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.optional {
  font-weight: normal;
  color: #9ca3af;
}

.type-radio {
  display: flex;
  gap: 20px;
}

.radio-label {
  font-weight: normal !important;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

input[type="text"],
input[type="number"],
input[type="date"],
select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  background: #fff;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus, select:focus {
  border-color: #194bb7;
  box-shadow: 0 0 0 3px rgba(25, 75, 183, 0.1);
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}

.cancel-btn, .submit-btn {
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s;
}

.cancel-btn {
  background: #e5e7eb;
  color: #374151;
}

.submit-btn {
  background: #194bb7;
  color: #ffffff;
}

.cancel-btn:hover {
  background: #d1d5db;
}

.submit-btn:hover {
  background: #053679;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>