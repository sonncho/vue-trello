<template>
  <div class="list">
    <div class="list-header">
      <div class="list-header-title">{{ data.title }}</div>
    </div>
    <div class="card-list">
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
import AddCard from "./AddCard.vue";
import CardItem from "./CardItem.vue";

export default {
  components: { AddCard, CardItem },
  props: ["data"],
  data() {
    return {
      isAddCard: false,
    };
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
</style>
