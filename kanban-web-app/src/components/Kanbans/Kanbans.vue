<template>
  <div>
    <h1>
        Kanban stuff
    </h1>
    <KanbanList :kanbanBoards="kanbanBoards"/>
  </div>
</template>

<script>
import KanbanList from '../Kanbans/KanbanList.vue'

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