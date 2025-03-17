<template>
    <!-- Footer Section -->
    <footer class="text-white py-2 mt-0" style="background-color: #1b1b1b;">
        <div class="container">
            <div class="row justify-content-between">

                <!-- Logo Section -->
                <div class="col-12 col-md-3 text-center text-md-left mb-0">
                    <router-link to="/">
                        <img src="/public/controllerlogo.png" alt="Logo" class="logo-img" style="height: 100px;">
                    </router-link>
                </div>

                <!-- Contact Info Section -->
                <div class="col-12 col-md-3 text-center text-md-left mb-0">
                    <h5 class="h6 mt-3">Contact Us</h5>
                    <p class="mb-0">
                        <i class="bi bi-envelope me-1"></i>
                        <a href="#" class="text-white text-decoration-none">contact@gamereview.com</a>
                        <br>
                        <i class="bi bi-telephone me-1"></i>
                        <a href="#" class="text-white text-decoration-none">+31 6 12345678</a>
                    </p>
                </div>

                <!-- Quick Links Section -->
                <div class="col-12 mt-3 col-md-3 text-center text-md-left mb-0">
                    <h5 class="h6">Quick Links</h5>
                    <ul class="list-unstyled mb-0">
                        <li>
                            <i class="bi bi-info-circle me-1"></i>
                            <a href="/about" class="text-white text-decoration-none">About Us</a>
                        </li>
                        <li v-if="!authStore.user">
                            <i class="bi bi-person-plus me-1"></i>
                            <a href="/register" class="text-white text-decoration-none">Get Started</a>
                        </li>
                        <li v-if="!authStore.user">
                            <i class="bi bi-box-arrow-in-right me-1"></i>
                            <a href="/login" class="text-white text-decoration-none">Log in</a>
                        </li>
                        <li v-else>
                            <i class="bi bi-person-circle me-1"></i>
                            <a href="/account" class="text-white text-decoration-none">Account</a>
                        </li>
                    </ul>
                </div>

                <!-- Social Media Links Section -->
                <div class="col-12 col-md-3 text-center text-md-left mb-0 mt-3">
                    <h5 class="h6">Follow Us</h5>
                    <a href="https://www.instagram.com/damisavg/" class="text-white me-3 text-decoration-none">
                        <i class="bi bi-instagram" style="font-size: 1.5rem;"></i>
                    </a>
                    <a href="https://www.youtube.com/@thainoodleboii" class="text-white me-3 text-decoration-none">
                        <i class="bi bi-youtube" style="font-size: 1.5rem;"></i>
                    </a>
                    <a href="https://nl.linkedin.com/in/damisa-vooges-14a96b302"
                        class="text-white me-3 text-decoration-none">
                        <i class="bi bi-linkedin" style="font-size: 1.5rem;"></i>
                    </a>
                    <a href="https://www.facebook.com/damisa.vooges" class="text-white me-3 text-decoration-none">
                        <i class="bi bi-facebook" style="font-size: 1.5rem;"></i>
                    </a>
                </div>
            </div>

            <!-- Footer Bottom -->
            <div class="row mt-2 justify-content-center">
                <div class="col-12 text-center">
                    <p class="mt-1 mb-0 small copyright-text">© 2025 The Game Review Platform. All rights reserved.</p>
                </div>
            </div>

        </div>
    </footer>
</template>


<script setup>
import { useAuthStore } from "@/stores/authStore";
import { onMounted } from "vue";

const authStore = useAuthStore();

// Ensure user details are loaded when the component mounts
onMounted(() => {
    authStore.fetchUserDetails().then(() => {
    });
});
</script>



<style scoped>
.copyright-text {
    color: #a5a5a5;
}
</style>
