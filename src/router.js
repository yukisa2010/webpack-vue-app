import Vue from 'vue'
import VueRouter from 'vue-router'


import LoginForm from './components/LoginForm.vue'
import Customers from './components/Customers.vue'
import CustomerCreate from './components/CustomerCreate.vue'
import Organizations from './components/Organizations.vue'
import OrganizationCreate from './components/OrganizationCreate.vue'
import OrganizationEdit from './components/OrganizationEdit.vue'
import store from './store/store'


Vue.use(VueRouter)

const routes = [
    { 
        path: '/login', 
        component: LoginForm,
        meta: { requiresNotAuth: true } 
    },
    { 
        path: '/', 
        component: Customers,
        meta: { requiresAuth: true } 
    },
    {
        path: '/customers/create',
        component: CustomerCreate,
        meta: { requiresAuth: true } 
    },
    {
        path: '/organizations', 
        component: Organizations,
        meta: { requiresAuth: true } 
    },
    {
        path: '/organizations/create',
        component: OrganizationCreate,
        meta: { requiresAuth: true } 
    },
    {
        path: '/organizations/:id',
        component: OrganizationEdit,
        props: true,
        meta: { requiresAuth: true } 
    },
    {
        path: '*',
        redirect: '/',
        meta: { requiresAuth: true } 
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next) => {
    store.dispatch('validateToken')

    if(to.matched.some(record => record.meta.requiresAuth) && store.getters.isAuth) {
        next()
    } else {
        (to.path !== '/login') ? next('/login') : next()
    }
})

export default router

