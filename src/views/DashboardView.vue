<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import DashboardStats from "../components/DashboardStats.vue";
import { categories } from "@/constants/categories";
import type { Transactions } from "@/types/transaction";

function loadTransactions(): Transactions[] {
  try {
    const saved = JSON.parse(localStorage.getItem("transactions") || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function loadBudget(): number {
  try {
    const saved = localStorage.getItem("expense-tracker-monthly-budget");
    const value = saved === null ? 0 : Number(saved);

    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

const transactions = ref<Transactions[]>(loadTransactions());
const monthlyBudget = loadBudget();
const selectedMonth = new Date().toISOString().slice(0, 7);

const monthlyExpenses = computed(() =>
  transactions.value.filter(
    (item) => item.type === "expense" && item.date.startsWith(selectedMonth),
  ),
);

const totalSpent = computed(() =>
  monthlyExpenses.value.reduce((total, item) => total + Number(item.amount), 0),
);

const remaining = computed(() => monthlyBudget - totalSpent.value);

const progress = computed(() =>
  monthlyBudget > 0
    ? Math.min((totalSpent.value / monthlyBudget) * 100, 100)
    : 0,
);

const recentTransactions = computed(() => transactions.value.slice(0, 5));

const categorySpending = computed(() =>
  categories
    .map((category) => {
      const spent = monthlyExpenses.value
        .filter((item) => item.category === category)
        .reduce((total, item) => total + Number(item.amount), 0);

      return {
        name: category,
        spent,
        percentage: totalSpent.value > 0 ? (spent / totalSpent.value) * 100 : 0,
      };
    })
    .filter((item) => item.spent > 0),
);

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US");
}
</script>

<template>
  <main class="container">
    <header class="header">
      <div>
        <h1>Dashboard</h1>
        <p>Monitor your income, expenses, and budget.</p>
      </div>

      <RouterLink to="/transactions" class="add-btn">
        + Add Transaction
      </RouterLink>
    </header>

    <DashboardStats :transactions="transactions" />

    <div class="db-grids">
      <section class="content">
        <div class="table-header">
          <h2>Recent Transactions</h2>
          <RouterLink to="/transactions" class="view-all">View All</RouterLink>
        </div>

        <div v-if="recentTransactions.length === 0" class="empty-message">
          No transactions yet.
        </div>

        <div v-else class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Notes</th>
                <th>Type</th>
                <th class="amount-column">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="transaction in recentTransactions"
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
                  MMK {{ formatAmount(transaction.amount) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="content">
        <div class="table-header">
          <h2>Spending by Category</h2>
          <span>{{ selectedMonth }}</span>
        </div>

        <div v-if="categorySpending.length === 0" class="empty-message">
          No expenses recorded for this month.
        </div>

        <div v-else class="category-list">
          <article
            v-for="item in categorySpending"
            :key="item.name"
            class="category-row"
          >
            <div class="category-info">
              <strong>{{ item.name }}</strong>
              <span>MMK {{ formatAmount(item.spent) }}</span>
            </div>
            <div class="progress-track">
              <div
                class="progress-fill"
                :style="{ width: `${item.percentage}%` }"
              ></div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <section class="content budget-status">
      <div class="table-header">
        <div>
          <h2>Budget Status</h2>
          <p>
            MMK {{ formatAmount(totalSpent) }} spent of MMK
            {{ formatAmount(monthlyBudget) }} this month
          </p>
        </div>
        <RouterLink to="/budget" class="view-all">Manage Budget</RouterLink>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="Math.round(progress)"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Monthly budget used"
      >
        <div
          class="progress-fill"
          :class="{ over: remaining < 0 }"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <p v-if="monthlyBudget === 0" class="helper-text">
        No budget set yet. Set a monthly budget to track your spending.
      </p>
      <p v-else-if="remaining < 0" class="helper-text expense">
        You have exceeded your monthly budget.
      </p>
      <p v-else class="helper-text">
        MMK {{ formatAmount(remaining) }} remaining ·
        {{ Math.round(progress) }}% used
      </p>
    </section>
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
  margin-bottom: 8px;
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
  display: inline-block;
  padding: 12px 18px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.add-btn:hover {
  background: #1d4ed8;
}

.db-grids {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.content {
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
}

.budget-status {
  margin-bottom: 24px;
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

.table-header p,
.table-header span {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.view-all {
  color: #2563eb;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
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

.empty-message {
  padding: 32px 12px;
  color: #6b7280;
  text-align: center;
}

.type-badge {
  display: inline-block;
  padding: 5px 9px;
  border-radius: 10px;
  font-weight: bold;
  text-transform: capitalize;
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

.category-list {
  display: grid;
  gap: 18px;
}

.category-row {
  display: grid;
  gap: 8px;
}

.category-info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
}

.category-info span {
  color: #6b7280;
  white-space: nowrap;
}

.progress-track {
  height: 9px;
  overflow: hidden;
  border-radius: 20px;
  background: #edf0ea;
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: #2563eb;
  transition: width 0.25s ease;
}

.progress-fill.over {
  background: #dc2626;
}

.helper-text {
  margin: 12px 0 0;
  color: #6b7280;
  font-size: 14px;
}

.helper-text.expense {
  color: #dc2626;
}

@media (max-width: 900px) {
  .db-grids {
    grid-template-columns: 1fr;
  }
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
