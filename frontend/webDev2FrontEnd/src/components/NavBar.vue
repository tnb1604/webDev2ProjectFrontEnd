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

        <!-- Add Game Button -->
        <button v-if="authStore.user?.role === 'admin'" class="btn btn-outline-primary me-3"
          @click="showAddGameModal = true">
          <i class="bi bi-controller bi-plus-circle"></i> Add Game
        </button>

        <!-- Admin Users Button -->
        <router-link v-if="authStore.user?.role === 'admin'" to="/users" class="btn btn-outline-warning me-3"> <i
            class="bi bi-people"></i> Manage Users </router-link>

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

  <!-- Add Game Modal -->
  <ShowModal v-if="showAddGameModal" title="Add Game" @close="showAddGameModal = false"
    @closeModal="showAddGameModal = false">
    <GameForm :gameId="'new'" @formSubmitted="showAddGameModal = false" />
  </ShowModal>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import GameForm from "./GameForm.vue";
import ShowModal from "./ShowModal.vue";
import { useNotificationStore } from "@/stores/notificationStore";

const authStore = useAuthStore();
const router = useRouter();
const showAddGameModal = ref(false);
const notification = useNotificationStore();

// Ensure user details are loaded when the component mounts
onMounted(() => {
  authStore.fetchUserDetails();
});

// Logout function
const logout = () => {
  authStore.logout();
  router.push("/");
  notification.show("Logged out successfully!", "success");
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

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Add media query for stacking buttons and centering content */
@media (max-width: 478px) {
  .container-fluid {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .navbar-brand {
    margin-bottom: 20px;
  }

  .d-flex.align-items-center {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .d-flex.align-items-center > * {
    margin-bottom: 10px;
    width: auto;
  }

  .d-flex.align-items-center > *:last-child {
    margin-bottom: 0;
  }
}
</style>
