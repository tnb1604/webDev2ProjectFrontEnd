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
        <interactive-star-rating v-model="rating"></interactive-star-rating>
      </div>
      <button type="submit" class="btn btn-primary">Submit Review</button>
    </form>
  </div>
</template>

<script>
import InteractiveStarRating from './InteractiveStarRating.vue';

export default {
  components: {
    InteractiveStarRating
  },
  data() {
    return {
      title: '',
      reviewText: '',
      rating: 0
    };
  },
  methods: {
    submitReview() {
      const review = {
        title: this.title,
        reviewText: this.reviewText,
        rating: this.rating
      };
      // Handle the review submission logic here
      console.log('Review submitted:', review);
    }
  }
};
</script>

<style scoped>
.review-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
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
