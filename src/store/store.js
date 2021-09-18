import Vue from 'vue'
import Vuex from 'vuex'
import moduleCustomers from './modules/moduleCustomers'
import moduleOrganizations from './modules/moduleOrganizations'
import axios from '../axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state:() => ({
        requestHeader: {
            'access-token': '',
            'client': '',
            'expiry': '',
            'uid': ''
        },
        isAuth: false
    }),
    mutations: {
        setHeaderFromCookies(state) {
            const allCookies = document.cookie.split(';')
            const REQUIRE_HEADERS = ['access-token', 'client', 'uid', 'expiry']
            const cookieObj = {}
            allCookies.forEach(cookie => {
                const [ key, value ] = cookie.trim().split('=')
                const index = REQUIRE_HEADERS.indexOf(key)
                if(index !== -1) {
                    cookieObj[key] = value
                }
            })
            state.requestHeader = cookieObj
        },
        setRequestHeader(state, params) {
            const MAX_AGE = 3600
            Object.keys(params).forEach(key => {
                document.cookie = `${key}=${params[key]};max-age=${MAX_AGE}`
            })
            state.requestHeader = params
        },
        setAuth(state, value) {
            state.isAuth = value
        },
        deleteRequestHeader(state) {
            const HEADERS = ['access-token', 'client', 'uid', 'expiry']
            HEADERS.forEach(key => {
                document.cookie = `${key}=;max-age=0`
            })
            state.requestHeader = {}
        }
    },
    getters: {
        headers(state) {
            const headers = state.requestHeader
            headers['content-type'] = 'application/json'
            return headers
        },
        isAuth: state => state.isAuth
    },
    actions: {
        async login(state, params) {
            const res = await axios.post('/auth/sign_in', params).catch(e => {
                console.log(e)
                commit('setAuth', false)                
            })
            if(res.status === 200) {
                state.commit('setRequestHeader', res.headers)
                state.commit('setAuth', true)
                router.push('/')
            }
        },
        async logout({ getters, commit }) {
            const res = await axios.delete('/auth/sign_out', { 
                headers : getters.headers,
                data: {}
            }).catch(e => {
                console.log(e)
            })
            if(res.status === 200) {
                commit('deleteRequestHeader')
                commit('setAuth', false)
            }
        },
        async validateToken({ getters, commit }) {
            const res = await axios.get('/auth/validate_token', { 
                headers : getters.headers,
                data: {}
            }).catch(e => {
                console.log('validate failed')
                commit('setAuth', false)
            })
            if(res.status === 200) {
                commit('setAuth', true)
            }
        }
    },
    modules: {
        customers: moduleCustomers,
        organizations: moduleOrganizations
    }
})

