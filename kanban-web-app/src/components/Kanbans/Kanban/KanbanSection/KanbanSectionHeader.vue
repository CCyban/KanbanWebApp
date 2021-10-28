<template>
    <b-overlay
        v-b-hover="hoverHandle"
        :show="isCardHovered"
        rounded="sm"
        style="max-width: 20rem;"
        class="mb-3">
        <b-card
            :title="sectionHeader"
            style="max-width: 20rem;"
            class="mb-3 p-1"
            border-variant="dark"
            bg-variant="light"
            text-variant="dark">
        </b-card>
        <template #overlay>
            <div class="text-center">
            <b-button
                variant="outline-success"
                size="sm"
                @click="show = false"
                class="mb-1">
                    Edit Name
                <b-icon icon="pencil-square" />
            </b-button>
            <b-button
                variant="outline-danger"
                size="sm"
                @click="show = false">
                    Delete
                <b-icon icon="x-circle" />
            </b-button>
            </div>
        </template>
    </b-overlay>
</template>

<script>
export default {
    name: 'KanbanSectionHeader',
    props: {
        sectionHeader: String,
    },
    data() {
        return {
            isCardHovered: false,
        }
    },
    methods: {
        hoverHandle(isHovered) {
            // Hover event on the card is used to toggle a boolean to show the overlay of said card
            this.isCardHovered = isHovered;
        }
    }
}
</script>