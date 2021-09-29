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
        async fetchCustomers({ rootGetters, commit }) {
            const res = await axios.get('/customers', {
                headers: rootGetters.headers,
                data: {}
            })
            commit('init', res.data)
        },
        async insert({ rootGetters, dispatch }, params) {
            await axios.post('/customers', params, {
                headers: rootGetters.headers
            }).catch(e => {
                console.log(e)
            })
            dispatch('fetchCustomers')
        },
        async search({ rootGetters, commit }, params) {
            const res = await axios.get('/customers/search', {
                headers: rootGetters.headers,
                params
            }).catch(e => {
                console.log(e)
            })
            commit('init', res.data)
        }
    }
}