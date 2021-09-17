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
            const response = await axios.post('/auth/sign_in', params)
            if(response.status === 200) {
                state.commit('setRequestHeader', response.headers)
                state.commit('setAuth', true)
                router.push('/')
            } else {
                console.log('login failed')
                commit('setAuth', false)
            }
        },
        async logout(state) {
            await axios.delete('/auth/sign_out', { 
                headers : state.getters.headers,
                data: {}
            }).then(res => {
                state.commit('deleteRequestHeader')
                state.commit('setAuth', false)

            }).catch(e => {
                console.log(e)
            })
        },
        async validateToken(state) {
            await axios.get('/auth/validate_token', { 
                headers : state.getters.headers,
                data: {}
            }).then(res => {
                state.commit('setAuth', true)
                return res
            }).catch(e => {
                console.log('validate failed')
                state.commit('setAuth', false)
            })
        }
    },
    modules: {
        customers: moduleCustomers,
        organizations: moduleOrganizations
    }
})

