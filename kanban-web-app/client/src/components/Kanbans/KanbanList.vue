<template>
  <div>
	<router-link
		v-for="kanbanBoard in kanbanBoards"
		v-bind:key="kanbanBoard.name"
		to="/Kanban/10"
		tag="button"
		class="col-sm btn btn-brand-variant btn-lg m-3 p-3">
		<b-icon-kanban-fill
				font-scale="2.75"
				class="mb-4"/>
		<b-card-title
			v-text="kanbanBoard.name"
		/>
		<b-card-text
			v-text="kanbanBoard.date"
		/>
	</router-link>


	<router-link
		to="/Kanban/New"
		tag="button"
		class="col-sm btn btn-brand-variant btn-lg m-3 p-3">
		<b-icon-plus-circle-fill
				font-scale="2.75"
				class="mb-4"/>
		<b-card-title>
			Create New
		</b-card-title>
		<b-card-text>
			Kanban Board
		</b-card-text>
	</router-link>

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
	.btn-brand-variant {
		background-image:
			linear-gradient(
				to bottom right,
				#A9043A, #63048C
			);
		transition: transform 0.3s;
		color: white;
	}
    .btn-brand-variant:hover {
        transform: scale(1.08); 
		color: white;
    }
</style>
