<template>
    <div>
        <div>
            <h2 class="my-4">Comments</h2>
            <b-list-group>
                <b-list-group-item v-for="Comment in kanbanCard.Comments" :key="Comment.Comment" class="overflow-auto"> 
                     <h5><b-avatar square /> {{ Comment.Author }} - {{ Comment.Date }}</h5>
                    {{ Comment.Comment }}
                </b-list-group-item>
                <b-list-group-item>
                    <h5><b-avatar /> You - Today</h5>
                    <b-textarea
                        v-model="newComment"
                        rows=4
                        max-rows="32"
                    />
                    <b-alert variant="danger" class="text-center mt-4" :show="!$v.newComment.maxLength">
                        <b-icon-exclamation-circle font-scale="1.15" />
                        No longer than {{ $v.newComment.$params.maxLength.max }} characters in a comment
                    </b-alert>
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
                                    variant="success"
                                    block
                                    :disabled='!$v.newComment.maxLength'
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
import { maxLength } from 'vuelidate/lib/validators'
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
    validations: {
        // Vuelidate validation to cover the card's data changes
        newComment: {
            maxLength: maxLength(4096),
        }
    },
    methods: {
        saveComment() {
            // Component's event method to save a new comment on the card
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
            // Discards the newly typed comment
            this.newComment = "";
        },
    }
}
</script>