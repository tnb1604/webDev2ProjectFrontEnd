<template>
    <nav class="navbar navbar-expand-lg w-100">
      <div class="container-fluid">
        <!-- Logo and Homepage Link -->
        <router-link to="/" class="navbar-brand">
          <img src="/public/controllerlogo.png" alt="Logo" class="logo-img" />
          Game Review Platform
        </router-link>
        
        <!-- Right Section (Login/Logout) -->
        <div class="d-flex">
          <router-link v-if="!isLoggedIn" to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link v-if="!isLoggedIn" to="/register" class="btn btn-outline-light me-2">Register</router-link>
          
          <button v-if="isLoggedIn" @click="logout" class="btn btn-outline-light">Logout</button>
        </div>
      </div>
    </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// State for logged in user
const isLoggedIn = ref(false); // Update this based on actual auth logic

const router = useRouter();

// Mock logout function (you'll replace this with real logic)
const logout = () => {
    // Perform logout logic here (e.g., remove user session/token)
    isLoggedIn.value = false;
    router.push("/"); // Redirect to homepage
};
</script>

<style scoped>
/* Navbar Styles */
.navbar {
  background-color: var(--color-navbar);
  color: white;
  width: 100%;
}

.logo-img {
    height: 40px;
    margin-right: 10px;
}
</style>
