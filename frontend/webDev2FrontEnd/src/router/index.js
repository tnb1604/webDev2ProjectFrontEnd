import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Homepage.vue';
import GameDetail from '../views/GameDetail.vue';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';
import AboutUs from '../views/AboutUs.vue';
import GameModifyForm from '../views/GameModifyForm.vue';

// Define routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/game/:id',
    name: 'GameDetail',
    component: GameDetail,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/modify-game/:id',
    name: 'GameModifyForm',
    component: GameModifyForm,
    meta: { requiresAuth: true }, // 🔒 This route requires authentication
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 🌟 **Navigation Guard**
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
