import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/homepage.vue";
import allCategories from "../views/AllCategories.vue";
import SubC from "../views/Subcategory.vue";
import Flavoring from "../views/Flavoring.vue";
import PlacingAnOrder from "../views/PlacingAnOrder.vue";
import UserArea from "../views/UserArea.vue";
import UsersPersonalInformation from "../views/UsersPersonalInformation.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/flavoring",
      name: "flavoring",
      component: Flavoring,
    },
    {
      path: "/user-orders",
      name: "userOrders",
      component: PlacingAnOrder,
    },
    {
      path: "/personal-information",
      name: "personalInformation",
      component: UsersPersonalInformation,
    },
    {
      path: "/allCategories",
      name: "allCategories",
      component: allCategories,
    },
    {
      path: "/subcategory",
      name: "subcategory",
      component: SubC,
    },
    {
      path: "/personal",
      name: "Personal",
      component: UserArea,
    },
  ],
});

export default router;
