import Vue from 'vue'
import App from './App.vue'
import Organizations from './components/Organizations.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


const routes = [
    { path: '/', component: App },
    { path: '/organizations', component: Organizations }
    // { path: '/organization', component: App }
]

const router = new VueRouter({
    routes
})

const app = new Vue({
    el: '#app',
    template: `
    <div>
        <p>
            <router-link to="/">顧客</router-link>
            <router-link to="/organizations">組織</router-link>
        </p>
        <router-view></router-view>
    </div>
    `,
    router

})

