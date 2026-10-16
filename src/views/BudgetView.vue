<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { categories } from "@/constants/categories";
import type { Transactions } from "@/types/transaction";

function loadTransactions(): Transactions[] {
  try {
    const saved = JSON.parse(localStorage.getItem("transactions") || "[]");
    return Array.isArray(saved) ? saved : [];
    //   if (Array.isArray(saved)) {
    //   return saved;
    // } else {
    //   return [];
    // }
  } catch {
    return [];
  }
}

const transactions = ref<Transactions[]>(loadTransactions());

const STORAGE_KEY = "expense-tracker-monthly-budget";

function loadBudget(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const value = saved === null ? 0 : Number(saved);

    //localStorage.setItem(STORAGE_KEY, "450000");

    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

const monthlyBudget = ref(loadBudget());
const budgetInput = ref(String(monthlyBudget.value));
const selectedMonth = ref(new Date().toISOString().slice(0, 7));

const monthlyExpenses = computed(() =>
  transactions.value.filter(
    (item) =>
      item.type === "expense" && item.date.startsWith(selectedMonth.value),
  ),
);

const totalSpent = computed(() =>
  monthlyExpenses.value.reduce((total, item) => total + Number(item.amount), 0),
);

const remaining = computed(() => monthlyBudget.value - totalSpent.value);

//does not work
const progress = computed(() =>
  monthlyBudget.value > 0
    ? Math.min((totalSpent.value / monthlyBudget.value) * 100, 100)
    : 0,
);

const categoryBudgets = computed(() =>
  categories.map((category) => {
    const spent = monthlyExpenses.value
      .filter((item) => item.category === category)
      .reduce((total, item) => total + Number(item.amount), 0);

    return {
      name: category,
      spent,
      percentage: totalSpent.value > 0 ? (spent / totalSpent.value) * 100 : 0,
    };
  }),
);

function saveBudget() {
  const value = Number(budgetInput.value);

  if (budgetInput.value.trim() === "" || !Number.isFinite(value) || value < 0) {
    alert("Please enter a valid budget amount.");
    return;
  }

  monthlyBudget.value = value;
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

watch(monthlyBudget, (value) => {
  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Budget remains
  }
});
</script>

<template>
  <section class="budget-page">
    <header class="page-header">
      <div>
        <p class="page-eyebrow">FINANCIAL PLANNING</p>
        <h1>Budget</h1>
        <p class="page-description">
          Plan your spending and keep your expenses under control.
        </p>
      </div>

      <input
        v-model="selectedMonth"
        class="month-input"
        type="month"
        aria-label="Select budget month"
      />
    </header>

    <!-- Budget Setup -->
    <section class="content-card budget-setup">
      <div>
        <h2>Monthly Budget</h2>
        <p>Set your spending limit for the selected month.</p>
      </div>

      <form class="budget-form" @submit.prevent="saveBudget">
        <input
          v-model="budgetInput"
          type="number"
          placeholder="Enter budget amount"
          aria-label="Enter monthly budget"
          required
        />
        <button type="submit" class="primary-btn">Save Budget</button>
      </form>
    </section>

    <!-- Budget Summary -->
    <div class="stats-grid">
      <article class="stat-card">
        <p>Monthly Budget</p>
        <h2>{{ formatAmount(monthlyBudget) }} MMK</h2>
      </article>

      <article class="stat-card">
        <p>Total Spent</p>
        <h2 class="expense-text">
          {{ formatAmount(totalSpent) }}
          <p>MMK</p>
        </h2>
      </article>

      <article class="stat-card">
        <p>Remaining</p>
        <h2 :class="remaining < 0 ? 'expense-text' : 'income-text'">
          {{ formatAmount(remaining) }}
          <p>MMK</p>
        </h2>
      </article>
    </div>

    <!-- Overall Progress -->
    <section class="content-card">
      <div class="section-header">
        <div>
          <h2>Budget Progress</h2>
          <p>
            {{ formatAmount(totalSpent) }} spent of
            {{ formatAmount(monthlyBudget) }}
          </p>
        </div>

        <strong :class="progress >= 100 ? 'expense-text' : 'income-text'">
          {{ Math.round(progress) }}%
        </strong>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        :aria-valuenow="Math.round(progress)"
        aria-label="Monthly budget used"
      >
        <div
          class="progress-fill"
          :class="{ 'progress-over': remaining < 0 }"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <p v-if="monthlyBudget === 0" class="helper-text">
        Set a budget amount to start tracking your spending.
      </p>

      <!-- <p v-else-if="remaining < 0" class="helper-text expense-text">
        You have exceeded your monthly budget.
      </p>

      <p v-else class="helper-text">
        {{ formatAmount(remaining) }} remaining for this month.
      </p> -->
    </section>

    <!-- Category Breakdown -->
    <section class="content-card">
      <div class="section-header">
        <div>
          <h2>Spending by Category</h2>
          <p>See how your expenses are distributed.</p>
        </div>
      </div>

      <!-- <div v-if="monthlyExpenses.length" class="category-list">
        <article
          v-for="item in categoryBudgets"
          :key="item.name"
          class="category-row"
        >
          <div class="category-info">
            <strong>{{ item.name }}</strong>
            <span>{{ formatAmount(item.spent) }}</span>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${item.percentage}%` }"
            ></div>
          </div>
        </article>
      </div>

      <p v-else class="empty-state">No expenses recorded for this month.</p> -->

      <div class="category-list">
        <article
          v-for="item in categoryBudgets"
          :key="item.name"
          class="category-row"
        >
          <div class="category-info">
            <strong>{{ item.name }}</strong>
            <span>{{ formatAmount(item.spent) }}</span>
          </div>

          <div class="progress-track">
            <div
              class="progress-fill"
              :style="{ width: `${item.percentage}%` }"
            ></div>
          </div>
        </article>
      </div>

      <p v-if="!monthlyExpenses.length" class="empty-state">
        No expenses recorded for this month.
      </p>
    </section>
  </section>
</template>

<style scoped>
.budget-page {
  display: grid;
  gap: 24px;
  color: #26372f;
}

.page-header,
.section-header,
.budget-setup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.page-eyebrow {
  margin: 0 0 8px;
  color: #4f806b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.page-header h1 {
  margin: 0;
  font-size: clamp(25px, 4vw, 32px);
}

.page-description,
.budget-setup p,
.section-header p {
  margin: 8px 0 0;
  color: #849188;
  font-size: 14px;
}

.month-input,
.budget-form input {
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid #e4e9e2;
  border-radius: 9px;
  background: #fff;
  color: #26372f;
  font: inherit;
}

.content-card,
.stat-card {
  padding: 22px;
  border: 1px solid #e4e9e2;
  border-radius: 14px;
  background: #fff;
}

.budget-setup h2,
.section-header h2 {
  margin: 0;
  font-size: 18px;
}

.budget-form {
  display: flex;
  gap: 10px;
}

.budget-form input {
  width: 190px;
}

.primary-btn {
  padding: 12px 16px;
  border: 0;
  border-radius: 9px;
  background: #4f806b;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.primary-btn:hover {
  background: #345d4b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.stat-card p {
  margin: 0;
  color: #849188;
  font-size: 13px;
}

.stat-card h2 {
  margin: 14px 0 0;
  font-size: clamp(20px, 3vw, 27px);
  overflow-wrap: anywhere;
}

.income-text {
  color: #27805a;
}

.expense-text {
  color: #d05252;
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
  background: #4f806b;
  transition: width 0.25s ease;
}

.progress-over {
  background: #d05252;
}

.helper-text {
  margin: 12px 0 0;
  color: #849188;
  font-size: 13px;
}

.category-list {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

.category-row {
  display: grid;
  gap: 10px;
}

.category-info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}

.category-info strong {
  overflow-wrap: anywhere;
}

.category-info span {
  flex-shrink: 0;
  color: #849188;
}

.empty-state {
  margin: 20px 0 0;
  color: #849188;
  text-align: center;
}

@media (max-width: 800px) {
  .budget-setup {
    align-items: stretch;
    flex-direction: column;
  }

  .budget-form input {
    flex: 1;
    width: auto;
  }
}

@media (max-width: 600px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .content-card,
  .stat-card {
    padding: 16px;
  }

  .section-header {
    align-items: flex-start;
  }

  .budget-form {
    flex-direction: column;
  }

  .budget-form input {
    width: 100%;
  }
}
</style>
