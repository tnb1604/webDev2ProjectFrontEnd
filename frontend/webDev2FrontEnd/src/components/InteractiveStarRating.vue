<template>
    <div class="star-rating">
      <button
        v-for="star in 5"
        :key="star"
        type="button"
        class="btn"
        :class="{
          'btn-warning': star <= rating,
          'btn-outline-warning': star > rating
        }"
        @click="setRating(star)"
      >
        &#9733;
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: "InteractiveStarRating",
    props: {
      rating: {
        type: Number,
        required: true
      }
    },
    methods: {
      setRating(star) {
        this.$emit('input', star); // Emit the selected rating to the parent component
      }
    }
  };
  </script>
  
  <style scoped>
  .star-rating button {
    font-size: 1.5rem;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .star-rating button:hover {
    color: #ffd700;
  }
  </style>
  