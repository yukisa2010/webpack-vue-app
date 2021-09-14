import axios from '../../axios'


export default {
    namespaced: true,
    state:() => ({
        customers: [],
        searchedCustomers: []
    }),
    mutations: {
        init(state, customersData) {
            state.searchedCustomers = state.customers = customersData
        },
        search(state, params) {
            const reg = new RegExp(params.name)
            const gender = params.gender
            const organizationId = params.organizationId
            state.searchedCustomers = state.customers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        }
    },
    actions : {
        fetchCustomers({ rootGetters, commit }) {
            axios.get('/customers', {
                headers: rootGetters.headers,
                data: {}
            }).then(res => {
                commit('init', res.data)
            })
        },
        insert({ rootGetters, dispatch }, params) {
            axios.post('/customers', params, {
                headers: rootGetters.headers
            }).then(res => {
                dispatch('fetchCustomers')
                return
            }).catch(e => {
                console.log(e)
            })
        }
    }
}