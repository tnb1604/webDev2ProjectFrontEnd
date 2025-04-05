<template>
  <div class="review-form">
    <!-- Add heading to indicate action -->
    <h2>{{ existingReview ? "Edit Your Review" : "Write a Review" }}</h2>
    <form @submit.prevent="submitReview">
      <div class="form-group">
        <label for="title">Title</label>
        <input maxlength="50" type="text" id="title" v-model="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="review">Review</label>
        <textarea maxlength="1000" id="review" v-model="reviewText" class="form-control" required></textarea>
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
import { useNotificationStore } from '@/stores/notificationStore'

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
      const notification = useNotificationStore();
      const review = {
        gameId: this.gameId,
        userId: this.userId,
        title: this.title,
        review_text: this.reviewText,
        rating: this.rating
      };
      try {
        // Editing Review
        if (this.existingReview) {
          const response = await api.put(`/reviews/${this.existingReview.id}`, review);
          notification.show('Review Edited.', 'primary')

          console.log('Review edited:', response.data);
          this.$emit('review-submitted', response.data);
        } else {
          // Adding a new review
          const response = await api.post('/reviews', review);
          notification.show('Review Added.', 'primary')

          console.log('Review submitted:', response.data);
          this.$emit('review-submitted', response.data);
        }
        this.resetForm();
        this.errorMessage = ''; 
      } catch (error) {
        notification.show('Something went wrong.', 'error')
        console.error('Error submitting review:', error);
        console.error('Error response data:', error.response?.data);
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

h2 {
  margin-bottom: 20px;
  text-align: center;
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
