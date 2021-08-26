import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Header from './components/Header.vue'
import Customers from './components/Customers.vue'
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
        newOrganizationName: "",
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
        },
        addOrganization(state) {
            const organization = {}
            organization.id = state.organizations.length + 1
            organization.name = state.newOrganizationName

            state.organizations.push(organization)
            state.newOrganizationName = ''
        },
        changeNewOrganizationName(state, value) {
            state.newOrganizationName = value
        }
    },
    actions : {
        getCustomers({ commit }) {
            const customersData = axios.get('./customers.json')
            commit('setCustomers', customersData)
        },
        getOrganizations({ commit }) {
            const organizationsData = axios.get('./organizations.json')
            commit('setOrganizations', organizationsData)
        }
    }
})


const routes = [
    { 
        path: '/', 
        components: {
            default: Customers,
            header: Header
        }
    },
    {
        path: '/organizations', 
        components: {
            default: Organizations,
            header: Header
        }
    },
    {
        path: '/organizations/create',
        components:  {
            default: Create,
            header: Header
        }
    }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    template: `
        <App></App>
    `,
    components: { App },
    router,
    store,
    beforeCreate() {
        this.$store.dispatch('getCustomers')
        this.$store.dispatch('getOrganizations')
    }
})

