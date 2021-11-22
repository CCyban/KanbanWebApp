<template>
  	<div>
		<div
			class="mb-4 mr-auto text-left">
			<h1
				class="font-brand-simple">
				Account Management
			</h1>
			<h3>
				Options<b-icon-caret-down-fill class="font-brand-simple"/>
			</h3>
		</div>
        <b-row
            class="vh-60">
			<router-link
				to="/Account/Settings"
				:disabled = !accountToken
				tag="button"
				class="col-sm btn btn-brand-big mb-3 btn-lg">
                <b-icon-gear
                    font-scale="2.75"
					class="mb-4"/>
                <h3>
					Change Account Settings
				</h3>
                <small>
					All account settings regarding this account
				</small>
			</router-link>
			<div class="col d-flex flex-column ml-4 mr-4 mb-3 px-3">
				<template
					v-if="accountToken">
					<b-button 
						class="col-sm btn-brand-big"
						size="lg"
						@click="signOut()">
						<b-icon-box-arrow-right
							font-scale="2.75"
							class="mb-4"/>
						<h3>Sign Out</h3>
					</b-button>
					</template>
				<template
					v-else>
					<router-link
						to="/Account/SignIn"
						tag="button"
						class="btn btn-brand-big btn-lg h-50 mb-2">
						<b-icon-box-arrow-in-left
							font-scale="2.75"
							class="mb-4"/>
						<h3>Sign In</h3>
					</router-link>
					<router-link
						to="/Account/Create"
						tag="button"
						class="btn btn-brand-big btn-lg h-50 mt-2">
						<b-icon-person-plus-fill
							font-scale="2.75"
							class="mb-4"/>
						<h3>Create Account</h3>
					</router-link>
				</template>
            </div>
			<router-link
				to="/Account/PrivacyPolicy"
				tag="button"
				class="col-sm btn btn-brand-big mb-3 btn-lg">
				<b-icon-newspaper
                        font-scale="2.75"
						class="mb-4"/>
                <h3>Privacy Policy</h3>
			</router-link>
        </b-row>
  	</div>
</template>


<style scoped>
    .btn-brand-big {
        background-image:
            linear-gradient(
                to bottom right,
                #A9043A, #63048C
            );
		transition: transform 0.5s;
        color: white;
    }
    .btn-brand-big:hover {
        transform: scale(1.04); 
		color: white;
    }
	.vh-60 {
		height: 60vh!important;
	}
</style>

<script lang="ts">
import Vue from 'vue';
import CreateAccount from './CreateAccount.vue'
import SignIn from './SignIn.vue'

export default Vue.extend({
	name: 'Account',
	components: {
		SignIn,
		CreateAccount
	},
	data() {
		return {
			accountToken: localStorage.getItem('accountToken') ?? "",
		} 
	},
	methods: {
		signOut() {
			localStorage.setItem('accountToken', "")
			this.accountToken = "";
		}
	}
})
</script>