import { createRouter, createWebHistory } from 'vue-router';
import main from '../views/main.vue';
import products from '../views/products.vue';
import product_details from '../views/product_details.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import card from '../views/card.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import checkout from '../views/checkout.vue'
const routes = [
    {
        path: "/",
        name: "main",
        component:main
    },
    {
        path: "/products/:type",
        name: "products",
        component:products
    },
    {
        path: "/product_details/:id",
        name: "product_details",
        component:product_details
    },
    {
        path: "/login",
        name: "login",
        component:login
    },
    {
        path: "/register",
        name: "register",
        component:register
    },
    {
        path: "/card",
        name: "card",
        component:card,
    },
    {
      path: "/checkout",
      name: "checkout",
      component:checkout,
      
      meta: {
          requiresAuth: true,
        }
      
  },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});
// to avoid sign out when reload page
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const removeListner = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListner();
          resolve(user);
        },
        reject
      );
    });
  };
  
  router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (await getCurrentUser()) {
        next();
      } else {
        alert("you don't have access!");
        next("/login");
      }
    } else {
      next();
    }
  });
export default router;