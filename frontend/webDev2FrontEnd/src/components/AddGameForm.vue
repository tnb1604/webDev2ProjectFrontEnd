<template>
    <div class="container mt-4 mb-4">
      <div class="card shadow-sm">
        <div class="card-body">
          <form @submit.prevent="submitForm">
            <ImageUpload @image-selected="setImage" />
            
            <div class="mb-3">
              <label for="title" class="form-label">Title:</label>
              <input type="text" id="title" v-model="game.title" class="form-control" required />
            </div>
  
            <div class="mb-3">
              <label for="description" class="form-label">Description:</label>
              <textarea id="description" v-model="game.description" class="form-control" required></textarea>
            </div>
  
            <div class="mb-3">
              <label for="genre" class="form-label">Genre:</label>
              <input type="text" id="genre" v-model="game.genre" class="form-control" required />
            </div>
  
            <div class="mb-3">
              <label for="release_date" class="form-label">Release Date:</label>
              <input type="date" id="release_date" v-model="game.release_date" class="form-control" required />
            </div>
  
            <div class="mb-3">
              <label for="trailerUrl" class="form-label">Trailer URL:</label>
              <input type="url" id="trailerUrl" v-model="game.trailer_url" class="form-control" placeholder="https://www.youtube.com/watch?v=..." required />
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
  import { ref, onMounted } from 'vue';
  import { useGameStore } from '../stores/gameStore';
  import ImageUpload from './ImageUpload.vue';
  
  export default {
    components: {
      ImageUpload,
    },
    props: {
      gameId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const gameStore = useGameStore();
  
      onMounted(() => {
        if (props.gameId !== 'new') {
          gameStore.fetchGameDetails(props.gameId);
        }
      });
  
      const setImage = (image) => {
        gameStore.game.image = image;
      };
  
      const submitForm = () => {
        gameStore.submitGame();
        // Reset the form after submission
        gameStore.game = {
          image: null,
          title: '',
          description: '',
          genre: '',
          release_date: '',
          trailer_url: '',
        };
      };
  
      return {
        game: gameStore.game,
        isEditMode: gameStore.isEditMode,
        setImage,
        submitForm,
      };
    },
  };
  </script>
  