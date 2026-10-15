
import { createRouter, createWebHistory } from "vue-router";

import DashboardView from "../views/DashboardView.vue";
import TransactionView from "@/views/TransactionView.vue";
import BudgetView from "../views/BudgetView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: TransactionView,
    },
    {
      path: "/budget",
      name: "budget",
      component: BudgetView,
    },
  ],
});

export default router;
