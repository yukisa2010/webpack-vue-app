import Vue from 'vue'
import Vuex from 'vuex'
import moduleCustomers from './modules/moduleCustomers'
import moduleOrganizations from './modules/moduleOrganizations'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        customers: moduleCustomers,
        organizations: moduleOrganizations
    }
})

