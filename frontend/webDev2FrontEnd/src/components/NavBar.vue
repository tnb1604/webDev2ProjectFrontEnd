<template>
  <nav class="navbar navbar-expand-lg w-100">
    <div class="container-fluid">
      <!-- Logo and Homepage Link -->
      <router-link to="/" class="navbar-brand fw-normal ms-1">
        <img src="/public/controllerlogo.png" alt="Logo" class="logo-img" />
        PixelCritic
      </router-link>

      <!-- Right Section (Login/Logout/Add Game/Account) -->
      <div class="d-flex align-items-center">

        <span class="text-light me-2">Hello, {{ authStore.user?.username }}!</span>

        <button v-if="authStore.user?.role === 'admin'" class="btn btn-outline-primary me-3"> Add Game </button>

        <!-- Show Login/Register only when NOT logged in -->
        <template v-if="!authStore.token">
          <router-link to="/register" class="btn btn-outline-light me-2" @click.prevent="router.push('/register')">
            <i class="bi bi-person-plus"></i> Register
          </router-link>
          <router-link to="/login" class="btn btn-outline-light me-2" @click.prevent="router.push('/login')">
            <i class="bi bi-box-arrow-in-right"></i> Login
          </router-link>
        </template>

        <!-- Account button and username (visible when logged in) -->
        <div v-if="authStore.token" class="d-flex align-items-center me-3">
          <router-link to="/account" class="btn btn-outline-info me-2">
            <i class="bi bi-person-circle"></i> Account
          </router-link>
        </div>

        <!-- Show Logout button when logged in -->
        <button v-if="authStore.token" @click="logout" class="btn btn-outline-danger">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Ensure user details are loaded when the component mounts
onMounted(() => {
  authStore.fetchUserDetails();
});

// Logout function
const logout = () => {
  authStore.logout();
  router.push("/"); // Redirect to homepage after logout
};
</script>

<style scoped>
.logo-img {
  block-size: 46px;
  margin-inline-end: 10px;
}

.navbar-brand {
  font-family: 'Impact', sans-serif;
  color: #dddddd;
}
</style>
