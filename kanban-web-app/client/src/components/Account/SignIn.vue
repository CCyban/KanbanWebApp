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
            </div>
        </b-form>
	</b-jumbotron>



</template>

<script lang="ts">
import { CAccount } from '@/classes/CAccount';
import axios from 'axios';
import Vue from 'vue';
import { maxLength, required, ValidationParams } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'SignIn',
    data() {
        return {
            Username: "",
            Password: "",
            accountToken: "",
        }
    },
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
        }
    },
    methods: {
        signInAttempt() {
            axios.post('http://localhost:8090/accounts/', new CAccount(this.Username, this.Password))
                .then(res => {
                    this.accountToken = res.data.accountToken;
                    localStorage.setItem("accountToken", this.accountToken);
                    this.$router.push({ name: 'Home', params: { accountToken: this.accountToken }})
                })
                .catch(() => console.log('Failed to get account token (probably because details do not match). Add alert error logic here'));
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