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
            // Saves to the local copy
            this.localCopyOfSection[cursedObject.index].kanbanCard = cursedObject.newKanbanCard;

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
        }
    }
}
</script>