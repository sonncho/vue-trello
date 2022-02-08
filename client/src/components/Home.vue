<template>
    <div>
        Home
        <div>
            Board List :
            <div v-if="loading">Loading...</div>
            <div v-else>
                Api result: {{ apiRes }}
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
export default {
    data() {
        return {
            loading: false,
            apiRes: '',
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            //fetchData가 호출되면 상탯값 변경 처리
            this.loading = true

            //req 변수에 javascript의 내장객체 생성
            const req = new XMLHttpRequest()

            //XMLHttpRequest.open('method', 'URL') : 요청을  초기화
            req.open('GET', 'http://localhost:3000/health')

            //send함수를 통해 요청을 보낸다.
            req.send()

            // 이벤트리스너를 통해 로드시에 처리를 정의
            req.addEventListener('load', () => { //callback으로 load가 완료되면
                this.loading = false            // loading이 끝났으므로 상태값 false로 변경
                this.apiRes = {                 // data객체에 정의한 키값 apiRes에 응답된 정보를 담음
                    status: req.status,         //  status : 200 또는 404등 상태코드
                    statusText : req.statusText, // statusText : 상태코드 텍스트
                    response: JSON.parse(req.response) // response : 응답데이터가 문자열로 오기떄문에 json파싱 필요
                }
            })
        }
    }
}
</script>

<style scoped>

</style>