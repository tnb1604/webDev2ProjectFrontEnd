<template>
    <div class="card">
        <!-- Display game image -->
        <img :src="game.image_path" class="card-img-top" alt="Game Image" />
        
        <!-- Display game title -->
        <div class="card-body">
            <h5 class="card-title">{{ game.title }}</h5>
            
            <!-- Display game genre and release date -->
            <p class="card-text">{{ game.genre }}</p>
            <p class="card-text">{{ game.release_date }}</p>

            <!-- Link to game details page -->
            <router-link :to="`/game/${game.id}`" class="btn btn-primary">View Details</router-link>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        game: {
            type: Object,
            required: true
        }
    }
};
</script>

<style scoped>
.card {
    margin: 10px; /* Optional: Add margin to separate cards */
}
</style>
