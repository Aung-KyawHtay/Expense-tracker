<script setup>
import { computed, ref } from 'vue';
import AddTransaction from './components/AddTransaction.vue';
import TransactionLists from './components/TransactionLists.vue';
import EditTransaction from './components/EditTransaction.vue';
import Pagination from './components/Pagination.vue';

const transactions = ref([])
const editTransaction = ref(null) 
const showModal = ref(false)
const currentPage = ref(1)
const itemsPerPage = 5

function handleAddTransaction(transaction){
  transactions.value.unshift(transaction)
  //localStorage.setItem('transaction-data', {transaction});

  localStorage.setItem(
  'transaction-data',
  JSON.stringify(transaction)
);
  showModal.value = false
}

//delete button
function handleDelTransaction(id){
  transactions.value = transactions.value.filter(transaction => transaction.id !== id)
}

//Edit
function handleEditTransaction (transaction){
  editTransaction.value = transaction 
}

function handleUpdateTransaction (updateTransaction){
  const index = transactions.value.findIndex(t => t.id === updateTransaction.id)
  if(index !== -1) {
    transactions.value[index] = updateTransaction
  }
  editTransaction.value = null
}
const totalPages = computed(() => {
  return Math.ceil(transactions.value.length / itemsPerPage) || 1
})

const paginatedtransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return transactions.value.slice(start,end)
})

function handlePageChange(page){
  currentPage.value = page
}
</script>

<template>
  <main class="container">
    <header class="header">
      <div>
        <h1>Dashboard</h1>
        <p>Money transaction, income & outcome</p>
      </div>
      <button class="add-btn" @click="showModal = true"> + Add Transaction</button>
    </header>
    <AddTransaction 
      v-if="showModal"
      @add-transaction="handleAddTransaction"
      @close-modal="showModal = false"
    />

    <EditTransaction 
      v-if="editTransaction"
      :transaction="editTransaction"
      @update-transaction="handleUpdateTransaction"
      @close-edit="editTransaction = null"
    />
    
    <TransactionLists 
      :transactions="paginatedtransactions"
      @delete-transaction="handleDelTransaction"
      @edit-transaction="handleEditTransaction"
    />
    
    <Pagination 
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="handlePageChange"
    />

    <!-- <div class="content">
      <ul>
        <li v-for="transaction in transactions" :key="transaction.id">
          {{ transaction.title }} - ${{ transaction.amount }} ({{ transaction.type }})
        </li>
      </ul>
    </div> -->
  </main>
</template>

<style scoped>
  .container{
    max-width: 900px;
    margin: 40px auto;
    padding: 0 20px;
    font-family: Arial, Helvetica, sans-serif;
  }
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .header p{
    margin: 5px 0 0;
    color: #6b7280;
    font-weight: bold;
  }
  h1{
    margin: 0;
    color: #111827;
  }
  .add-btn {
    background: blue;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
  }
  .add-btn:hover {
    background: #0f51ad;
  }
</style>