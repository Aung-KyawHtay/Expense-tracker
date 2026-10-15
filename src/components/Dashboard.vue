<!-- <script setup>
import { Wallet,ArrowRight,TrendingDown } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="dashboard">
    <header class="header">
      <div>
        <h1>Dashboard</h1>
        <p>Monitor Transactions</p>
      </div>

      <RouterLink to="/transactions" class="add-btn">
        + Add Transaction
      </RouterLink>
    </header>

    <section class="cards">
      <div class="card">
        <div class="card-header">
          <span>Total Balance</span>
          <Wallet :size="20" />
        </div>
        <h2>0 MMK</h2>
        <p>Income minus expenses across all time.</p>
      </div>

      <div class="card">
        <div class="card-header">
          <span>Total Income</span>
        </div>
        <h2>+0 MMK</h2>
        <p>All income transactions.</p>
      </div>

      <div class="card">
        <div class="card-header">
          <span>Total Expense</span>
        </div>
        <h2>-0 MMK</h2>
        <p>All expense transactions.</p>
      </div>

      <div class="card">
        <div class="card-header">
          <span>Budget Used</span>
        </div>
        <h2>0%</h2>
        <p>No budget set in settings.</p>

        <RouterLink to="/settings" class="manage-btn">
          Manage Budget
        </RouterLink>
      </div>
    </section>

    <section class="db-grids">
      <div class="panel">
        <div class="panel-header">
          <h3>Recent Transactions</h3>
          <RouterLink to="/transactions" class="manage-btn">
            View All <ArrowRight :size="16" />
          </RouterLink>
        </div>

        <div class="empty">
          <Wallet :size="30" />
          <h3>No transactions yet</h3>
          <p>Your recent transactions will appear here.</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Spending by Category</h3>
        </div>

        <div class="empty">
          <TrendingDown :size="30" />
          <p>Your spending categories will appear here.</p>
        </div>
      </div>
    </section>

    <section class="budget panel">
      <div class="panel-header">
        <h3>Budget Status</h3>
        <RouterLink to="/settings" class="manage-btn">
          Manage
        </RouterLink>
      </div>

      <h3>No budget yet.</h3>

      <RouterLink to="/settings" class="add-btn">
        Set up a budget
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.header,
.card-header,
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.header {
  margin-bottom: 28px;
}

.header h1 {
  margin: 0 0 8px;
}

.header p,
.card p,
.empty p {
  color: #64748b;
  font-size: 14px;
}

.cards {
  display: grid;
  gap: 18px;
  margin-bottom: 24px;
}

.card,
.panel {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 22px;
}

.card h2 {
  margin: 20px 0 10px;
}

.card p {
  line-height: 1.5;
}

.card-header {
  color: #475569;
  font-size: 14px;
}

.db-grids {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.panel-header {
  margin-bottom: 20px;
}

.panel-header h3 {
  margin: 0;
}

.empty {
  min-height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #94a3b8;
  gap: 8px;
}

.empty h3,
.empty p {
  margin: 4px 0;
}

.empty h3 {
  color: #334155;
}

.add-btn,
.manage-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
}

.add-btn {
  background: #2563eb;
  color: white;
}

.manage-btn {
  background: #eff6ff;
  color: #2563eb;
}

.budget > h3 {
  margin-bottom: 18px;
}

@media (max-width: 1000px) {
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .db-grids {
    grid-template-columns: 1fr;
  }

  .header {
    align-items: flex-start;
  }

  .card,
  .panel {
    padding: 16px;
  }
}

@media (max-width: 420px) {
  .cards {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
  }
}
</style> -->