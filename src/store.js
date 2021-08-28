import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rawCustomers: [],
        queryCustomers: [],
        organizations: [],
        queryCustomerParams: {
            name: "",
            gender: "",
            organizationId: ""
        },
        newCustomerParams: {
            name: "",
            gender: "",
            birthday: "",
            organizationId: 0
        },
        newOrganizationName: "",
        editOrganizationName: ""
    },
    mutations: {
        initCustomers(state, customersData) {
            customersData.then(res => {
                state.rawCustomers =  res.data
                state.queryCustomers = state.rawCustomers
            })
        },
        queryCustomers(state) {
            const reg = new RegExp(state.queryCustomerParams.name)
            const gender = state.queryCustomerParams.gender
            const organizationId = state.queryCustomerParams.organizationId
            state.queryCustomers = state.rawCustomers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        },

        changeNewCustomerParams(state, newCustomerParams) {
            state.newCustomerParams = newCustomerParams
        },
        addCustomer(state) {
            if(state.newCustomerParams.name === '') { return }
            const newCustomer = state.newCustomerParams
            newCustomer.birthday = newCustomer.birthday.replaceAll('-', '/')
            newCustomer.id = state.rawCustomers.length + 1
            state.rawCustomers.push(newCustomer)
            const defaultParams = {
                name: "",
                gender: "",
                birthday: "",
                organizationId: 0   
            }
            state.newCustomerParams = defaultParams
        },

        initOrganizations(state, organizationsData) {
            organizationsData.then(res => {
                state.organizations = res.data
            })
        },
        addNewOrganization(state) {
            const newOrganization = {}
            newOrganization.id = state.organizations.length + 1
            newOrganization.name = state.newOrganizationName

            state.organizations.push(newOrganization)
            state.newOrganizationName = ''
        },
        changeNewOrganizationName(state, value) {
            state.newOrganizationName = value
        },
        updateOrganization(state, id) {
            state.organizations = state.organizations.map(organization => {
                if(organization.id === Number(id)) {
                    organization.name = state.newOrganizationName
                }
                return organization
            })
            state.newOrganizationName = ''
        }
    },
    actions : {
        getCustomers({ commit }) {
            const customersData = axios.get('./customers.json')
            commit('initCustomers', customersData)
        },
        getOrganizations({ commit }) {
            const organizationsData = axios.get('./organizations.json')
            commit('initOrganizations', organizationsData)
        }
    },
    getters: {
        getOrganizationName: (state) => (id) => {
            const organization = state.organizations.find(organization =>{
                return organization.id === Number(id)
            })
            return (
                organization === undefined ? '' : organization.name
            )
        },
        getNewCustomerParams: state => state.newCustomerParams,
        getNewOrganizationName: state => state.newOrganizationName
    }
})

