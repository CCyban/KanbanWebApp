<template>
    <div	
        v-if="kanbanDataLoading">
        <h1>
            Loading Kanban...
        </h1>
        <b-progress
            value="100"
            variant="success"
            animated
        />
    </div>
    <b-alert
		v-else-if="kanbanDataErrored"
		show
		variant="danger"
	>
    		An error has occured in the process of retrieving data. Please try again later.
	</b-alert>
    <div
	 	v-else-if="kanbanDataSuccessful">
        <kanban-title :id="id" :Title="localKanbanCopy.KanbanTitle" :updateTitle="updateKanbanTitle" :deleteKanban="deleteKanban" />
        <template v-if="hasDataChanged && !kanbanUpdateFailed">
            <hr />
            <b-card bg-variant="danger" text-variant="white" class="text-center">
                Save Changes?
                <b-button variant="light" class="mx-2" @click="saveKanban()">
                    Yes
                </b-button>
                <b-button variant="outline-light" class="mx-2" @click="deepCloneKanban()">
                    No
                </b-button>
            </b-card>
            <hr />
        </template>
		<template v-else-if="kanbanUpdateFailed">
            <hr />
            <b-card bg-variant="danger" text-variant="white" class="text-center">
                Failed to save changes
            </b-card>
            <hr />
        </template>
        <div class="row">
            <div v-for="(kanbanSection, index) in localKanbanCopy.KanbanSections" :key="index" class="col-sm">
                <kanban-section :kanbanSection="kanbanSection" :sectionIndex="index" :saveKanbanSection="saveKanbanSection" :deleteKanbanSection="deleteKanbanSection"></kanban-section>
            </div>
            <kanban-section class="col-sm" :kanbanSection="getNewKanbanSection()" :addNewKanbanSection="addNewKanbanSection"></kanban-section>
        </div>
    </div>
</template>

<script lang="ts">
// General
import Vue from 'vue';
import { Route } from 'vue-router';
import axios, { AxiosResponse } from 'axios';

// Components
import KanbanTitle from './KanbanTitle.vue'
import KanbanSection from './KanbanSection/KanbanSection.vue'

// Classes
import { CKanban } from '@/classes/CKanban';
import { IKanban } from '@/interfaces/IKanban';
import { CKanbanSection } from '@/classes/CKanbanSection';
import { IKanbanSection } from '@/interfaces/IKanbanSection';
import { apiDataState } from '@/enumerations/apiDataState'


export default Vue.extend({
  name: 'Kanban',
  components: {
    KanbanTitle,
    KanbanSection,
  },
  data() {
    return {
        id: this.$route.params.id,
        Kanban: undefined as unknown as IKanban,
		localKanbanCopy: undefined as unknown as IKanban,
		kanbanUpdateFailed: false,
        kanbanDataState: apiDataState.NotBegun,
    }
  },
  created: function () {      
    this.kanbanDataState = apiDataState.Loading;

    if (this.id === 'New') {
        const newKanban = new CKanban('New Kanban');

        axios.post('http://localhost:8090/kanbans/', newKanban)
        .then(res => { 
            this.id = res.data._id;
            this.Kanban = newKanban;
            this.kanbanDataState = apiDataState.Successful;
        })
        .catch(() => this.kanbanDataState = apiDataState.Errored);
    }
    else {
        axios.get('http://localhost:8090/kanbans/' + this.id)
        .then(res => { 
            this.Kanban = res.data as CKanban
            this.kanbanDataState = apiDataState.Successful;
        })
        .catch(() => this.kanbanDataState = apiDataState.Errored);
    }
  },
  methods: {
      // The root saving method that is used to save the state of the entire kanban board. Used for saving a section at a time.
    saveKanbanSection(payload: any) {
        this.$set(this.localKanbanCopy.KanbanSections, payload.sectionIndex, JSON.parse(JSON.stringify(payload.newSection)));
    },
    deleteKanbanSection(sectionIndex: number) {
		this.localKanbanCopy.KanbanSections.splice(sectionIndex, 1);
    },
    addNewKanbanSection() {
        this.localKanbanCopy.KanbanSections.push(
            new CKanbanSection('#' + (this.localKanbanCopy.KanbanSections.length + 1))
        );
    },
    updateKanbanTitle(newTitle: string) {
        this.localKanbanCopy.KanbanTitle = newTitle;
    },
	deepCloneKanban() {
        this.localKanbanCopy = JSON.parse(JSON.stringify(this.Kanban));
    },
	saveKanban() {
		axios.put('http://localhost:8090/kanbans/' + this.id, this.localKanbanCopy)
			.then(res => res.status == 200 ? this.Kanban = this.localKanbanCopy : this.kanbanUpdateFailed = true)
			.catch(() => this.kanbanUpdateFailed = true);
	},
    getNewKanbanSection() {
        return new CKanbanSection();
    },
    deleteKanban() {
        const confirmRequest = confirm("Are you absolutely sure you want to delete this Kanban? \nNo take-backsies!");
        if (confirmRequest) {
            axios.delete('http://localhost:8090/kanbans/' + this.id)
                .then(res => this.$router.push({ path: '/kanban' }))
			    .catch(() => this.kanbanUpdateFailed = true);
        }
    }
  },
	watch: {
		Kanban: function () {
			this.deepCloneKanban();
		}
	},
	computed: {
        hasDataChanged: {
            get(): boolean {
                // Detects if the kanban's data has been altered
                return JSON.stringify(this.Kanban) != JSON.stringify(this.localKanbanCopy);
            }
        },
        kanbanDataErrored(): boolean {
			return this.kanbanDataState === apiDataState.Errored;
		},
		kanbanDataLoading(): boolean {
			return this.kanbanDataState === apiDataState.Loading;
		},
		kanbanDataSuccessful(): boolean {
			return this.kanbanDataState == apiDataState.Successful;
		}
    }
})
</script>