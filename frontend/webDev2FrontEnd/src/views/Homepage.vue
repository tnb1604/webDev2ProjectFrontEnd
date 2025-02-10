<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GameCardGrid from "@/components/GameCardGrid.vue";

const games = ref([]);
const searchQuery = ref(""); // Search bar input

onMounted(async () => {
    try {
        const response = await axios.get("http://localhost/routes/game.php");
        games.value = response.data;
    } catch (error) {
        console.error("Error fetching games:", error);
    }
});

// Filter games based on search query
const filteredGames = () => {
    return games.value.filter(game =>
        game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
};
</script>

<template>
    
    <!-- Hero Section -->
    <div class="position-relative text-white text-center" style="height: 490px; overflow: hidden;">
        <!-- Dark overlay -->
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

        <!-- Background Image -->
        <img src="/homepagepiclol.jpg" class="img-fluid w-100 h-100 object-fit-cover" alt="Homepage Banner">

        <!-- Text Content -->
        <div class="position-absolute top-50 start-50 translate-middle w-100">
            <h1 class="fw-bold mb-3">Find and share trustworthy reviews</h1>
            <h3 class="fw-light mb-5">Real reviews from gamers of all kinds</h3>
            <div class="container">
                <input v-model="searchQuery" type="text" class="form-control form-control-lg mx-auto mt-3 w-50"
                    placeholder="Search games...">
            </div>
        </div>
    </div>

    <!-- Game Cards Section -->
    <GameCardGrid></GameCardGrid>
    


</template>
