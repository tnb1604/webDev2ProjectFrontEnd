<template>
  <div v-if="game">
    <!-- Game Trailer Section (Clickable Image) -->
    <div class="row justify-content-center mb-4">
      <div class="col-12 text-center">
        <img :src="`http://localhost${game.image_path}`" class="img-fluid rounded shadow-lg mb-4 game-thumbnail"
          alt="Game Trailer Thumbnail" @click="showTrailer" />
      </div>
    </div>

    <!-- Hidden YouTube Trailer -->
    <div class="row justify-content-center mb-4">
      <div class="col-12 text-center">
        <iframe v-if="showingTrailer" :src="`https://www.youtube.com/embed/${getVideoId(game.trailer_url)}?autoplay=1`"
          width="560" height="315" frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      </div>
    </div>

    <!-- Game Details Section -->
    <div class="row justify-content-left mb-5">
      <div class="col-md-8 text-left">
        <h1 class="mb-3">{{ game.title }}</h1>
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
    }
  }
};
</script>

<style scoped>
.game-thumbnail {
  min-width: 100%;
  cursor: pointer;
}
</style>
