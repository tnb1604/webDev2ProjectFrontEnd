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
        <div v-if="!loading && !error" class="pagination-controls mb-4">
            <button @click="prevPage" :disabled="page === 1" class="btn btn-primary pagination-btn start-btn">
                <i class="bi bi-arrow-left"></i>
            </button>

            <!-- Page Number styled as game level -->
            <span class="page-number">
                <span class="game-level">Level {{ page }}</span>
            </span>

            <button @click="nextPage" :disabled="noMoreGames" class="btn btn-primary pagination-btn end-btn">
                <i class="bi bi-arrow-right"></i>
            </button>
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

.pagination-btn {
    border-radius: 50%;
    padding: 12px 18px;
    background-color: #5f6368;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.pagination-btn:hover {
    background-color: #ff7f50;
    transform: scale(1.1);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.start-btn {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}

.end-btn {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}

.page-number {
    font-family: 'Press Start 2P', cursive;
    /* Retro arcade font */
    font-size: 1.5rem;
    color: #00ff00;
    /* Neon green like classic game fonts */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    /* Adds a glowing effect */
    padding: 5px 10px;
    background: linear-gradient(45deg, #000000, #979797);
    /* Gradient background like a game interface */
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(65, 65, 65, 0.8);
    /* Glow effect */
    animation: pulse 1.5s ease-in-out infinite;
    margin-left: 6px;
    margin-right: 6px;
}

/* Animation to make the text "pulse" like a game score or level indicator */
@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.03);
    }

    100% {
        transform: scale(1);
    }
}

.game-level {
    font-size: 1.2rem;
    color: rgb(255, 255, 255);
    font-weight: bold;
}
</style>
