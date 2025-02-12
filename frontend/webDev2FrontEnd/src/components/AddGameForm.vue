<template>
    <div class="container mt-4 mb-4">
        <div class="card shadow-sm">
            <div class="card-body">
                <h2 class="text-center mb-4">Add New Game</h2>
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
                        <label for="releaseDate" class="form-label">Release Date:</label>
                        <input type="date" id="releaseDate" v-model="game.releaseDate" class="form-control" required />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Add Game</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ImageUpload from './ImageUpload.vue';

export default {
  components: {
    ImageUpload
  },
  data() {
    return {
      game: {
        image: null, // This will hold the selected image file
        title: '',
        description: '',
        genre: '',
        releaseDate: ''
      }
    };
  },
  methods: {
    setImage(image) {
      this.game.image = image; // Set the selected image to the game object
    },
    submitForm() {
      // Handle form submission logic here
      console.log('Game added:', this.game);
      // Reset form
      this.game = {
        image: null,
        title: '',
        description: '',
        genre: '',
        releaseDate: ''
      };
    }
  }
};
</script>
