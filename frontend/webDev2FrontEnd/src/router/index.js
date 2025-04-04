import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Homepage.vue';
import GameDetail from '../views/GameDetail.vue';
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';
import AboutUs from '../views/AboutUs.vue';
import Account from '@/views/Account.vue';
import { useAuthStore } from '@/stores/authStore';
import Contact from '@/views/Contact.vue';
import Users from '@/views/Users.vue'; // Import the Users component

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
    meta: { requiresGuest: true }, // 🔒 This route requires a guest user
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
    meta: { requiresGuest: true }, // 🔒 This route requires a guest user
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: AboutUs,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    meta: { requiresAuth: true }, // 🔒 Requires authentication
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAdmin: true }, // 🔒 Requires admin role
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// 🌟 **Navigation Guard**
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists
  const authStore = useAuthStore();

  // Ensure the user's role is loaded before proceeding
  if (!authStore.user && isAuthenticated) {
    try {
      await authStore.fetchUserDetails(); // Fetch user data from the server
    } catch (error) {
      console.error('Error fetching user data:', error);
      next('/login'); // Redirect to login if fetching user data fails
      return;
    }
  }

  const userRole = authStore.user?.role; // Get the role from the store

  // If the route requires authentication and the user is not logged in, redirect to login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  }
  // If the route requires an admin role and the user is not an admin, redirect to home
  else if (to.meta.requiresAdmin && userRole !== 'admin') {
    next('/'); // Redirect to home if not an admin
  }
  else if (to.meta.requiresGuest && isAuthenticated) {
    next('/'); // Redirect to home or another route if already logged in
  }
  else {
    next(); // Proceed to the route
  }
});

export default router;
