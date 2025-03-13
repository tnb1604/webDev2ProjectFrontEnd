<template>
    <div class="mb-4">
        <h3 class="mb-2">Reviews</h3>
        <p class="d-flex align-items-center">
            <strong class="me-1">Average Rating:</strong>
            <StarRating class="me-2" :rating="roundedAverageRating" size="small" />
            <span class="d-flex align-items-center average-rating">
                {{ averageRating }} / 5
            </span>
        </p>
        <ReviewForm v-if="authStore.user?.role === 'user'" class="mb-4" :rating="averageRating" />

        <router-link to="/login" class="btn btn-primary shadow-sm mb-3">Log in to place a review</router-link>

        <Review v-for="review in reviews" :key="review.id" :review="review" />
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import Review from './Review.vue';
import StarRating from './StarRating.vue';
import ReviewForm from '@/components/ReviewForm.vue';

export default {
    setup() {
        const authStore = useAuthStore();

        // Ensure user details are loaded when the component mounts
        onMounted(() => {
            authStore.fetchUserDetails().then(() => {
                console.log("User Details:", authStore.user); // ✅ Check if user data is loaded
            });
        });

        return {
            authStore
        };
    },
    name: "ReviewList",
    components: {
        Review,
        StarRating,
        ReviewForm
    },
    props: {
        reviews: {
            type: Array,
            required: true
        },
        averageRating: {
            type: Number,
            required: true
        },
        roundedAverageRating: {
            type: Number,
            required: true
        }
    }
};

</script>

<style scoped></style>
