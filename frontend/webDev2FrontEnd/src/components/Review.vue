<template>
    <div class="review">
        <StarRating class="ms-2 mb-1" :rating="review.rating" />
        <h4 class="ms-2">{{ review.title }}</h4>
        <p class="ms-2">{{ review.review_text }}</p>
        <small class="ms-2 text-muted">Posted by {{ username }} on {{ formattedDate }}</small>

        <div class="d-flex justify-content-between">


            <div>
                <!-- Like & Dislike Buttons -->
                <button class="btn vote-btn me-2" @click="handleLike">
                    <i class="bi bi-hand-thumbs-up-fill"
                        :style="{ color: userVote === 'like' ? '#0d6efd' : '#6c757d' }">
                    </i> {{ likes }}
                </button>

                <button class="btn vote-btn" @click="handleDislike">
                    <i class="bi bi-hand-thumbs-down-fill"
                        :style="{ color: userVote === 'dislike' ? '#dc3545' : '#6c757d' }">
                    </i> {{ dislikes }}
                </button>
            </div>


            <div>
                <button v-if="authStore.user && authStore.user.id === review.user_id"
                    @click="$emit('edit-review', review)" class="ms-2 btn btn-warning">
                    Edit Review
                </button>

                <DeleteButton
                    v-if="authStore.user && (authStore.user.id === review.user_id || authStore.user.role === 'admin')"
                    :entityType="'review'" :entityId="review.id" :deleteAction="openConfirmModal" customClass="ms-2" />

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
import { ref, onMounted, watch } from "vue";
import StarRating from './StarRating.vue';
import DeleteButton from './DeleteButton.vue';
import ConfirmModal from './ConfirmModal.vue';
import ReviewForm from './ReviewForm.vue';
import { useAuthStore } from "@/stores/authStore";
import { useReviewStore } from "@/stores/reviewStore";
import api from "@/utils/axios.js";
import { useNotificationStore } from '@/stores/notificationStore'

export default {
    name: "Review",
    components: {
        StarRating,
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
    emits: ["edit-review", "like-or-dislike", "review-updated"],
    setup(props, { emit }) {
        const authStore = useAuthStore();
        const reviewStore = useReviewStore();
        const username = ref('');
        const formattedDate = ref('');
        const confirmModal = ref(null);
        const reviewToDelete = ref(null);
        const showEditForm = ref(false);
        const notification = useNotificationStore();

        // Like/Dislike Data
        const likes = ref(0);
        const dislikes = ref(0);
        const userVote = ref(null); // 'like', 'dislike', or null

        const fetchVotes = async () => {
            try {
                // Fetch total likes & dislikes
                const votesRes = await api.get(`/reviews/${props.review.id}/votes`);
                likes.value = votesRes.data.likes || 0;
                dislikes.value = votesRes.data.dislikes || 0;

                // Fetch the user's vote (if logged in)
                if (authStore.user) {
                    const userVoteRes = await api.get(`/reviews/${props.review.id}/vote/${authStore.user.id}`);
                    userVote.value = userVoteRes.data.voteType; // 'like', 'dislike', or null
                }
            } catch (error) {
                console.error("Error fetching votes:", error);
            }
        };


        const handleLike = async () => {
            if (!authStore.user) {
                notification.show("You must be logged in to like reviews.", "secondary");
                return;
            }

            if (authStore.user.role === 'admin') {
                notification.show("Only user accounts can like reviews.", "secondary");
                return;
            }

            try {
                if (userVote.value === 'like') {
                    await api.post(`/reviews/${props.review.id}/like/${authStore.user.id}`);
                    likes.value--;
                    userVote.value = null;
                    notification.show('Like Removed.', 'primary')
                } else {
                    await api.post(`/reviews/${props.review.id}/like/${authStore.user.id}`);
                    likes.value++;
                    if (userVote.value === 'dislike') dislikes.value--;
                    userVote.value = 'like';
                    notification.show('Like Added.', 'primary')
                }
            } catch (error) {
                console.error("Error liking review:", error);
            }
        };


        const handleDislike = async () => {
            if (!authStore.user) {
                notification.show("You must be logged in to dislike reviews.", "secondary");
                return;
            }

            if (authStore.user.role === 'admin') {
                notification.show("Only user accounts can dislike reviews.", "secondary");
                return;
            }

            try {
                if (userVote.value === 'dislike') {
                    await api.post(`/reviews/${props.review.id}/dislike/${authStore.user.id}`);
                    dislikes.value--;
                    userVote.value = null;
                    notification.show('Dislike Removed.', 'primary')
                } else {
                    await api.post(`/reviews/${props.review.id}/dislike/${authStore.user.id}`);
                    dislikes.value++;
                    if (userVote.value === 'like') likes.value--;
                    userVote.value = 'dislike';
                    notification.show('Dislike Added.', 'primary')
                }
            } catch (error) {
                console.error("Error disliking review:", error);
            }
        };

        const populateReviewDetails = async () => {
            if (props.review.user?.name) {
                username.value = props.review.user.name;
            } else {
                try {
                    const response = await api.get(`/users/${props.review.user_id}`);
                    username.value = response.data.username || "Unknown User";
                } catch (error) {
                    username.value = "Unknown User";
                }
            }

            try {
                const date = new Date(props.review.created_at);
                formattedDate.value = date.toLocaleDateString();
            } catch (error) {
                formattedDate.value = "Invalid Date";
            }

            // Fetch votes when the review is loaded
            await fetchVotes();
        };

        onMounted(populateReviewDetails);

        watch(() => props.review, populateReviewDetails, { immediate: true });

        const openConfirmModal = (reviewId) => {
            reviewToDelete.value = reviewId;
            confirmModal.value.show();
        };

        const deleteReview = async () => {
            if (!reviewToDelete.value) return;
            try {
                await reviewStore.deleteReview(reviewToDelete.value);
                reviewToDelete.value = null;
                notification.show('Review deleted.', 'primary');
                emit('review-updated'); // Emit event after deleting
            } catch (error) {
                console.error("Error deleting review:", error);
            }
        };

        const handleEdit = () => {
            showEditForm.value = true;
        };

        const cancelEdit = () => {
            showEditForm.value = false;
        };

        const handleReviewSubmitted = async () => {
            await reviewStore.fetchReviews(props.review.game_id);
            showEditForm.value = false;
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
            handleReviewSubmitted,
            likes,
            dislikes,
            userVote,
            handleLike,
            handleDislike
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

.vote-btn {
    background: transparent;
    border: none;
    padding: 0.3rem 0.5rem;
    font-size: 1.2rem;
    transition: transform 0.2s ease;
}

.vote-btn:hover {
    transform: scale(1.2);
}

.animated-icon {
    transition: color 0.2s ease, transform 0.3s ease;
    margin-right: 0.3rem;
}

/* Add styles for floating alert */
.alert-message-floating {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050;
    max-width: 300px;
}
</style>
