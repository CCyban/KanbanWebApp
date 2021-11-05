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
            class="mb-2 card-brand-variant"
          >
          <b-card-text
           v-text="kanbanBoard.date" />
           <b-link to="/Kanban/10">
            <b-button
              variant="outline-light">
              Open Kanban
            </b-button>
           </b-link>
        </b-card>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'KanbanList',
  props: {
    kanbanBoards: Array,
  }
})
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

	.card-brand-variant {
		background-image:
		linear-gradient(
			to bottom right,
			#A9043A, #63048C
		);
		color: white;
	}
</style>
