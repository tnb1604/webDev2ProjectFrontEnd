<template>
  <div class="star-rating">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      class="btn"
      :class="{
        'btn-warning': star <= (hoverRating || rating),
        'btn-outline-warning': star > (hoverRating || rating)
      }"
      @click="setRating(star)"
      @mouseover="setHoverRating(star)"
      @mouseleave="setHoverRating(0)"
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
  watch: {
    rating(newRating) {
      this.$emit('update:rating', newRating);
    }
  },
  data() {
    return {
      hoverRating: 0
    };
  },
  methods: {
    setRating(star) {
        console.log('Rating set to:', star); // Temporary log for verification
        this.$emit('update:rating', star); // Emit the updated rating to the parent component
    },
    setHoverRating(star) {
        this.hoverRating = star;
    }
  }
};
</script>

<style scoped>
.star-rating {
  display: flex;
  flex-direction: row; /* No reversal here */
}

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

.btn-warning {
  color: #ffd700;
}

.btn-outline-warning {
  color: #ccc;
}
</style>
