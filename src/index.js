import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Organizations from './components/Organizations.vue'
import Create from './components/Create.vue'
import VueRouter from 'vue-router'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
    state: {
        rawCustomers: [],
        queryCustomers: [],
        organizations: [],
        inputParams: {
            name: "",
            gender: "",
            organizationId: ""
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})


const routes = [
    { path: '/', component: App },
    { path: '/organizations', component: Organizations },
    { path: '/organizations/create', component: Create }
    // { path: '/organization', component: App }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    template: `
    <div>
        <p>
            <router-link to="/">顧客</router-link>
            <router-link to="/organizations">組織</router-link>
        </p>
        <router-view></router-view>
    </div>
    `,
    router,
    store
})

