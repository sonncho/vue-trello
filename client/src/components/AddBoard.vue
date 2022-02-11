<template>
    <Modal>
        <div slot="header">
            <h3 class="modal-title">Create new board</h3>
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
            //공백을 모두 제거하고 값이 있으면 valid 는 true
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
.modal-title {
    font-size: 1.125rem;
}
.modal-default-button {
    position: absolute;
    right: 1rem;
    top: 16px;
    text-decoration: none;
}

</style>