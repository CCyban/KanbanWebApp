<template>
    <b-overlay
        v-b-hover="hoverHandle"
        :show="isCardHovered"
        rounded="sm"
        style="max-width: 20rem;"
        class="mb-3">
        <b-card
            title="Kanban Card Title">
            <b-card-text>
                {{ content }}
            </b-card-text>
        </b-card>
        <template #overlay>
            <div class="text-center">
            <b-button
                variant="outline-success"
                size="sm"
                @click="show = false">
                    Open
                <b-icon icon="pencil-square" />
            </b-button>
            </div>
        </template>
    </b-overlay>
</template>

<script>
export default {
    name: 'KanbanCard',
    props: {
        content: String,
    },
    data() {
        return {
            isCardHovered: false,
        }
    },
    methods: {
        hoverHandle(isHovered) {
            if (isHovered) {
                this.isCardHovered = true;
            }
            else {
                this.isCardHovered = false;
            }
        }
    }
}
</script>