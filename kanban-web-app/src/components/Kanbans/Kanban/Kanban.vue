<template>
  <div>
    <h3
      class="mb-4">
      Some kanban with id of {{ Kanban.id }}, name of {{ Kanban.name }}, and date of {{ Kanban.date }}
    </h3>
    <b-card-group deck>
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
      <kanban-card />
    </b-card-group>

  </div>
</template>

<script>
import KanbanCard from './KanbanCard/KanbanCard.vue'

export default {
    name: 'Kanban',
    components: {
      KanbanCard
    },
    data() {
        return {
            id: this.$route.params.id,
            Kanban: Object,
        }
    },
    created: function () {
        console.log('Run code here to fetch kanban data off id ' + this.id);

        this.Kanban = {
            id: this.id,
            name: "tempname",
            date: Date.now(),
        }
    },
}
</script>