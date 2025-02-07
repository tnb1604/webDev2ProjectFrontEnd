<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit" class="submit-btn">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost/routes/login.php', {
            email: this.email,
            password: this.password,
          });
          if (response.data.success) {
            // Save token or user data if needed (e.g., to localStorage)
            this.$router.push('/'); // Redirect to homepage after successful login
          } else {
            alert('Login failed. Please check your credentials.');
          }
        } catch (error) {
          console.error('Error during login:', error);
          alert('An error occurred during login.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    color: #42b983;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.2rem;
    border-radius: 4px;
    border: 1px solid #ccc;
  }
  
  button.submit-btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button.submit-btn:hover {
    background-color: #36a275;
  }
  
  p {
    text-align: center;
    margin-top: 1rem;
  }
  </style>
  