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
		v-else-if="kanbanDataInvalidToken"
		show
		variant="danger">
        <b-icon-exclamation-circle-fill font-scale="1.15" />
		You do not have access to this. Please
		<b-link
			:to="{ name: 'SignIn' }">
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
import axios, { AxiosError, AxiosResponse } from 'axios';
// Vetur will think the below import is not used therefore not required, but it is wrong so ignore thinking otherwise. Maybe they'll fix it someday.
import { Route } from 'vue-router';

// Components
import KanbanTitle from './KanbanTitle.vue'
import KanbanSection from './KanbanSection/KanbanSection.vue'

// Classes
import { CKanban } from '@/classes/CKanban';
import { IKanban } from '@/interfaces/IKanban';
import { CKanbanSection } from '@/classes/CKanbanSection';
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
            accountToken: localStorage.getItem('accountToken') ?? "",
        }
    },

    // API request: Gets the kanban data resource from the server OR creates a new kanban depending on user choice
    // If successful then the client will react accordingly, if failed then an error alert will be shown.
    created: function () {
        this.kanbanDataState = apiDataState.Loading;

        // If the user selected 'Create New Kanban Board', this will proceed and run a POST request for a new one.
        if (this.id === 'New') {
            const newKanban = new CKanban('New Kanban');

            axios.post('http://localhost:8090/kanbans/', newKanban, { headers: {"Authorization" : this.accountToken} })
            .then(res => { 
                this.id = res.data._id;
                this.Kanban = newKanban;
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
        }
        // If the user selected an existing kanban board, this will proceed and run a GET request for its details.
        else {
            axios.get('http://localhost:8090/kanbans/' + this.id, { headers: {"Authorization" : this.accountToken} })
            .then(res => { 
                this.Kanban = res.data as CKanban
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
        }
    },
    methods: {
        // The root saving method that is used to save the state of the entire kanban board. Used for saving a section at a time.
        saveKanbanSection(payload: any) {
            this.$set(this.localKanbanCopy.KanbanSections, payload.sectionIndex, JSON.parse(JSON.stringify(payload.newSection)));
        },
        // Deletes a kanban section from the kanban.
        deleteKanbanSection(sectionIndex: number) {
            this.localKanbanCopy.KanbanSections.splice(sectionIndex, 1);
        },
        // Adds a kanban section to the kanban.
        addNewKanbanSection() {
            this.localKanbanCopy.KanbanSections.push(
                new CKanbanSection('#' + (this.localKanbanCopy.KanbanSections.length + 1))
            );
        },
        // Updates the kanban's title.
        updateKanbanTitle(newTitle: string) {
            this.localKanbanCopy.KanbanTitle = newTitle;
        },
        // Deep clones the kanban to form a local copy.
        deepCloneKanban() {
            this.localKanbanCopy = JSON.parse(JSON.stringify(this.Kanban));
        },
        // API request: Save the latest state of the Kanban to the server.
        // If successful then the client will react accordingly, if failed then an error alert will be shown.
        saveKanban() {
            axios.put('http://localhost:8090/kanbans/' + this.id, this.localKanbanCopy, { headers: {"Authorization" : this.accountToken} })
                .then(res => res.status == 200 ? this.Kanban = this.localKanbanCopy : this.kanbanUpdateFailed = true)
                .catch(() => this.kanbanUpdateFailed = true);
        },
        // Creates a blank and new kanban section
        getNewKanbanSection() {
            return new CKanbanSection();
        },
        // API request: Deletes the kanban this component is representing off the server.
        // If successful then the client will react accordingly, if failed then an error alert will be shown.
        deleteKanban() {
            const confirmRequest = confirm("Are you absolutely sure you want to delete this Kanban? \nNo take-backsies!");
            if (confirmRequest) {
                axios.delete('http://localhost:8090/kanbans/' + this.id, { headers: {"Authorization" : this.accountToken} })
                    .then(res => this.$router.push({ name: 'Kanbans' }))
                    .catch(() => this.kanbanUpdateFailed = true);
            }
        }
    },
	watch: {
        // Re-Deep clones the kanban to form a local copy each time the main kanban data gets updated
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
        // Computed boolean properties based on the enumeration states of the kanbanDataState.
        // Needed because enumeration checking is not supported through inline code on the template.
        kanbanDataErrored(): boolean {
			return this.kanbanDataState === apiDataState.Errored;
		},
		kanbanDataLoading(): boolean {
			return this.kanbanDataState === apiDataState.Loading;
		},
		kanbanDataSuccessful(): boolean {
			return this.kanbanDataState == apiDataState.Successful;
		},
        kanbanDataInvalidToken(): boolean {
			return this.kanbanDataState == apiDataState.InvalidToken;
		}
    }
})
</script>