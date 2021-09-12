import Vue from 'vue'
import Vuex from 'vuex'
import moduleCustomers from './modules/moduleCustomers'
import moduleOrganizations from './modules/moduleOrganizations'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state:() => ({
        requestHeader: {
            access_token: "",
            client: "",
            expiry: "",
            uid: ""
        }
    }),
    mutations: {
        setRequestHeader(state, params) {
            state.requestHeader = params
            console.log(state.requestHeader)
        }
    },
    actions: {
        async loginAndSetHeader(state, params) {

            const response = await axios.post('/auth/sign_in', params)

            console.log(response.headers, 'call from store')
            const requestHeader = {}
            requestHeader.access_token = response.headers["access-token"]
            requestHeader.client = response.headers.client
            requestHeader.expiry = response.headers.expiry
            requestHeader.uid = response.headers.uid

            state.commit('setRequestHeader', requestHeader)
        }
    },
    modules: {
        customers: moduleCustomers,
        organizations: moduleOrganizations
    }
})

