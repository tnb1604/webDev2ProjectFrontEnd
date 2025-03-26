<template>
    <div class="review">
        <StarRating class="ms-2 mb-1" :rating="review.rating" />
        <h4 class="ms-2">{{ review.title }}</h4>
        <p class="ms-2">{{ review.review_text }}</p>
        <small class="ms-2 text-muted">Posted by {{ username }} on {{ formattedDate }}</small>

        <div class="d-flex justify-content-between">
            <div>
                <LikeButton :initialLikes="0" @likeToggled="handleLike" />
                <DislikeButton :initialDislikes="0" @dislikeToggled="handleDislike" />
            </div>
            <div>

                <button v-if="authStore.user && authStore.user.id === review.user_id"
                    @click="$emit('edit-review', review)" class="ms-2 btn btn-warning">
                    Edit Review
                </button>


                <DeleteButton
                    v-if="authStore.user && (authStore.user.id === review.user_id || authStore.user.role === 'admin')"
                    :entityType="'review'" :entityId="review.id" :deleteAction="openConfirmModal" customClass="ms-2" />

                <!-- Confirm Delete Modal -->
                <ConfirmModal ref="confirmModal" title="Delete Review"
                    message="Are you sure you want to delete this review?" @confirmed="deleteReview" />
            </div>
        </div>
        <div v-if="showEditForm" class="mb-4">
            <ReviewForm :existingReview="review" :gameId="review.game_id" :userId="review.user_id"
                @review-submitted="handleReviewSubmitted" />
            <button class="btn btn-red shadow-sm mt-2" @click="cancelEdit">Cancel</button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import StarRating from './StarRating.vue';
import DislikeButton from './DislikeButton.vue';
import LikeButton from './LikeButton.vue';
import DeleteButton from './DeleteButton.vue';
import ConfirmModal from './ConfirmModal.vue'; // Import the modal
import ReviewForm from './ReviewForm.vue'; // Import the review form
import { useAuthStore } from "@/stores/authStore";
import { useReviewStore } from "@/stores/reviewStore";

export default {
    name: "Review",
    components: {
        StarRating,
        LikeButton,
        DislikeButton,
        DeleteButton,
        ConfirmModal,
        ReviewForm
    },
    props: {
        review: {
            type: Object,
            required: true
        }
    },
    emits: ["edit-review"], // Declare the emitted event
    setup(props) {
        const authStore = useAuthStore();
        const reviewStore = useReviewStore();
        const username = ref('');
        const formattedDate = ref('');
        const confirmModal = ref(null);
        const reviewToDelete = ref(null);
        const showEditForm = ref(false); // Track visibility of the edit form

        const openConfirmModal = (reviewId) => {
            reviewToDelete.value = reviewId;
            confirmModal.value.show();
        };

        const deleteReview = async () => {
            if (!reviewToDelete.value) return;
            try {
                await reviewStore.deleteReview(reviewToDelete.value);
                reviewToDelete.value = null;
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        };

        const handleEdit = () => {
            showEditForm.value = true; // Show the form for editing
        };

        const cancelEdit = () => {
            showEditForm.value = false; // Hide the form when canceled
        };

        const handleReviewSubmitted = async () => {
            await reviewStore.fetchReviews(props.review.game_id); // Refresh reviews after editing
            showEditForm.value = false; // Hide the form after submission
        };

        return {
            authStore,
            username,
            formattedDate,
            confirmModal,
            openConfirmModal,
            deleteReview,
            showEditForm,
            handleEdit,
            cancelEdit,
            handleReviewSubmitted
        };
    }
};
</script>

<style scoped>
.review {
    border: 4px solid #ddd;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 0.6rem;
    background-color: #f9f9f9;
}
</style>
