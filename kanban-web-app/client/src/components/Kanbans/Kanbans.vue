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
    <KanbanList :kanbanData="kanbanData" :isLoading="isLoading"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import KanbanList from '../Kanbans/KanbanList.vue'
import { CKanbans } from '@/classes/CKanbans';

export default Vue.extend({
	name: 'Kanbans',
	components: {
		KanbanList
	},
	data() {
		return {
			kanbanData: undefined || new CKanbans(),
			isLoading: true,
		}
	},
	created: function () {		
		axios.get('http://localhost:8090/kanbans/')
			.then(res => {
				this.kanbanData = new CKanbans(res.data);
				this.isLoading = false;
			})
			.catch(error => console.log(error));
	},
})
</script>