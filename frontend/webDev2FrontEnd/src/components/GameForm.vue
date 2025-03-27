<template>
  <div class="container mt-4 mb-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <ImageUpload :current-image="gameStore.game.image_path" :is-edit-mode="isEditMode" @image-selected="setImage" />

          <div class="mb-3">
            <label for="title" class="form-label">Title:</label>
            <input type="text" id="title" v-model="gameStore.game.title" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <textarea id="description" v-model="gameStore.game.description" class="form-control" required></textarea>
          </div>

          <div class="mb-3">
            <label for="genre" class="form-label">Genre:</label>
            <input type="text" id="genre" v-model="gameStore.game.genre" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="release_date" class="form-label">Release Date:</label>
            <input type="date" id="release_date" v-model="gameStore.game.release_date" class="form-control" required />
          </div>

          <div class="mb-3">
            <label for="trailerUrl" class="form-label">Trailer URL:</label>
            <input type="url" id="trailerUrl" v-model="gameStore.game.trailer_url" class="form-control"
              placeholder="https://www.youtube.com/watch?v=..." required />
          </div>

          <button type="submit" class="btn btn-primary w-100">
            {{ isEditMode ? 'Update Game' : 'Add Game' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router
import { useGameStore } from '../stores/gameStore';
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageUpload,
  },
  props: {
    gameId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, { emit }) {
    const gameStore = useGameStore();
    const router = useRouter(); // Initialize router

    // Watch for changes in gameId to reset the form
    watch(
      () => props.gameId,
      (newGameId) => {
        if (newGameId === 'new') {
          gameStore.resetGame(); // Reset the game data for a new game
        } else {
          gameStore.fetchGameDetails(newGameId); // Fetch details for editing
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      if (props.gameId !== 'new') {
        gameStore.fetchGameDetails(props.gameId);
      }
    });

    // Function to set the image
    const setImage = (image) => {
      gameStore.game.image = image;
    };

    // Async function to handle form submission
    const submitForm = async () => {
      try {
        await gameStore.submitGame();

        // Emit event with updated game data
        emit('formSubmitted');

        // Redirect to homepage if adding a new game
        if (!gameStore.isEditMode) {
          router.push('/');
        }
      } catch (error) {
        console.error('Error submitting game:', error);
      }
    };

    return {
      gameStore, // Use gameStore directly in the template
      isEditMode: gameStore.isEditMode,
      setImage,
      submitForm,
    };
  },
};

</script>
