<!-- <script setup>
import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartNoAxesCombined,
  Settings,
} from "lucide-vue-next";

import { RouterLink } from "vue-router";
</script>

<template>
  <aside class="sidebar">
    <h2 class="logo">Money Tracker</h2>

    <nav class="menu">
      <RouterLink to="/dashboard" class="menu-link">
        <LayoutDashboard :size="20" />
        <span>Dashboard</span>
      </RouterLink>

      <RouterLink to="/transactions" class="menu-link">
        <ArrowLeftRight :size="20" />
        <span>Transactions</span>
      </RouterLink>

      <RouterLink to="/analytics" class="menu-link">
        <ChartNoAxesCombined :size="20" />
        <span>Analytics</span>
      </RouterLink>

      <RouterLink to="/settings" class="menu-link">
        <Settings :size="20" />
        <span>Settings</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  padding: 24px 16px;
  background: white;
  border-right: 1px solid #e2e8f0;
}

.logo {
  margin: 0 0 32px;
  font-size: 22px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  color: #475569;
  text-decoration: none;
  border-radius: 8px;
}

.menu-link:hover,
.menu-link.router-link-active {
  background: #eff6ff;
  color: #2563eb;
}

@media (max-width: 700px) {
  .sidebar {
    width: 76px;
    padding: 24px 8px;
  }

  .logo {
    font-size: 12px;
    overflow-wrap: anywhere;
  }

  .menu-link {
    justify-content: center;
    padding: 12px 8px;
  }

  .menu-link span {
    display: none;
  }
}
</style> -->