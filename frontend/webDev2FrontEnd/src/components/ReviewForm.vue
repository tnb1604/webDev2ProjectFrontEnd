<template>
    <form @submit.prevent="submitReview">
      <textarea v-model="reviewText" placeholder="Write a review..." required></textarea>
      <button type="submit">Submit Review</button>
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
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  textarea {
    padding: 10px;
    font-size: 14px;
    width: 100%;
    height: 100px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  button {
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  </style>
  