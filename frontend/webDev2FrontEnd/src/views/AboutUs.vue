<template>
    <div class="container mt-5">
        <!-- Header Section -->
        <div class="text-center">
            <h1 class="fw-bold">About Us</h1>
            <p class="text-muted">Learn more about the goal of this website.</p>
        </div>

        <!-- Content Section -->
        <div class="row align-items-center mt-4">
            <div class="col-md-6">
                <h2 class="fw-semibold">Our Mission</h2>
                <p class="text-muted">
                    Welcome to <strong>PixelCritic</strong>, your go-to place for honest and insightful
                    game reviews.
                    Our mission is to provide gamers with in-depth and unbiased reviews, helping them make informed
                    decisions before purchasing or playing games.
                </p>
                <p class="text-muted">
                    We are passionate about gaming, and our team works hard to create quality content for fellow gamers.
                    Whether you're into action, adventure, RPGs, indie games, or anything else we've got you covered!
                </p>
                <p class="text-muted">
                    If there is a game you'd like us to put on the website, feel free to reach out to us through any of
                    our social media or contact information. We are always
                    looking for new games to explore and share with our community.
                </p>
            </div>
            <div class="col-md-6 text-center">
                <img src="/public/aboutusimage.jpg" alt="About Us" class="img-fluid rounded shadow-lg mb-5"
                    style="max-width: 100%; height: auto;">
            </div>
        </div>



        <!-- Call to Action -->
        <div v-if="!authStore.user" class="text-center mt-5">
            <h3 class="fw-semibold">Join Our Community</h3>
            <p class="text-muted">Be part of the best gaming review community. Sign up today!</p>
            <a href="/register" class="btn btn-primary mb-5">Get Started</a>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export default {
    setup() {
        const authStore = useAuthStore();

        // Ensure user details are loaded when the component mounts
        onMounted(() => {
            authStore.fetchUserDetails().then(() => {
                //console.log("User Details:", authStore.user); // ✅ Check if user data is loaded
            });
        });

        return {
            authStore
        };
    }
};
</script>
