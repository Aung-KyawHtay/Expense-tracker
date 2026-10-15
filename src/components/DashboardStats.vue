<script setup lang="ts">
import { computed } from "vue";
import type { Transactions } from "../types/transaction";

const props = defineProps<{
  transactions: Transactions[];
}>();

const totalIncome = computed(() => {
  return props.transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
});

const totalExpenses = computed(() => {
  return props.transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
});

const balance = computed(() => {
  return totalIncome.value - totalExpenses.value;
});

function formatAmount(amount: number): string {
  return amount.toLocaleString("en-US");
}
</script>

<template>
  <section class="stats-grid">
    <article class="stat-card income-card">
      <div class="stat-icon">↗</div>
      <p class="stat-label">Total Income</p>
      <h2>MMK {{ formatAmount(totalIncome) }}</h2>
      <span class="stat-description">Total money received</span>
    </article>

    <article class="stat-card expense-card">
      <div class="stat-icon">↘</div>
      <p class="stat-label">Total Expenses</p>
      <h2>MMK {{ formatAmount(totalExpenses) }}</h2>
      <span class="stat-description">Total money spent</span>
    </article>

    <article class="stat-card balance-card">
      <div class="stat-icon">◈</div>
      <p class="stat-label">Current Balance</p>
      <h2>MMK {{ formatAmount(balance) }}</h2>
      <span class="stat-description">Income minus expenses</span>
    </article>
  </section>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin: 24px 0;
}

.stat-card {
  padding: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 3px 12px rgb(15 23 42 / 4%);
}

.stat-icon {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  margin-bottom: 14px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 700;
}

.income-card .stat-icon {
  color: #047857;
  background: #d1fae5;
}

.expense-card .stat-icon {
  color: #b91c1c;
  background: #fee2e2;
}

.balance-card .stat-icon {
  color: #4338ca;
  background: #e0e7ff;
}

.stat-label {
  margin: 0 0 8px;
  color: #6b7280;
  font-size: 14px;
}

.stat-card h2 {
  margin: 0 0 10px;
  color: #111827;
  font-size: clamp(18px, 2vw, 25px);
  overflow-wrap: anywhere;
}

.stat-description {
  color: #9ca3af;
  font-size: 12px;
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>
