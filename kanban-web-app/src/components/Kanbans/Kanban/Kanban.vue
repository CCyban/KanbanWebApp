<template>
  <div>
      <kanban-title :id="id" :Title="newKanban.KanbanTitle" :updateTitle="updateKanbanTitle">
      </kanban-title>
    <div class="row">
      <div v-for="(kanbanSection, index) in newKanban.KanbanSections" :key="index" class="col-sm">
        <kanban-section :kanbanSection="kanbanSection" :sectionIndex="index" :saveKanbanSection="saveKanbanSection" :deleteKanbanSection="deleteKanbanSection"></kanban-section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// General
import Vue from 'vue';
import { Route } from 'vue-router'

// Components
import KanbanTitle from './KanbanTitle.vue'
import KanbanSection from './KanbanSection/KanbanSection.vue'

// Classes
import { CKanban } from '@/classes/CKanban';
import { CKanbanSection } from '@/classes/CKanbanSection'
import { CKanbanSectionCard } from '@/classes/CKanbanSectionCard';
import { CKanbanCardComment } from '@/classes/CKanbanCardComment'

export default Vue.extend({
  name: 'Kanban',
  components: {
    KanbanTitle,
    KanbanSection,
  },
  data() {
    return {
        id: this.$route.params.id,

        newKanban: new CKanban(
            "Some kanban title", 
            [
                new CKanbanSection(
                    "some section header", 
                    [
                        new CKanbanSectionCard(
                            "Some card title", 
                            "Some card desc", 
                            73, 
                            "Some card est", 
                            "Some card author",
                            "Some card assignedTo",
                            "Some card date", 
                            "Some card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                        new CKanbanSectionCard(
                            "Some 2card title", 
                            "Some 2card desc", 
                            73, 
                            "Some 2card est", 
                            "Some 2card author",
                            "Some 2card assignedTo",
                            "Some 2card date", 
                            "Some 2card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                    ]
                ),
                new CKanbanSection(
                    "some 2section header", 
                    [
                        new CKanbanSectionCard(
                            "Some card title", 
                            "Some card desc", 
                            73, 
                            "Some card est", 
                            "Some card author",
                            "Some card assignedTo",
                            "Some card date", 
                            "Some card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                        new CKanbanSectionCard(
                            "Some 2card title", 
                            "Some 2card desc", 
                            73, 
                            "Some 2card est", 
                            "Some 2card author",
                            "Some 2card assignedTo",
                            "Some 2card date", 
                            "Some 2card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                        new CKanbanSectionCard(
                            "Some 3card title", 
                            "Some 3card desc", 
                            73, 
                            "Some 3card est", 
                            "Some 3card author",
                            "Some 3card assignedTo",
                            "Some 3card date", 
                            "Some 3card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        )
                    ]
                ),
                new CKanbanSection(
                    "some 3section header", 
                    [
                        new CKanbanSectionCard(
                            "Some card title", 
                            "Some card desc", 
                            73, 
                            "Some card est", 
                            "Some card author",
                            "Some card assignedTo",
                            "Some card date", 
                            "Some card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                    ]
                ),
                new CKanbanSection(
                    "some 4section header", 
                    [
                        new CKanbanSectionCard(
                            "Some card title", 
                            "Some card desc", 
                            73, 
                            "Some card est", 
                            "Some card author",
                            "Some card assignedTo",
                            "Some card date", 
                            "Some card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                        new CKanbanSectionCard(
                            "Some 2card title", 
                            "Some 2card desc", 
                            73, 
                            "Some 2card est", 
                            "Some 2card author",
                            "Some 2card assignedTo",
                            "Some 2card date", 
                            "Some 2card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        ),
                        new CKanbanSectionCard(
                            "Some 3card title", 
                            "Some 3card desc", 
                            73, 
                            "Some 3card est", 
                            "Some 3card author",
                            "Some 3card assignedTo",
                            "Some 3card date", 
                            "Some 3card last", 
                            [
                                new CKanbanCardComment(
                                    "This is a comment hi", 
                                    "Some randomo", 
                                    "02/11/08"
                                ), 
                                new CKanbanCardComment(
                                    "Some comment", 
                                    "Some Author", 
                                    "Some Date"
                                )
                            ]
                        )
                    ]
                )
            ]
        ),
    }
  },
  created: function () {
    //   console.log('Run code here to fetch kanban data off id ' + this.id);

    //   this.Kanban = {
    //      stuff from API
    //   }
  },
  methods: {
      // The root saving method that is used to save the state of the entire kanban board. Used for saving a section at a time.
    saveKanbanSection(payload: any) {
        this.newKanban.KanbanSections[payload.sectionIndex] = payload.newSection;
    },
    deleteKanbanSection(sectionIndex: number) {
        this.newKanban.KanbanSections.splice(sectionIndex, 1);
    },
    updateKanbanTitle(newTitle: string) {
        this.newKanban.KanbanTitle = newTitle;
    }
  }
})
</script>