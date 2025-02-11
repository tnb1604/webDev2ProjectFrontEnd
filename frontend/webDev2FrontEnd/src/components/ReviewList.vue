<template>
    <div class="mb-4">
        <Review v-for="review in reviews" :key="review.id" :review="review" />
    </div>
</template>

<script>
import Review from './Review.vue';

export default {
    name: "ReviewList",
    components: {
        Review
    },
    data() {
        return {
            reviews: [
                {
                    id: 1,
                    rating: 5,
                    review_title: "Masterpiece!",
                    review_text: "Absolutely amazing game with a deep story and great combat.",
                    user_name: "John Doe",
                    created_at: "2023-10-01"
                },
                {
                    id: 2,
                    rating: 4,
                    review_title: "Great game",
                    review_text: "Intruiging story and fun gameplay, but some bugs need fixing.",
                    user_name: "Jane Smith",
                    created_at: "2023-10-03"
                }
            ]
        };
    }
};
</script>

<style scoped></style>
