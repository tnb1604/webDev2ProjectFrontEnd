<template>
  <div class="input-group mb-3 search-bar">
    <input v-model="searchQuery" @input="onSearch" type="text" class="form-control" :placeholder="placeholder"
      :class="{ 'rounded-right': !searchQuery }" />
    <button v-if="searchQuery" @click="resetSearch" class="btn reset-btn">
      &#10006;
    </button>
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
    },
    resetSearch() {
      this.searchQuery = '';
      this.onSearch();
    }
  }
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  max-width: 650px;
  margin: 0 auto;
}

.search-bar input {
  height: 50px;
  border-radius: 50px 0 0 50px;
  padding: 0 20px;
  flex-grow: 1;
  transition: border-radius 0.3s ease;
  border-color: #ced4da;
}

.search-bar input.rounded-right {
  border-radius: 50px;
}

.reset-btn {
  height: 50px;
  border-radius: 0 50px 50px 0;
  font-size: 1.2rem;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1b1b1b;
  border-color: #1b1b1b;
  color: #ffffff;
}
</style>
