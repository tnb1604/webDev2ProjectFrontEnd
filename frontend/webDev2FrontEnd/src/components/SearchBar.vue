<template>
    <div class="input-group mb-3 search-bar">
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
        class="form-control"
        :placeholder="placeholder"
      />
    </div>
</template>

<script>
export default {
    props: {
      placeholder: {
        type: String,
        default: 'Search...'
      }
    },
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
.search-bar input {
    height: 50px; /* Increase height */
    max-width: 650px; /* Decrease width */
    margin: 0 auto; /* Center align */
    border-radius: 15px; /* Round the corners */
}
</style>
