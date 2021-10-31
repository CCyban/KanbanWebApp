<template>
    <div>
        <b-overlay
            v-b-hover="hoverHandle"
            :show="isCardHovered"
            rounded="sm"
            style="max-width: 20rem;"
            class="mb-3">
            <b-card
                :title="sectionHeader"
                style="max-width: 20rem;"
                class="mb-3 p-1"
                border-variant="dark"
                bg-variant="light"
                text-variant="dark">
            </b-card>
            <template #overlay>
                <div class="text-center">
                <b-button
                    variant="outline-success"
                    size="sm"
                    @click="showEditModal = true"
                    class="mb-1">
                        Edit
                    <b-icon icon="pencil-square" />
                </b-button>
                </div>
            </template>
        </b-overlay>
        <b-modal v-model="showEditModal" hide-footer title="Edit Section Header" hide-header-close size="xl">
            <b-container slot="modal-header">
                <b-row>
                    <b-col>
                        <h1>
                            {{ sectionHeader }}
                        </h1>
                    </b-col>
                    <b-col align-self="end" cols="auto" class="mb-auto">
                        <b-button variant="danger" class="p-0" size="lg" @click="closeModal()">
                            <b-icon icon="x" font-scale="1" class="m-1"></b-icon>
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
            <kanban-section-details @closeModal="closeModal()" :sectionHeader="sectionHeader" :saveKanbanSectionHeader="saveKanbanSectionHeader" :hasCards="hasCards" :deleteSection="deleteSection"/>
        </b-modal>
    </div>
</template>

<script>
import kanbanSectionDetails from './KanbanSectionDetails.vue'

export default {
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
            localSectionHeaderCopy: undefined,
            showEditModal: false,
        }
    },
    beforeMount: function() {
        this.localSectionHeaderCopy = {...this.sectionHeader};
    },
    methods: {
        hoverHandle(isHovered) {
            // Hover event on the card is used to toggle a boolean to show the overlay of said card
            this.isCardHovered = isHovered;
        },
        closeModal() {
            this.showEditModal = this.showDeleteModal = false;
        }

    }
}
</script>