<template>
  <div>
    <h2
      class="mb-4">
      {{ Kanban.name }}
    </h2>
    <div class="row">
      <div v-for="(kanbanSection, index) in Kanban" :key="index" class="col-sm">
        <kanban-section :kanbanSection="kanbanSection" :sectionIndex="index" :saveKanbanSection="saveKanbanSection" :deleteKanbanSection="deleteKanbanSection"></kanban-section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import KanbanSection from './KanbanSection/KanbanSection.vue'
import { Route } from 'vue-router'

export default Vue.extend({
  name: 'Kanban',
  components: {
    KanbanSection,
  },
  data() {
      return {
          id: this.$route.params.id,
          Kanban: [
            {
                kanbanSectionHeader: 'Test1Section',
                kanbanSectionCards:
                [
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                ]
            },
            {
                kanbanSectionHeader: 'huhSection',
                kanbanSectionCards:
                [
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                    {
                        Title: 'Issue with saving profile password',
                        Description: "When clicking the save button in in account management, the website pretends everything is okay but it doesn't actually save the password",
                        Priority: 9,
                        Estimation: '12 hours',
                        dateCreated: '12/05/2019',
                        lastUpdated: '11/09/2021',
                        Comments: [
                            {
                                Comment: "Can someone add an estimate?", 
                                Author: "Head of Development",
                                Date: '12/06/2019'
                            },
                            {
                                Comment: "Added an estimate after speaking about it with the team!",
                                Author: "Scrum Master",
                                Date: '24/08/2020'
                            }
                        ],
                        assignedTo: "Tom Scott",
                        Author: "Bob Smith"
                    },
                ]
            },
        ],
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
        this.Kanban[payload.sectionIndex] = payload.newKanbanSection;
    },
    deleteKanbanSection(sectionIndex: number) {
        this.Kanban.splice(sectionIndex, 1);
    }
  }
})
</script>