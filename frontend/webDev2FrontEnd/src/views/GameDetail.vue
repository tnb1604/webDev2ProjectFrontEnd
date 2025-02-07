<template>
    <div>
      <h2>Game Details</h2>
      <p>Here are the details of the selected game.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GameDetail',
    mounted() {
      const gameId = this.$route.params.id;
      console.log('Game ID:', gameId);
      // Fetch game details from backend using gameId
    },
  };
  </script>
  