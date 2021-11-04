<template>
  <div id="app">
    <Navbar />
    <b-container role="main">
     <router-view></router-view>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Navbar from './components/Navbar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    Navbar: Navbar,
  },
  data() {
    return {
      signedIn: false,
    } 
  },
  created: function () {
    this.signedIn = Math.random() < 0.5;
  },
})
</script>