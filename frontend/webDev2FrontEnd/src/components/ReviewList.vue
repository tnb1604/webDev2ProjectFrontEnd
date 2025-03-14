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

        <router-link v-if="!authStore.user" to="/login" class="btn btn-primary shadow-sm mb-3">
            Log in to place a review
        </router-link>

        <!-- Use sortedReviews instead of reviews -->
        <Review v-for="review in sortedReviews" :key="review.id" :review="review" />
    </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import Review from "./Review.vue";
import StarRating from "./StarRating.vue";
import ReviewForm from "@/components/ReviewForm.vue";

export default {
    setup(props) {
        const authStore = useAuthStore();

        // Ensure user details are loaded when the component mounts
        onMounted(() => {
            authStore.fetchUserDetails().then(() => {
                console.log("User Details:", authStore.user); // ✅ Check if user data is loaded
            });
        });

        // Sort reviews: user's own review goes first
        const sortedReviews = computed(() => {
            if (!authStore.user) return props.reviews;

            return [...props.reviews].sort((a, b) => {
                if (a.user_id === authStore.user.id) return -1; // Your review goes on top
                if (b.user_id === authStore.user.id) return 1;
                return 0; // Keep others in original order
            });
        });

        return {
            authStore,
            sortedReviews
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
