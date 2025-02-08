<template>
  <div id="app" class="wrapper">
    <NavBar /> <!-- Use NavBar component here -->
    <main class="main-content">
      <router-view></router-view> <!-- This will load the specific page based on routing -->
    </main>

  </div>
  <div>
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
