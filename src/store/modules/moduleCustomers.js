import axios from 'axios'


export default {
    state:() => ({
        rawCustomers: [],
        queryCustomers: [],
        queryCustomerParams: {
            name: "",
            gender: "",
            organizationId: ""
        },
        newCustomerParams: {
            name: "",
            gender: "",
            birthday: "",
            organizationId: 0
        },

    }),
    mutations: {
        initCustomers(state, customersData) {
            customersData.then(res => {
                state.rawCustomers =  res.data
                state.queryCustomers = state.rawCustomers
            })
        },
        queryCustomers(state) {
            const reg = new RegExp(state.queryCustomerParams.name)
            const gender = state.queryCustomerParams.gender
            const organizationId = state.queryCustomerParams.organizationId
            state.queryCustomers = state.rawCustomers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        },
        changeNewCustomerParams(state, newCustomerParams) {
            state.newCustomerParams = newCustomerParams
        },
        addCustomer(state) {
            if(state.newCustomerParams.name === '') { return }
            const newCustomer = state.newCustomerParams
            newCustomer.birthday = newCustomer.birthday.replaceAll('-', '/')
            newCustomer.id = state.rawCustomers.length + 1
            state.rawCustomers.push(newCustomer)
            const defaultParams = {
                name: "",
                gender: "",
                birthday: "",
                organizationId: 0   
            }
            state.newCustomerParams = defaultParams
        }
    },
    actions : {
        getCustomers({ commit }) {
            const customersData = axios.get('./customers.json')
            commit('initCustomers', customersData)
        },
    },
    getters: {
        getNewCustomerParams: state => state.newCustomerParams
    }
}