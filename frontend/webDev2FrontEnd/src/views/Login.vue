<template>
  <div class="container custom-background">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-lg rounded-4 border-0 overflow-hidden mt-5">
          <div class="card-body p-5">
            <!-- Image above the form -->
            <div class="text-center ">
              <img src="/lol.webp" alt="Login Image" />
            </div>

            <h3 class="card-title text-center text-primary mb-4">Login</h3>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input maxlength="100" type="email" class="form-control" id="email" v-model="email" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input maxlength="64" type="password" class="form-control" id="password" v-model="password" required />
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>

              <p class="mt-3 text-center">
                Don't have an account? <router-link to="/register">Register here</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore"; // Import the Pinia store
import { useNotificationStore } from "@/stores/notificationStore"; // Import the notification store

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const authStore = useAuthStore();
      const notification = useNotificationStore(); // Access the notification store

      try {
        // Call the store's login action
        const success = await authStore.login({
          email: this.email,
          password: this.password
        });

        if (success) {
          // Optionally show success message
          notification.show('Logged in successfully!', 'success');
          this.$router.push('/'); // Redirect to home or dashboard
        }
      } catch (error) {
        // Handle error: display the error message from the backend
        notification.show(error.message, 'error');
      }
    }

  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  min-width: 100%;
}

.custom-background {
  background: linear-gradient(50deg, #2c2c2c, #505050);
}

.card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #007bff;
}

.form-control {
  border-radius: 50px;
}

button.btn-primary {
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 1.1rem;
  background-color: #007bff;
  border-color: #007bff;
}

button.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

img {
  max-height: 300px;
  object-fit: contain;
}
</style>
