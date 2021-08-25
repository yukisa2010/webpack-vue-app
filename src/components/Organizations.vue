<template>
    <div>
        <h1>組織一覧</h1>
        <ul>
            <li 
                v-for="organization in organizations" 
                :key="organization.name"
            >{{ organization.name }}</li>
        </ul>
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