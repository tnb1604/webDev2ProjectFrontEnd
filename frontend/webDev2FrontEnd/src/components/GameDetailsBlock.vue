<template>
  <div v-if="localGame">
    <div class="row mb-5">

      <!-- Game Image or Trailer (Left Side) -->
      <div class="col-md-6 text-center">
        <div v-if="!showingTrailer">
          <img :src="`http://localhost${localGame.image_path}`"
            class="game-thumbnail img-fluid img-thumbnail rounded shadow-lg" alt="Game Thumbnail"
            @click="showImageModal" />
        </div>
        <div v-else>
          <iframe :src="`https://www.youtube.com/embed/${getVideoId(localGame.trailer_url)}?autoplay=1`"
            class="game-youtube-video" frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
          </iframe>
        </div>

        <!-- Toggle Trailer Button -->
        <button class="btn btn-dark mt-3 mb-4" @click="toggleTrailer">
          <i class="bi" :class="showingTrailer ? 'bi-eye-slash' : 'bi-eye'"></i>
          {{ showingTrailer ? 'Hide Trailer' : 'Show Trailer' }}
        </button>
      </div>

      <!-- Game Details (Right Side) -->
      <div class="col-md-6">
        <h1 class="mb-3">{{ localGame.title }}</h1>
        <p class="lead">{{ localGame.description }}</p>
        <div class="mb-3">
          <p><strong>Release Date:</strong> <span class="text-muted">{{ localGame.release_date }}</span></p>
          <p><strong>Genre:</strong> <span class="badge bg-secondary">{{ localGame.genre }}</span></p>
        </div>

        <!-- Admin Buttons -->
        <button v-if="authStore.user?.role === 'admin'" @click="editGame" class="btn btn-warning me-2"> Edit </button>
        <DeleteButton v-if="authStore.user?.role === 'admin'" :entity-id="localGame.id" entity-type="game"
          :delete-action="deleteGame" custom-class="btn btn-danger" />

        <!-- Edit Game Modal -->
        <ShowModal v-if="showGameForm" title="Update Game" @close="closeGameForm">
          <GameForm :game-id="localGame.id" @formSubmitted="handleFormSubmitted" />
        </ShowModal>
      </div>
    </div>
  </div>

  <div v-else class="text-center">
    <p>Loading game details...</p>
  </div>

  <!-- Confirm Deletion Modal -->
  <ConfirmModal ref="confirmModal" title="Delete Game"
    message="Are you sure you want to delete this game? This action cannot be undone." @confirmed="confirmDelete" />

  <!-- Image Modal -->
  <ShowModal v-if="showImageModalFlag" title="Game Image" @close="closeImageModal">
    <img :src="`http://localhost${localGame.image_path}`" class="img-fluid" alt="Game Thumbnail" />
  </ShowModal>


</template>

<script>
import { ref, onMounted, reactive, watch } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { useGameStore } from "@/stores/gameStore";
import DeleteButton from './DeleteButton.vue';
import ConfirmModal from './ConfirmModal.vue';
import GameForm from './GameForm.vue';
import ShowModal from './ShowModal.vue';
import { useNotificationStore } from '@/stores/notificationStore'

export default {
  name: 'GameDetailsBlock',
  props: {
    game: Object,
  },
  components: {
    DeleteButton,
    ConfirmModal,
    GameForm,
    ShowModal,
  },
  setup(props) {
    const authStore = useAuthStore();
    const gameStore = useGameStore();
    const showingTrailer = ref(false);
    const gameToDelete = ref(null);
    const showGameForm = ref(false);
    const showImageModalFlag = ref(false);
    const notificationStore = useNotificationStore();

    // Create a local reactive copy of the game prop
    const localGame = reactive({ ...props.game });

    // Watch for changes in the game prop and update the local copy
    watch(
      () => props.game,
      (newGame) => {
        Object.assign(localGame, newGame);
      }
    );

    onMounted(() => {
      authStore.fetchUserDetails();
    });

    return {
      authStore,
      gameStore,
      showingTrailer,
      gameToDelete,
      showGameForm,
      showImageModalFlag,
      localGame,
    };
  },
  methods: {
    deleteGame(gameId) {
      this.gameToDelete = gameId;
      this.$refs.confirmModal.show(); // Show the confirmation modal
    },
    async confirmDelete() {
      const notification = useNotificationStore()
      try {
        await this.gameStore.deleteGame(this.gameToDelete);
        this.$emit('gameDeleted');
        this.$router.push('/');
        notification.show('Game deleted successfully!', 'primary')
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    },
    editGame() {
      console.log('Editing game with ID:', this.localGame.id); // Debug log
      this.gameStore.game = { ...this.localGame }; // Prefill the game data
      this.gameStore.isEditMode = true; // Ensure isEditMode is set to true
      this.showGameForm = true; // Show the modal
    },
    closeGameForm() {
      this.showGameForm = false;
      this.gameStore.resetGame(); // Reset the game data when the form is closed
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
    },
    async handleFormSubmitted(updatedGame) {
      try {
        const gameId = updatedGame.game_id || this.localGame.id; // Use the returned game_id or fallback to localGame.id
        await this.gameStore.fetchGameDetails(gameId); // Re-fetch the game details
        Object.assign(this.localGame, this.gameStore.game); // Update the local copy of the game
        this.showGameForm = false; // Close the form modal
      } catch (error) {
        console.error('Error updating game details:', error);
      }
    },
    showImageModal() {
      this.showImageModalFlag = true;
    },
    closeImageModal() {
      this.showImageModalFlag = false;
    }
  }
};
</script>

<style scoped>
.game-thumbnail {
  cursor: pointer;
  max-width: 100%;
  height: auto;
  min-height: 100%;
  max-height: 600px;
  object-fit: contain;
  margin-bottom: 15px;
  background: rgb(34, 34, 34);
  border: none;
}


/* Global fix for all text elements */

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

/* Ensure the genre spans across available space */
.badge.bg-secondary {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  display: inline-block;
}

/* Adjust layout for smaller screens */
@media (max-width: 992px) {
  .row {
    flex-direction: column;
  }

  .col-md-6 {
    width: 100%;
    text-align: center;
  }
}
</style>
