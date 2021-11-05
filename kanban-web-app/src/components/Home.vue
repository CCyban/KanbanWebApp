<template>
  <b-jumbotron class="jumbotron-brand-variant px-5 pt-5" header="Kanban Board Web App" lead="Made using VueJS, and other stuff">
    <hr class="my-4" />
        <b-row
            class="vh-40">

			<router-link
				:to="signedIn ? '/Kanban' : '/User/SignIn'"
				tag="button"
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
				to="/User"
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
  computed: {
    signedIn() {
      return Math.random() < 0.75;
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

    .btn-brand-big {
		transition: transform 0.5s;
        color: white;
    }
    .btn-brand-big:hover {
        transform: scale(1.1); 
		color: white;
    }
	.vh-40 {
		height: 40vh!important;
	}

	.pb-8 {
		padding-bottom: 8em;
	}

</style>