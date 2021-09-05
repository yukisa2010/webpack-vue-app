import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        organizations: []
    }),
    mutations: {
        init(state, organizationsData) {
            state.organizations = organizationsData
        },
        update(state, params) {
            state.organizations = state.organizations.map(organization => {
                if(organization.id === Number(params.id)) {
                    organization.name = params.name
                }
                return organization
            })
        }
    },
    actions : {
        async fetchOrganizations({ commit }) {
            const organizationsData = (await axios.get('http://localhost:3000/organizations')).data
            commit('init', organizationsData)
        },
        async insert(state, name) {
            axios.defaults.baseURL = 'http://localhost:3000'


            const newOrganization = {}
            newOrganization.id = state.organizations.length + 1
            newOrganization.name = name

            state.organizations.push(newOrganization)
        },

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