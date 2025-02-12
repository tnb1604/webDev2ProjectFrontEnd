<template>
    <div class="mb-3">
      <label for="image" class="form-label">Select Image:</label>
      <input type="file" id="image" @change="handleImageChange" class="form-control" accept="image/*" required />
      <div v-if="image" class="mt-3">
        <label class="form-label">Image Preview:</label>
        <img :src="imagePreview" class="img-fluid" alt="Selected Game Image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        image: null,
        imagePreview: null
      };
    },
    methods: {
      handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.image = file;
          this.imagePreview = URL.createObjectURL(file); // Create a preview of the image
          this.$emit('image-selected', this.image); // Emit the selected image to the parent component
        }
      }
    }
  };
  </script>
  