<template>
    <div>
        <draggable v-model="localCopyOfSection.kanbanSectionCards" group="section" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card" @change="sectionOrderUpdated">
            <kanban-card v-for="(element, index) in localCopyOfSection.kanbanSectionCards" :key="index" :index="index" :kanbanCard="element" :saveKanbanCard="saveKanbanCard" class="kanban-card" />
            <kanban-section-header slot="header" :sectionHeader="localCopyOfSection.kanbanSectionHeader" :saveKanbanSectionHeader="saveKanbanSectionHeader"/>
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
        kanbanSection: Object,
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
            // Receives a change to the local copy & calls a method to pass the update further up
            this.$set(this.localCopyOfSection.kanbanSectionCards, cursedObject.index, cursedObject.newKanbanCard);

            this.updateKanbanSectionData();
        },
        saveKanbanSectionHeader(newKanbanSectionHeader) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.localCopyOfSection.kanbanSectionHeader = newKanbanSectionHeader;

            this.updateKanbanSectionData();
        },
        sectionOrderUpdated() {
            // Updates the data side of the Vue page when the user drags a card around so it matches the visually changed state
            this.updateKanbanSectionData();
        },
        updateKanbanSectionData() {
            // Updates the section's data based on the edited local copy
            this.saveKanbanSection({
                sectionIndex: this.sectionIndex,
                newKanbanSection: Object.values({...this.localCopyOfSection}),
            })
        },
    }
}
</script>