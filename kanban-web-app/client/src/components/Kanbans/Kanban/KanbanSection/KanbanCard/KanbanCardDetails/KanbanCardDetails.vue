<template>
    <div>
        <kanban-card-edit :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit" />
        <hr class="my-4" />
        <kanban-card-comments :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit" />
        <b-form-group
            label-for="deleteCardButton">
            <template #label>
                <h2 class="h5">Delete Card</h2>
            </template>
            <div class="d-grid gap-2 my-2">
                <b-button
                    variant="warning"
                    v-b-toggle.delete-collapse
                    v-b-tooltip.hover
                    title="Delete Kanban Card">
                    Delete Card
                </b-button>
            </div>
            <b-collapse id="delete-collapse">
                <div class="d-grid gap-2">
                    <b-button
                        id="deleteCardButton"
                        variant="danger"
                        block
                        @click="deleteKanbanCard()"
                        v-b-tooltip.hover
                        title="Delete Kanban Card Confirmation">
                        I Am Sure
                    </b-button>
                </div>
            </b-collapse>
        </b-form-group>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KanbanCardEdit from './KanbanCardEdit.vue'
import KanbanCardComments from './KanbanCardComments.vue'

export default Vue.extend({
    name: 'KanbanCardDetails',
    props: {
        kanbanCard: Object,
        saveKanbanCardEmit: Function,
        deleteKanbanCard: Function,
    },
    components: {
        KanbanCardComments,
        KanbanCardEdit,
    },
    methods: {
        hideModal(): void {
            // Emits togglable method execution to parent component in order to toggle the modal off
            this.$emit('toggleModal');
        },
    },
})
</script>
