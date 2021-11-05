<template>
    <div class="mb-4">
        <b-card class="text-center card-brand-variant">
            <template 
                v-if="isTitleEditable">
                <b-input-group class="mb-3">
                    <b-input 
                        v-model="computedTitle"
                        :state="!$v.newTitle.$invalid"
                    />
                    <b-input-group-append>
                        <b-button 
                            variant="success" 
                            size="sm" 
                            @click="saveNewTitle(); toggleEditableTitle();"
                            :disabled="Title === newTitle || $v.newTitle.$invalid"
                            v-b-tooltip.hover
                            title="Save Kanban Title Edit">
                            <b-icon 
                                class="align-middle" 
                                icon="check2" 
                                font-scale="2"
                                aria-label="Save Kanban Title Edit"
                            />
                        </b-button>
                        <b-button 
                            variant="danger" 
                            size="sm" 
                            @click="newTitle=Title; toggleEditableTitle();"
                            v-b-tooltip.hover
                            title="Cancel Kanban Title Edit">
                            <b-icon 
                                class="align-middle" 
                                icon="x" 
                                font-scale="2"
                                aria-label="Cancel Kanban Title Edit"
                            />
                        </b-button>
                    </b-input-group-append>
                </b-input-group>
                <b-form-text
                    text-variant="danger"
                    v-if="$v.newTitle.$invalid">
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    {{ invalidFeedback }}
                </b-form-text>
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
                                @click="toggleEditableTitle()"
                                v-b-tooltip.hover
                                title="Edit Kanban Title">
                                <b-icon 
                                    class="align-middle" 
                                    icon="pencil-square" 
                                    font-scale="1.75"
                                    aria-label="Edit Kanban Title"
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
                        variant="outline-light"
                        v-b-tooltip.hover
                        title="Kanban Link">
                        Kanban Board ID: {{ id }}
                    </b-button>
                </b-link>
            </template>
        </b-card>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { required, maxLength } from 'vuelidate/lib/validators'


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
    validations: {
        // Vuelidate validation to cover the component's data changes
        newTitle: {
            required,
            maxLength: maxLength(256)
        },
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
        },
        invalidFeedback() : String {
            if (!this.$v.newTitle.required) {
                return "Requires input"
            }
            else if (!this.$v.newTitle.maxLength) {
                return "No longer than " + this.$v.newTitle.$params.maxLength.max + " characters";
            }
            else {
                return "Invalid state, please refresh"
            }
        }
    },
})
</script>

<style scoped>
	.card-brand-variant {
		background-image:
		linear-gradient(
			to bottom right,
			#A9043A, #63048C
		);
		color: white;
	}
</style>