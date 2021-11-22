<template>
	<b-jumbotron class="jumbotron-brand-variant p-5" header="Kanban Board Web App" lead="Made using VueJS, ExpressJS, NodeJS, &amp; MongoDB alongside with Mongoose.">
		<hr class="my-4" />
		<b-row
			class="vh-40">
			<router-link				
				to="/Kanban"
				tag="button"
				:disabled="accountToken == ''"
				class="col-sm btn btn-brand-big mb-3 btn-lg">
				<b-icon-gear
					font-scale="2.75"
					class="mb-4"/>
				<h3>
					View Kanbans
				</h3>
				<small>
					A list of all kanbans you have access to
				</small>
			</router-link>
			<router-link
				to="/Account"
				tag="button"
				class="col-sm btn btn-brand-big mb-3 btn-lg">
				<b-icon-newspaper
						font-scale="2.75"
						class="mb-4"/>
				<h3>Account Management</h3>
			</router-link>
		</b-row>
	</b-jumbotron>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'Home',
	data() {
		return {
			accountToken: localStorage.getItem('accountToken') ?? "",
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

    .btn-brand-big {
        color: white;
        transition: transform 0s;
    }
    .btn-brand-big:hover { 
		color: white;
      	box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.05);
    }
	.vh-40 {
		height: 40vh!important;
	}

	.pb-8 {
		padding-bottom: 8em;
	}

</style>