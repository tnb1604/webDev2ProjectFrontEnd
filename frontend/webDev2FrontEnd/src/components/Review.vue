<template>
    <div class="review">
        <StarRating class="ms-2 mb-1" :rating="review.rating" />
        <h4 class="ms-2">{{ review.title }}</h4>
        <p class="ms-2">{{ review.review_text }}</p>
        <small class="ms-2 muted">Posted by {{ username }} on {{ formattedDate }}</small>
        <div class="d-flex justify-content-between">
            <div>
                <LikeButton :initialLikes="0" @likeToggled="handleLike" />
                <DislikeButton :initialDislikes="0" @dislikeToggled="handleDislike" />
            </div>
            <div>
                <EditButton v-if="authStore.user && authStore.user.id === review.user_id" :entityType="'review'"
                    :entityId="review.id" :editAction="editReview" customClass="ms-2" />

                <DeleteButton
                    v-if="authStore.user && (authStore.user.id === review.user_id || authStore.user.role === 'admin')"
                    :entityType="'review'" :entityId="review.id" :deleteAction="deleteReview" customClass="ms-2"
                    ref="deleteButton" />
            </div>
        </div>
    </div>
</template>

<script>
import StarRating from './StarRating.vue';
import DislikeButton from './DislikeButton.vue';
import LikeButton from './LikeButton.vue';
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';
import { useAuthStore } from "@/stores/authStore";
import { useReviewStore } from "@/stores/reviewStore"; // Import the review store
import { onMounted, ref } from "vue";
import api from "@/utils/axios.js";

export default {
    name: "Review",
    components: {
        StarRating,
        LikeButton,
        DislikeButton,
        DeleteButton,
        EditButton
    },
    props: {
        review: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const authStore = useAuthStore();
        const reviewStore = useReviewStore(); // Use the review store
        const username = ref('');
        const formattedDate = ref('');

        onMounted(() => {
            fetchUsername(props.review.user_id);
            formatReviewDate(props.review.created_at);
        });

        // Fetch the username from the API using the user_id from review
        const fetchUsername = async (userId) => {
            try {
                const response = await api.get(`/users/${userId}`);
                username.value = response.data.username;
            } catch (error) {
                console.error("Error fetching username:", error);
            }
        };

        // Format the review date to display only the date
        const formatReviewDate = (dateTime) => {
            const date = new Date(dateTime);
            formattedDate.value = date.toLocaleDateString();
        };

        // Call the deleteReview action from the reviewStore
        const deleteReview = async (reviewId) => {
            try {
                await reviewStore.deleteReview(reviewId); // Use store's delete action
                // Optionally notify the user or handle UI updates after deletion
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        };

        return {
            authStore,
            reviewStore,
            username,
            formattedDate,
            deleteReview, // Pass the delete action to the template
        };
    },
    methods: {
        handleLike(liked) {
            if (liked && this.review.disliked) {
                this.review.disliked = false;
                this.$refs.dislikeButton.resetDislike();
            }
        },
        handleDislike(disliked) {
            if (disliked && this.review.liked) {
                this.review.liked = false;
                this.$refs.likeButton.resetLike();
            }
        },
        editReview(reviewId) {
            // Implement the edit review logic here
            console.log(`Editing review with ID: ${reviewId}`);
        }
    }
};
</script>

<style scoped>
.review {
    border: 4px solid #ddd;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-block-end: 0.6rem;
    background-color: #f9f9f9;
}
</style>
