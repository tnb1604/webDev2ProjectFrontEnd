<template>
    <div class="card">
        <!-- Display game image -->
        <img :src="game.image_path" class="card-img-top" alt="Game Image" />
        
        <!-- Display game title -->
        <div class="card-body">
            <h5 class="card-name">{{ game.title }}</h5>
            <p class="card-text">{{ game.genre }}</p>
            <p class="card-text">Released: {{ game.release_date }}</p>
            <p class="card-text">
                <span>{{ game.average_rating }}</span>
                <StarRating class="ms-2 mb-1" :rating="game.average_rating" />
            </p>
            <router-link :to="`/game/${game.id}`" class="btn btn-primary">View Details</router-link>
        </div>
        
    </div>
</template>

<script>
import StarRating from './StarRating.vue';

export default {
    name: "GameCard",
    props: {
        game: Object,
    },
    components: {
        StarRating
    },
};
</script>

<style scoped>
.card {
    margin: 10px; /* Adjust margin to separate cards */
    width: 300px; /* Adjust the width of the card */
    height: 450px; /* Adjust the height of the card */
}
.card-img-top {
    height: 200px; /* Adjust the height of the image */
    object-fit: cover; /* Ensure the image covers the area */
}
.card-text {
    display: flex;
    align-items: center;
}
</style>
