<script setup lang="ts">
import { ref, watch } from "vue";
import { RouterView, RouterLink, useRoute } from "vue-router";

const isSidebarOpen = ref(false);
const route = useRoute();

watch(
  () => route.path, //watch this
  () => {
    isSidebarOpen.value = false; //change this
  },
);

function closeSidebar() {
  isSidebarOpen.value = false;
}

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="app-layout">
    <header class="mobile-header">
      <button
        class="menu-button"
        :aria-label="isSidebarOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="isSidebarOpen"
        aria-controls="app-sidebar"
        @click="toggleSidebar"
      >
        <span aria-hidden="true">{{ isSidebarOpen ? "×" : "☰" }}</span>
      </button>

      <RouterLink to="/" class="mobile-brand" @click="closeSidebar">
        <span class="brand-mark">$</span>
        <span class="brand-name">Expense Tracker</span>
      </RouterLink>
    </header>

    <Transition name="fade">
      <div
        v-if="isSidebarOpen"
        class="sidebar-overlay"
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- Sidebar -->
    <aside
      id="app-sidebar"
      class="sidebar"
      :class="{ 'sidebar-open': isSidebarOpen }"
    >
      <div class="brand">
        <RouterLink to="/" class="brand-link" @click="closeSidebar">
          <span class="brand-mark">$</span>

          <span class="brand-text">
            <span class="brand-title">Expense Tracker</span>
            <span class="brand-subtitle">Personal Finance</span>
          </span>
        </RouterLink>

        <button
          class="sidebar-close"
          aria-label="Close menu"
          @click="closeSidebar"
        >
          ×
        </button>
      </div>

      <!-- Navigation -->
      <p class="menu-label">WORKSPACE</p>

      <nav class="nav-links" aria-label="Main navigation">
        <RouterLink
          to="/"
          class="nav-item"
          exact-active-class="nav-active"
          aria-label="Dashboard"
        >
          <span class="nav-icon" aria-hidden="true">▦</span>
          <span>Dashboard</span>
        </RouterLink>

        <RouterLink
          to="/transactions"
          class="nav-item"
          active-class="nav-active"
        >
          <span class="nav-icon" aria-hidden="true">⇄</span>
          <span>Transactions</span>
        </RouterLink>

        <RouterLink to="/budget" class="nav-item" active-class="nav-active">
          <span class="nav-icon" aria-hidden="true">▣</span>
          <span>Budget</span>
        </RouterLink>
      </nav>

      <!-- Sidebar Bottom -->
      <div class="sidebar-bottom">
        <div class="bottom-icon" aria-hidden="true">✓</div>

        <div class="bottom-text">
          <p>Your finances, organized.</p>
          <small>Simple. Clear. In control.</small>
        </div>
      </div>
    </aside>

    <!-- Main Page -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Global Reset */
* {
  box-sizing: border-box;
}

html,
body,
#app {
  min-width: 320px;
  min-height: 100%;
  margin: 0;
}

body {
  font-family: Inter, "Segoe UI", Arial, sans-serif;
  color: #26372f;
  background: #f6f7f2;
  -webkit-font-smoothing: antialiased;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

/* App Theme */
.app-layout {
  --primary: #4f806b;
  --primary-dark: #345d4b;
  --primary-light: #e8f0e9;
  --text-main: #26372f;
  --text-muted: #849188;
  --border: #e4e9e2;
  --white: #fff;
  --sidebar-bg: #233d35;
  --sidebar-hover: #304c42;
  --sidebar-text: #dce8df;
  --sidebar-muted: #a9beb0;

  min-height: 100vh;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 48px;
}

.brand-link,
.mobile-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  color: inherit;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: var(--primary);
  color: var(--white);
  font-size: 25px;
  font-weight: 700;
  box-shadow: 0 5px 14px rgb(0 0 0 / 10%);
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.brand-title,
.brand-name {
  font-size: 16px;
  font-weight: 750;
  letter-spacing: -0.3px;
}

.brand-title {
  color: var(--white);
  white-space: nowrap;
}

.brand-subtitle {
  color: var(--sidebar-muted);
  font-size: 11px;
}

/* Sidebar */
.sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  width: 258px;
  padding: 30px 20px 20px;
  overflow-y: auto;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--sidebar-hover);
  transition:
    transform 0.28s ease,
    visibility 0.28s ease,
    box-shadow 0.28s ease;
}

.menu-label {
  margin: 0 0 14px 12px;
  color: var(--sidebar-muted);
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 1.6px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 13px;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid transparent;
  border-radius: 11px;
  color: var(--sidebar-text);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.nav-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 20px;
  height: 20px;
  font-size: 21px;
}

.nav-item:hover {
  color: var(--white);
  background: var(--sidebar-hover);
}

.nav-item.router-link-exact-active,
.nav-item.nav-active {
  color: var(--white);
  background: var(--primary);
  border-color: #68957f;
}

.nav-item:focus-visible,
.brand-link:focus-visible,
.menu-button:focus-visible,
.sidebar-close:focus-visible {
  outline: 2px solid #b7d8c3;
  outline-offset: 3px;
}

/* Sidebar Footer */
.sidebar-bottom {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-top: auto;
  padding: 17px 10px 7px;
  border-top: 1px solid var(--sidebar-hover);
}

.bottom-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: #345548;
  color: #b8dfc5;
  font-size: 20px;
}

.bottom-text p {
  margin: 0 0 5px;
  color: var(--white);
  font-size: 11px;
  font-weight: 700;
}

.bottom-text small {
  color: var(--sidebar-muted);
  font-size: 10px;
}

/* Main Content */
.main-content {
  min-height: 100vh;
  margin-left: 258px;
  padding: 30px;
}

/* Mobile Header */
.mobile-header {
  display: none;
}

.brand-name {
  white-space: nowrap;
}

/* Shared Buttons */
.menu-button,
.sidebar-close {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  cursor: pointer;
}

.menu-button {
  width: 42px;
  height: 42px;
  border: 1px solid var(--border);
  background: var(--white);
  color: var(--primary-dark);
  font-size: 23px;
}

.menu-button:hover {
  background: var(--primary-light);
}

.sidebar-close {
  display: none;
  width: 36px;
  height: 36px;
  border: 1px solid var(--sidebar-hover);
  background: transparent;
  color: var(--white);
  font-size: 25px;
}

/* Mobile Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgb(20 35 28 / 48%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 700px) {
  .mobile-header {
    position: sticky;
    top: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    gap: 13px;
    min-height: 66px;
    padding: 10px 16px;
    background: var(--white);
    border-bottom: 1px solid var(--border);
  }

  .mobile-brand {
    gap: 10px;
  }

  .mobile-brand .brand-mark {
    width: 36px;
    height: 36px;
    border-radius: 11px;
    font-size: 21px;
  }

  .sidebar {
    width: 270px;
    max-width: 85vw;
    transform: translateX(-100%);
    visibility: hidden;
    pointer-events: none;
  }

  .sidebar.sidebar-open {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
  }

  .brand {
    margin-bottom: 38px;
  }

  .sidebar-close {
    display: grid;
  }

  .main-content {
    margin-left: 0;
    padding: 20px 14px;
  }
}

@media (min-width: 701px) {
  .sidebar {
    transform: translateX(0);
    visibility: visible;
    pointer-events: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>
