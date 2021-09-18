<template>
  <div>
    <h3
      class="mb-4">
      Current Kanban Boards
    </h3>
    <ul>
      <li
        v-for="kanbanBoard in kanbanBoards"
        v-bind:key="kanbanBoard.name">
          <b-card
            :title="kanbanBoard.name"
            style="max-width: 20rem;"
            class="mb-2"
          >
          <b-card-text
           v-text="kanbanBoard.date" />
          <b-button
            href="#"
            variant="primary">
            Go somewhere
          </b-button>
        </b-card>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: 'KanbanList',
  props: {
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
</style>
