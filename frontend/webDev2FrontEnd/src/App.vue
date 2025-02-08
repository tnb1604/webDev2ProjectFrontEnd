<template>
  <div id="app">
    <NavBar /> <!-- Use NavBar component here -->
    <main>
      <router-view></router-view> <!-- This will load the specific page based on routing -->
    </main>
    <Footer /> <!-- Use Footer component here -->
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'; // Import NavBar component
import Footer from './components/Footer.vue'; // Import Footer component

export default {
  name: "App",
  components: {
    NavBar,
    Footer, // Register Footer component
  }
};
</script>
