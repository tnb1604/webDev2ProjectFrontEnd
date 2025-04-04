<template>
  <div class="container mt-4 mb-4">
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-4">
        <h4 class="card-title text-center mb-3">
          <i :class="isEditMode ? 'bi bi-pencil-square' : 'bi bi-plus-circle'" class="me-2"></i>
          {{ isEditMode ? 'Update Game' : 'Add Game' }}
        </h4>

        <form @submit.prevent="submitForm">
          <ImageUpload :current-image="gameStore.game.image_path" :is-edit-mode="isEditMode"
            @image-selected="setImage" />

          <div class="row mt-3">
            <div class="col-md-6 mb-3">
              <label for="title" class="form-label">
                <i class="bi bi-controller me-2"></i> Title:
              </label>
              <input maxlength="50" type="text" id="title" v-model="gameStore.game.title" class="form-control"
                required />
            </div>

            <div class="col-md-6 mb-3">
              <label for="genre" class="form-label">
                <i class="bi bi-tags me-2"></i> Genre:
              </label>
              <input maxlength="50" type="text" id="genre" v-model="gameStore.game.genre" class="form-control"
                required />
            </div>
          </div>

          <div class="mb-3">
            <label for="description" class="form-label">
              <i class="bi bi-file-text me-2"></i> Description:
            </label>
            <textarea maxlength="600" id="description" v-model="gameStore.game.description" class="form-control"
              rows="7" style="resize: vertical; min-height: 100px; max-height: 300px;"></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="release_date" class="form-label">
                <i class="bi bi-calendar-event me-2"></i> Release Date:
              </label>
              <input type="date" id="release_date" v-model="gameStore.game.release_date" class="form-control"
                required />
            </div>

            <div class="col-md-6 mb-3">
              <label for="trailerUrl" class="form-label">
                <i class="bi bi-film me-2"></i> Trailer URL:
              </label>
              <input maxlength="200" type="url" id="trailerUrl" v-model="gameStore.game.trailer_url"
                class="form-control" placeholder="https://www.youtube.com/watch?v=..." required />
            </div>
          </div>

          <button type="submit" class="btn btn-primary w-100 mt-3">
            <i :class="isEditMode ? 'bi bi-save' : 'bi bi-plus-circle'" class="me-2"></i>
            {{ isEditMode ? 'Update Game' : 'Add Game' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
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
    const router = useRouter();

    const isEditMode = computed(() => props.gameId !== 'new'); // Derive isEditMode from gameId

    watch(
      () => props.gameId,
      (newGameId) => {
        if (newGameId === 'new') {
          gameStore.resetGame();
        } else {
          gameStore.fetchGameDetails(newGameId);
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      if (props.gameId !== 'new') {
        gameStore.fetchGameDetails(props.gameId);
      }
    });

    const setImage = (image) => {
      gameStore.game.image = image;
    };

    const submitForm = async () => {
      try {
        const response = await gameStore.submitGame(); // Ensure this returns the API response
        emit('formSubmitted');
        if (!isEditMode.value) {
          router.push(`/game/${response.game_id}`); // Use the game_id from the response
        } else {
          router.push(`/game/${props.gameId}`);
        }
      } catch (error) {
        console.error('Error submitting game:', error);
      }
    };

    return {
      gameStore,
      isEditMode,
      setImage,
      submitForm,
    };
  },
};
</script>

<style scoped>
.card {
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
