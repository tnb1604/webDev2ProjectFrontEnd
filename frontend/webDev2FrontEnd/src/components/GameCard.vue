<template>
    <div class="card">
        <!-- Display game image -->
        <img :src="`http://localhost${game.image_path}`" class="card-img-top" alt="Game Image" />

        <!-- Display game title -->
        <div class="card-body">
            <h5 class="card-name">{{ game.title }}</h5>
            <p class="card-text">{{ game.genre }}</p>
            <p class="card-text">Released: {{ game.release_date }}</p>
            <p class="card-text">
                <span>{{ game.average_rating }}</span>
                <StarRating class="ms-2 mb-0" :rating="roundedAverageRating" />
            </p>
            <router-link :to="`/game/${game.id}`" class="btn btn-primary">View Details</router-link>

            <!-- Admin Section: Edit and Delete buttons -->
            <router-link v-if="authStore.user?.role === 'admin'" :to="`/modify-game/${game.id}`"
                class="btn btn-warning ms-2 me-2">Edit</router-link>
            <DeleteButton v-if="authStore.user?.role === 'admin'" :entity-id="game.id" entity-type="game"
                :delete-action="deleteGame" custom-class="btn btn-danger" />
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import StarRating from './StarRating.vue';
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';

export default {
    name: "GameCard",
    props: {
        game: Object,
        isAdmin: Boolean,
    },
    components: {
        StarRating,
        DeleteButton,
        EditButton,
    },
    setup() {
        const authStore = useAuthStore();

        // Ensure user details are loaded when the component mounts
        onMounted(() => {
            authStore.fetchUserDetails().then(() => {
            });
        });

        return {
            authStore
        };
    },
    computed: {
        roundedAverageRating() {
            const rounded = Math.ceil(this.game.average_rating);
            console.log('GameCard computed roundedAverageRating:', rounded);
            return rounded;
        }
    },
    methods: {
        deleteGame(gameId) {
            console.log(`Deleting game with ID: ${gameId}`);
        },
        editGame(gameId) {
            console.log(`Editing game with ID: ${gameId}`);
        },
    }
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
    /* Remove any unwanted border */
}

.card:hover {
    transform: translateY(-3px);
    /* Lift effect on hover */
    box-shadow: 0 16px 25px rgba(0, 0, 0, 0.2);
    /* Softer shadow */
}

/* Card Image */
.card-img-top {
    height: 245px;
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

/* Buttons */
.btn {
    transition: all 0.2s ease;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.btn-warning {
    background-color: #ffc107;
    border-color: #ffc107;
}

.btn-warning:hover {
    background-color: #e0a800;
    border-color: #e0a800;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #c82333;
}

/* Align and Style Admin Edit/Delete Buttons */
.btn-warning.ms-2,
.btn-danger {
    margin-top: 10px;
}

/* For responsive layout */
@media (max-width: 768px) {
    .card {
        width: 90%;
        /* Ensure cards are responsive on smaller screens */
    }
}
</style>
