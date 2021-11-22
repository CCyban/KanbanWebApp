<template>
	<b-jumbotron class="jumbotron-brand-variant p-5" header="Change Password" lead="You will have to sign back in after this">
		<hr class="my-4" />
        <b-form>
            <b-form-group
                class="mb-4" 
                label="Password:" 
                label-for="passwordInput" 
                label-class="mb-1">
                <b-form-input 
                    v-model="Password" 
                    :state="$v.Password.$dirty ? !$v.Password.$invalid : null"
                    @input="$v.Password.$touch()"
                    :disabled="this.accountRequestSuccessful"
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
                    :disabled="this.accountRequestSuccessful"
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
                    :disabled="$v.$invalid || this.accountRequestSuccessful"
                    @click="changePasswordAttempt()">
                    Change Password
                </b-button>
                <b-alert variant="danger" :show="this.accountRequestErrored" class="text-center mt-4 mb-0 p-2" >
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    An error occured. Please try again later.  
                </b-alert>
                <b-alert variant="success" :show="this.accountRequestSuccessful" class="text-center mt-4 mb-0 p-2" >
                    <b-icon-exclamation-circle-fill font-scale="1.15" />
                    Your password has been changed. To regain access, please 
                    <b-link
                        :to="{name: 'SignIn'}">
                        sign In.
                    </b-link>
                </b-alert>
            </div>
        </b-form>
	</b-jumbotron>
</template>

<script lang="ts">
import { apiDataState } from '@/enumerations/apiDataState';
import axios from 'axios';
import Vue from 'vue';
import { maxLength, required, sameAs } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'ChangePassword',
    data() {
        return {
            Password: "",
            confirmPassword: "",
            accountRequestState: apiDataState.NotBegun
        }
    },
    validations: {
        Password: {
            required: required,
            maxLength: maxLength(256),
        },
        confirmPassword: {
            required: required,
            sameAs: sameAs('Password'),
        }
    },
    computed: {
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
        accountRequestErrored(): boolean {
			return this.accountRequestState == apiDataState.Errored;
		},
        accountRequestSuccessful(): boolean {
			return this.accountRequestState == apiDataState.Successful;
		}
    },
    methods: {
        changePasswordAttempt() {
            const accountToken: string = localStorage.getItem('accountToken') ?? "";

            axios.put('http://localhost:8090/accounts/changePassword', { newPassword: this.Password }, { headers: {"Authorization" : accountToken} })
                .then(() => {
                    localStorage.setItem("accountToken", "");
                    this.accountRequestState = apiDataState.Successful;
                })
                .catch(() => {
                        this.accountRequestState = apiDataState.Errored;
                });
        },
    },
    created: function () {
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
</style>