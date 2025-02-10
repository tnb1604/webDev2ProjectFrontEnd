<template>
    <div class="card">
        <!-- Display game image -->
        <img :src="game.image_path" class="card-img-top" alt="Game Image" />
        
        <!-- Display game title -->
        <div class="card-body">
            <h5 class="card-name">{{ game.name }}</h5>
            <p class="card-text">{{ game.genre }}</p>
            <p class="card-text">Released: {{ game.release_date }}</p>
            <p class="card-text">{{ game.average_rating }}</p>
            <router-link :to="`/game/${game.id}`" class="btn btn-primary">View Details</router-link>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "GameCard",
    props: {
        game: Object,
    },
};
</script>

<style scoped>
.card {
    margin: 1px; /* Optional: Add margin to separate cards */
}
</style>
