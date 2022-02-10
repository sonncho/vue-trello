<template>
    <Modal>
        <div slot="header">
            <h3>Create new board</h3>
            <a href="" class="modal-default-button" @click.prevent="close">&times;</a>
        </div>
        <div slot="body">
            <form id="add-board-form" @submit.prevent="addBoard">
                <input type="text" class="form-control" v-model="input" ref="input" />
            </form>
        </div>
        <div slot="footer">
            <button class="btn" :class="{'btn-success': valid}" type="submit"
                form="add-board-form" :disabled="!valid"
            >Create Board</button>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue'

export default {
    components: {
        Modal,
    },
    data() {
        return {
            input: '',
            valid: false,
        }
    },
    watch: {
        input(v) {
            this.valid = v.trim().length > 0
        }
    },
    mounted() {
        this.$refs.input.focus()
    },
    methods: {
        close() {
            // 상위컴포넌트에서 사용하기 위해 $emit사용
            this.$emit('close')
        },
        addBoard() {
            this.$emit('close')
            this.$emit('submit', this.input);
        }
    }

}
</script>

<style lang="scss">

</style>