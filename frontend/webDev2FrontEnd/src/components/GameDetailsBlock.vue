<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: 'GameDetailsBlock',
  props: {
    game: Object
  }
};
</script>

<style scoped>
</style>
