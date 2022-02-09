import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
    //localStorage에 저장된 token정보를 가져옴
    //값이 없으면 isAuth가 undefined 가 됨
    const isAuth = localStorage.getItem('token')

    // 리다이렉트 된 후 로그인후 다시 원래 페이지로 돌아가야하므로 query Stirng 전달
    // 쿼리 문자열이기 때문에 encodeURIComponent로 ASCII문자열로 변환
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`

    // 토큰정보가 있다면 next() 함수를 호출에 라우팅이 이루어지고
    // 토큰정보가 없다면 loginPath를 전달
    isAuth ? next() : next(loginPath)
}

//beforeEnter : 라우트 되기 전 동작을 지정
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home, beforeEnter: requireAuth },
        { path: '/login', component: Login },
        {
            path: '/b/:bid', component: Board, beforeEnter: requireAuth,
            children: [
                { path: 'c/:cid', component: Card, beforeEnter: requireAuth, },
            ],
        },
        
        { path: '*', component: NotFound },
    ],
})

export default router