<template>
    <div class="mb-4">
        <b-card text-variant="white" bg-variant="dark" class="text-center">
            <template 
                v-if="isTitleEditable">
                <b-input-group>
                    <b-input 
                        v-model="computedTitle"
                    />
                    <b-input-group-append>
                        <b-button 
                            variant="success" 
                            size="sm" 
                            @click="saveNewTitle(); toggleEditableTitle();">
                            <b-icon 
                                class="align-middle" 
                                icon="check2" 
                                font-scale="2"
                            />
                        </b-button>
                        <b-button 
                            variant="danger" 
                            size="sm" 
                            @click="toggleEditableTitle">
                            <b-icon 
                                class="align-middle" 
                                icon="x" 
                                font-scale="2"
                            />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
            </template>
            <h1 v-else>
                <b-row
                    class="justify-content-between">
                    <b-col
                        lg="2"
                    />
                    <b-col 
                        cols="12" 
                        md="auto">
                        {{ Title }}
                    </b-col>
                    <b-col 
                        lg="2">
                        <template v-if="!isTitleEditable">
                            <b-button 
                                variant="outline-light" 
                                size="sm" 
                                @click="toggleEditableTitle">
                                <b-icon 
                                    class="align-middle" 
                                    icon="pencil-square" 
                                    font-scale="1.75"
                                />
                            </b-button>
                        </template>
                    </b-col>
                </b-row>
            </h1>
            <template
                #footer>
                <b-link
                    v-bind:to="id">
                    <b-button 
                        variant="outline-light">
                        Kanban Board ID: {{ id }}
                    </b-button>
                </b-link>
            </template>
        </b-card>
    </div>
</template>


<script lang="ts">

import Vue from 'vue'
export default Vue.extend({
    props: {
        id: String,
        Title: String,
        updateTitle: Function,
    },
    data() {
        return {
            isTitleEditable: false,
            newTitle: "",
        }
    },
    created: function() {
        this.newTitle = this.Title;
    },
    methods: {
        toggleEditableTitle(): void {
            this.isTitleEditable = !this.isTitleEditable;
        },
        saveNewTitle(): void {
            this.updateTitle(this.newTitle);
        }
    },
    computed: {
        computedTitle: {
            get(): string { 
                return this.Title;
            },
            set(newTitle: string): void {
                this.newTitle =  newTitle;
            }
        }
    }
})
</script>