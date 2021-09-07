import axios from 'axios'


export default {
    namespaced: true,
    state:() => ({
        customers: []
    }),
    mutations: {
        init(state, customersData) {
            state.customers = customersData
        }
    },
    getters: {
        to_jp: () => (gender) => {
            switch(gender) {
                case 'male':
                    return '男'
                case 'female':
                    return '女'
                default:
                    return ''
            }
        },
        formatted_date: () => (date) => {
            const baseDate = new Date(date)
            const year = baseDate.getFullYear()
            const month = (baseDate.getMonth()+1).toString().padStart(2, '0')
            const day = baseDate.getDate().toString().padStart(2, '0')

            return [ year, month, day ].join('/')
        }
    },
    actions : {
        async fetchCustomers({ commit }) {
            axios.defaults.baseURL = 'http://localhost:3000'
            const data = (await axios.get('/customers')).data
            commit('init', data)
        },
        async search({ commit }, params) {
            switch(params.gender){
                case 'male':
                    params.gender = 0
                    break
                case 'female':
                    params.gender = 1
                    break
            }
                    
            axios.defaults.baseURL = 'http://localhost:3000'
            const data = (await axios.get('/customers/search', { params })).data
            commit('init', data)
        },
        async insert({ dispatch, rootState }, params) {
            if(params.name === '') { return }
            console.log(rootState.token)
            
            axios.defaults.baseURL = 'http://localhost:3000'
            axios.defaults.headers.common = {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-TOKEN' : rootState.token.authenticity_token
            };
            await axios.post('/customers', params)
            dispatch('fetchCustomers')
        }
    }
}