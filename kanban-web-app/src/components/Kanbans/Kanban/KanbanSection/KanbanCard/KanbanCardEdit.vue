<template>
    <div>
        <b-row class="mb-4">
            <b-form-group>
                <h5>Description: </h5>
                <b-form-textarea v-model="localKanbanCardCopy.Description" />
                <b-form-text
                    text-variant="danger"
                    v-if="!$v.localKanbanCardCopy.Description.required">
                    *Description is required
                </b-form-text>
            </b-form-group>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-form-group>
                    <h5>Priority: </h5>
                    <b-form-input type="number" v-model="localKanbanCardCopy.Priority" min=0 max=99 />
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.minValue">
                        *No negatives
                    </b-form-text>
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.maxValue">
                        *No longer than 2 digits
                    </b-form-text>
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.required">
                        *Please enter a value
                    </b-form-text>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <h5>Estimation: </h5>
                    <b-form-input type="text" v-model="localKanbanCardCopy.Estimation" />
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-form-group>
                    <h5>Date Created: </h5>
                    <p>{{ localKanbanCardCopy.dateCreated }}</p>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <h5>Last Updated: </h5>
                    <p>{{ localKanbanCardCopy.lastUpdated }}</p>
                </b-form-group>
            </b-col>
        </b-row>

        <template v-if="hasDataChanged">
            <b-alert variant="danger" :show="$v.localKanbanCardCopy.$invalid">
                Please complete all requirements shown with a *
            </b-alert>

            <b-row
                class="text-center">
                <b-col>
                    <b-button
                        variant="outline-danger"
                        block
                        @click="cancelCardData();">
                        Cancel Changes
                    </b-button>
                </b-col>
                <b-col>
                    <b-button
                        variant="outline-success"
                        block
                        :disabled="$v.localKanbanCardCopy.$invalid"
                        @click="saveCardData();">
                        Save Changes
                    </b-button>
                </b-col>
            </b-row>
        </template>
        <hr />

        <div>
            <h4>Comments</h4>
        </div>

    </div>
</template>

<script>
import { required, maxValue, minValue } from 'vuelidate/lib/validators'

export default {
    name: 'KanbanCardEdit',
    props: {
        kanbanCard: Object,
    },
    methods: {
        hideModal() {
            this.$emit('toggleModal');
        },
        saveCardData() {
            if (!this.$v.localKanbanCardCopy.$invalid) {                
                this.localKanbanCardCopy.lastUpdated = new Date().toLocaleDateString('en-UK', { day:'2-digit', month: '2-digit', year: 'numeric' });
                this.$emit('saveKanbanCard', {...this.localKanbanCardCopy});
            }
        },
        cancelCardData() {
            this.localKanbanCardCopy = {...this.kanbanCard};
        }
    },
    validations: {
        localKanbanCardCopy: {
            Description: {
                required
            },
            Priority: {
                maxValue: maxValue(99),
                minValue: minValue(0),
                required,
            }
        }
    },
    data() {
        return {
            localKanbanCardCopy: undefined,
        }
    },
    beforeMount: function() {
        this.localKanbanCardCopy = {...this.kanbanCard};
    },
    computed: {
        hasDataChanged: function() {
            return Object.entries(this.kanbanCard).toString() != Object.entries(this.localKanbanCardCopy).toString();
        }
    }
}
</script>
