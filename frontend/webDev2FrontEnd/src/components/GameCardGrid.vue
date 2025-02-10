<template>
    <h1 class="text-center mt-4 mb-4">Game Card Grid</h1>
    <div class="grid-container mb-5 ms-5 me-5">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
    </div>
</template>


<script>
import GameCard from "./GameCard.vue";

export default {
    name: "GameCardGrid",
    components  : {
        GameCard
    },
    data() {
        return {
            games: [
                { 
                    id: 1, 
                    name: "Cyberpunk 2077", 
                    description: "Night city action game", 
                    genre: "Action", 
                    average_rating: 5, 
                    release_date: "2020-12-10", 
                    image_path: "/public/cyberpunk2077.jpg" 
                },
                { 
                    id: 2, 
                    name: "Minecraft", 
                    description: "Sandbox adventure", 
                    genre: "Adventure", 
                    average_rating: 4, 
                    release_date: "2009-05-17", 
                    image_path: "/public/minecraft.jpg" 
                },
                { 
                    id: 19, 
                    name: "Cyberpunk 2077", 
                    description: "Night city action game", 
                    genre: "Action", 
                    average_rating: 5, 
                    release_date: "2020-12-10", 
                    image_path: "/public/cyberpunk2077.jpg" 
                },
                { 
                    id: 42, 
                    name: "Minecraft", 
                    description: "Sandbox adventure", 
                    genre: "Adventure", 
                    average_rating: 4, 
                    release_date: "2009-05-17", 
                    image_path: "/public/minecraft.jpg" 
                },
                { 
                    id: 12, 
                    name: "Cyberpunk 2077", 
                    description: "Night city action game", 
                    genre: "Action", 
                    average_rating: 5, 
                    release_date: "2020-12-10", 
                    image_path: "/public/cyberpunk2077.jpg" 
                },
                { 
                    id: 25, 
                    name: "Minecraft", 
                    description: "Sandbox adventure", 
                    genre: "Adventure", 
                    average_rating: 4, 
                    release_date: "2009-05-17", 
                    image_path: "/public/minecraft.jpg" 
                },
                { 
                    id: 21, 
                    name: "Cyberpunk 2077", 
                    description: "Night city action game", 
                    genre: "Action", 
                    average_rating: 5, 
                    release_date: "2020-12-10", 
                    image_path: "/public/cyberpunk2077.jpg" 
                },
                { 
                    id: 42, 
                    name: "Minecraft", 
                    description: "Sandbox adventure", 
                    genre: "Adventure", 
                    average_rating: 4, 
                    release_date: "2009-05-17", 
                    image_path: "/public/minecraft.jpg" 
                },



            ]
        };
    },
}

</script>


<style scoped>
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
}
</style>