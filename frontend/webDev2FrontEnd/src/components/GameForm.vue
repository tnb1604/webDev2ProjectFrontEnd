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
              <input maxlength="100" type="text" id="title" v-model="gameStore.game.title" class="form-control"
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
              rows="7" style="resize: vertical; min-height: 100px; max-height: 300px;" required></textarea>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="release_date" class="form-label">
                <i class="bi bi-calendar-event me-2"></i> Release Date:
              </label>
              <input type="date" id="release_date" v-model="gameStore.game.release_date" class="form-control" required
                @input="validateYear" />
            </div>

            <div class="col-md-6 mb-3">
              <label for="trailerUrl" class="form-label">
                <i class="bi bi-film me-2"></i> Trailer URL:
              </label>
              <input maxlength="255" type="url" id="trailerUrl" v-model="gameStore.game.trailer_url"
                class="form-control" placeholder="https://www.youtube.com/watch?v=..." required />
            </div>
          </div>

          <!-- Error message display (because notification doesnt overlap the modal) -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>

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
import { onMounted, watch, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '../stores/gameStore';
import ImageUpload from './ImageUpload.vue';
import axios from 'axios';
import { useNotificationStore } from '@/stores/notificationStore' // 👈 or import { useNotifier } if using helper

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
    const maxSizeInBytes = ref(0);  // Variable to hold the maximum allowed file size in bytes
    const notification = useNotificationStore();
    const isEditMode = computed(() => props.gameId !== 'new'); // Derive isEditMode from gameId
    const errorMessage = ref(''); // Initialize errorMessage as a reactive property

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

    onMounted(async () => {
      // Fetch the maximum allowed file size from the backend
      try {
        const response = await axios.get('/get_max_upload_size');  // Adjust the endpoint accordingly
        maxSizeInBytes.value = parseInt(response.data.maxSize) * 1024 * 1024; // Convert max size from MB to bytes
      } catch (error) {
        console.error('Error fetching max upload size:', error);
      }

      if (props.gameId !== 'new') {
        gameStore.fetchGameDetails(props.gameId);
      }
    });

    const setImage = (image) => {
      gameStore.game.image = image;
    };

    const validateYear = (event) => {
      const input = event.target.value;
      const year = input.split('-')[0]; // Extract the year part
      if (year.length > 4) {
        event.target.value = input.slice(0, 4) + input.slice(5); // Trim to 4 digits
        gameStore.game.release_date = event.target.value; // Update the model
      }
    };

    const submitForm = async () => {
      const imageFile = gameStore.game.image;
      if (imageFile && imageFile.size > maxSizeInBytes.value) {
        notification.show(
          `File size is too large. Please upload a file smaller than ${(maxSizeInBytes.value / 1024 / 1024).toFixed(2)} MB.`,
          'error'
        )
        return;
      }

      try {
        const response = await gameStore.submitGame();
        emit('formSubmitted', response); // Emit the response to the parent component
        notification.show(
          isEditMode.value ? 'Game updated successfully!' : 'Game added successfully!',
          'success'
        )
        if (!isEditMode.value) {
          router.push(`/game/${response.game_id}`); // Navigate to the new game's page
        }
        emit('closeModal');
      } catch (error) {
        errorMessage.value = error.message || 'An unexpected error occurred.';
        console.error('Error submitting form:', error.message);
      }
    };

    return {
      gameStore,
      isEditMode,
      setImage,
      validateYear,
      submitForm,
      maxSizeInBytes,
      errorMessage, // Ensure errorMessage is returned to the template
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
