<template>
  <div id="app">
    <NavBar /> <!-- Use NavBar component here -->
    <main class="container mt-5">
      <router-view></router-view> <!-- This will load the specific page based on routing -->
    </main>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'; // Import NavBar component

export default {
  name: "App",
  components: {
    NavBar // Register NavBar component
  }
};
</script>

<style scoped>
/* You can add your global styles here */
html, body, #app {
  height: 100%;
  margin: 0;
}

#app {
  display: block; /* Changed from flex to block */
  justify-content: initial; /* Removed centering */
  align-items: initial; /* Removed centering */
  background-color: var(--color-background-light-blue); /* Apply background color */
}

header {
  text-align: center;
  background: #333;
  color: #fff;
  padding: 1rem;
  width: 100%;
}

main {
  flex: 1;
  display: block; /* Changed from flex to block */
  justify-content: initial; /* Removed centering */
  align-items: initial; /* Removed centering */
  width: 100%;
}
</style>