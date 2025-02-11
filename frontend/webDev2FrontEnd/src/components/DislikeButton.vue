<template>
    <button @click="toggleDislike" class="btn btn-danger" ref="dislikeButton">
      <i :class="disliked ? 'bi bi-hand-thumbs-down-fill' : 'bi bi-hand-thumbs-down'"></i> 
      {{ dislikes }}
    </button>
  </template>
  
  <script>
  export default {
    props: {
      initialDislikes: { type: Number, default: 0 },
      isDisliked: { type: Boolean, default: false }
    },
    data() {
      return {
        dislikes: this.initialDislikes,
        disliked: this.isDisliked
      };
    },
    methods: {
      toggleDislike() {
        this.disliked = !this.disliked;
        this.dislikes += this.disliked ? 1 : -1;
        this.$emit("dislikeToggled", this.disliked);
      },
      resetDislike() {
        this.disliked = false;
        this.dislikes = this.initialDislikes;
      }
    }
  };
  </script>

  <style scoped>
  .btn-danger {
      background-color: transparent;
      border-color: transparent;
      color: #dc3545;
  }
  </style>
