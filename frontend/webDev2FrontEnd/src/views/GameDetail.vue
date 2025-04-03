<template>
  <div class="container mt-5 ">
    <GameDetailsBlock v-if="game" :game="game" />
    <div v-else class="text-center">
      <p>Loading game details...</p>
    </div>

    <!-- Always render ReviewList -->
    <div v-if="game" class="mt-5">
      <ReviewList :reviews="reviews" :gameId="Number(gameId)" />
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios';
import GameDetailsBlock from '@/components/GameDetailsBlock.vue';
import ReviewList from '@/components/ReviewList.vue';

export default {
  name: 'GameDetail',
  components: {
    GameDetailsBlock,
    ReviewList
  },
  data() {
    return {
      game: null,
      reviews: [],
      gameId: null
    };
  },
  computed: {
    formattedAverageRating() {
      if (!this.reviews.length) return "0.0";
      const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return (totalRating / this.reviews.length).toFixed(1); // Format to 1 decimal place
    }
  },
  mounted() {
    this.gameId = this.$route.params.id; // Get the gameId from the route
    console.log('Fetching game ID:', this.gameId);

    // Fetch game details
    api.get(`/games/${this.gameId}`)
      .then(response => {
        this.game = response.data;
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
      });

    // Fetch reviews for the game
    api.get(`/reviews/game/${this.gameId}`)
      .then(response => {
        this.reviews = response.data;
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }
};
</script>

<style scoped>
.container {
  width: 100%;
}
</style>