import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      component: DashboardView,
    },
    {
      path: "/transactions",
      component: TransactionsView,
    },
  ],
});

export default router;