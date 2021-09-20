<template>
    <div>
        <draggable v-model="localCopyOfSection" group="section" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card" @change="sectionOrderUpdated">
            <kanban-card v-for="(element, index) in localCopyOfSection" :key="index" :index="index" :kanbanCard="element.kanbanCard" :saveKanbanCard="saveKanbanCard" class="kanban-card" />
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
        kanbanSection: Array,
        sectionHeader: String,
        sectionIndex: Number,
        saveKanbanSection: Function,
    },
    data() {
        return {
            localCopyOfSection: this.kanbanSection,
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "section",
                disabled: false,
            };
        }
    },
    methods: {
        saveKanbanCard(cursedObject) {
            this.copyOfReceivedArray[cursedObject.index].kanbanCard = cursedObject.newKanbanCard;
            this.updateKanbanSectionData();
        },
        sectionOrderUpdated() {
            this.updateKanbanSectionData();
        },
        updateKanbanSectionData() {
            this.saveKanbanSection({
                sectionIndex: this.sectionIndex,
                newKanbanSection: Object.values({...this.copyOfReceivedArray}),
            })
        }
    }
}
</script>