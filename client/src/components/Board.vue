<template>
    <div>
        Board
        <div v-if="loading">Loading Board...</div>
        <div v-else>
            <div>bid : {{ bid }}</div>
            <router-link :to="`/b/${bid}/c/1`">Card 1</router-link>
            <router-link :to="`/b/${bid}/c/2`">Card 2</router-link>
        </div>
        <hr/>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data(){
        return {
            bid: 0,
            loading: true,
        }
    },
    created(){
        this.fetchData()
        // console.log('bid : '+ this.$route.params.bid)
    },
    methods: {
        fetchData(){
            this.loading = true
            //0.5초후에 상태값 loading을 false로 변경
            setTimeout(() => {
                this.bid = this.$route.params.bid
                this.loading = false
            }, 500);
        },
    },
}
</script>

<style scoped>

</style>