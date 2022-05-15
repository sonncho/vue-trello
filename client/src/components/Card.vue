<template>
  <modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <b-icon icon="card-heading" scale="1.2" style="width: 30px; margin-right: 3px" />
        <input
          class="form-control"
          type="text"
          :value="card.title"
          :readonly="!toggleTitle"
          @click="toggleTitle=true"
          @blur="onBlurTitle"
          ref="inputTitle"
        />
      </div>
      <a class="modal-close-btn" href="" @click.prevent.stop="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3 style="font-size: 18px; margin-bottom: 20px"
      ><span><b-icon icon="justify-left" /></span>
        Description</h3>
      <textarea
        class="form-control"
        cols="30"
        rows="3"
        placeholder="Add a more detailed description..."
        v-model="card.description"
        :readonly="!toggleDesc"
        @click="toggleDesc = true" @blur="onBlurDesc"
        ref="inputDesc"
      ></textarea>
    </div>
    <div slot="footer"></div>
  </modal>
</template>

<script>
import Modal from "./Modal.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      loading: false, // loading 초기 상태값(boolean)
      toggleTitle: false,
      toggleDesc: false
    };
  },
  computed: {
    ...mapState({
      card: "card",
      board: "board"
    }),
  },
  created() {
    this.fetchCard()
  },
  methods: {
    ...mapActions([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`);
    },
    fetchCard() {
      const id = this.$route.params.cid;
      this.FETCH_CARD({ id })
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if(!title) return

      this.UPDATE_CARD({ id: this.card.id, title })
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDesc = false
      const desc = this.$refs.inputDesc.value.trim()
      if(!desc) return

      this.UPDATE_CARD({ id: this.card.id, description })
        .then(() => this.fetchCard())
    }
  },
};
</script>

<style scoped>
input {
  padding: .4rem;
  font-size: 20px;
}
input:read-only, textarea {
  border: 0;
  background-color: transparent;
} 
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
  display: flex;
  align-items: center;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>