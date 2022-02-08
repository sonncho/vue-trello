<template>
    <div>
        Home
        <div>
            Board List :
            <div v-if="loading">Loading...</div>
            <div v-else>
                <div v-for="b in boards" :key="b.id">
                    {{ b }}
                </div>
            </div>
            <ul>
                <li>
                    <router-link to="/b/1">Board 1</router-link>
                </li>
                <li>
                    <router-link to="/b/2">Board 2</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            loading: false,
            boards: [],
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            //fetchData가 호출되면 상탯값 변경 처리
            this.loading = true

            axios.get('http://localhost:3000/boards')
                .then(res => {
                    this.boards = res.data
                })
                .catch(error => { //에러 발생시
                    // console.log(error)
                    this.$router.replace('/login') // vue-router에 $router객체를 이용해 로그인페이지로 이동
                })
                .finally(() => {
                    this.loading = false
                })
        }
    }
}
</script>

<style scoped>

</style>