<template>
  <div class="hello">
    <h1>Kanban board list</h1>
    <p>
      Made using Vue.JS 3 and other stuff
    </p>

    <h3>Kanban boards</h3>
    <ul>
      <li v-for="value in kanbanBoards" v-bind:key="value">
        {{ value }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    kanbanBoards: Array,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
