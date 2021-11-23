<template>
    <div>
        <div
            class="mb-4 mr-auto text-left">
            <h1
                class="font-brand-simple">
                Account Management
            </h1>
            <h3>
                Deletion<b-icon-caret-down-fill class="font-brand-simple"/>
            </h3>
        </div>

        <b-form-group
            label-for="deleteAccountButton">
            <template #label>
                <h2 class="h5">Delete Account</h2>
            </template>
            <div class="d-grid gap-2 my-2">
                <b-button
                    id="deleteAccountButton"
                    class="largeText"
                    variant="warning"
                    v-b-toggle.delete-collapse
                    v-b-tooltip.hover
                    title="Delete Account"
                    :disabled="accountRequestSuccessful">
                    Delete Account
                </b-button>
            </div>
            <b-collapse id="delete-collapse">
                <div class="d-grid gap-2">
                    <b-button
                        id="deleteAccountConfirmationButton"
                        class="largeText"
                        variant="danger"
                        block
                        @click="accountDeleteAttempt()"
                        v-b-tooltip.hover
                        title="Delete Account Confirmation"
                        :disabled="accountRequestSuccessful">
                        I Am Sure
                    </b-button>
                </div>
            </b-collapse>
        </b-form-group>

        <b-alert variant="danger" :show="accountRequestErrored" class="text-center mt-4 mb-0 p-2" >
            <b-icon-exclamation-circle-fill font-scale="1.15" />
            An error occured. Please try again later.  
        </b-alert>
        <b-alert variant="success" :show="accountRequestSuccessful" class="text-center mt-4 mb-0 p-2" >
            <b-icon-exclamation-circle-fill font-scale="1.15" />
            Your account has been deleted. To regain access, you can 
            <b-link
                :to="{name: 'SignIn'}">
                create another one here.
            </b-link>
        </b-alert>

    </div>
</template>

<script lang="ts">

// General Imports
import axios from 'axios';
import Vue from 'vue';

// Enumerations
import { apiDataState } from '@/enumerations/apiDataState';

export default Vue.extend({
    name: 'DeleteAccount',
    data() {
        return {
            accountRequestState: apiDataState.NotBegun
        }
    },
    computed: {
        // Computed boolean properties based on the enumeration states of the accountRequestState.
        // Needed because enumeration checking is not supported through inline code on the template.
        accountRequestSuccessful(): boolean {
			return this.accountRequestState == apiDataState.Successful;
		},
        accountRequestErrored(): boolean {
			return this.accountRequestState == apiDataState.Errored;
		}
    },
    methods: {
        // Click event for deleting account
        accountDeleteAttempt() {
            const accountToken: string = localStorage.getItem('accountToken') ?? "";

            axios.delete('http://localhost:8090/accounts/', { headers: {"Authorization" : accountToken} })
                .then(() => {
                    localStorage.setItem("accountToken", "");
                    this.accountRequestState = apiDataState.Successful;
                })
                .catch(() => {
                    this.accountRequestState = apiDataState.Errored;
                });
        }
    },
    created: function () {
        // If the user is not signed in (does not have a token), then redirect them to the sign in page
		const accountToken: string = localStorage.getItem('accountToken') ?? "";
        if (accountToken == "") {
            this.$router.push({ name: 'SignIn' })
        }
	},
})
</script>

<style scoped>
    .jumbotron-brand-variant {
        background-image:
            linear-gradient(
                to bottom right,
                #A9043A, #63048C
            );
		color: white;
	}
    .btn-brand-variant {
        border-style: none;
        background-image:
            linear-gradient(
                to bottom right,
                #8C05A2, #4500B9
            );
        transition: transform 0.5s;
        color: white;
        font-size: 32px;
    }
    .btn-brand-variant:hover {
        background-image:
            linear-gradient(
                to bottom right,
                #8C05A2, #4500B9
            );
        color: white;
        cursor: pointer;
        box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.05);
    }
    .largeText {
        font-size: 28px;
    }
</style>