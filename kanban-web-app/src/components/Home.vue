<template>
  <div>
    <h1>Kanban Board Web App</h1>
    <p>
      Made using VueJS, and other stuff.
    </p>
    <b-link v-if="signedIn" to="/Kanbans">
      <b-button variant="primary">
          See your kanbans
      </b-button>
    </b-link>
    <b-link v-else to="/User">
      <b-button variant="primary">
        Sign in
      </b-button>
    </b-link>
  </div>
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

