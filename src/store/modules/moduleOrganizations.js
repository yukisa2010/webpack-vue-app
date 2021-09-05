import axios from 'axios'

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
        async fetchOrganizations({ commit }) {
            axios.defaults.baseURL = 'http://localhost:3000'
            const data = (await axios.get('/organizations')).data
            commit('init', data)
        },
        async insert({ dispatch }, name) {
            axios.defaults.baseURL = 'http://localhost:3000'
            const params = { name }

            await axios.post('/organizations', params)
            dispatch('fetchOrganizations')
        },
        async update({ dispatch }, params) {
            axios.defaults.baseURL = 'http://localhost:3000'

            await axios.put(`/organizations/${params.id}`, {name: params.name})
            dispatch('fetchOrganizations')

        }
    },
    getters: {
        organizationName: (state) => (id) => {
            const organization = state.organizations.find(organization =>{
                return organization.id === Number(id)
            })
            return !organization ? '' : organization.name
        }
    }
}