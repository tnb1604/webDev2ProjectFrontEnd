<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>

            <!-- ✅ Show Success Message -->
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <!-- ❌ Show Error Message -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="text" class="form-control" id="email" v-model="email" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
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

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async handleLogin() {
      // Access the Pinia store here
      const authStore = useAuthStore();

      try {
        // Call the store's login action
        const success = await authStore.login({
          email: this.email,
          password: this.password
        });

        if (success) {
          // Optionally show success message
          this.successMessage = 'Login successful!';

          // Redirect to home or dashboard
          this.$router.push('/');
        }
      } catch (error) {
        // Handle error
        console.error('Login error:', error);
        this.errorMessage = error.response?.data?.message || 'Invalid credentials';
      }
    }
  }
};
</script>
