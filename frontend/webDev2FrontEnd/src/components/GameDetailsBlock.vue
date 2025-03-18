<template>
  <div v-if="game">
    <!-- Game Trailer Section (Clickable Image) -->
    <div class="row justify-content-center mb-4">
      <div class="col-12 text-center">
        <div v-if="!showingTrailer">
          <img :src="`http://localhost${game.image_path}`" class="img-fluid rounded shadow-lg mb-4 game-thumbnail"
            alt="Game Trailer Thumbnail" @click="showTrailer" />
        </div>

        <!-- Show Trailer (Replaces the Thumbnail) -->
        <div v-else>
          <iframe :src="`https://www.youtube.com/embed/${getVideoId(game.trailer_url)}?autoplay=1`"
            class="game-thumbnail" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>

    <!-- Game Details Section -->
    <div class="row justify-content-left mb-5">
      <div class="col-md-8 text-left d-flex align-items-center">
        <h1 class="mb-0 me-3">{{ game.title }}</h1>

        <!-- Toggle Button to Show Trailer or Thumbnail -->
        <button class="btn btn-primary ms-auto" @click="toggleTrailer">
          <i class="bi" :class="showingTrailer ? 'bi-eye-slash' : 'bi-eye'"></i>
          {{ showingTrailer ? 'Hide Trailer' : 'Show Trailer' }}
        </button>
      </div>
    </div>

    <!-- Additional Game Information -->
    <div class="row justify-content-left mb-5">
      <div class="col-md-8 text-left">
        <p class="lead">{{ game.description }}</p>
        <div class="mb-3">
          <p><strong>Release Date:</strong> <span class="text-muted">{{ game.release_date }}</span></p>
          <p><strong>Genre:</strong> <span class="badge bg-secondary">{{ game.genre }}</span></p>
        </div>
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
    const showingTrailer = ref(false); // To control showing the YouTube trailer iframe

    // Ensure user details are loaded when the component mounts
    onMounted(() => {
      authStore.fetchUserDetails().then(() => {
      });
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
      return urlParams.get('v');  // Extract video ID from YouTube URL
    },
    showTrailer() {
      this.showingTrailer = true;
    },
    toggleTrailer() {
      this.showingTrailer = !this.showingTrailer; // Toggle between trailer and thumbnail
    }
  }
};
</script>

<style scoped>
.game-thumbnail {
  cursor: pointer;
  width: 100%;
  min-height: 729px;
  max-height: 800px;
  margin: 0 auto;
}
</style>
