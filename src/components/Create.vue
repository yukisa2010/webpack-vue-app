<template>
    <div>
        <h1>組織の追加</h1>
        <label for="organization">組織名：</label>
        <input type="text" name="organization" v-model="newOrganizationName"/>
        <button @click="addOrganization">追加</button>
        <router-view></router-view>
    </div>
</template>
<script>

export default {
    computed: {
        newOrganizationName: {
            get() {
                return this.$store.state.newOrganizationName
            },
            set(value) {
                this.$store.commit('changeNewOrganizationName', value)
            }
        }
    },
    methods: {
        addOrganization() {
            this.$store.commit('addOrganization')
            this.$router.push('/organizations')
        }
    }
}
</script>