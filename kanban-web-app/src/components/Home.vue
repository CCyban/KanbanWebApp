<template>
  <b-jumbotron class="p-5" header="Kanban Board Web App" lead="Made using VueJS, and other stuff" bg-variant="primary" text-variant="light">
    <hr class="my-4" />
    <b-link v-if="signedIn" to="/Kanban">
      <b-button variant="dark">
          View your kanbans
      </b-button>
    </b-link>
    <b-link v-else to="/User">
      <b-button variant="dark">
        Sign in
      </b-button>
    </b-link>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      signedIn: Boolean,
    } 
  },
  created: function () {
    this.signedIn = Math.random() < 0.5;
  },
}
</script>

