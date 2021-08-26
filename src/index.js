import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Organizations from './components/Organizations.vue'
import Create from './components/Create.vue'
import VueRouter from 'vue-router'
import axios from 'axios'

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
        },
        count: 0
    },
    mutations: {
        setCustomers(state, customersData) {
            customersData.then(res => {
                state.rawCustomers =  res.data
                state.queryCustomers = state.rawCustomers
            })
        },
        setOrganizations(state, organizationsData) {
            console.log()
            organizationsData.then(res => {
                state.organizations = res.data
            })
        },
        queryData(state) {
            const reg = new RegExp(state.inputParams.name)
            const gender = state.inputParams.gender
            const organizationId = state.inputParams.organizationId
            state.queryCustomers = state.rawCustomers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        }
    },
    actions : {
        getCustomers({ commit }) {
            const customersData = axios.get('./customers.json')
            commit('setCustomers', customersData)
        },
        getOrganizations({ commit }) {
            const organizationsData = axios.get('./organizations.json')
            console.log(organizationsData)
            commit('setOrganizations', organizationsData)
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

