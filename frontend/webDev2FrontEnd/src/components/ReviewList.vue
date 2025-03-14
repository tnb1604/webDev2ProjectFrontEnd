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

        <!-- Only show the review form if the user hasn't submitted a review yet -->
        <ReviewForm v-if="authStore.user?.role === 'user' && !userHasReviewed" class="mb-4" :rating="averageRating"
            :gameId="gameId" :userId="authStore.user.id" @review-submitted="fetchReviews" />
        <!-- Listen for the custom event to refresh reviews -->

        <router-link v-if="!authStore.user" to="/login" class="btn btn-primary shadow-sm mb-3">
            Log in to place a review
        </router-link>

        <!-- Use sortedReviews instead of reviews -->
        <Review v-for="review in sortedReviews" :key="review.id" :review="review" />
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/authStore";
import Review from "./Review.vue";
import StarRating from "./StarRating.vue";
import ReviewForm from "@/components/ReviewForm.vue";
import api from "@/utils/axios"; // Ensure this is imported for fetching reviews

export default {
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
        },
        gameId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const authStore = useAuthStore();
        const userHasReviewed = ref(false); // Track if the user has already reviewed this game

        // Check if the user has already submitted a review
        const checkUserReview = () => {
            const userReview = props.reviews.find(
                review => review.user_id === authStore.user.id
            );
            userHasReviewed.value = userReview ? true : false;
        };

        // Fetch reviews from the API
        const fetchReviews = () => {
            api.get(`/reviews/game/${props.gameId}`)
                .then(response => {
                    props.reviews = response.data; // Update the reviews
                    checkUserReview(); // Re-check if the user has reviewed
                })
                .catch(error => {
                    console.error("Error fetching reviews:", error);
                });
        };

        // Sort reviews: user's own review goes first
        const sortedReviews = computed(() => {
            if (!authStore.user) return props.reviews;

            return [...props.reviews].sort((a, b) => {
                if (a.user_id === authStore.user.id) return -1; // Your review goes on top
                if (b.user_id === authStore.user.id) return 1;
                return 0; // Keep others in original order
            });
        });

        // Initially check if the user has already submitted a review
        onMounted(() => {
            checkUserReview();
        });

        return {
            authStore,
            sortedReviews,
            userHasReviewed,
            fetchReviews
        };
    }
};
</script>

<style scoped></style>
