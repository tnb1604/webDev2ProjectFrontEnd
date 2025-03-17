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
        console.error("Login failed:", error);
        throw error; // Propagate the error to be handled in the component
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

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      api.defaults.headers.common["Authorization"] = ""; // Remove Authorization header
    },
  },
});
