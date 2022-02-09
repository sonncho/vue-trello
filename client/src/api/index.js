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
        if(status === UNAUTHORIZED) return onUnauthorized()
        throw Error(result)
    })
}

export const board = {
    fetch() {
        return request('get', '/boards')
    }
}