<template>
    <b-card class="card-brand-variant p-5">
        <div
            class="mb-4 mr-auto text-center">
            <h1
                class="font-brand-simple">
                Account Management
            </h1>
            <h3>
                Sign In<b-icon-caret-down-fill class="font-brand-simple"/>
            </h3>
        </div>
        <b-form>
            <b-form-group 
                class="mb-4" 
                label="Username:" 
                label-for="usernameInput" 
                label-class="mb-1"
                :invalid-feedback="usernameFeedback"
                :state="$v.Username.$dirty ? !$v.Username.$invalid : null">
                <b-form-input 
                    v-model="Username" 
                    :state="$v.Username.$dirty ? !$v.Username.$invalid : null"
                    @input="$v.Username.$touch()"
                    id="usernameInput" 
                    type="text" 
                    label />
            </b-form-group>
            <b-form-group
                class="mb-4" 
                label="Password:" 
                label-for="passwordInput" 
                label-class="mb-1"
                :invalid-feedback="passwordFeedback"
                :state="$v.Password.$dirty ? !$v.Password.$invalid : null">
                <b-form-input 
                    v-model="Password" 
                    :state="$v.Password.$dirty ? !$v.Password.$invalid : null"
                    @input="$v.Password.$touch()"
                    id="passwordInput" 
                    type="password" 
                    label />
            </b-form-group>
            <b-button
                variant="outline-light"
                :disabled="$v.$invalid">
                Sign In
            </b-button>
        </b-form>
    </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { maxLength, required, ValidationParams } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'SignIn',
    data() {
        return {
            Username: "",
            Password: "",
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
    }
})
</script>

<style scoped>
    .card-brand-variant {
        background-image:
            linear-gradient(
                to bottom right,
                #63048C, #4500B9
            );
		color: white;
    }
</style>