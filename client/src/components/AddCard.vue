<template>
  <div>
    <div class="add-card">
      <form @submit.prevent="onSubmit">
        <input
          class="form-control"
          type="text"
          v-model="inputTitle"
          ref="inputText"
        />
        <button
          class="btn btn-success btn-sm mt-2"
          type="submit"
          :disabled="invalidInput"
        >
          Add Card
        </button>
        <a href="" class="cancel-add-btn" @click.prevent="$emit('close')"
          >&times;</a
        >
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["listId"],
  data() {
    return {
      inputTitle: "",
    };
  },
  computed: {
    invalidInput() {
      //input에 값이 없을경우 true리턴(Add Card버튼 활성화/비활성화)
      return !this.inputTitle.trim();
    },
  },
  mounted() {
    this.$refs.inputText.focus();
    this.setupClickOutside(this.$el);
  },
  methods: {
    ...mapActions(["ADD_CARD"]),
    onSubmit() {
      //input값이 없으면 return
      if (this.invalidInput) return;

      const { inputTitle, listId } = this;
      //pos는 option값(필수x)
      this.ADD_CARD({ title: inputTitle, listId }).finally(
        () => (this.inputTitle = "")
      );
    },
    //외부 클릭시 add card form 닫는 이벤트생성
    setupClickOutside(el) {
      document.querySelector("body").addEventListener("click", (e) => {
        if (el.contains(e.target)) return;
        this.$emit("close");
      });
    },
  },
};
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>