<template>
    <div>
        <h1>組織一覧</h1>
        <router-link to="/organizations/create">組織を追加</router-link>
        <ul>
            <li 
                v-for="organization in organizations" 
                :key="`view_${organization.name}`"
            >
                {{ organization.name }}
                <router-link :to="`/organizations/${organization.id}`" >編集</router-link>    
            </li>
            
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: mapState('organizations', ["organizations"])
}
</script>