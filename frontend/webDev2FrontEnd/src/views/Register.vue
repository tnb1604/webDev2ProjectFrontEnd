<template>
  <div class="container custom-background ">
    <div class="row justify-content-center ">
      <div class="col-md-6 col-lg-4 mt-5">
        <div class="card shadow-lg rounded-4 border-0 overflow-hidden">
          <div class="card-body p-5">
            <h3 class="card-title text-center text-primary mb-4">Register</h3>

            <!-- Success Message -->
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input maxlength="50" type="text" class="form-control" id="username" v-model="username" required />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input maxlength="100" type="email" class="form-control" id="email" v-model="email" required />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input maxlength="64" type="password" class="form-control" id="password" v-model="password" required />
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input maxlength="64" type="password" class="form-control" id="confirmPassword"
                  v-model="confirmPassword" required
                  :class="{ 'is-invalid': confirmPassword && confirmPassword !== password }" />
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
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from '@/stores/notificationStore';

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
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const authStore = useAuthStore();
      const notification = useNotificationStore();

      try {
        await authStore.register({
          username: this.username,
          email: this.email,
          password: this.password
        });

        notification.show('Registration successful! You can now log in.');
        this.errorMessage = '';

        this.$router.push('/login');

      } catch (error) {
        notification.show(error.message, 'error');
      }
    }

  },
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
  padding: 20px;
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
</style>
