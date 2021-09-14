import axios from '../../axios'

export default {
    namespaced: true,
    state: () => ({
        organizations: []
    }),
    mutations: {
        init(state, data) {
            state.organizations = data
        },
        insert(state, name) {
            const newOrganization = {}
            newOrganization.id = state.organizations.length + 1
            newOrganization.name = name

            state.organizations.push(newOrganization)
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
        fetchOrganizations({ rootGetters, commit }) {
            console.log(rootGetters.headers)
            axios.get('/organizations', {
                headers: rootGetters.headers,
                data: {}
            }).then(res => {
                console.log(res)
                commit('init', res.data)
            })
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