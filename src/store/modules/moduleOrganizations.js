import axios from 'axios'

export default {
    namespaced: true,
    state: () => ({
        organizations: []
    }),
    mutations: {
        init(state, organizationsData) {
            state.organizations = organizationsData.data
        },
        insert(state, newOrganizationName) {
            const newOrganization = {}
            newOrganization.id = state.organizations.length + 1
            newOrganization.name = newOrganizationName

            state.organizations.push(newOrganization)
        },
        update(state, organizationParams) {
            state.organizations = state.organizations.map(organization => {
                if(organization.id === Number(organizationParams.id)) {
                    organization.name = organizationParams.name
                }
                return organization
            })
        }
    },
    actions : {
        async fetchOrganizations({ commit }) {
            const organizationsData = await axios.get('./organizations.json')
            commit('init', organizationsData)
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