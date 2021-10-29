<template>
    <div>
        <b-button
            variant="outline-danger"
            size="sm"
            @click="doIt()">
                Delete
            <b-icon icon="x-circle" />
        </b-button>
    </div>
</template>


<script>
export default {
    props: {
        sectionHeader: String,
        saveKanbanSectionHeader: Function,
        closeModal: Function,
    },
    methods: {
        hideModal() {
            // Emits togglable method execution to parent component in order to toggle the modal off
            this.$emit('toggleModal');
        },
        doIt() {
            this.saveKanbanSectionHeader('something');
        }
    },
}
</script>