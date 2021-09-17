<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <KanbanList msg="Welcome to Your Vue.js App" :kanbanBoards="kanbanBoards"/>
</template>

<script>
import KanbanList from './components/KanbanList.vue'

export default {
  name: 'App',
  components: {
    KanbanList
  },
  data() {
    return {
      kanbanBoards: ['summat', 'summat2', 'summat3'],
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
