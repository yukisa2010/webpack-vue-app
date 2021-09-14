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
        },
        insert(state, params) {
            if(params.name === '') { return }
            const newCustomer = params
            newCustomer.id = state.customers.length + 1
            newCustomer.birthday = newCustomer.birthday.replaceAll('-', '/')
            state.customers.push(newCustomer)
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
    }
}