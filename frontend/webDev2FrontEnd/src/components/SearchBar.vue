<template>
    <div class="input-group mb-3">
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        class="form-control"
        placeholder="Search games by title"
      />
    </div>
</template>

<script>
export default {
    data() {
      return {
        searchQuery: ''
      };
    },
    methods: {
      onSearch() {
        this.$emit('search', this.searchQuery);
      }
    }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
