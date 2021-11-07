<template>
  <b-navbar role="navigation" type="dark" class="mb-5 navbar-brand-gradient" sticky>
    <b-navbar-nav>
      <b-nav-item class="navbar-item-brand-variant" to="/">Home</b-nav-item>
      <b-nav-item class="navbar-item-brand-variant" to="/Kanban">Kanbans</b-nav-item>
      <b-nav-item class="navbar-item-brand-variant" to="/User">Account</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
})
</script>

<style scoped>
  .navbar-brand-gradient {
    background-image: 
      linear-gradient(
        to right,
        /* #4500BA, #CC0000 */
        #5100A9, #B10025
      );
  }
  .nav-li {
    color: white;
  }

</style>