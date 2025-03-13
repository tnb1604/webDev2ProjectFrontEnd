import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: null,
    }),
    actions: {
        async fetchUserDetails() {
            if (!this.token) {
                console.log("🔴 No token found. User not logged in.");
                return;
            }

            console.log("🟡 Fetching user details...");
            try {
                const response = await fetch("http://localhost/auth/me", { // <-- Fixed URL
                    headers: { Authorization: `Bearer ${this.token}` },
                });

                const data = await response.json();
                console.log("🔵 API Response:", data); // Debug API response

                if (response.ok) {
                    this.user = data;
                    console.log("✅ User stored in Pinia:", this.user);
                } else {
                    console.error("❌ Failed to fetch user:", data);
                }
            } catch (error) {
                console.error("❌ Error fetching user details:", error);
            }
        }
        ,
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("token");
        },
    },
});
