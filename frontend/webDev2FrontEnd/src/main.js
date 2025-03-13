import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from "./router/index.js";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // ✅ Add Pinia before mounting the app
app.use(router);
app.mount('#app');
