<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-sm">
            <div class="card-body">
              <h3 class="card-title text-center">Register</h3>
  
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
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      handleRegister() {
        if (this.password !== this.confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        // Handle registration logic here
        console.log('Registering', this.username, this.email);
      }
    }
  };
  </script>
  