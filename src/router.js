import Vue from 'vue'
import VueRouter from 'vue-router'

import Header from './components/Header.vue'
import Customers from './components/Customers.vue'
import CustomerCreate from './components/CustomerCreate.vue'
import Organizations from './components/Organizations.vue'
import Create from './components/Create.vue'
import OrganizationEdit from './components/OrganizationEdit.vue'


Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        components: {
            default: Customers,
            header: Header
        }
    },
    {
        path: '/customers/create',
        components: {
            default: CustomerCreate,
            header: Header
        }
    },
    {
        path: '/organizations', 
        components: {
            default: Organizations,
            header: Header
        }
    },
    {
        path: '/organizations/create',
        components:  {
            default: Create,
            header: Header
        }
    },
    {
        path: '/organizations/:id',
        components: {
            default: OrganizationEdit,
            header: Header
        },
        props: {
            default: true,
            header: false
        }
    }
]

export default new VueRouter({
    routes
})