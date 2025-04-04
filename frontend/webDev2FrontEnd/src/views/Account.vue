<template>
  <div class="account-container">
    <div class="row">
      <!-- Welcome Section -->
      <div class="col-12 text-center mb-4">
        <h1 class="display-4 fw-bold">Hello, {{ authStore.user.username }}!</h1>
        <p class="lead">View your account details below.</p>
      </div>
    </div>

    <div class="row">
      <!-- Username Card -->
      <div class="col-md-6 mb-4">
        <div class="card account-card">
          <div class="card-body">
            <h5 class="card-title"><i class="bi bi-person-circle"></i> Username</h5>
            <p class="card-text"><strong>Current:</strong> {{ authStore.user.username }}</p>
          </div>
        </div>
      </div>

      <!-- Email Card -->
      <div class="col-md-6 mb-4">
        <div class="card account-card">
          <div class="card-body">
            <h5 class="card-title"><i class="bi bi-envelope"></i> Email</h5>
            <p class="card-text"><strong>Current:</strong> {{ authStore.user.email }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Role Explanation -->
    <div class="row">
      <div class="col-12 mb-4">
        <div class="card border-info account-card">
          <div class="card-body">
            <h5 class="card-title text-info">
              <i class="bi bi-person-badge-fill me-2"></i>
              Role: {{ authStore.user.role === 'admin' ? 'Administrator' : 'Regular User' }}
            </h5>

            <ul class="list-group list-group-flush mt-3">
              <!-- Admin Privileges -->
              <template v-if="authStore.user.role === 'admin'">
                <li class="list-group-item">
                  <i class="bi bi-plus-square-fill text-success me-2"></i>
                  Add new games to the PixelCritic collection.
                </li>
                <li class="list-group-item">
                  <i class="bi bi-pencil-square text-primary me-2"></i>
                  Manage and delete existing games.
                </li>
                <li class="list-group-item">
                  <i class="bi bi-trash-fill text-danger me-2"></i>
                  Delete inappropriate or offensive reviews.
                </li>
                <li class="list-group-item">
                  <i class="bi bi-person-x-fill text-warning me-2"></i>
                  View and delete user accounts.
                </li>
              </template>

              <!-- User Privileges -->
              <template v-else>
                <li class="list-group-item">
                  <i class="bi bi-chat-left-text-fill text-primary me-2"></i>
                  Submit reviews for games in the PixelCritic collection.
                </li>
                <li class="list-group-item">
                  <i class="bi bi-pencil-fill text-primary me-2"></i>
                  Edit and delete your own reviews.
                </li>
              </template>

              <!-- Shared Privileges -->
              <li class="list-group-item">
                <i class="bi bi-hand-thumbs-up-fill text-success me-2"></i>
                Like or dislike reviews from other users.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <!-- Logout Button -->
    <div class="text-center mt-3">
      <button class="btn btn-outline-danger logout-btn" @click="logout">
        <i class="bi bi-box-arrow-right"></i> Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import axios from '../utils/axios';

const authStore = useAuthStore();

const fetchUserDataById = async () => {
  try {
    const response = await axios.get(`/users/${authStore.user.id}`, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    authStore.setUser(response.data);
  } catch (error) {
    console.error("Error fetching user data by ID:", error);
  }
};

onMounted(() => {
  fetchUserDataById();
});

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
.account-container {
  max-width: 800px;
  margin: auto;
  padding: 40px;
}

.account-card {
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.account-card:hover {
  transform: scale(1.03);
}

.card-title i {
  margin-right: 8px;
  color: #007bff;
}

.logout-btn {
  font-size: 1.2rem;
  padding: 10px 20px;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #ff4c4c;
  color: white;
}

button.btn-warning {
  margin-top: 10px;
}
</style>
