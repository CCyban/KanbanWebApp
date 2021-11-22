<template>
    <div>
        <div
            class="mb-4 mr-auto text-left">
            <h1
                class="font-brand-simple">
                Account Management
            </h1>
            <h3>
                Settings<b-icon-caret-down-fill class="font-brand-simple"/>
            </h3>
        </div>
        <b-row
            class="vh-25">
			<router-link
				to="/Account/ChangePassword"
				tag="button"
				class="col-sm btn btn-brand-big mb-3 btn-lg mvw-30 mx-5">
                <b-icon-gear
                    font-scale="2.75"
					class="mb-4"/>
                <h3>
					Change Password
				</h3>
			</router-link>
			<router-link
				to="/Account/Delete"
				tag="button"
				class="col-sm btn btn-brand-big mb-3 btn-lg mvw-30 mx-5">
				<b-icon-person-x
                        font-scale="2.75"
						class="mb-4"/>
                <h3>Delete Account</h3>
			</router-link>
        </b-row>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    name: 'Settings',

})
</script>

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
	.vh-25 {
		height: 25vh!important;
	}
    .mvw-30 {
		max-width: 30vw!important;
	}
</style>