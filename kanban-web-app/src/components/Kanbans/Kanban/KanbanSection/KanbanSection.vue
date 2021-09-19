<template>
    <div>
        <draggable v-model="copyOfReceivedArray" group="people" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card">
            <kanban-card v-for="(element, index) in copyOfReceivedArray" :key="index" :index="index" :kanbanCard="element.kanbanCard" :saveKanbanCard="saveKanbanCard" class="kanban-card" />
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
    beforeMount: function () {
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
    },
    methods: {
        saveKanbanCard(cursedObject) {
            alert(cursedObject.index);
            this.copyOfReceivedArray[cursedObject.index].kanbanCard = cursedObject.newKanbanCard;
        }
    }
}
</script>