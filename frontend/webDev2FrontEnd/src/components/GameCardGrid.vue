<template>
    <div>
        <h1 class="text-center mt-4 mb-3">Games</h1>

        <!-- Loading state -->
        <div v-if="loading" class="text-center">Loading games...</div>

        <!-- Show error message if fetching fails -->
        <div v-if="error" class="text-center text-danger">Error fetching games. Please try again later.</div>

        <!-- Show the game cards when data is loaded -->
        <div v-else class="grid-container mb-5 ms-5 me-5">
            <GameCard v-for="game in games" :key="game.id" :game="game" />
        </div>

        <!-- Pagination controls -->
        <div v-if="!loading && !error" class="pagination-controls text-center mt-4">
            <button @click="prevPage" :disabled="page === 1" class="btn btn-primary me-2">Previous</button>
            <span>Page {{ page }}</span>
            <button @click="nextPage" :disabled="noMoreGames" class="btn btn-primary ms-2">Next</button>
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
            games: [],        // Array of games to display
            loading: true,    // Loading state
            error: false,     // Error state
            page: 1,          // Current page
            noMoreGames: false, // Flag to disable the Next button if no more games
        };
    },
    created() {
        this.fetchGames();
    },
    methods: {
        async fetchGames() {
            this.loading = true;
            this.error = false;
            this.noMoreGames = false; // Reset "no more games" flag before each fetch
            try {
                const response = await api.get(`/games?page=${this.page}`);
                this.games = response.data;

                // If the number of games is less than the page size, there are no more games
                if (this.games.length < 10) {
                    this.noMoreGames = true;  // Disable "Next" button if no more data is available
                }
            } catch (error) {
                console.error("Error fetching games:", error);
                this.error = true;
            } finally {
                this.loading = false;
            }
        },
        nextPage() {
            this.page++;
            this.fetchGames();
        },
        prevPage() {
            if (this.page > 1) {
                this.page--;
                this.fetchGames();
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

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
