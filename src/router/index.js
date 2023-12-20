import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/homepage.vue";
// import allCategories from "../views/AllCategories.vue";
import SubC from "../views/Subcategory.vue";
import Flavoring from "../views/Flavoring.vue";
import PlacingAnOrder from "../views/PlacingAnOrder.vue";
import UsersPersonalInformation from "../views/UsersPersonalInformation.vue";
import About from '../views/About.vue'
import cooperation from '../views/cooperation.vue'
import Contacts from '../views/contacts.vue'
import NotFound from '../views/notFound.vue'

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
      path: "/search",
      name: "search",
      component: () => import('../views/Search.vue')
    },
    {
      path: "/subcategory",
      name: "subcategory",
      component: SubC,
    },
    {
      path: '/about',
      name: "About us",
      component: About
    },
    {
      path: '/cooperation',
      name: 'cooperation',
      component: cooperation
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound
    }
  ],
});

export default router;
