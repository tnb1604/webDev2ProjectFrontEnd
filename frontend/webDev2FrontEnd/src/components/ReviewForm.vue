<template>
    <form @submit.prevent="submitReview">
      <div class="mb-3">
        <textarea v-model="reviewText" class="form-control" placeholder="Write a review..." required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit Review</button>
    </form>
</template>

<script>
export default {
    data() {
      return {
        reviewText: ''
      };
    },
    methods: {
      async submitReview() {
        const gameId = this.$route.params.id;
        const response = await axios.post(`http://localhost/public/game.php/${gameId}/reviews`, {
          review: this.reviewText
        });
        // Handle successful review submission (e.g., clear the form)
        this.reviewText = '';
      }
    }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
