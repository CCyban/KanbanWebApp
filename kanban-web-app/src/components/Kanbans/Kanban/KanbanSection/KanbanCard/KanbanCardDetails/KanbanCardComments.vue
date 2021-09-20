<template>
    <div>
        <hr />
        <div>
            <h4>Comments</h4>
            <b-list-group>
                <b-list-group-item v-for="Comment in kanbanCard.Comments" :key="Comment.Comment"> 
                     <p><b-avatar />{{ Comment.Author }} - {{ Comment.Date }}</p>
                    {{ Comment.Comment }}
                </b-list-group-item>
                <b-list-group-item>
                    <p><b-avatar />You - Today</p>
                    <b-textarea v-model="newComment" />
                    <template v-if="newComment">
                        <b-row
                            class="text-center mt-3">
                            <b-col>
                                <b-button
                                    variant="outline-danger"
                                    block
                                    @click="discardComment();">
                                    Discard Comment
                                </b-button>
                            </b-col>
                            <b-col>
                                <b-button
                                    variant="outline-success"
                                    block
                                    @click="saveComment();">
                                    Submit Comment
                                </b-button>
                            </b-col>
                        </b-row>
                    </template>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'KanbanCardComments',
    props: {
        kanbanCard: Object,
        saveKanbanCardEmit: Function,
    },
    data() {
        return {
            newComment: "",
        }
    },
    methods: {
        saveComment() {
            let localKanbanCardCopy = {...this.kanbanCard};
            localKanbanCardCopy.Comments.push({
                Comment: this.newComment,
                Author: 'You',
                Date: new Date().toLocaleDateString('en-UK', { day:'2-digit', month: '2-digit', year: 'numeric' }),
            })
            this.saveKanbanCardEmit(localKanbanCardCopy);
            this.newComment = "";
        },
        discardComment() {
            this.newComment = "";
        },
    }
}
</script>