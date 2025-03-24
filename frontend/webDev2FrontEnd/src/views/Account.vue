<template>
    <div class="account-container">
      <div class="row">
        <!-- Welcome Section -->
        <div class="col-12 text-center mb-4">
          <h1 class="display-4 fw-bold">Hello, {{ authStore.user.username }}!</h1>
          <p class="lead">Manage your account settings below.</p>
        </div>
      </div>
  
      <div class="row">
        <!-- Username Card -->
        <div class="col-md-6">
          <div class="card account-card">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-person-circle"></i> Username</h5>
              <p class="card-text"><strong>Current:</strong> {{ authStore.user.username }}</p>
              <div class="input-group">
                <input type="text" v-model="newUsername" class="form-control" placeholder="Enter new username" />
                <button class="btn btn-primary" @click="updateUsername">Update</button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Email Card -->
        <div class="col-md-6">
          <div class="card account-card">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-envelope"></i> Email</h5>
              <p class="card-text"><strong>Current:</strong> {{ authStore.user.email }}</p>
              <div class="input-group">
                <input type="email" v-model="newEmail" class="form-control" placeholder="Enter new email" />
                <button class="btn btn-primary" @click="updateEmail">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row mt-4">
        <!-- Password Change Card -->
        <div class="col-md-12">
          <div class="card account-card">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-shield-lock"></i> Change Password</h5>
              <div class="input-group mb-2">
                <input type="password" v-model="oldPassword" class="form-control" placeholder="Current Password" />
              </div>
              <div class="input-group mb-2">
                <input type="password" v-model="newPassword" class="form-control" placeholder="New Password" />
              </div>
              <div class="input-group">
                <input type="password" v-model="confirmPassword" class="form-control" placeholder="Confirm Password" />
                <button class="btn btn-danger" @click="updatePassword">Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Logout Button -->
      <div class="text-center mt-4">
        <button class="btn btn-outline-danger logout-btn" @click="logout">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/stores/authStore";
  
  const authStore = useAuthStore();
  const newUsername = ref("");
  const newEmail = ref("");
  const oldPassword = ref("");
  const newPassword = ref("");
  const confirmPassword = ref("");
  
  const updateUsername = () => {
    if (!newUsername.value.trim()) return alert("Username cannot be empty.");
    authStore.updateUser({ username: newUsername.value });
    alert("Username updated successfully!");
  };
  
  const updateEmail = () => {
    if (!newEmail.value.trim()) return alert("Email cannot be empty.");
    authStore.updateUser({ email: newEmail.value });
    alert("Email updated successfully!");
  };
  
  const updatePassword = () => {
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
      return alert("All password fields must be filled.");
    }
    if (newPassword.value !== confirmPassword.value) {
      return alert("New passwords do not match.");
    }
    authStore.updateUser({ password: newPassword.value });
    alert("Password changed successfully!");
  };
  
  const logout = () => {
    authStore.logout();
    alert("You have been logged out.");
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
  
  .input-group input {
    border-radius: 5px;
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
  </style>
  