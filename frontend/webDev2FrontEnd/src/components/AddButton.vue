<template>
    <router-link :to="`/modify-game/${game.id}`" class="btn btn-warning ms-2 me-2">Add</router-link>
</template>

<script>
export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>
