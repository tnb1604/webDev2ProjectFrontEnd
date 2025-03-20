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
                <EditButton v-if="authStore.user && authStore.user.id === review.user_id" 
                            :entityType="'review'" :entityId="review.id" :editAction="editReview" customClass="ms-2" />

                <DeleteButton v-if="authStore.user && (authStore.user.id === review.user_id || authStore.user.role === 'admin')" 
                              :entityType="'review'" :entityId="review.id" :deleteAction="openConfirmModal" customClass="ms-2" />

                <!-- Confirm Delete Modal -->
                <ConfirmModal ref="confirmModal" title="Delete Review" 
                              message="Are you sure you want to delete this review?" 
                              @confirmed="deleteReview" />
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import StarRating from './StarRating.vue';
import DislikeButton from './DislikeButton.vue';
import LikeButton from './LikeButton.vue';
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';
import ConfirmModal from './ConfirmModal.vue'; // Import the modal
import { useAuthStore } from "@/stores/authStore";
import { useReviewStore } from "@/stores/reviewStore";
import api from "@/utils/axios.js";

export default {
    name: "Review",
    components: {
        StarRating,
        LikeButton,
        DislikeButton,
        DeleteButton,
        EditButton,
        ConfirmModal
    },
    props: {
        review: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const authStore = useAuthStore();
        const reviewStore = useReviewStore();
        const username = ref('');
        const formattedDate = ref('');
        const confirmModal = ref(null);
        const reviewToDelete = ref(null);

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

        return {
            authStore,
            username,
            formattedDate,
            confirmModal,
            openConfirmModal,
            deleteReview
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
