<template>
  <div>
    <h2
      class="mb-4">
      {{ Kanban.name }}
    </h2>
    <div class="row">
      <div v-for="(sectionKanban, index) in Kanban" :key="index" class="col-sm">
        <kanban-section :kanbanSection="sectionKanban" :sectionHeader="'Some section header'" :sectionIndex="index" :saveKanbanSection="saveKanbanSection"></kanban-section>
      </div>
    </div>
  </div>
</template>

<script>
import KanbanSection from './KanbanSection/KanbanSection.vue'

export default {
  name: 'Kanban',
  components: {
    KanbanSection,
  },
  data() {
      return {
          id: this.$route.params.id,
          Kanban: [
            [
                {
                kanbanCard: {
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
                }
                },
                {
                kanbanCard: {
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
                }
                },
                {
                kanbanCard: {
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
                }
                },
            ],
            [
                {
                kanbanCard: {
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
                }
                },
                {
                kanbanCard: {
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
                }
                },
                {
                kanbanCard: {
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
                }
                },
            ],
            [
            {
            kanbanCard: {
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
            }
            },
            {
            kanbanCard: {
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
            }
            },
            {
            kanbanCard: {
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
            }
            },
          ]
          ]
      }
  },
  created: function () {
    //   console.log('Run code here to fetch kanban data off id ' + this.id);

    //   this.Kanban = {
    //      stuff from API
    //   }
  },
  methods: {
    saveKanbanSection(payload) {
        this.Kanban[payload.sectionIndex] = payload.newKanbanSection;
    }
  }
}
</script>