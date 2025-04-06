<template>
    <router-link :to="`/game/${game.id}`" class="text-decoration-none">
        <div class="card">
            <!-- Display game image -->
            <img :src="`${baseURL}${game.image_path}`" class="card-img-top" alt="Game Image" />

            <!-- Display game title -->
            <div class="card-body">
                <h5 class="card-name">{{ game.title }}</h5>
                <p class="card-text genre">{{ game.genre }}</p>
                <p class="card-text">Released: {{ game.release_date }}</p>
                <p class="card-text">
                    <StarRating class="ms-2 mb-0" :rating="parseFloat(game.average_rating) || 0" />
                </p>
            </div>
        </div>
    </router-link>
</template>

<script>
import axios from '@/utils/axios'; // Import axios instance
import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import StarRating from './StarRating.vue';

export default {
    name: "GameCard",
    props: {
        game: Object,
        isAdmin: Boolean,
    },
    components: {
        StarRating,
    },
    setup() {
        const authStore = useAuthStore();
        const baseURL = axios.defaults.baseURL; // Extract baseURL from axios

        onMounted(() => {
            authStore.fetchUserDetails().then(() => {
            });
        });

        return {
            authStore,
            baseURL, // Make baseURL available in the template
        };
    },
    computed: {
        roundedAverageRating() {
            const rounded = Math.ceil(this.game.average_rating);
            console.log('GameCard computed roundedAverageRating:', rounded);
            return rounded;
        }
    },
};
</script>

<style scoped>
/* Card Container */
.card {
    margin: 10px;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
    background: linear-gradient(71deg, #ff5454, #ffd257);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    overflow: hidden;
    border: none;
}

.card:hover {
    transform: scale(1.1);
    box-shadow: 0 16px 25px rgba(0, 0, 0, 0.2);
}

/* Card Image */
.card-img-top {
    height: 284px;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

/* Game Title */
.card-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
    transition: color 0.2s ease;
}

/* Game Genre */
.card-text.genre {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
}

/* Card Text (Game Genre, Release Date, Rating) */
.card-text {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    font-size: 1rem;
    color: #555;
}

.card-text span {
    font-weight: 700;
}

/* Star Rating */
.star-rating {
    font-size: 1.2rem;
    color: #ffbc00;
}

@media (max-width: 768px) {
    .card {
        width: 90%;
    }
}
</style>
