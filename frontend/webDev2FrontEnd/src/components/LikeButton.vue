<template>
    <button @click="toggleLike" class="btn btn-primary" ref="likeButton">
      <i :class="liked ? 'bi bi-hand-thumbs-up-fill' : 'bi bi-hand-thumbs-up'"></i> 
      {{ likes }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      initialLikes: { type: Number, default: 0 },
      isLiked: { type: Boolean, default: false }
    },
    data() {
      return {
        likes: this.initialLikes,
        liked: this.isLiked
      };
    },
    methods: {
      toggleLike() {
        this.liked = !this.liked;
        this.likes += this.liked ? 1 : -1;
        this.$emit("likeToggled", this.liked);
      },
      resetLike() {
        this.liked = false;
        this.likes = this.initialLikes;
      }
    }
  };
  </script>

  <style scoped>
  .btn-primary {
      background-color: transparent;
      border-color: transparent;
      color: #007bff;
  }
  </style>
