import { defineStore } from "pinia";
import api from "@/utils/axios.js"; // Axios instance

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await api.post("/auth/login", credentials, {
          headers: { "Content-Type": "application/json" },
        });

        const token = response.data.token;
        localStorage.setItem("token", token); // Store token
        this.token = token;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Set Authorization header

        // Optionally fetch the user details after login
        await this.fetchUserDetails();

        return true;
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'An error occurred during login. Please try again!';
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    async register(userData) {
      try {
        const response = await api.post("/auth/register", userData, {
          headers: { "Content-Type": "application/json" },
        });

        return response.data;
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.error || 'An error occurred during registration. Please try again!';
          throw new Error(errorMessage);
        }
        throw error;
      }
    },

    async fetchUserDetails() {
      if (!this.token) return;

      try {
        const response = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        this.user = response.data;
        return true;
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        return false;
      }
    },

    setUser(userData) {
      this.user = userData;
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      api.defaults.headers.common["Authorization"] = ""; // Remove Authorization header
    },
  },
});
