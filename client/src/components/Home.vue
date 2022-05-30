<template>
  <div>
    <b-container size="lg">
      <div class="home-title">YOUR WORKSPACES</div>
      <div class="board-list" ref="boardList">
        <b-row>
          <b-col v-for="b in boards" :key="b.id" sm="6" md="4" lg="3" class="mb-3">
            <div
              class="board-item"
              :data-bgcolor="b.bgColor"
              ref="boardItem"
            >
              <router-link :to="`/b/${b.id}`">
                <div class="board-item-title">{{ b.title }}</div>
              </router-link>
            </div>
          </b-col>
          <b-col sm="6" md="4" lg="3">
            <div class="board-item board-item-new">
              <a
                href=""
                class="new-board-btn"
                @click.prevent="SET_IS_ADD_BOARD(true)"
              >
                Create new Board...
              </a>
            </div>
          </b-col>
        </b-row>
      </div>
      <add-board v-if="isAddBoard" @close="isAddBoard = false" />
    </b-container>
  </div>
</template>

<script>
import AddBoard from "./AddBoard.vue";
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  components: {
    AddBoard,
  },
  data() {
    return {
      loading: false,
      error: "",
    };
  },
  // computed: mapState([ ... ]) --> 이런식으로 사용하면 다른 computed속성을
  // 정의할 수 없으므로 ES6문법의 해체 문법을 사용함.
  computed: {
    // this.isAddBoard를 store.state.isBoard에 매핑함.
    ...mapState({
      isAddBoard: "isAddBoard",
      boards: "boards",
    }),
  },
  created() {
    this.fetchData()
    this.SET_THEME()
  },
  // 변화가 감지될때 사용됨.
  updated() {
    this.$refs.boardItem.forEach((el) => {
      el.style.backgroundColor = el.dataset.bgcolor;
    });
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD',
      'SET_THEME'
    ]),
    ...mapActions(["FETCH_BOARDS"]),
    fetchData() {
      //fetchData가 호출되면 상탯값 변경 처리
      this.loading = true;
      this.FETCH_BOARDS().finally((_) => {
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-title {
  font-size: 1.125rem;
  color: #5e6c84;
  font-weight: 700;
  margin-bottom: 20px;
  padding-top: 40px;
}
.board-item {
  border-radius: 4px;
  a { text-decoration: none; }
  .board-item-title {
    height: 120px;
    color: #fff;
    padding: 10px;
    font-weight: 700;
    line-height: 29px;
  }
  &.board-item-new {
    background: #091e420a;
    .new-board-btn {
      height: 120px;
      text-decoration: none;
      color: #172b4d;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>