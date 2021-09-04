import axios from 'axios'


export default {
    namespaced: true,
    state:() => ({
        customers: []
    }),
    mutations: {
        init(state, customersData) {
            state.customers = customersData
        },
        insert(state, params) {
            if(params.name === '') { return }
            const newCustomer = params
            newCustomer.id = state.customers.length + 1
            newCustomer.birthday = newCustomer.birthday.replaceAll('-', '/')
            state.customers.push(newCustomer)
        },
        set(state, data) {
            state.customers = data
        }
    },
    actions : {
        async fetchCustomers({ commit }) {
            axios.defaults.baseURL = 'http://localhost:3000'
            const customersData = (await axios.get('/customers')).data
            commit('init', customersData)
        },
        async search({ commit }, params) {
            axios.defaults.baseURL = 'http://localhost:3000'
            switch(params.gender){
                case '男':
                    params.gender = 0
                    break
                case '女':
                    params.gender = 1
                    break
            }
            
            const data = (await axios.get('/customers/search', { params })).data
            commit('set', data)
        }
    }
}