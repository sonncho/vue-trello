import Vue from "vue";
import router from './router'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
    el: "#app",    
    router,
    render: h => h(App)
});

