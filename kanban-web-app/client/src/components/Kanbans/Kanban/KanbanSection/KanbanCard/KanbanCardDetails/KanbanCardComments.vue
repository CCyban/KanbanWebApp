<template>
    <div>
        <div>
            <h2 class="my-4">Comments</h2>
            <b-list-group>
                <b-list-group-item v-for="(Comment, index) in kanbanCard.Comments" :key="Comment.Comment" class="overflow-auto">
                    <b-form-group
                        :label-for="'comment_' + index">
                        <template #label>
                            <h2 class="h5"><b-avatar square /> {{ Comment.Author }} - {{ Comment.Date }}</h2>
                        </template>
                        <p
                            :id="'comment_' + index">
                            {{ Comment.Comment }}
                        </p>
                    </b-form-group>
                </b-list-group-item>
                <b-list-group-item>
                    <b-form-group
                        label-for="newCommentInput">
                        <template #label>
                            <h2 class="h5"><b-avatar /> You - Today</h2>
                        </template>
                        <b-textarea
                            id="newCommentInput"
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
                    </b-form-group>
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script lang="ts">

// General Imports
import Vue, { PropType } from 'vue';
import jwt from 'jsonwebtoken';
import { maxLength } from 'vuelidate/lib/validators'

// Classes
import { CAccount } from '@/classes/CAccount';

// Interfaces
import { IKanbanSectionCard } from '@/interfaces/IKanbanSectionCard';

export default Vue.extend({    
    name: 'KanbanCardComments',
    props: {
        kanbanCard: Object as PropType<IKanbanSectionCard>,
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
            // Get the username from account token
            const Account: CAccount = jwt.decode(localStorage.getItem('accountToken') ?? "") as CAccount;

            // Component's event method to save a new comment on the card
            let localKanbanCardCopy = {...this.kanbanCard};
            localKanbanCardCopy.Comments.push({
                Comment: this.newComment,
                Author: Account.Username,
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
})
</script>