<template>
<div>
    <b-overlay
        v-b-hover="hoverHandle"
        :show="isCardHovered"
        rounded="sm"
        style="max-width: 20rem;"
        class="mb-3">
        <b-card
            :title="kanbanCard.Title">
            <b-card-text>
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
        <kanban-card-edit @toggleModal="toggleModal()" :kanbanCard="kanbanCard" @saveKanbanCard="kanbanCard = $event"/>
    </b-modal>
</div>
</template>

<script>
import KanbanCardEdit from './KanbanCardEdit.vue'

export default {
    name: 'KanbanCard',
    props: {
        content: String,
    },
    components: {
        KanbanCardEdit,
    },
    data() {
        return {
            isCardHovered: false,
            showModal: false,
            kanbanCard: {
                Title: 'Issue with saving profile password',
                Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                Priority: 9,
                Estimation: '12 hours',
                dateCreated: '12/05/2019',
                lastUpdated: '11/09/2021',
            }
        }
    },
    methods: {
        hoverHandle(isHovered) {
            if (isHovered) {
                this.isCardHovered = true;
            }
            else {
                this.isCardHovered = false;
            }
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
    }
}
</script>