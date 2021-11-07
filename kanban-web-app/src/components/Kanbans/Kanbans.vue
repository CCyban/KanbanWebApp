<template>
  <div>
    <div
        class="mb-4 px-2 mr-auto text-left">
        <h1
            class="font-brand-simple">
            View Kanbans
        </h1>
        <h3>
            Kanbans<b-icon-caret-down-fill class="font-brand-simple"/>
        </h3>
    </div>
    <KanbanList :kanbanBoards="kanbanBoards"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KanbanList from '../Kanbans/KanbanList.vue'

export default Vue.extend({
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
          date: Date.now(), 
        },
		{
          name: "Name #4",
          date: Date.now(), 
        },
        {
          name: "Name #5",
          date: Date.now(), 
        },
		{
          name: "Name #6",
          date: Date.now(), 
        },
        {
          name: "Name #7",
          date: Date.now(), 
        },
		{
          name: "Name #8",
          date: Date.now(), 
        },
        {
          name: "Name #9",
          date: Date.now(), 
        },
		{
          name: "Name #10",
          date: Date.now(), 
        },
        {
          name: "Name #11",
          date: Date.now(), 
        },
      ]
    } 
  }
})
</script>