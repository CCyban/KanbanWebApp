<template>
  <b-navbar type="dark" variant="dark" class="mb-5" sticky>
    <b-navbar-nav>
      <b-nav-item to="/">Home</b-nav-item>
      <b-nav-item to="/Kanban">Kanbans</b-nav-item>
      <b-nav-item to="/User">User</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Navbar',
})
</script>
