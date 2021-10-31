<template>
    <div>
        <b-form-group class="mb-5"
            :state="!$v.localSectionHeaderCopy.$invalid">
            <h5>Section Header:</h5>
            <b-input-group>
                <b-form-input
                    type="text"
                    v-model="localSectionHeaderCopy" 
                    :state="!$v.localSectionHeaderCopy.$invalid"
                />
                <b-input-group-append>
                    <b-button
                        variant="success"
                        size="md"
                        @click="saveKanbanSectionHeader(localSectionHeaderCopy)"
                        :disabled="sectionHeader === localSectionHeaderCopy || $v.localSectionHeaderCopy.$invalid">
                        Change
                    </b-button>
                </b-input-group-append>
            </b-input-group>
            <b-form-text
                text-variant="danger"
                v-if="$v.localSectionHeaderCopy.$invalid">
                <b-icon-exclamation-circle-fill font-scale="1.15" />
                {{ invalidFeedback }}
            </b-form-text>
        </b-form-group>

        <b-form-group>
            <h5>Delete Section</h5>
            <b-form-text
                v-if="hasCards"
                text-variant="danger">
                <b-icon-exclamation-circle-fill font-scale="1.15" />
                All cards must be removed from the section before deleting it
            </b-form-text>

            <div class="d-grid gap-2">
                <b-button
                    variant="danger"
                    block
                    :disabled="hasCards"
                    @click="deleteSection()">
                    Delete Section
                </b-button>
            </div>
        </b-form-group>
    </div>
</template>


<script lang="ts">
import Vue from 'vue';
import { required, maxLength } from 'vuelidate/lib/validators'

export default Vue.extend({
    props: {
        sectionHeader: String,
        saveKanbanSectionHeader: Function,
        hasCards: Boolean,
        deleteSection: Function,
    },
    data() {
        return {
            localSectionHeaderCopy: this.sectionHeader,
        }
    },
    validations: {
        // Vuelidate validation to cover the component's data changes
        localSectionHeaderCopy: {
            required,
            maxLength: maxLength(256)
        },
    },
    computed: {
        invalidFeedback() : String {
            if (!this.$v.localSectionHeaderCopy.required) {
                return "Requires input"
            }
            else if (!this.$v.localSectionHeaderCopy.maxLength) {
                return "No longer than " + this.$v.localSectionHeaderCopy.$params.maxLength.max + " characters";
            }
            else {
                return "Invalid state, please refresh"
            }
        }
    }
})
</script>