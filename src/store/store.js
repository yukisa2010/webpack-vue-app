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
            access_token: "",
            client: "",
            expiry: "",
            uid: ""
        },
        isAuth: false
    }),
    mutations: {
        init(state) {
            const allCookies = document.cookie.split(';')
            const HEADERS = ["access-token", "client", "uid", "expiry"]

            const cookieObj = {}
            allCookies.forEach(cookie => {
                const key = cookie.split('=')[0].trim()
                const value = cookie.split('=')[1].trim()
                const index = HEADERS.indexOf(key)
                if(index !== -1) {
                    cookieObj[key] = value
                }                
            })

            const requestHeader = {}
            requestHeader.access_token = cookieObj["access-token"]
            requestHeader.client = cookieObj["client"]
            requestHeader.expiry = cookieObj["expiry"]
            requestHeader.uid = cookieObj["uid"]

            state.requestHeader = requestHeader
        },

        setRequestHeader(state, params) {
            const requestHeader = {}
            const MAX_AGE = 3600

            requestHeader.access_token = params["access-token"]
            requestHeader.client = params.client
            requestHeader.expiry = params.expiry
            requestHeader.uid = params.uid

            Object.keys(params).forEach(key => {
                document.cookie = `${key}=${params[key]};max-age=${MAX_AGE}`
            })
            state.requestHeader = requestHeader
            
        },
        setAuth(state, value) {
            state.isAuth = value
        },
        deleteRequestHeader(state) {
            const HEADERS = ["access-token", "client", "uid", "expiry"]
            HEADERS.forEach(key => {
                document.cookie = `${key}=;max-age=0`
            })
            state.requestHeader = {}
        }
    },
    getters: {
        headers(state) {

            const headers = {
                "content-type": "application/json",
                "access-token": state.requestHeader.access_token,
                "client": state.requestHeader.client,
                "expiry": state.requestHeader.expiry,
                "uid": state.requestHeader.uid
            }
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

