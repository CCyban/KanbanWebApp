<template>
  <div>
    <h1>
        Kanbans stuff
    </h1>
    <b-link to="/User">
        <b-button variant="primary">
            Account page
        </b-button>
    </b-link>
    <KanbanList :kanbanBoards="kanbanBoards"/>
  </div>
</template>

<script>
import KanbanList from './KanbanList.vue'

export default {
  name: 'Kanbans',
  components: {
    KanbanList
  },
  data() {
    return {
      kanbanBoards: [
        { 
        name: "Name #1",
        date: Date.now(), 
        },
        {
          name: "Name #2",
          date: Date.now(), 
        },
        {
          name: "Name #3",
          date: undefined, 
        },
      ]
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
