import axios from '../../axios'

export default {
    namespaced: true,
    state: () => ({
        organizations: []
    }),
    mutations: {
        init(state, data) {
            state.organizations = data
        }
    },
    actions : {
        fetchOrganizations({ rootGetters, commit }) {
            axios.get('/organizations', {
                headers: rootGetters.headers,
                data: {}
            }).then(res => {
                commit('init', res.data)
            })
        },
        insert({ rootGetters, dispatch }, params) {
            axios.post('/organizations', params,
            {
                headers: rootGetters.headers
            }).then(res => {
                dispatch('fetchOrganizations')
            }).catch(e => {
                console.log(e)
            })
        },
        update({ rootGetters, dispatch }, { id, name }) {
            axios.put(`/organizations/${id}`, { name },
            {
                headers: rootGetters.headers
            }).then(res => {
                dispatch('fetchOrganizations')
            }).catch(e => {
                console.log(e)
            })
        }

    },
    getters: {
        organization: (state) => (id) => {
            return state.organizations.find(organization =>{
                return organization.id === Number(id)
            })
        }
    }
}