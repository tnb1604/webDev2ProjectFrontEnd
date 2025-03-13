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
            <router-link :to="`/modify-game/${game.id}`" class="btn btn-warning ms-2 me-2">Edit</router-link>
            <DeleteButton :entity-id="game.id" entity-type="game" :delete-action="deleteGame"
                custom-class="btn btn-danger" />
        </div>
    </div>
</template>

<script>
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
.card {
    margin: 10px;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.2);
    background: linear-gradient(71deg, #ff5454, #ffd257);

}

.card-img-top {
    height: 245px;
    object-fit: cover;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    
}

.card-text {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    /* Adjust spacing */
}
</style>
