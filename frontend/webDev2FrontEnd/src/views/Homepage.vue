<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GameCard from "@/components/GameCard.vue";  // Import GameCard

const games = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost/routes/game.php");
        games.value = response.data;
    } catch (error) {
        console.error("Error fetching games:", error);
    }
});
</script>

<template>
    <div class="homepage">
        <h1>Welcome to the Game Review Platform</h1>
        <div v-if="games.length === 0">
            <p>Loading games...</p>
        </div>
        <div v-else class="game-cards-container">
            <!-- Loop through each game and use the GameCard component -->
            <GameCard
                v-for="game in games"
                :key="game.id"
                :game="game"
            />
        </div>
    </div>
</template>

<style scoped>
/* Reset some default margins and paddings */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.homepage {
    text-align: center;
    padding: 20px;
}

h1 {
    color: #42b983;
    font-size: 2rem;
    margin-bottom: 20px;
}

p {
    font-size: 1.2rem;
    color: #333;
}

.game-cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Center the cards horizontally */
    gap: 20px; /* Add space between the cards */
    margin-top: 20px;
}

.game-card {
    width: 250px; /* Set the width for the game card */
    flex: 1 1 250px; /* Allow cards to grow and shrink while maintaining width */
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    text-align: center;
    padding: 16px;
    background-color: #fff;
}

.game-card img {
    width: 100%;
    max-width: 200px;
    height: auto;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .game-cards-container {
        justify-content: space-around; /* Adjust the card alignment on smaller screens */
    }

    .game-card {
        width: 100%; /* Ensure cards take full width on smaller screens */
        max-width: 300px;
    }
}
</style>
