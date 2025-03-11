<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title text-center">Register</h3>

            <!-- Show success or error messages -->
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="username" required />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  required
                  :class="{'is-invalid': confirmPassword && confirmPassword !== password}"
                />
                <div v-if="confirmPassword && confirmPassword !== password" class="invalid-feedback">
                  Passwords do not match.
                </div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Register</button>
              </div>

              <p class="mt-3 text-center">
                Already have an account? <router-link to="/login">Login here</router-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../utils/axios.js'; // Import your axios instance

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleRegister() {
      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        // Sending a POST request using the api instance
        const response = await api.post('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });

        // Handle success
        this.successMessage = 'Registration successful! You can now log in.';
        this.errorMessage = ''; // Clear any error message

        // Optionally, redirect the user to login page after successful registration
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        // Handle error (e.g., email already exists, server error, etc.)
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred during registration. Please try again!';
        }
        this.successMessage = ''; // Clear success message
        console.error('Registration error:', error.response?.data);
      }
    }
  }
};
</script>
