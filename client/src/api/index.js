import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push('/login')
}

const request = (method, url, data) => {
    return axios({
        method,             //통신 방식
        url: DOMAIN + url,  // 통신할 웹 문서
        data                //인자로 보낼 데이터(PUT, POST, PATCH)
    }).then(result => result.data) //result : 읍답객체
    .catch(result => {
        const { status } = result.response
        if(status === UNAUTHORIZED) onUnauthorized()
        throw result.response
    })
}

//axios기본 전역 설정
export const setAuthInHeader = token => {
    //axios로 요청을 날리기전에 모든 header정보에 토큰정보를 넣음
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

// const { token } = localStorage
// if(token) setAuthInHeader(token)

//보드
export const board = {
    fetch(id) {
        return id ? request('get', `/boards/${id}`) : request('get', '/boards')
    },
    create(title) {
        return request('post', '/boards', {title})
    },
    destroy(id) {
        return request('delete', `/boards/${id}`)
    },
    update(id, payload) {
        return request('put', `/boards/${id}`, payload)
    }
}

export const list =  {
    create(payload) {
        return request('post', '/lists', payload)
    },
    update(id, payload) {
        return request('put', `/lists/${id}`, payload)
    },
    destroy(id) {
        return request('delete', `/lists/${id}`)
    }
}

export const card = {
    create(title, listId, pos) {
        return request('post', '/cards', { title, listId, pos })
    },
    fetch(id) {
        return request('get', `/cards/${id}`)
    },
    update(id, payload) {
        return request('put', `/cards/${id}`, payload)
    },
    destory(id) {
        return request('delete', `/cards/${id}`)
    }
}
//인증
export const auth = {
    login(email, password) {
        return request('post', '/login', {email, password})
    }
}
