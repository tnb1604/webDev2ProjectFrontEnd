import { defineStore } from 'pinia';
import { computed } from 'vue'; // Import computed from Vue
import api from '@/utils/axios.js'; // Axios instance

export const useReviewStore = defineStore('reviewStore', {
    state: () => ({
        reviews: [], // This will store all the reviews
    }),
    actions: {
        // Fetch reviews from the backend for a specific game
        async fetchReviews(gameId) {
            this.reviews = []; // Reset reviews before fetching new ones
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

        // Edit a review and update the state
        async editReview(reviewId, updatedReview) {
            try {
                const response = await api.put(`/reviews/${reviewId}`, updatedReview);
                console.log("Review updated successfully", response);

                // Update the state by replacing the edited review
                const index = this.reviews.findIndex(review => review.id === reviewId);
                if (index !== -1) {
                    this.reviews[index] = response.data;
                }
            } catch (error) {
                console.error("Error editing review:", error);
                throw error; // Re-throw error for handling in the component
            }
        },
    },
    getters: {
        averageRating: (state) => {
            if (state.reviews.length === 0) return 0;
            const totalRating = state.reviews.reduce((sum, review) => sum + review.rating, 0);
            return (totalRating / state.reviews.length).toFixed(1); // Return average rating to 1 decimal place
        },
    },
});
