import axios from 'axios'

export default {
    state: () => ({
        organizations: [],
        newOrganizationName: "",
        editOrganizationName: ""
    }),
    mutations: {
        initOrganizations(state, organizationsData) {
            organizationsData.then(res => {
                state.organizations = res.data
            })
        },
        addNewOrganization(state) {
            const newOrganization = {}
            newOrganization.id = state.organizations.length + 1
            newOrganization.name = state.newOrganizationName

            state.organizations.push(newOrganization)
            state.newOrganizationName = ''
        },
        changeNewOrganizationName(state, value) {
            state.newOrganizationName = value
        },
        updateOrganization(state, id) {
            state.organizations = state.organizations.map(organization => {
                if(organization.id === Number(id)) {
                    organization.name = state.newOrganizationName
                }
                return organization
            })
            state.newOrganizationName = ''
        }
    },
    actions : {
        getOrganizations({ commit }) {
            const organizationsData = axios.get('./organizations.json')
            commit('initOrganizations', organizationsData)
        }
    },
    getters: {
        getOrganizationName: (state) => (id) => {
            const organization = state.organizations.find(organization =>{
                return organization.id === Number(id)
            })
            return !organization ? '' : organization.name
        },
        getNewOrganizationName: state => state.newOrganizationName
    }
}