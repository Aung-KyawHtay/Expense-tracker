<script setup>
    defineProps({
        transactions : {
            type : Array,
            required : true
        }
    })
    defineEmits(["delete-transaction", "edit-transaction"])
</script>

<template>
  <div class="list-container">
    <h2>Recent Transactions</h2>

    <p v-if="transactions.length === 0" class="no-data">
      No transactions added yet..
    </p>

    <div class="show-data" v-for="transaction in transactions" :key="transaction.id">
      <div class="data-info">
        <div :class="['icon-box', transaction.type]">
            {{ transaction.type=== 'expense' ? '-':'+'}}
        </div>
        <div>
            <h4>{{ transaction.title }}</h4>
            <span class="data-notype">
                {{ transaction.category }}.{{ transaction.date }}.
                <span class="type">{{ transaction.type }}</span>
            </span>
        </div>
      </div>
      <div class="transaction-right">
        <span :class="['amount', transaction.type]">
            {{ transaction.type === 'expense' ? '-' : '+' }}${{ transaction.amount.toLocaleString() }}
        </span>
        <div class="action-btns">
            <button @click="$emit('edit-transaction', transaction)" class="edit-btn">Edit</button>
            <button @click="$emit('delete-transaction', transaction.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>