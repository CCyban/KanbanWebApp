<template>
    <div class="draggable">
        <b-overlay
            v-b-hover="hoverHandle"
            :show="isCardHovered"
            rounded="sm"
            style="max-width: 20rem;"
            class="mb-3 kanban-card-overlay">
            <b-card
                :title="kanbanCard.Title"
                class="unselectable">
                <b-card-text>
                    <p><b-avatar />{{ kanbanCard.assignedTo }}</p>
                </b-card-text>
                <b-card-text class="text-truncate">
                    {{ kanbanCard.Description }}
                </b-card-text>
            </b-card>
            <template #overlay>
                <div class="text-center">
                <b-button
                    variant="outline-success"
                    size="sm"
                    @click="showModal = true">
                        Open
                    <b-icon icon="pencil-square" />
                </b-button>
                </div>
            </template>
        </b-overlay>
        <b-modal v-model="showModal" hide-footer :title="kanbanCard.Title" hide-header-close size="xl">
            <b-container slot="modal-header">
                <b-row>
                    <b-col>
                        <h1>
                            {{ kanbanCard.Title }}
                        </h1>
                    </b-col>
                    <b-col align-self="end" cols="auto" class="mb-auto">
                        <b-button variant="danger" class="p-0" size="lg" @click="toggleModal()">
                            <b-icon icon="x" font-scale="1" class="m-1"></b-icon>
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
            <kanban-card-details @toggleModal="toggleModal()" :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit"/>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KanbanCardDetails from './KanbanCardDetails/KanbanCardDetails.vue'

export default Vue.extend({
    name: 'KanbanCard',
    props: {
        kanbanCard: Object,
        saveKanbanCard: Function,
        index: Number,
    },
    components: {
        KanbanCardDetails,
    },
    data() {
        return {
            isCardHovered: false,
            showModal: false,
            kabanCard: Object,
        }
    },
    methods: {
        hoverHandle(isHovered: boolean) {
            // Hover event on the card is used to toggle a boolean to show the overlay of said card
            this.isCardHovered = isHovered; 
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        saveKanbanCardEmit(kanbanCard: any) {
            // Updates the higher component with the new card data as well as the index of the section this component is used for
            this.saveKanbanCard(                {
                    index: this.index,
                    newKanbanCard: {...kanbanCard} 
                })
        }
    },
})
</script>


<style scoped>
    .kanban-card-overlay {
        cursor: grab;
    }

    .unselectable {
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }
</style>