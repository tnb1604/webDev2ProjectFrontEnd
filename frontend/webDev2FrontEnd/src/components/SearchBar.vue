<template>
    <div class="search-bar">
      <input
        v-model="searchQuery"
        @input="onSearch"
        type="text"
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
  .search-bar input {
    padding: 8px;
    width: 100%;
    max-width: 300px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }
  </style>
  