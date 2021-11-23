<template>
	<b-jumbotron class="jumbotron-brand-variant p-5" header="Sign In" lead="Welcome Back!">
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
            <div class="d-grid mt-5">
                <b-button
                    class="btn-brand-variant"
                    :disabled="$v.$invalid"
                    @click="signInAttempt()">
                    Sign In
                </b-button>
                <b-alert variant="danger" :show="this.accountRequestDoesNotExist" class="text-center mt-4 mb-0 p-2" >
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                        Cannot sign in. Please check your details are correct.
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
import axios, { AxiosError } from 'axios';
import { maxLength, required, ValidationParams } from 'vuelidate/lib/validators';

// Classes
import { CAccount } from '@/classes/CAccount';

// Enumerations
import { apiDataState } from '@/enumerations/apiDataState';

export default Vue.extend({
    name: 'SignIn',
    data() {
        return {
            Username: "",
            Password: "",
            accountToken: "",
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
        }
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

        // Computed boolean properties based on the enumeration states of the accountRequestState.
        // Needed because enumeration checking is not supported through inline code on the template.
        accountRequestDoesNotExist(): boolean {
			return this.accountRequestState == apiDataState.DoesNotExist;
		},
        accountRequestErrored(): boolean {
			return this.accountRequestState == apiDataState.Errored;
		}
    },
    methods: {
        // API request: POSTs account data to the server for a token response
        // If successful then the client will react accordingly, if failed then an error alert will be shown.
        signInAttempt() {
            axios.post('http://localhost:8090/accounts/token', new CAccount(this.Username, this.Password))
                .then(res => {
                    this.accountToken = res.data.accountToken;
                    localStorage.setItem("accountToken", this.accountToken);
                    this.$router.push({ name: 'Home', params: { accountToken: this.accountToken }})
                })
                .catch((err: AxiosError) => {
                    if (err.response?.status == 404) {
                        this.accountRequestState = apiDataState.DoesNotExist;
                    }
                    else {
                        this.accountRequestState = apiDataState.Errored;
                    }
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