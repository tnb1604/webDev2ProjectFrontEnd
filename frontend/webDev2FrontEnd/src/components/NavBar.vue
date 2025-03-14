<template>
  <nav class="navbar navbar-expand-lg w-100">
    <div class="container-fluid">
      <!-- Logo and Homepage Link -->
      <router-link to="/" class="navbar-brand fw-normal ms-1">
        <img src="/public/controllerlogo.png" alt="Logo" class="logo-img" />
        The Game Review Platform
      </router-link>

      <!-- Right Section (Login/Logout/Add Game) -->
      <div class="d-flex">
        <!-- Add Game Button (visible only to admins) -->
        <router-link v-if="authStore.user?.role === 'admin'" to="/modify-game/new" class="btn btn-outline-primary me-2">
          Add Game
        </router-link>

        <!-- Show Login/Register only when NOT logged in -->
        <template v-if="!authStore.token">
          <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link to="/register" class="btn btn-outline-light me-2">Register</router-link>
        </template>

        <!-- Show Logout button when logged in -->
        <!-- Show Logout button when logged in -->
        <button v-if="authStore.token" @click="logout" class="btn btn-outline-danger">
          <i class="bi bi-box-arrow-right"></i> <!-- Bootstrap icon for logout -->
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
  authStore.fetchUserDetails().then(() => {
    console.log("User Details:", authStore.user); // ✅ Check if user data is loaded
  });
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
