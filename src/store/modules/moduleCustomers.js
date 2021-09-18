import axios from '../../axios'


export default {
    namespaced: true,
    state:() => ({
        customers: [],
    }),
    mutations: {
        init(state, data) {
            state.customers = data
        },
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
        },
        search({ rootGetters, commit }, params) {
            axios.get('/customers/search', {
                headers: rootGetters.headers,
                params
            }).then(res => {
                commit('init', res.data)
            }).catch(e => {
                console.log(e)
            })
        }
    }
}