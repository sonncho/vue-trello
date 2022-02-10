<template>
    <div>
        <!-- <router-link to="/">Home</router-link>
        <router-link to="/login">Login</router-link> -->
        <nav class="header navbar">
            <div class="container">
                <div class="header-logo">
                    <router-link to="/">Trello</router-link>
                </div>
                <div class="header-auth">
                    <a v-if="isAuth" href="" @click.prevent="logout" class="btn btn-sm btn-light">
                        <b-icon icon="power" aria-hidden="true"></b-icon> Logout
                    </a>
                    <router-link v-else to="/login" class="btn btn-sm btn-light">
                        <b-icon icon="box-arrow-in-left" aria-hidden="true"></b-icon> Login
                    </router-link>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref } from 'vue'
import { setAuthInHeader } from '../api'
export default {
    computed: {
        isAuth() {
            return !!localStorage.getItem('token')
        }
    },
    methods: {
        logout() {
            delete localStorage.token   //로컬스토리지의 token삭제
            setAuthInHeader(null)       //setAuthInHeader에 null전달
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
    .header {
        background-color: #026AA7;
        .header-logo a {
            font-size: 1.25rem;
            font-weight: bold;
            color: #eee !important;
            text-decoration: none;
        }
    }
</style>