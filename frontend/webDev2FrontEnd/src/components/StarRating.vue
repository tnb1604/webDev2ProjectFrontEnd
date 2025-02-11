<template>
    <div class="star-rating">
        <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= rating }">&#9733;</span>
    </div>
</template>

<script>
export default {
    name: "StarRating",
    props: {
        rating: {
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped>
.star {
    font-size: 1.7rem;
    color: #d3d3d3;
}
.star.filled {
    color: #ffd700;
}
</style>
