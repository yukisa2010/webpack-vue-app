import axios from 'axios'


export default {
    namespaced: true,
    state:() => ({
        customers: [],
        searchedCustomers: [],
        searchParams: {
            name: "",
            gender: "",
            organizationId: ""
        },
        insertParams: {
            name: "",
            gender: "",
            birthday: "",
            organizationId: 0
        }
    }),
    mutations: {
        init(state, customersData) {
            state.customers = customersData.data
            state.searchedCustomers = customersData.data
        },
        changeInsertParams(state, value) {
            state.insertParams = value
        },
        search(state) {
            const reg = new RegExp(state.searchParams.name)
            const gender = state.searchParams.gender
            const organizationId = state.searchParams.organizationId
            state.searchedCustomers = state.customers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        },
        insert(state) {
            if(state.insertParams.name === '') { return }
            const newCustomer = state.insertParams
            newCustomer.id = state.customers.length + 1
            newCustomer.birthday = newCustomer.birthday.replaceAll('-', '/')
            state.customers.push(newCustomer)
            const defaultParams = {
                name: "",
                gender: "",
                birthday: "",
                organizationId: 0   
            }
            state.insertParams = defaultParams
        }
    },
    actions : {
        async fetchCustomers({ commit }) {
            const customersData = await axios.get('./customers.json')
            commit('init', customersData)
        }
    }
}