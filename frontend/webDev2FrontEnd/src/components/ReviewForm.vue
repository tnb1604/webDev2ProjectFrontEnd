<template>
  <div class="review-form">
    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="review">Review</label>
        <textarea id="review" v-model="reviewText" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="rating">Rating</label>
        <InteractiveStarRating v-model:rating="rating" /> <!-- Listening for rating change -->
      </div>
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
      <button type="submit" class="btn btn-primary" :disabled="rating === 0">
        {{ existingReview ? "Confirm Edit" : "Submit Review" }}
      </button>
    </form>
  </div>
</template>

<script>
import InteractiveStarRating from './InteractiveStarRating.vue';
import api from "@/utils/axios.js";

export default {
  components: {
    InteractiveStarRating
  },
  props: {
    existingReview: {
      type: Object,
      default: null
    },
    gameId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      title: this.existingReview ? this.existingReview.title : '',
      reviewText: this.existingReview ? this.existingReview.review_text : '',
      rating: this.existingReview ? this.existingReview.rating : 0,
      errorMessage: ''
    };
  },
  methods: {
    async submitReview() {
      const review = {
        gameId: this.gameId,
        userId: this.userId,
        title: this.title,
        review_text: this.reviewText,
        rating: this.rating
      };
      console.log('Review object:', review); // Log the review object for debugging
      try {
        if (this.existingReview) {
          // Editing an existing review
          const response = await api.put(`/reviews/${this.existingReview.id}`, review);
          console.log('Review edited:', response.data);
          this.$emit('review-submitted', response.data); // Emit event to parent component
        } else {
          // Adding a new review
          const response = await api.post('/reviews', review);
          console.log('Review submitted:', response.data);
          this.$emit('review-submitted', response.data); // Emit event to parent component
        }
        this.resetForm(); // Reset the form after successful submission
        this.errorMessage = ''; // Clear any previous error message
      } catch (error) {
        console.error('Error submitting review:', error);
        console.error('Error response data:', error.response?.data); // Log the error response data
        this.errorMessage = error.response?.data?.message || 'Failed to submit review. Please try again.';
      }
    },
    // Reset the form fields
    resetForm() {
      this.title = '';
      this.reviewText = '';
      this.rating = 0;
    }
  }
};
</script>

<style scoped>
.review-form {
  max-inline-size: 600px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-block-end: 15px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
