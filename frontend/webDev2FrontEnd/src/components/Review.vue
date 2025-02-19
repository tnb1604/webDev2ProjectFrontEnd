<template>
    <div class="review">
        <StarRating class="ms-2 mb-1":rating="review.rating" />
        <h4 class="ms-2">{{ review.review_title }}</h4>
        <p class="ms-2">{{ review.review_text }}</p>
        <small class="ms-2">{{ review.user_name }} - {{ review.created_at }}</small>
        <div class="d-flex justify-content-between">
            <div>
                <LikeButton :initialLikes="10" @likeToggled="handleLike" />
                <DislikeButton :initialDislikes="3" @dislikeToggled="handleDislike" />
            </div>
            <div>
                <EditButton 
                    entityType="review" 
                    :entityId="review.id" 
                    :editAction="editReview" 
                    customClass="ms-2" 
                />
                <DeleteButton 
                    entityType="review" 
                    :entityId="review.id" 
                    :deleteAction="deleteReview" 
                    customClass="ms-2" 
                />
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
        deleteReview(reviewId) {
            // Implement the delete review logic here
            console.log(`Deleting review with ID: ${reviewId}`);
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
    margin-bottom: 1rem;
    background-color: #f9f9f9;
}
</style>
