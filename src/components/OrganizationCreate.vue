<template>
    <div>
        <h1>組織の追加</h1>
        <label for="organization">組織名：</label>
        <input type="text" name="organization" v-model="newOrganizationName"/>
        <button @click="addNewOrganization">追加</button>
        <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState(["newOrganizationName"]),
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
        addNewOrganization() {
            this.$store.commit('addNewOrganization')
            this.$router.push('/organizations')
        }
    },
    created() {
        this.$store.commit('changeNewOrganizationName', '')
    }
}
</script>