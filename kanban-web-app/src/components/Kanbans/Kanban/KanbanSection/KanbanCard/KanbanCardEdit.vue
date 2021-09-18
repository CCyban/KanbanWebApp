<template>
    <div>
        <div class="d-block text-center">
            <h3>Editing thingy</h3>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
    </div>
</template>

<script>
export default {
    name: 'KanbanCardEdit',
    methods: {
        hideModal() {
            this.$emit('toggleModal');
      }
    }
}
</script>
