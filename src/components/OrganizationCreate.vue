<template>
    <div>
        <h1>組織の追加</h1>
        <label for="organization">組織名：</label>
        <input type="text" name="organization" v-model="newOrganizationName"/>
        <button @click="insertOrganization">追加</button>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    data: () => ({
        newOrganizationName: ""
    }),
    methods: {
        ...mapMutations('organizations', ["insert"]),
        insertOrganization() {
            this.insert(this.newOrganizationName)
            this.$router.push('/organizations')
        }
    }
}
</script>