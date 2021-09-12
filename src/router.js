import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginForm from './components/LoginForm.vue'
import Customers from './components/Customers.vue'
import CustomerCreate from './components/CustomerCreate.vue'
import Organizations from './components/Organizations.vue'
import OrganizationCreate from './components/OrganizationCreate.vue'
import OrganizationEdit from './components/OrganizationEdit.vue'


Vue.use(VueRouter)

const routes = [
    { 
        path: '/login', 
        component: LoginForm
    },
    { 
        path: '/', 
        component: Customers
    },
    {
        path: '/customers/create',
        component: CustomerCreate
    },
    {
        path: '/organizations', 
        component: Organizations
    },
    {
        path: '/organizations/create',
        component: OrganizationCreate
    },
    {
        path: '/organizations/:id',
        component: OrganizationEdit,
        props: true
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default new VueRouter({
    routes
})