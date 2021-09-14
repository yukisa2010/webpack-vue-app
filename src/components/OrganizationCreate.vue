<template>
    <div>
        <h1>組織の追加</h1>
        <label for="organization">組織名：</label>
        <input type="text" name="organization" v-model="params.name"/>
        <button @click="insertOrganization">追加</button>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    data: () => ({
        params: {
            name: ""
        }
    }),
    methods: {
        ...mapActions('organizations', ["insert"]),
        insertOrganization() {
            this.insert(this.params)
            this.$router.push('/organizations')
        }
    }
}
</script>