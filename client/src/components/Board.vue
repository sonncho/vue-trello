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
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: {
    List,
  },
  data() {
    return {
      bid: 0,
      loading: true,
      dragularCards: null
    };
  },
  computed: {
    ...mapState({
      board: "board",
    }),
  },
  updated() {
    // dragularCard 상태 값 초기화
    if(this.dragularCards) this.dragularCards.destroy()

    this.dragularCards = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrapper, target, siblings) => {
      const targetCard = {
        id: el.dataset.cardId * 1,
        pos: 65535
      }

      let prevCard = null
      let nextCard = null

      Array.from(wrapper.querySelectorAll('.card-item'))
        .forEach((el, idx, arr) => {
          const cardId = el.dataset.cardId * 1
          if(cardId == targetCard.id) {
            prevCard = idx > 0 ? {
              id: arr[idx-1].dataset.cardId * 1,
              pos: arr[idx-1].dataset.cardPos * 1
            } : null
            nextCard = idx < arr.length -1 ? {
              id: arr[idx + 1].dataset.cardId * 1,
              pos: arr[idx + 1].dataset.cardPos * 1
            } : null
          }
        })
      if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2
      else if (!nextCard && prevCard) targetCard.pos = prevCard.pos * 2
      else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2

      console.log(targetCard)
      this.UPDATE_CARD(targetCard)
    })
  },
  created() {
    this.fetchData();
    // console.log('bid : '+ this.$route.params.bid)
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD',

      ]),
    fetchData() {
      this.loading = true;

      this.FETCH_BOARD({ id: this.$route.params.bid }).then(
        () => (this.loading = false)
      );
    },
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