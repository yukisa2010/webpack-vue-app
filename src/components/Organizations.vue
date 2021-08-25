<template>
    <div>
        <h1>組織一覧</h1>
        <router-link to="/organizations/create">組織を追加</router-link>
        <ul>
            <li 
                v-for="organization in organizations" 
                :key="`view_${organization.name}`"
            >{{ organization.name }}</li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            organizations: []
        }
    },
    beforeCreate() {
        axios
        .get('./organizations.json')
        .then(res => {
            this.organizations = res.data
        })
    }
}
</script>