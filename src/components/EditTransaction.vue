<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    transaction : {
        type : Object,
        required :true
    }
})

const emit = defineEmits(['update-transaction', 'close-edit'])

const type = ref(props.transaction.type)
const amount = ref(props.transaction.amount)
const category = ref(props.transaction.category)
const date = ref(props.transaction.date)
const note = ref(props.transaction.note || '')

//if props change, form will change
watch (() => props.transaction,
     function (newVal) {
        type.value = newVal.type
        amount.value = newVal.amount
        category.value = newVal.category
        date.value = newVal.date
        note.value = newVal.note || ''
})

function updateTransaction(){
    const updateAmount = Number(amount.value)

    if(!Number.isFinite(updateAmount) || updateAmount <= 0){
        alert("Enter a valid number.")
        return
    }
    if(!category.value){
        alert("Please select a category.")
        return
    }
    const updated = {
        ...props.transaction,
        title : note.value.trim() || category.value,
        amount : updateAmount,
        type : type.value,
        category : category.value,
        date : date.value,
        note : note.value.trim()
    }

    emit ('update-transaction', updated)
}
</script>

<template>
    <div class="modal-overlay">
        <div class="update-container">
            <h2>Edit Transaction</h2>
               <form @submit.prevent="updateTransaction">
                <div class="form-group">
                    <label>Type</label>
                    <div class="type-radio">
                    <label>
                        <input type="radio" value="income" v-model="type"> Income
                    </label>
                    <label>
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
                    <button type="button" @click="$emit('close-edit')" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Update</button>
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
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.update-container {
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px;
}

.update-container h2 {
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
}

.cancel-btn {
  background: #e5e7eb;
  color: #374151;
}

.submit-btn {
  background: blue;
  color: #ffffff;
}
</style>