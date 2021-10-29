<template>
    <div>
        <kanban-card-edit :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit" />
        <hr class="my-4" />
        <kanban-card-comments :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit" />
    </div>
</template>

<script>
import KanbanCardEdit from './KanbanCardEdit.vue'
import KanbanCardComments from './KanbanCardComments.vue'

export default {
    name: 'KanbanCardDetails',
    props: {
        kanbanCard: Object,
        saveKanbanCardEmit: Function,
    },
    components: {
        KanbanCardComments,
        KanbanCardEdit,
    },
    methods: {
        hideModal() {
            // Emits togglable method execution to parent component in order to toggle the modal off
            this.$emit('toggleModal');
        },
    },
}
</script>
