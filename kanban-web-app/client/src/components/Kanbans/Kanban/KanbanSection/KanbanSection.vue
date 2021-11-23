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

// General Imports
import Vue, { PropType } from 'vue';
import jwt from 'jsonwebtoken';
import draggable from 'vuedraggable'

// Classes
import { CAccount } from '@/classes/CAccount';
import { CKanbanSectionCard } from '@/classes/CKanbanSectionCard';

// Interfaces
import { IKanbanSection } from '@/interfaces/IKanbanSection';

// Vue Components
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
        kanbanSection: Object as PropType<IKanbanSection>,
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
        // VueDraggable's drag options for the kanban cards
        dragOptions() {
            return {
                animation: 200,
                group: "section",
                disabled: false,
            };
        },
        hasDataChanged: {
            get(): boolean {
                // Detects if the kanban section's data has been altered so we know when to show the 'save kanban changes' option
                return JSON.stringify(this.kanbanSection) != JSON.stringify(this.localCopyOfSection);
            }
        },
    },
    methods: {
        saveKanbanCard(payload: any) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.$set(this.localCopyOfSection.SectionCards, payload.index, payload.newKanbanCard);

            this.updateKanbanSectionData();
        },
        addNewKanbanCard() {
            // Setting basic properties of a new Kanban Card
            const newKanbanSectionCard = new CKanbanSectionCard();
            newKanbanSectionCard.Title = '#' + (this.localCopyOfSection.SectionCards.length + 1);

            const Account: CAccount = jwt.decode(localStorage.getItem('accountToken') ?? "") as CAccount;
            newKanbanSectionCard.Author = Account.Username;

            newKanbanSectionCard.dateCreated = newKanbanSectionCard.lastUpdated = new Date().toLocaleDateString('en-UK', { day:'2-digit', month: '2-digit', year: 'numeric' });

            // Added the newly created card to the list of cards
            this.$set(
                this.localCopyOfSection.SectionCards, 
                this.localCopyOfSection.SectionCards.length, 
                newKanbanSectionCard);
                
            // Emits the update to the higher-level components
            this.updateKanbanSectionData();
        },
        deleteKanbanCard(sectionIndex: number) {
            this.localCopyOfSection.SectionCards.splice(sectionIndex, 1);

            // Emits the update to the higher-level components
            this.updateKanbanSectionData();
        },
        saveKanbanSectionHeader(newKanbanSectionHeader: string) {
            // Receives a change to the local copy & calls a method to pass the update further up
            this.localCopyOfSection.SectionHeader = newKanbanSectionHeader;

            // Emits the update to the higher-level components
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
            // Emits a delete method for the kanban section this component itself is representing
            this.deleteKanbanSection(this.sectionIndex);
        },
        getNewKanbanCard() {
            // Creates an new and empty kanban card
            return new CKanbanSectionCard();
        }
    },
    beforeMount: function() {
        // Creates a copy of the kanban's section data this component is supposed to represent before it is mounted
        this.localCopyOfSection = JSON.parse(JSON.stringify(this.kanbanSection));
    },
})
</script>