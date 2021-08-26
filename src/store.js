import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rawCustomers: [],
        queryCustomers: [],
        organizations: [],
        inputParams: {
            name: "",
            gender: "",
            organizationId: ""
        },
        createParams: {
            name: "",
            gender: "",
            birthday: "",
            organizationId: 0
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
        },
        setNewCustomer(state, createParams) {
            state.createParams = createParams
        },
        addCustomer(state) {
            if(state.createParams.name === '') { return }
            state.createParams.birthday = state.createParams.birthday.replace('-', '/')
            state.rawCustomers.push(state.createParams)
            // state.queryCustomers.push(state.createParams)
            // console.log(state.queryCustomers)
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
    },
    getters: {
        findOrganization(state, id) {
            return state.organizations.find(organization => {
                return organization.id === id
            })
        }
    }
})

