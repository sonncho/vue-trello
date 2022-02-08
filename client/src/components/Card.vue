<template>
    <div>
        Card
        <div v-if="loading">Loading Card...</div>
        <div v-else>
            cid: {{ cid }}
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            cid: 0,
            loading: false, // loading 초기 상태값(boolean)
        }
    },
    watch: {
				//기존'$route'()함수형태에서 객체형태로 변경
				//옵션값 추가
        '$route': {
            handler: 'fetchData', //fetchData 함수 실행
            immediate: true, //즉시 실행 옵션
        }
    },
    methods: {
        fetchData() {
            this.loading = true
            setTimeout(() => {
                this.cid = this.$route.params.cid
                this.loading = false
            }, 500);
        }
    }
}
</script>

<style scoped>

</style>