<template>
    <div>
        <draggable v-model="copyOfReceivedArray" group="people" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card">
            <kanban-card v-for="element in copyOfReceivedArray" :key="element.id" :content="element.name" class="kanban-card" />
            <kanban-section-header slot="header" :sectionHeader="sectionHeader" />
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import KanbanCard from './KanbanCard/KanbanCard.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'

export default {
    name: 'KanbanSection',
    components: {
      draggable,
      KanbanCard,
      KanbanSectionHeader,
    },
    props: {
        myArray: Array,
        sectionHeader: String,
    },
    created: function () {
        this.copyOfReceivedArray = this.myArray;
    },
    data() {
        return {
            copyOfReceivedArray: Array,
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    }
}
</script>