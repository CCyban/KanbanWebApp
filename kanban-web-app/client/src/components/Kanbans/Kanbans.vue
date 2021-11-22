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
    <KanbanList :kanbanData="kanbanData" :kanbanDataState="kanbanDataState" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosError } from 'axios';
import KanbanList from '../Kanbans/KanbanList.vue'
import { CKanbans } from '@/classes/CKanbans';
import { apiDataState } from '@/enumerations/apiDataState'

export default Vue.extend({
	name: 'Kanbans',
	components: {
		KanbanList
	},
	data() {
		return {
			kanbanData: undefined || new CKanbans(),
			kanbanDataState: apiDataState.NotBegun,
		}
	},
	created: function () {
		const accountToken: string = localStorage.getItem('accountToken') ?? "";

		this.kanbanDataState = apiDataState.Loading;
		axios.get('http://localhost:8090/kanbans/', { headers: {"Authorization" : accountToken} })
			.then(res => {
				this.kanbanData = new CKanbans(res.data);
				this.kanbanDataState = apiDataState.Successful;
			})
			.catch((err: AxiosError) => {
				if (err.response?.status == 401) {
					localStorage.setItem('accountToken', "");
					this.kanbanDataState = apiDataState.InvalidToken;
				}
				else {
					this.kanbanDataState = apiDataState.Errored;
				}
			});
	},
})
</script>