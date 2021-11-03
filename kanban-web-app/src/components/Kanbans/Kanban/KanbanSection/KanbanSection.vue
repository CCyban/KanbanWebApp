<template>
    <div>
        <draggable v-model="localCopyOfSection.SectionCards" group="section" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card" @change="sectionOrderUpdated">
            <kanban-card v-for="(element, index) in localCopyOfSection.SectionCards" :key="index" :index="index" :kanbanCard="element" :saveKanbanCard="saveKanbanCard" class="kanban-card" />
            <kanban-section-header slot="header" :sectionHeader="localCopyOfSection.SectionHeader" :saveKanbanSectionHeader="saveKanbanSectionHeader" :hasCards="localCopyOfSection.SectionCards.length > 0" :deleteSection="deleteSection"/>
        </draggable>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import draggable from 'vuedraggable'
import KanbanCard from './KanbanCard/KanbanCard.vue'
import KanbanSectionHeader from './KanbanSectionHeader.vue'

export default Vue.extend({
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
        deleteKanbanSection: Function,
    },
    data() {
        return {
            localCopyOfSection: this.kanbanSection,
        }
    },
    watch: {
        // Maybe delete? Check if truly needed (runs when a section is deleted)
        kanbanSection: function (val) {
            this.localCopyOfSection = {...val};
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
        saveKanbanCard(cursedObject: any) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.$set(this.localCopyOfSection.SectionCards, cursedObject.index, cursedObject.newKanbanCard);

            this.updateKanbanSectionData();
        },
        saveKanbanSectionHeader(newKanbanSectionHeader: String) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.localCopyOfSection.SectionHeader = newKanbanSectionHeader;

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
                newSection: Object.values({...this.localCopyOfSection}),
            })
        },
        deleteSection() {
            // Add text
            this.deleteKanbanSection(this.sectionIndex);
        },
    }
})
</script>