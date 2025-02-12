<template>
  <div class="container mt-5">
    <GameDetailsBlock :game="game" />
    <div class="mt-5">
      <ReviewList :reviews="reviews" :averageRating="game.averageRating" />
    </div>
  </div>
</template>

<script>
import GameDetailsBlock from '@/components/GameDetailsBlock.vue';
import ReviewList from '@/components/ReviewList.vue';
import ReviewForm from '@/components/ReviewForm.vue';

export default {
  name: 'GameDetail',
  components: {
    GameDetailsBlock,
    ReviewList,
    ReviewForm
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
      },
      reviews: [
        {
          id: 1,
          rating: 5,
          review_title: "Masterpiece!",
          review_text: "Absolutely amazing game with a deep story and great combat.",
          user_name: "John Doe",
          created_at: "2023-10-01"
        },
        {
          id: 2,
          rating: 4,
          review_title: "Great game",
          review_text: "Intriguing story and fun gameplay, but some bugs need fixing.",
          user_name: "Jane Smith",
          created_at: "2023-10-03"
        }
      ]
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
  color: #ffb833;
  /* Change this color to your desired color */
  font-weight: bold;
}
</style>
