<template>
    <div>
        <kanban-card-edit :kanbanCard="kanbanCard" :saveKanbanCardEmit="saveKanbanCardEmit" />
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
            this.$emit('toggleModal');
        },
    },
}
</script>
