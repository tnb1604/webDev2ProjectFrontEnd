<template>
  <div id="app" class="wrapper">
   <NavBar></NavBar>
    <main class="main-content">
      <router-view></router-view>
    </main>

  </div>
  <div>
   <Footer></Footer>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import GameCardGrid from './components/GameCardGrid.vue';

export default {
  name: "App",
  components: {
    NavBar,
    Footer, 
    GameCardGrid
  }


};
</script>
