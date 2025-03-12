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
        <ReviewForm class="mb-4" :rating="averageRating" />
        <Review v-for="review in reviews" :key="review.id" :review="review" />
    </div>
</template>

<script>
import Review from './Review.vue';
import StarRating from './StarRating.vue';
import ReviewForm from '@/components/ReviewForm.vue';

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
        }
    }
};
</script>

<style scoped></style>
