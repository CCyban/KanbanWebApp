<template>
	<b-jumbotron class="jumbotron-brand-variant p-5" header="Create Account" lead="Join the fun!">
		<hr class="my-4" />
        <b-form>
            <b-form-group 
                class="mb-4" 
                label="Username:" 
                label-for="usernameInput" 
                label-class="mb-1">
                <b-form-input 
                    v-model="Username" 
                    :state="$v.Username.$dirty ? !$v.Username.$invalid : null"
                    @input="$v.Username.$touch()"
                    id="usernameInput" 
                    type="text" 
                    label />
                <b-alert variant="danger" class="text-center mt-2 p-2" :show="$v.Username.$dirty ? $v.Username.$invalid : null">
                    <b-icon-exclamation-circle font-scale="1.15" />
                    {{ usernameFeedback }}
                </b-alert>
            </b-form-group>
            <b-form-group
                class="mb-4" 
                label="Password:" 
                label-for="passwordInput" 
                label-class="mb-1">
                <b-form-input 
                    v-model="Password" 
                    :state="$v.Password.$dirty ? !$v.Password.$invalid : null"
                    @input="$v.Password.$touch()"
                    id="passwordInput" 
                    type="password" 
                    label />
                <b-alert variant="danger" class="text-center mt-2 p-2" :show="$v.Password.$dirty ? $v.Password.$invalid : null">
                    <b-icon-exclamation-circle font-scale="1.15" />
                    {{ passwordFeedback }}
                </b-alert>
            </b-form-group>
            <b-form-group
                class="mb-4" 
                label="Confirm Password:" 
                label-for="confirmPasswordInput" 
                label-class="mb-1">
                <b-form-input 
                    v-model="confirmPassword" 
                    :state="$v.confirmPassword.$dirty ? !$v.confirmPassword.$invalid : null"
                    @input="$v.confirmPassword.$touch()"
                    id="confirmPasswordInput" 
                    type="password" 
                    label />
                <b-alert variant="danger" class="text-center mt-2 p-2" :show="$v.confirmPassword.$dirty ? $v.confirmPassword.$invalid : null">
                    <b-icon-exclamation-circle font-scale="1.15" />
                    {{ confirmPasswordFeedback }}
                </b-alert>
            </b-form-group>
            <div class="d-grid mt-5">
                <b-button
                    class="btn-brand-variant"
                    :disabled="$v.$invalid"
                    @click="createAccountAttempt()">
                    Create Account
                </b-button>
                <b-alert variant="danger" :show="this.accountRequestAlreadyExists" class="text-center mt-4 mb-0 p-2" >
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                        Username is already in use. Please input a different one. 
                </b-alert>
                <b-alert variant="danger" :show="this.accountRequestErrored" class="text-center mt-4 mb-0 p-2" >
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                        An error occured. Please try again later.
                </b-alert>
            </div>
        </b-form>
    </b-jumbotron>
</template>

<script lang="ts">

// General Imports
import Vue from 'vue';
import { sameAs, maxLength, required } from 'vuelidate/lib/validators';
import axios, { AxiosError } from 'axios';

// Classes
import { CAccount } from '@/classes/CAccount'

// Enumerations
import { apiDataState } from '@/enumerations/apiDataState';

export default Vue.extend({
    name: 'CreateAccount',
    data() {
        return {
            Username: "",
            Password: "",
            confirmPassword: "",
            accountRequestState: apiDataState.NotBegun
        }
    },
    // Vuelidate validation to cover the component's data changes
    validations: {
        Username: {
            required: required,
            maxLength: maxLength(32),
        },
        Password: {
            required: required,
            maxLength: maxLength(256),
        },
        confirmPassword: {
            required: required,
            sameAs: sameAs('Password'),
        },
    },
    computed: {
        // Computed string property based on the state of the Username. Each state gives a different string of feedback.
        usernameFeedback(): string {
            if (!this.$v.Username.required) {
                return "Username required";
            }
            else if (!this.$v.Username.maxLength) {
                return "Username cannot be longer than " + this.$v.Username.$params.maxLength.max;
            }
            else {
                return "Invalid state, please refresh";
            }
        },
        // Computed string property based on the state of the Password. Each state gives a different string of feedback.
        passwordFeedback(): string {
            if (!this.$v.Password.required) {
                return "Password required";
            }
            else if (!this.$v.Password.maxLength) {
                return "Password cannot be longer than " + this.$v.Password.$params.maxLength.max;
            }
            else {
                return "Invalid state, please refresh";
            }
        },
        // Computed string property based on the state of the confirmPassword. Each state gives a different string of feedback.
        confirmPasswordFeedback(): string {
            if (!this.$v.confirmPassword.required) {
                return "Confirmation Password required";
            }
            else if (!this.$v.confirmPassword.sameAs) {
                return "Passwords do not match";
            }
            else {
                return "Invalid state, please refresh";
            }
        },

        // Computed boolean properties based on the enumeration states of the accountRequestState.
        // Needed because enumeration checking is not supported through inline code on the template.
        accountRequestAlreadyExists(): boolean {
			return this.accountRequestState == apiDataState.AlreadyExists;
		},
        accountRequestErrored(): boolean {
			return this.accountRequestState == apiDataState.Errored;
		}
    },
    methods: {
        createAccountAttempt() {
            const Account: CAccount = new CAccount(this.Username, this.Password);

            axios.post('http://localhost:8090/accounts/', Account)
                .then(res => {
                    localStorage.setItem('accountToken', res.data.accountToken);
                    this.getAccountToken(Account);
                })
			.catch((err: AxiosError) => {
				if (err.response?.status == 409) {
					this.accountRequestState = apiDataState.AlreadyExists;
				}
				else {
					this.accountRequestState = apiDataState.Errored;
				}
			});
        },
        getAccountToken(Account: CAccount) {
            axios.post('http://localhost:8090/accounts/token', Account)
                .then(res => {
                    localStorage.setItem('accountToken', res.data.accountToken);
                    this.$router.push({ name: 'Home' })
                })
			.catch((err: AxiosError) => {
					this.accountRequestState = apiDataState.Errored;
			});
        }
    }
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
</style>