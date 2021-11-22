<template>
	<b-progress
		v-if="kanbanDataLoading"
		value="100"
		variant="success"
		animated
	/>
	<b-alert
		v-else-if="kanbanDataInvalidToken"
		show
		variant="danger">
		<b-icon-exclamation-circle-fill font-scale="1.15" />
		You do not have access to this. Please
		<b-link
			to="Account/SignIn">
			Sign In.
		</b-link>
	</b-alert>
	<b-alert
		v-else-if="kanbanDataErrored"
		show
		variant="danger"
	>
		An error has occured in the process of retrieving data. Please try again later.
	</b-alert>
	<div v-else-if="kanbanDataSuccessful">
		<router-link
			v-for="kanbanBoard in kanbanData.Kanbans"
			v-bind:key="kanbanBoard._id"
			:to="'/Kanban/' + kanbanBoard._id"
			tag="button"
			class="col-sm btn btn-brand-variant btn-lg m-3 p-3">
			<b-icon-kanban-fill
					font-scale="2.75"
					class="mb-4"/>
			<b-card-title
				v-text="kanbanBoard.KanbanTitle"
			/>
			<b-card-text
				v-text="kanbanBoard.KanbanSections.length + (kanbanBoard.KanbanSections.length == 1 ? ' section' : ' sections')"
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
import { CKanbans } from '@/classes/CKanbans';
import Vue from 'vue';
import { apiDataState } from '@/enumerations/apiDataState'


export default Vue.extend({
	name: 'KanbanList',
	props: {
		kanbanData: {
			type: CKanbans
		},
		kanbanDataState: {
			type: Number
		}
	},
	computed: {
		kanbanDataErrored() {
			return this.kanbanDataState === apiDataState.Errored;
		},
		kanbanDataLoading() {
			return this.kanbanDataState === apiDataState.Loading;
		},
		kanbanDataSuccessful() {
			return this.kanbanDataState == apiDataState.Successful;
		},
		kanbanDataInvalidToken() {
			return this.kanbanDataState == apiDataState.InvalidToken;
		}
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
