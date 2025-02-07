<template>
  <div id="app">
    <header>
      <h1>Game Review Platform</h1>
      <!-- You can add navigation here if needed -->
    </header>
    <main>
      <router-view></router-view> <!-- This will load the specific page based on routing -->
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* You can add your global styles here */
header {
  text-align: center;
  background: #333;
  color: #fff;
  padding: 1rem;
}
</style>
