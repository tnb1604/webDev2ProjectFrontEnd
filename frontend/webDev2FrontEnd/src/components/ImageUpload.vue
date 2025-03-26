<template>
    <div class="mb-3">
      <label for="image" class="form-label">Select Image:</label>
      <input type="file" id="image" @change="handleImageChange" class="form-control" accept="image/*" />
      <div v-if="imagePreview || currentImage" class="mt-3">
        <label class="form-label">Image Preview:</label>
        <img :src="imagePreview || `http://localhost${currentImage}`" class="img-fluid" alt="Selected Game Image" />
      </div>
    </div>
</template>

<script>
export default {
  props: {
    currentImage: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      image: null,
      imagePreview: null,
    };
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = file;
        this.imagePreview = URL.createObjectURL(file); // Create a preview of the image
        this.$emit('image-selected', this.image); // Emit the selected image to the parent component
      } else if (!this.image && this.currentImage) {
        // If no new file is selected, keep the current image
        this.$emit('image-selected', null); // Emit null to indicate no change
      }
    },
  },
};
</script>
