<template>
    <div>
        <div class="home-title">Personal Boards</div>
        <div class="board-list" ref="boardList">
            <div class="board-item" v-for="b in boards" :key="b.id"
                :data-bgcolor="b.bgColor" ref="boardItem"
            >
                <router-link :to="`/b/${b.id}`">
                    <div class="board-item-title">{{ b.title }}</div>
                </router-link>
            </div>
            <div class="board-item board-item-new">
                <a href="" class="new-board-btn" @click.prevent="addBoard">
                    Create new Board...
                </a>
            </div>
        </div>
        <add-board v-if="isAddBoard" @close="isAddBoard=false" @submit="onAddBoard" />
    </div>
</template>

<script>
import { board } from '../api'
import AddBoard from './AddBoard.vue'
import { mapState } from 'vuex'

export default {
    components:{
        AddBoard,
    },
    data() {
        return {
            loading: false,
            boards: [],
            error: '',
        }
    },
    // computed: mapState([ ... ]) --> 이런식으로 사용하면 다른 computed속성을
    // 정의할 수 없으므로 ES6문법의 해체 문법을 사용함.
    computed: {
        // this.isAddBoard를 store.state.isBoard에 매핑함.
        ...mapState([
            'isAddBoard' 
        ])
    },
    created() {
        this.fetchData()
    },
    // 변화가 감지될때 사용됨.
    updated() {
        this.$refs.boardItem.forEach(el => {
            el.style.backgroundColor = el.dataset.bgcolor
        })
    },
    methods: {
        fetchData() {
            //fetchData가 호출되면 상탯값 변경 처리
            this.loading = true
            board.fetch()
                .then(data => {
                    this.boards = data.list
                })
                .finally(() => {
                    this.loading = false
                })
        },
        addBoard() {
            this.isAddBoard = true
        },
        onAddBoard(title) {
            // console.log(title)
            // api
            board.create(title)
                .then(() => this.fetchData())
        }
    }
}
</script>

<style lang="scss" scoped>
    .home-title {
        font-size: 1.125rem;
        color: #5e6c84;
        font-weight: 500;
        margin-bottom: 20px;
    }
    .board-item {
        margin: 0 2% 2% 0;
        padding: 0;
        float: left;
        transform: translate(0);
        width: 18.4%;
        border-radius: 4px;
        &:nth-child(5n) {
            margin-right: 0;
        }
        .board-item-title {
            height: 120px;
            color: #fff;
            text-decoration: none;
            padding: 10px;
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