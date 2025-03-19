import { defineStore } from 'pinia';
import api from '@/utils/axios.js'; // Axios instance

export const useReviewStore = defineStore('reviewStore', {
    state: () => ({
        reviews: [], // This will store all the reviews
    }),
    actions: {
        // Fetch reviews from the backend for a specific game
        async fetchReviews(gameId) {
            try {
                const response = await api.get(`/reviews/game/${gameId}`);
                this.reviews = response.data;
            } catch (error) {
                console.error("Error fetching reviews:", error);
                throw error; // Re-throw error for handling in the component
            }
        },

        // Delete a review and update the state
        async deleteReview(reviewId) {
            try {
                const response = await api.delete(`/reviews/${reviewId}`);
                console.log("Review deleted successfully", response);

                // Update the state by removing the review from the list
                this.reviews = this.reviews.filter(review => review.id !== reviewId);
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        },
    },
});
