<template>
  <div class="list" :data-list-id="data.id" :data-list-pos="data.pos">
    <div class="list-header">
      <input
        v-if="isEditTitle"
        type="text"
        class="form-control input-title"
        v-model="inputTitle"
        ref="inputTitle" 
        @blur="onBlurTitle"
        @keyup.enter="onSubmitTitle"
      />
      <div
        v-else
        class="list-header-title"
        @click="onClickTitle"
      >{{ data.title }}</div>
      <a class="delete-list-btn" href="" @click.prevent="onDeleteList"><b-icon icon="three-dots" font-scale=".8" /></a>
    </div>
    <div class="card-list" :data-list-id="data.id">
      <card-item v-for="card in data.cards" :key="card.id" :data="card" />
    </div>
    <div v-if="isAddCard">
      <add-card :list-id="data.id" @close="isAddCard = false" />
    </div>
    <div v-else>
      <a class="add-card-btn" href="" @click.prevent.stop="isAddCard = true"
        >&plus; Add another card...</a
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AddCard from "./AddCard.vue";
import CardItem from "./CardItem.vue";

export default {
  components: { AddCard, CardItem },
  props: ["data"],
  created() {
    this.inputTitle = this.data.title
  },
  data() {
    return {
      isAddCard: false,
      isEditTitle: false,
      inputTitle: ''
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_LIST',
      'DELETE_LIST',
    ]),
    onClickTitle() {
      this.isEditTitle = true
      this.$nextTick(() => this.$refs.inputTitle.focus())
        
    },
    onBlurTitle() {
      this.isEditTitle = false
    },
    onSubmitTitle() {
      this.onBlurTitle()
      this.inputTitle = this.inputTitle.trim()
      if(!this.inputTitle) return

      const id = this.data.id
      const title = this.inputTitle
      if(title == this.data.title) return

      this.UPDATE_LIST({id, title})
    },
    onDeleteList() {
      if(!window.confirm(`Delete ${this.data.title} list?`)) return
      this.DELETE_LIST({ id: this.data.id })
    }
  },
};
</script>

<style>
.list {
  background-color: #e2e4e6;
  border-radius: 3px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  vertical-align: top;
  width: 100%;
  max-height: 100%;
}
.list-header {
  flex: 0 0 auto;
  height: 50px;
  padding: 10px 8px 8px;
  position: relative;
}
.list-header-title {
  font-size: 16px;
  font-weight: 700;
  padding-left: 8px;
  line-height: 30px;
}
.add-card-btn {
  flex: 0 0 auto;
  display: block;
  font-size: 13px;
  padding: 8px 10px;
  color: #8c8c8c;
  text-decoration: none;
}
.add-card-btn:hover,
.add-card-btn:focus {
  background-color: rgba(0, 0, 0, 0.1);
  color: #222;
}
.delete-list-btn {
  position: absolute;
  right: 10px;
  top: 8px;
  text-decoration: none;
  color: #aaa;
  font-size: 24px;
}
</style>
