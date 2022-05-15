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
import { mapState, mapActions } from "vuex";
import List from "./List.vue";
export default {
  components: {
    List,
  },
  data() {
    return {
      bid: 0,
      loading: true,
    };
  },
  computed: {
    ...mapState({
      board: "board",
    }),
  },
  created() {
    this.fetchData();
    // console.log('bid : '+ this.$route.params.bid)
  },
  methods: {
    ...mapActions(["FETCH_BOARD"]),
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