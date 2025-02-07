<template>
    <div class="game-card">
        <!-- Display game image -->
        <img :src="game.image_path" alt="Game Image" />
        
        <!-- Display game title -->
        <h3>{{ game.title }}</h3>
        
        <!-- Display game genre and release date -->
        <p>{{ game.genre }}</p>
        <p>{{ game.release_date }}</p>

        <!-- Link to game details page -->
        <router-link :to="`/game/${game.id}`">View Details</router-link>
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
.game-card {
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    width: 200px; /* Optional: Set a width for the card */
    margin: 10px; /* Optional: Add margin to separate cards */
}

.game-card img {
    width: 100%;
    max-width: 200px; /* Ensure image does not exceed the card width */
    height: auto;
    border-radius: 8px;
}

.game-card h3 {
    font-size: 1.2em;
    color: #333;
    margin: 10px 0;
}

.game-card p {
    font-size: 0.9em;
    color: #666;
}

.game-card a {
    text-decoration: none;
    color: #42b983; /* Vue green color */
    font-weight: bold;
}

.game-card a:hover {
    text-decoration: underline;
}
</style>
