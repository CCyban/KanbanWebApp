<template>
  <div>
    <h1>
        Account stuff
    </h1>
    <b-link to="/Kanbans">
        <b-button variant="primary">
            Kanbans page
        </b-button>
    </b-link>
  </div>
</template>

<script>

export default {
  name: 'Account',
  components: {
  },
  data() {
    return {
    } 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
