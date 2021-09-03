import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store/store'
import router from './router'

Vue.use(Vuex)


const app = new Vue({
    el: '#app',
    template: `
        <App></App>
    `,
    components: { App },
    router,
    store
})

