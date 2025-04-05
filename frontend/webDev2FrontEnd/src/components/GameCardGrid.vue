<template>
    <div>
        <h1 class="text-center mt-4 mb-3">Games</h1>

        <!-- Loading state -->

        <!-- Show error message if fetching fails -->
        <div v-if="error" class="text-center text-danger">Error fetching games. Please try again later.</div>

        <div v-if="showSpinner" class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>


        <!-- Add Game Card (Admin only)
         <router-link v-if="authStore.user?.role === 'admin'" to="/modify-game/new" class="text-decoration-none">
                <div class="card add-game-card">
                    <div class="card-img-container">
                        <img src="/public/addgame.png" class="card-img-top" alt="Add Game" />
                    </div>
                    <div class="card-body">
                        <h5 class="card-name">Add New Game</h5>
                        <p class="card-text text-center">Click here to add a new game to the collection.</p>
                    </div>
                </div>
            </router-link> -->


        <div v-else class="grid-container mb-5 ms-5 me-5">
            <GameCard v-for="game in filteredGames" :key="game.id" :game="game" />

        </div>

        <!-- Pagination controls -->
        <div v-if="!loading && !error && games.length > 0" class="pagination-controls mb-4">
            <button @click="prevPage" :disabled="page === 1" class="btn btn-primary pagination-btn start-btn">
                <i class="bi bi-arrow-left"></i>
            </button>

            <span class="page-number">
                <span class="game-level">Level {{ page }}</span>
            </span>

            <button @click="nextPage" :disabled="noMoreGames" class="btn btn-primary pagination-btn end-btn">
                <i class="bi bi-arrow-right"></i>
            </button>
        </div>

        <!-- Show message if no games are found -->
        <div v-else-if="!loading && filteredGames.length === 0 && !error" class="text-center">
            <p>No games found for your search.</p>
        </div>
    </div>
</template>

<script>
import GameCard from "./GameCard.vue";
import api from '../utils/axios.js'; // Ensure this path is correct
import { useAuthStore } from "@/stores/authStore";

export default {
    name: "GameCardGrid",
    components: {
        GameCard
    },
    props: {
        searchQuery: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            games: [],
            loading: true,
            error: false,
            page: 1,
            noMoreGames: false,
            showSpinner: null
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        },
        filteredGames() {
            return this.games.filter(game =>
                game.title.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        async fetchGames() {
            this.loading = true;
            this.error = false;

            // Start a timer to show the spinner after 300ms
            this.spinnerTimeout = setTimeout(() => {
                this.showSpinner = true;
            }, 300);

            try {
                const response = await api.get(`/games`, {
                    params: {
                        page: this.page,
                        search: this.searchQuery
                    }
                });
                this.games = response.data;
                this.noMoreGames = response.data.length < 10; // Set directly after fetching data
            } catch (error) {
                console.error("Error fetching games:", error);
                this.error = true;
            } finally {
                this.loading = false;
            }

            // Stop the timer and hide the spinner when loading is complete
            clearTimeout(this.spinnerTimeout);
            this.showSpinner = false;
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
    },
    watch: {
        searchQuery: {
            handler() {
                this.page = 1; // Reset to the first page
                this.fetchGames();
            },
        }
    },
    created() {
        this.fetchGames();
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

.add-game-card {
    margin: 10px;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(71deg, #ffffff, #ececec);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;
    border: none;
    cursor: pointer;
}

.add-game-card:hover {
    transform: scale(1.1);
    box-shadow: 0 16px 25px rgba(0, 0, 0, 0.2);
}

.card-img-container {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.add-game-card .card-img-top {
    height: 264px;
    object-fit: contain;
    width: 100%;
}

.add-game-card .card-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    text-align: center;
}

.add-game-card .card-text {
    font-size: 1rem;
    color: #555;
    text-align: center;
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
    font-size: 1.5rem;
    color: #00ff00;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    padding: 5px 10px;
    background: linear-gradient(45deg, #000000, #979797);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(65, 65, 65, 0.8);
    animation: pulse 1.5s ease-in-out infinite;
    margin-left: 6px;
    margin-right: 6px;
}

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

@media (max-width: 410px) {
    .grid-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
    }

    .add-game-card {
        width: 200px;
        height: 300px;
    }

    .add-game-card .card-img-top {
        height: 180px;
    }

    .add-game-card .card-name {
        font-size: 1rem;
    }

    .add-game-card .card-text {
        font-size: 0.9rem;
    }
}

</style>
