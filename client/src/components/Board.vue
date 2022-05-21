<template>
  <div>
    <div v-if="loading">Loading Board...</div>
    <div v-else>
      <div class="board-wrapper">
        <div class="board  p-3">
          <div class="board-header">
            <span class="board-title text-light">{{ board.title }}</span>
            <a href="" class="board-header-btn show-menu" @click.prevent="onShowSettings">
              ... Show Menu
            </a>
          </div>
        </div>
        <board-settings v-if="isShowBoardSettings" />
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <List :data="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex"
import List from "./List.vue"
import BoardSettings from './BoardSettings.vue'
import dragger from '../utils/dragger'

export default {
  components: {
    List,
    BoardSettings
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
      board: 'board',
      isShowBoardSettings: 'isShowBoardSettings'
    }),
  },
  updated() {
    //보드의 자식컴포넌트가 모두 렌더링된후 호출시키기 위해 updated에서 호출
    this.setCardDragabble()
  },
  created() {
    this.fetchData().then(() => {
      this.SET_THEME(this.board.bgColor )
    })
    this.SET_IS_SHOW_BOARD_SETTINGS(false)
  },
  methods: {
    ...mapMutations([
      'SET_THEME',
      'SET_IS_SHOW_BOARD_SETTINGS'
    ]),
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD'
      ]),
    fetchData() {
      this.loading = true;

      return this.FETCH_BOARD({ id: this.$route.params.bid }).then(
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
    },
    onShowSettings() {
      this.SET_IS_SHOW_BOARD_SETTINGS(true)
    }
  },
};
</script>

<style>
.board-wrapper {
  position: relative;
}
.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.board-title {
  font-size: 18px;
  font-weight: 700;
  line-height: 32px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 10px;
  display: inline-block;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  background-color: rgba(0,0,0,.15);
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.25);
  cursor: pointer;
  color: #fff;
}
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