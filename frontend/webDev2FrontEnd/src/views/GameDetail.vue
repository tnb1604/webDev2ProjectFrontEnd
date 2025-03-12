<template>
  <div class="container mt-5">
    <GameDetailsBlock v-if="game" :game="game" />
    <div v-else class="text-center">
      <p>Loading game details...</p>
    </div>

    <div v-if="game && reviews.length" class="mt-5">
      <ReviewList :reviews="reviews" :averageRating="averageRating" :roundedAverageRating="roundedAverageRating" />
    </div>
  </div>
</template>

<script>
import api from '@/utils/axios'; // Ensure correct import path
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
      game: null, // Initially set to null
      reviews: [] // Initialize as an array
    };
  },
  computed: {
    averageRating() {
      if (this.reviews.length === 0) return 0;
      const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
      return (total / this.reviews.length).toFixed(1);
    },
    roundedAverageRating() {
      return Math.ceil(this.averageRating);
    }
  },
  mounted() {
    const gameId = this.$route.params.id;
    console.log('Fetching game ID:', gameId);

    // Fetch game details
    api.get(`/games/${gameId}`)
      .then(response => {
        this.game = response.data;
      })
      .catch(error => {
        console.error('Error fetching game details:', error);
      });

    // Fetch reviews for the game (if needed)
    api.get(`/reviews/game/${gameId}`)
      .then(response => {
        this.reviews = response.data;
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }
};
</script>
