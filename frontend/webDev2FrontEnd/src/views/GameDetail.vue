<template>
  <div class="container mt-5">
    <!-- Game Image Section -->
    <div class="row">
      <div class="col-12">
        <img :src="game.imagePath" class="img-fluid rounded shadow-lg mb-4" alt="Game Image" />
      </div>
    </div>

    <!-- Game Details Section -->
    <div class="row">
      <div class="col-md-8">
        <h1 class="text-center mb-3">{{ game.title }}</h1>
        <p class="lead">{{ game.description }}</p>
        <div class="mb-3">
          <p><strong>Release Date:</strong> <span class="text-muted">{{ game.releaseDate }}</span></p>
          <p><strong>Genre:</strong> <span class="badge bg-secondary">{{ game.genre }}</span></p>

        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="mt-5">
      <h3 class="mb-2">Reviews</h3>
      <p class="d-flex align-items-center">
        <strong class="me-1">Average Rating:</strong>
        <StarRating class="me-2" :rating="game.averageRating" size="small" />
        <span class="d-flex align-items-center average-rating">
          {{ game.averageRating }} / 5
        </span>
      </p>
      <ReviewList />
    </div>
  </div>
</template>

<script>
import StarRating from '@/components/StarRating.vue';
import ReviewList from '../components/ReviewList.vue';

export default {
  name: 'GameDetail',
  components: {
    ReviewList,
    StarRating
  },
  data() {
    return {
      game: {
        title: 'Cyberpunk 2077',
        description: 'Cyberpunk 2077 is an open-world RPG set in the neon-lit, dystopian city of Night City, where towering skyscrapers, neon signs, and crime-filled streets define the landscape. As V, a customizable mercenary, you will navigate a world ruled by powerful corporations, street gangs, and cybernetic technology. The game features intense combat, hacking, and the ability to manipulate enemies using high-tech implants. With a gripping narrative full of choices and consequences, you’ll encounter a diverse cast of characters, each with their own agendas.',
        releaseDate: '2020-12-10',
        genre: 'RPG, Shooter',
        imagePath: '/public/cyberpunk2077.jpg',
        averageRating: 4.5
      }
    };
  },
  mounted() {
    const gameId = this.$route.params.id;
    console.log('Game ID:', gameId);
    // Fetch game details from backend using gameId
    // Example:
    // axios.get(`/api/games/${gameId}`).then(response => {
    //     this.game = response.data;
    // });
  }
};
</script>

<style scoped>
/* Custom Styles */
.lead {
  font-size: 1.25rem;
  max-width: 1200px;
  width: 90vw;
}

.container {
  max-width: 1200px;
}

.text-primary {
  font-weight: bold;
}

img {
  /* Remove max-height to prevent cropping */
  object-fit: contain;
  /* Adjust object-fit to contain the image within the container */
  width: 100%;
}

.review-list {
  margin-top: 30px;
}

.bi-star-fill {
  color: gold;
}

.average-rating {
  color: #ffb833; /* Change this color to your desired color */
  font-weight: bold;
}
</style>
