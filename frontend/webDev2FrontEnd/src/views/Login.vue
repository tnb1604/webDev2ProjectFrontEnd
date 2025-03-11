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
import api from '../utils/axios.js'; // Use the configured axios instance

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
      try {
        const response = await api.post('http://localhost/auth/login', { // Use 'api' here
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json', // Ensure correct content-type
          }
        });

        const token = response.data.token;
        localStorage.setItem('token', token); // Store token
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Attach token

        // Redirect to home or dashboard
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error); // Log the entire error object for debugging
        this.errorMessage = error.response?.data?.message || 'Invalid credentials'; // Get error message from response
      }
    }
  }
};
</script>

