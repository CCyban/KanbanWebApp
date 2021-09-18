<template>
<div>
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
                @click="showModal = true">
                    Open
                <b-icon icon="pencil-square" />
            </b-button>
            </div>
        </template>
    </b-overlay>
    <b-modal v-model="showModal" hide-footer title="Using Component Methods" hide-header-close>
        <kanban-card-edit @toggleModal="toggleModal()"/>
    </b-modal>
</div>
</template>

<script>
import KanbanCardEdit from './KanbanCardEdit.vue'

export default {
    name: 'KanbanCard',
    props: {
        content: String,
    },
    components: {
        KanbanCardEdit,
    },
    data() {
        return {
            isCardHovered: false,
            showModal: false,
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
        },
        toggleModal() {
            this.showModal = !this.showModal;
        }
    }
}
</script>