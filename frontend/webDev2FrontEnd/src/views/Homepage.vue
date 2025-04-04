<template>
    <!-- Hero Section -->
    <div class="position-relative text-white text-center" style="height: 490px; overflow: hidden;">
        <!-- Dark overlay -->
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"></div>

        <!-- Background Image -->
        <img src="/homepagepiclol.jpg" class="img-fluid w-100 h-100 object-fit-cover" alt="Homepage Banner">

        <!-- Text Content -->
        <div class="position-absolute top-50 start-50 translate-middle w-100">
            <h1 class="fw-bold mb-3">Share and compare, see what others declare!</h1>
            <h3 class="fw-light mb-5">Reviews from all types of gamers</h3>
            <div class="container">
                <!-- Search Bar -->
                <SearchBar :placeholder="'Search games...'" @search="handleSearch" />
            </div>
        </div>
    </div>

    <!-- Game Cards Section -->
    <GameCardGrid :searchQuery="searchQuery" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import GameCardGrid from "@/components/GameCardGrid.vue";
import SearchBar from "@/components/SearchBar.vue"; // Import SearchBar component

const searchQuery = ref(""); // Track the search query

// Handle search event from the SearchBar
const handleSearch = (query) => {
    searchQuery.value = query;
};
</script>
