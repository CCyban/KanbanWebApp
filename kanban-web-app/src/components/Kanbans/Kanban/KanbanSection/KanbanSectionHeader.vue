<template>
    <div>
        <b-overlay
            v-b-hover="hoverHandle"
            :show="isCardHovered"
            rounded="sm"
            style="max-width: 20rem;"
            class="mb-3"
            opacity="0.6">
            <b-card
                style="max-width: 20rem;"
                class="mb-3 p-1 card-brand-variant"
                border-variant="dark">
                <h2 class="h3 text-uppercase">
                    {{ sectionHeader }}
                </h2>
            </b-card>
            <template #overlay>
                <div class="text-center">
                <b-button
                    variant="secondary"
                    size="sm"
                    @click="showEditModal = true"
                    class="mb-1"
                    v-b-tooltip.hover
                    title="Open Section Details">
                        Edit
                    <b-icon icon="pencil-square" />
                </b-button>
                </div>
            </template>
        </b-overlay>
        <b-modal
            v-model="showEditModal"
            hide-footer 
            hide-header-close 
            size="xl" 
            aria-label="Kanban Section Header Details">
            <b-container slot="modal-header">
                <b-row>
                    <b-col>
                        <h1>
                            {{ sectionHeader }}
                        </h1>
                    </b-col>
                    <b-col align-self="end" cols="auto" class="mb-auto">
                        <b-button variant="danger" class="p-0" size="lg" @click="closeModal()" v-b-tooltip.hover title="Close Modal Without Saving">
                            <b-icon icon="x" font-scale="1" class="m-1"></b-icon>
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
            <kanban-section-details @closeModal="closeModal()" :sectionHeader="sectionHeader" :saveKanbanSectionHeader="saveKanbanSectionHeader" :hasCards="hasCards" :deleteSection="deleteSection"/>
        </b-modal>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import kanbanSectionDetails from './KanbanSectionDetails.vue'

export default Vue.extend({
    name: 'KanbanSectionHeader',
    components: {
        kanbanSectionDetails
    },
    props: {
        sectionHeader: String,
        saveKanbanSectionHeader: Function,
        hasCards: Boolean,
        deleteSection: Function,
    },
    data() {
        return {
            isCardHovered: false,
            localSectionHeaderCopy: "",
            showEditModal: false,
        }
    },
    beforeMount: function() {
        this.localSectionHeaderCopy = this.sectionHeader;
    },
    methods: {
        hoverHandle(isHovered: any) {
            // Hover event on the card is used to toggle a boolean to show the overlay of said card
            this.isCardHovered = isHovered;
        },
        closeModal() {
            this.showEditModal = false;
        }

    }
})
</script>

<style scoped>
    .card-brand-variant {
        background-image:
            linear-gradient(
                to bottom right,
                #CF003C, #9E0375
            );
        color: white;
    }
</style>