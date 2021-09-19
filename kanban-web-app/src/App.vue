<template>
  <div id="app">
    <Navbar />
    <b-container>
     <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar: Navbar,
  },
  data() {
    return {
      signedIn: Boolean,
    } 
  },
  created: function () {
    this.signedIn = Math.random() < 0.5;
  },
}
</script>