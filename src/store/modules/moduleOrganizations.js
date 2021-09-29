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
        async fetchOrganizations({ rootGetters, commit }) {
            const res = await axios.get('/organizations', {
                headers: rootGetters.headers,
                data: {}
            })
            commit('init', res.data)
        },
        async insert({ rootGetters, dispatch }, params) {
            await axios.post('/organizations',
                params, {
                headers: rootGetters.headers
            }).catch(e => {
                console.log(e)
            })
            dispatch('fetchOrganizations')
        },
        async update({ rootGetters, dispatch }, { id, name }) {
            await axios.put(`/organizations/${id}`, { name },
            {
                headers: rootGetters.headers
            }).catch(e => {
                console.log(e)
            })
            dispatch('fetchOrganizations')
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