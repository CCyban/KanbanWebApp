<template>
    <div>
        <b-row class="mb-4">
            <b-form-group>
                <h5>Title: </h5>
                <b-form-textarea
                    rows=2
                    max-rows="6"
                    v-model="$v.localKanbanCardCopy.Title.$model"
                    :state="!$v.localKanbanCardCopy.Title.$invalid"
                    class="overflow-auto"
                />
                <b-form-text
                    text-variant="danger"
                    v-if="!$v.localKanbanCardCopy.Title.required">
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    Title is required
                </b-form-text>
                <b-form-text
                    text-variant="danger"
                    v-if="!$v.localKanbanCardCopy.Title.maxLength">
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    No longer than {{ $v.localKanbanCardCopy.Title.$params.maxLength.max }} characters
                </b-form-text>
            </b-form-group>
        </b-row>
        <b-row class="mb-4">
            <b-form-group>
                <h5>Description: </h5>
                <b-form-textarea
                    rows=4
                    max-rows="32"
                    v-model="localKanbanCardCopy.Description"
                    :state="!$v.localKanbanCardCopy.Description.$invalid"
                    class="overflow-auto"
                />
                <b-form-text
                    text-variant="danger"
                    v-if="!$v.localKanbanCardCopy.Description.required">
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    Description is required
                </b-form-text>
                <b-form-text
                    text-variant="danger"
                    v-if="!$v.localKanbanCardCopy.Description.maxLength">
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    No longer than {{ $v.localKanbanCardCopy.Description.$params.maxLength.max }} characters
                </b-form-text>
            </b-form-group>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-form-group>
                    <h5>Priority: </h5>
                    <b-form-input
                        type="number"
                        v-model="localKanbanCardCopy.Priority"
                        :min='$v.localKanbanCardCopy.Priority.$params.minValue.min'
                        :max='$v.localKanbanCardCopy.Priority.$params.maxValue.max'
                        :state="!$v.localKanbanCardCopy.Priority.$invalid"
                    />
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.minValue">
                        <b-icon-exclamation-circle-fill font-scale="1.15" />
                        No negatives
                    </b-form-text>
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.maxValue">
                        <b-icon-exclamation-circle-fill font-scale="1.15" />
                        No longer than 2 digits
                    </b-form-text>
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Priority.required">
                        <b-icon-exclamation-circle-fill font-scale="1.15" />
                        Please enter a value
                    </b-form-text>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <h5>Estimation: </h5>
                    <b-form-input
                        type="text"
                        v-model="localKanbanCardCopy.Estimation"
                        :state="!$v.localKanbanCardCopy.Estimation.$invalid"
                    />
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.Estimation.maxLength">
                        <b-icon-exclamation-circle-fill font-scale="1.15" />
                        No longer than {{ $v.localKanbanCardCopy.Estimation.$params.maxLength.max }} characters
                    </b-form-text>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row class="mb-4">
            <b-col>
                <b-form-group>
                    <h5>Author: </h5>
                    <p>{{ localKanbanCardCopy.Author }}</p>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group>
                    <h5>Assigned To: </h5>
                    <b-form-input
                        type="text"
                        v-model="localKanbanCardCopy.assignedTo"
                        :state="!$v.localKanbanCardCopy.assignedTo.$invalid"/>
                    <b-form-text
                        text-variant="danger"
                        v-if="!$v.localKanbanCardCopy.assignedTo.maxLength">
                        <b-icon-exclamation-circle-fill font-scale="1.15" />
                        No longer than {{ $v.localKanbanCardCopy.assignedTo.$params.maxLength.max }} characters
                    </b-form-text>
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
            <b-alert variant="danger" class="text-center" :show="$v.localKanbanCardCopy.$invalid">
                Before Saving: Please complete all fields shown with a
                <b-icon-exclamation-circle font-scale="1.15" />
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
                        variant="success"
                        block
                        :disabled="$v.localKanbanCardCopy.$invalid"
                        @click="saveCardData();">
                        Save Changes
                    </b-button>
                </b-col>
            </b-row>
        </template>
    </div>
</template>

<script>
import { required, minValue, maxValue, maxLength } from 'vuelidate/lib/validators'
export default {
  name: 'KanbanCardEdit',
  props: {
      kanbanCard: Object,
      saveKanbanCardEmit: Function,
  },
    methods: {
        saveCardData() {
            // Component's event method to save the new card data
            if (!this.$v.localKanbanCardCopy.$invalid) {                
                this.localKanbanCardCopy.lastUpdated = new Date().toLocaleDateString('en-UK', { day:'2-digit', month: '2-digit', year: 'numeric' });
                this.saveKanbanCardEmit(this.localKanbanCardCopy);
            }
        },
        cancelCardData() {
            // Discards the newly altered card data
            this.localKanbanCardCopy = {...this.kanbanCard};
        },
    },
    validations: {
        // Vuelidate validation to cover the card's data changes
        localKanbanCardCopy: {
            Title: {
                required,
                maxLength: maxLength(256)
            },
            Description: {
                required,
                maxLength: maxLength(4096)
            },
            Priority: {
                maxValue: maxValue(99),
                minValue: minValue(0),
                required,
            },
            Estimation: {
                maxLength: maxLength(64),
            },
            assignedTo: {
                maxLength: maxLength(64),
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
        hasDataChanged() {
            // Detects if the kanban's card data has been altered
            return Object.entries(this.kanbanCard).toString() != Object.entries(this.localKanbanCardCopy).toString();
        },
    }
}
</script>