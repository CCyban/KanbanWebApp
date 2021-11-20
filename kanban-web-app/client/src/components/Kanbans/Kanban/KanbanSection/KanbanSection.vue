<template>
    <div v-if="addNewKanbanSection">
        <kanban-section-header isNew :addNewKanbanSection="addNewKanbanSection" />
    </div>
    <div v-else>
        <draggable v-model="localCopyOfSection.SectionCards" group="section" v-bind="dragOptions" @start="drag=true" @end="drag=false" draggable=".kanban-card" @change="sectionOrderUpdated">
            <kanban-section-header slot="header" :sectionHeader="localCopyOfSection.SectionHeader" :saveKanbanSectionHeader="saveKanbanSectionHeader" :hasCards="localCopyOfSection.SectionCards.length > 0" :deleteSection="deleteSection"/>
            <kanban-card v-for="(element, index) in localCopyOfSection.SectionCards" :key="index" :index="index" :kanbanCard="element" :saveKanbanCard="saveKanbanCard" :deleteKanbanCard="deleteKanbanCard" class="kanban-card" />
        </draggable>
        <kanban-card :kanbanCard="getNewKanbanCard()" :addNewKanbanCard="addNewKanbanCard" class="kanban-card" />
    </div>
</template>

<script lang="ts">
import { CKanbanSectionCard } from '@/classes/CKanbanSectionCard';
import { IKanbanSection } from '@/interfaces/IKanbanSection';
import { IKanbanSections } from '@/interfaces/IKanbanSections';
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
        addNewKanbanSection: Function,
    },
    data() {
        return {
            localCopyOfSection: undefined as unknown as IKanbanSection,
        }
    },
    watch: {
        // Maybe delete? Check if truly needed (runs when a section is deleted)
        kanbanSection: function (newKanbanSection: IKanbanSection) {
            this.localCopyOfSection = JSON.parse(JSON.stringify(newKanbanSection));
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "section",
                disabled: false,
            };
        },
        hasDataChanged: {
            get(): boolean {
                // Detects if the kanban section's data has been altered
                return JSON.stringify(this.kanbanSection) != JSON.stringify(this.localCopyOfSection);
            }
        },
    },
    methods: {
        saveKanbanCard(cursedObject: any) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.$set(this.localCopyOfSection.SectionCards, cursedObject.index, cursedObject.newKanbanCard);

            this.updateKanbanSectionData();
        },
        addNewKanbanCard() {
            this.$set(
                this.localCopyOfSection.SectionCards, 
                this.localCopyOfSection.SectionCards.length, 
                new CKanbanSectionCard('#' + (this.localCopyOfSection.SectionCards.length + 1)));
                
            this.updateKanbanSectionData();
        },
        deleteKanbanCard(sectionIndex: number) {
            this.localCopyOfSection.SectionCards.splice(sectionIndex, 1);

            this.updateKanbanSectionData();
        },
        saveKanbanSectionHeader(newKanbanSectionHeader: string) {
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
                newSection: this.localCopyOfSection,
            })
        },
        deleteSection() {
            // Add text
            this.deleteKanbanSection(this.sectionIndex);
        },
        getNewKanbanCard() {
            return new CKanbanSectionCard();
        }
    },
    beforeMount: function() {
        this.localCopyOfSection = JSON.parse(JSON.stringify(this.kanbanSection));
    },
})
</script>