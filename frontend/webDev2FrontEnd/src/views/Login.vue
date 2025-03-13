<template>
  <div class="container custom-background">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-lg rounded-4 border-0 overflow-hidden mt-5">
          <div class="card-body p-5">
            <!-- Image above the form -->
            <div class="text-center ">
              <img src="/lol.webp" alt="Login Image"/>
            </div>

            <h3 class="card-title text-center text-primary mb-4">Login</h3>

            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
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
