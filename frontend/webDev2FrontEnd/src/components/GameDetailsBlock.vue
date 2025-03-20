<template>
  <div v-if="game">
    <div class="row mb-5">

      <!-- Game Image (Left Side) -->
      <div class="col-md-6 text-center">
        <div v-if="!showingTrailer">
          <img :src="`http://localhost${game.image_path}`"
            class=" game-thumbnail img-fluid img-thumbnail rounded shadow-lg" alt="Game Thumbnail"
            @click="showTrailer" />
        </div>
        <div v-else>
          <iframe :src="`https://www.youtube.com/embed/${getVideoId(game.trailer_url)}?autoplay=1`"
            class="game-youtube-video" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>

        <!-- Toggle Trailer Button -->
        <button class="btn btn-dark mt-3" @click="toggleTrailer">
          <i class="bi" :class="showingTrailer ? 'bi-eye-slash' : 'bi-eye'"></i>
          {{ showingTrailer ? 'Hide Trailer' : 'Show Trailer' }}
        </button>
      </div>

      <!-- Game Details (Right Side) -->
      <div class="col-md-6">
        <h1 class="mb-3">{{ game.title }}</h1>
        <p class="lead">{{ game.description }}</p>
        <div class="mb-3">
          <p><strong>Release Date:</strong> <span class="text-muted">{{ game.release_date }}</span></p>
          <p><strong>Genre:</strong> <span class="badge bg-secondary">{{ game.genre }}</span></p>
        </div>

        <!-- Admin Buttons -->
        <EditButton v-if="authStore.user?.role === 'admin'" :entity-id="game.id" entity-type="game"
          :edit-action="editGame" custom-class="btn btn-warning me-2" />
        <DeleteButton v-if="authStore.user?.role === 'admin'" :entity-id="game.id" entity-type="game"
          :delete-action="deleteGame" custom-class="btn btn-danger" />

      </div>
    </div>
  </div>

  <div v-else class="text-center">
    <p>Loading game details...</p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import DeleteButton from './DeleteButton.vue';
import EditButton from './EditButton.vue';

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
    const authStore = useAuthStore();
    const showingTrailer = ref(false);

    onMounted(() => {
      authStore.fetchUserDetails();
    });

    return {
      authStore,
      showingTrailer,
    };
  },
  methods: {
    deleteGame(gameId) {
      console.log(`Deleting game with ID: ${gameId}`);
    },
    editGame(gameId) {
      this.router.push(`/modify-game/${gameId}`);
    },
    getVideoId(url) {
      const urlParams = new URLSearchParams(new URL(url).search);
      return urlParams.get('v');
    },
    showTrailer() {
      this.showingTrailer = true;
    },
    toggleTrailer() {
      this.showingTrailer = !this.showingTrailer;
    }
  }
};
</script>

<style scoped>
.game-thumbnail {
  cursor: pointer;
  max-width: 100%;
  height: auto;
  min-width: 450px;
  min-height: 100%;
  max-height: 600px;
  object-fit: contain;
  margin-bottom: 15px;
  background: rgb(34, 34, 34);
  border: none;
}

.game-youtube-video {
  cursor: pointer;
  max-width: 100%;
  height: auto;
  min-width: 100%;
  min-height: 356px;
  max-height: 600px;
  object-fit: contain;
  margin-bottom: 15px;
  background: rgb(34, 34, 34);
  border: none;
}
</style>
