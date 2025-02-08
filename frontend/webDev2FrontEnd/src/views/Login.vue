<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h3 class="card-title text-center">Login</h3>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="usernameOrEmail" class="form-label">Username or Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="usernameOrEmail"
                  v-model="usernameOrEmail"
                  required
                />
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
export default {
  data() {
    return {
      usernameOrEmail: '',
      password: ''
    };
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      console.log('Logging in with', this.usernameOrEmail);
    }
  }
};
</script>
