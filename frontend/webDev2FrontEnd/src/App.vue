<template>
  <div id="app" class="wrapper">
   <NavBar></NavBar>
    <main class="main-content">
      <router-view></router-view>
      <Notification></Notification>
    </main>

  </div>
  <div>
   <Footer></Footer>
  </div>
</template>


<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import Notification from '@/components/Notification.vue'

export default {
  name: "App",
  components: {
    NavBar,
    Notification,
    Footer
  }


};
</script>
