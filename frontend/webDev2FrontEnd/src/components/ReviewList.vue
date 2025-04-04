<template>
    <div class="mb-4">
        <h3 class="mb-2">Reviews</h3>
        <p class="d-flex align-items-center">
            <span class="me-2">Average Rating:</span>
            <StarRating class="me-2 mb-0" :rating="parseFloat(formattedAverageRating) || 0" />
            <span>{{ formattedAverageRating }} out of 5</span>
        </p>

        <!-- Write a Review Button -->
        <button v-if="authStore.user?.role === 'user' && !userHasReviewed && !showReviewForm"
            class="btn btn-primary shadow-sm mb-3" @click="showReviewForm = true">
            Write a Review
        </button>

        <!-- Review Form for Adding or Editing -->
        <div v-if="showReviewForm || editingReview" class="mb-4">
            <ReviewForm :existingReview="editingReview" :gameId="gameId" :userId="authStore.user.id"
                @review-submitted="handleReviewSubmitted" />
            <button class="btn btn-gray shadow-sm mt-2" @click="cancelForm">Cancel</button>
        </div>

        <router-link v-if="!authStore.user" to="/login" class="btn btn-primary shadow-sm mb-3">
            Log in to place a review
        </router-link>

        <!-- Always render reviews section -->
        <div>
            <div v-if="sortedReviews.length > 0">
                <Review v-for="review in sortedReviews" :key="review.id" :review="review"
                    @edit-review="handleEditReview" />
            </div>
            <div v-else>
                <p>No reviews have been placed yet.</p> <!-- Updated message -->
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useReviewStore } from "@/stores/reviewStore"; // Import the reviewStore
import Review from "./Review.vue";
import StarRating from "./StarRating.vue";
import ReviewForm from "@/components/ReviewForm.vue";

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
        gameId: {
            type: Number,
            required: true
        }
    },
    setup(props) {
        const authStore = useAuthStore();
        const reviewStore = useReviewStore(); // Use the reviewStore
        const userHasReviewed = ref(false); // Track if the user has already reviewed this game
        const showReviewForm = ref(false); // Track visibility of the review form
        const editingReview = ref(null); // Track the review being edited

        // Check if the user has already submitted a review
        const checkUserReview = () => {
            const userReview = reviewStore.reviews.find(
                review => review.user_id === authStore.user?.id
            );
            userHasReviewed.value = !!userReview;
        };

        // Fetch reviews from the store
        const fetchReviews = async () => {
            try {
                await reviewStore.fetchReviews(props.gameId); // Fetch reviews using the store
                checkUserReview(); // Re-check if the user has reviewed
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        // Compute the formatted average rating
        const formattedAverageRating = computed(() => {
            if (!props.reviews.length) return "0.0";
            const totalRating = props.reviews.reduce((sum, review) => sum + parseFloat(review.rating), 0);
            return (totalRating / props.reviews.length).toFixed(1); // Format to 1 decimal place
        });

        // Handle review submission
        const handleReviewSubmitted = async () => {
            await fetchReviews(); // Refresh reviews after submission or edit
            showReviewForm.value = false; // Hide the form after submission
            editingReview.value = null; // Reset editing state
        };

        // Handle review editing
        const handleEditReview = (review) => {
            editingReview.value = review; // Set the review to be edited
            showReviewForm.value = false; // Ensure add form is hidden
        };

        // Cancel form
        const cancelForm = () => {
            showReviewForm.value = false;
            editingReview.value = null; // Reset editing state
        };

        // Watch for changes in reviews and re-check if the user has reviewed
        watch(() => reviewStore.reviews, checkUserReview, { deep: true });

        // Sort reviews: user's own review goes first
        const sortedReviews = computed(() => {
            if (!authStore.user) return reviewStore.reviews;

            return [...reviewStore.reviews].sort((a, b) => {
                if (a.user_id === authStore.user.id) return -1; // Your review goes on top
                if (b.user_id === authStore.user.id) return 1;
                return 0; // Keep others in original order
            });
        });
        // Initially check if the user has already submitted a review
        onMounted(async () => {
            await fetchReviews();
        });

        return {
            authStore,
            sortedReviews,
            userHasReviewed,
            showReviewForm,
            editingReview,
            fetchReviews,
            handleReviewSubmitted,
            handleEditReview,
            cancelForm,
            formattedAverageRating
        };
    }
};
</script>

<style scoped>
.btn-white {
    background-color: white;
    color: black;
    border: 1px solid #ccc;
}

.btn-gray {
    background-color: #f0f0f0;
    color: #333;
    border: 1px solid #b1b1b1;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: background-color 0.3s, border 0.3s;
}

.btn-gray:hover {
    background-color: #e0e0e0;
    border-color: #555;
}

.btn-red {
    background-color: red;
    color: white;
    border: 1px solid #cc0000;
}
</style>
