import Vue from 'vue'
import Vuex from 'vuex'
import moduleCustomers from './modules/moduleCustomers'
import moduleOrganizations from './modules/moduleOrganizations'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        token: "token"
    }),
    modules: {
        customers: moduleCustomers,
        organizations: moduleOrganizations
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    },
    actions: {
        async fetchToken({ commit }, url) {
            axios.defaults.baseURL = 'http://localhost:3000'
            const token = (await axios.get(url)).data
            console.log(token)
            commit('setToken', token)
        }    
    }

})

