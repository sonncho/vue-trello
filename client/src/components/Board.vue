<template>
  <div>
    <div v-if="loading">Loading Board...</div>
    <div v-else>
      <div class="boarder-wrapper p-3">
        <div class="board">
          Board
          <div class="board-header">
            <span class="border-title">{{ board.title }}</span>
          </div>
          <!-- <pre>{{ board }}</pre> -->
        </div>
      </div>
      <hr />
      <div class="list-section-wrapper">
        <div class="list-section">
          <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
            <List :data="list" />
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex"
import List from "./List.vue"
import dragger from '../utils/dragger'

export default {
  components: {
    List,
  },
  data() {
    return {
      bid: 0,
      loading: true,
      cDragger: null //card Dragger의 상태값
    };
  },
  computed: {
    ...mapState({
      board: "board",
    }),
  },
  updated() {
    //보드의 자식컴포넌트가 모두 렌더링된후 호출시키기 위해 updated에서 호출
    this.setCardDragabble()
  },
  created() {
    this.fetchData();
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD'
      ]),
    fetchData() {
      this.loading = true;

      this.FETCH_BOARD({ id: this.$route.params.bid }).then(
        () => (this.loading = false)
      );
    },
    setCardDragabble() {
      if (this.cDragger) this.cDragger.destroy()
      this.cDragger = dragger.init(Array.from(this.$el.querySelectorAll('.card-list')))

      this.cDragger.on('drop', (el, wrapper, target, silblings) => {
        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        }

        const { prev, next } = dragger.silblings({
          el, 
          wrapper, 
          candidates: Array.from(wrapper.querySelectorAll('.card-item')), 
          type: 'card'
        })

        // 가장 첫번쨰 요소로 이동했다면
        if (!prev && next) targetCard.pos = next.pos / 2
        // 가장 마지막 요소로 이동했다면
        else if (!next && prev) targetCard.pos = prev.pos * 2
        // 중간으로 이동했다면
        else if (prev && next) targetCard.pos = (prev.pos + next.pos) / 2

        this.UPDATE_CARD(targetCard)
      })
    }
  },
};
</script>

<style>
.list-section-wrapper {
  position: relative;
  width: auto;
  overflow-x: scroll;
  height: 90vh;
  padding-left: 1rem;
}
.list-section {
  position: absolute;
  top: 0px;
  display: flex;
}
.list-wrapper {
  flex-grow: 1;
  width: 250px;
  padding-right: 10px;
}
</style>