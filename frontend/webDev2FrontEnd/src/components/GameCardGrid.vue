<template>
    <div>
        <h1 class="text-center mt-4 mb-5">Games</h1>
        <!-- Loading state -->
        <div v-if="loading" class="text-center">Loading games...</div>
        
        <!-- Show error message if fetching fails -->
        <div v-if="error" class="text-center text-danger">Error fetching games. Please try again later.</div>
        
        <!-- Show the game cards when data is loaded -->
        <div v-else class="grid-container mb-5 ms-5 me-5">
            <GameCard v-for="game in games" :key="game.id" :game="game" />
        </div>
    </div>
</template>

<script>
import GameCard from "./GameCard.vue";
import api from '../utils/axios.js'; // Ensure this path is correct

export default {
    name: "GameCardGrid",
    components: {
        GameCard
    },
    data() {
        return {
            games: [],
            loading: true, // loading state
            error: false,  // error state
        };
    },
    created() {
        this.fetchGames();
    },
    methods: {
        async fetchGames() {
            try {
                const response = await api.get('/games'); // Ensure this URL is correct for your backend
                this.games = response.data;
            } catch (error) {
                console.error("Error fetching games:", error);
                this.error = true; // Set error state if fetching fails
            } finally {
                this.loading = false; // End loading state
            }
        }
    }
}
</script>

<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 16px;
}
</style>
