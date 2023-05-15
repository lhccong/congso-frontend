import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import LoginPage from "../pages/LoginPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/index/:category",
    component: IndexPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
