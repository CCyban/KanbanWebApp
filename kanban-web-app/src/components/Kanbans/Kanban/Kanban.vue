<template>
  <div>
    <h2
      class="mb-4">
      {{ Kanban.name }}
    </h2>
    <div class="row">
      <div class="col-sm">
        <kanban-section :myArray="myArray1" :sectionHeader="'DEV'"></kanban-section>
      </div>
      <div class="col-sm">
        <kanban-section :myArray="myArray2" :sectionHeader="'DT'"></kanban-section>
      </div>
      <div class="col-sm">
        <kanban-section :myArray="myArray3" :sectionHeader="'QA'"></kanban-section>
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
          Kanban: Object,
          myArray1: [
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
          myArray2: [
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
          myArray3: [
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
      }
  },
  created: function () {
      console.log('Run code here to fetch kanban data off id ' + this.id);

      this.Kanban = {
          id: this.id,
          name: "Sprint 26.1",
          date: Date.now(),
      }
  },
}
</script>