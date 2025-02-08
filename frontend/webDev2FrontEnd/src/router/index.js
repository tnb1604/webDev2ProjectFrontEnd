import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/Homepage.vue';
import GameDetail from '../views/GameDetail.vue';
import LoginPage from '../views/Login.vue'; // Assuming you have a login page
import RegisterPage from '../views/Register.vue'; // Assuming you have a register page
import AboutUs from '../views/AboutUs.vue'; // Import the AboutUs component

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
    component: AboutUs, // Use the imported AboutUs component
  },
];

const router = createRouter({
  history: createWebHistory('/'), // Use '/' directly instead of process.env.BASE_URL
  routes,
});

export default router;
