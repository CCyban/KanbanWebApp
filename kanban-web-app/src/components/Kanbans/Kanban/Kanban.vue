<template>
  <div>
    <h2
      class="mb-4">
      {{ Kanban.name }}
    </h2>
    <div class="row">
      <div class="col-sm">
        <kanban-section :myArray="myArray1" :sectionHeader="'DEV'"></kanban-section>
      </div>
      <div class="col-sm">
        <kanban-section :myArray="myArray2" :sectionHeader="'DT'"></kanban-section>
      </div>
      <div class="col-sm">
        <kanban-section :myArray="myArray3" :sectionHeader="'QA'"></kanban-section>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanSection from './KanbanSection/KanbanSection.vue'

export default {
  name: 'Kanban',
  components: {
    KanbanSection,
  },
  data() {
      return {
          id: this.$route.params.id,
          Kanban: Object,
          myArray1: [
            {
              id: 11,
              name: 'col1test1'
            },
            {
              id: 12,
              name: 'col1test2'
            },
            {
              id: 13,
              name: 'col1test3'
            },
          ],
          myArray2: [
            {
              id: 21,
              name: 'col2test1'
            },
            {
              id: 22,
              name: 'col2test2'
            },
            {
              id: 23,
              name: 'col2test3'
            },
          ],
          myArray3: [
            {
              id: 31,
              name: 'col3test1'
            },
            {
              id: 32,
              name: 'col3test2'
            },
            {
              id: 33,
              name: 'col3test3'
            },
          ]
      }
  },
  created: function () {
      console.log('Run code here to fetch kanban data off id ' + this.id);

      this.Kanban = {
          id: this.id,
          name: "Sprint 26.1",
          date: Date.now(),
      }
  },
}
</script>