<template>
    <div>
        <!-- Game Image Section -->
        <div class="row justify-content-center">
            <div class="col-12 text-center">
                <img :src="game.imagePath" class="img-fluid rounded shadow-lg mb-4" alt="Game Image" />
            </div>
        </div>

        <!-- Game Details Section -->
        <div class="row justify-content-left">
            <div class="col-md-8 text-left">
                <h1 class="mb-3">{{ game.title }}</h1>
                <p class="lead">{{ game.description }}</p>
                <div class="mb-3">
                    <p><strong>Release Date:</strong> <span class="text-muted">{{ game.releaseDate }}</span></p>
                    <p><strong>Genre:</strong> <span class="badge bg-secondary">{{ game.genre }}</span></p>
                </div>
                <EditButton :entity-id="game.id" entity-type="game" :edit-action="editGame"
                    custom-class="btn btn-warning me-2" />
                <DeleteButton :entity-id="game.id" entity-type="game" :delete-action="deleteGame"
                    custom-class="btn btn-danger" />
            </div>
        </div>
    </div>
</template>

<script>
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';
import { useRouter } from 'vue-router';

export default {
    name: 'GameDetailsBlock',
    props: {
        game: Object,
    },
    components: {
        EditButton,
        DeleteButton,
    },
    setup() {
        const router = useRouter();
        return { router };
    },
    methods: {
        deleteGame(gameId) {
            console.log(`Deleting game with ID: ${gameId}`);
        },
        editGame(gameId) {
            this.router.push(`/modify-game/${gameId}`);
        },
    }
};
</script>

<style scoped>
.lead {
    font-size: 1.4rem;
    max-width: 1170px;
    width: 90vw;
}
</style>
