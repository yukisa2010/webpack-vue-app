import axios from '../../axios'


export default {
    namespaced: true,
    state:() => ({
        customers: [],
    }),
    getters : {
        formattedGender: (state) => (gender) => {
            switch(gender) {
                case "male":
                    return "男"
                case "female":
                    return "女"
                default:
                    return ""
            }
        },
        formattedDate: (state) => (date) => {
            const baseDate = new Date(date)
            const year = baseDate.getFullYear()
            const month = ("0" + (baseDate.getMonth() + 1)).slice(-2)
            const day = ("0" + baseDate.getDate()).slice(-2)
            return `${year}/${month}/${day}`
        }
    },
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