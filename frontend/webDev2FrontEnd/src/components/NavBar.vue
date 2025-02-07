<template>
    <nav class="navbar">
      <!-- Logo and Homepage Link -->
      <div class="navbar-left">
        <router-link to="/" class="logo">
          <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
          <span>Game Review Platform</span>
        </router-link>
      </div>
      
      <!-- Right Section (Login/Logout) -->
      <div class="navbar-right">
        <router-link v-if="!isLoggedIn" to="/login" class="auth-btn">Login</router-link>
        <router-link v-if="!isLoggedIn" to="/register" class="auth-btn">Register</router-link>
        
        <button v-if="isLoggedIn" @click="logout" class="auth-btn">Logout</button>
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #42b983;
    padding: 10px 20px;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
  
  .navbar-left {
    display: flex;
    align-items: center;
  }
  
  .logo-img {
    height: 40px;
    margin-right: 10px;
  }
  
  .navbar-right {
    display: flex;
    align-items: center;
  }
  
  .auth-btn {
    color: white;
    text-decoration: none;
    margin-left: 20px;
    background-color: #ff6f61;
    padding: 8px 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .auth-btn:hover {
    background-color: #d84e42;
  }
  
  .auth-btn:active {
    background-color: #c74030;
  }
  </style>
  