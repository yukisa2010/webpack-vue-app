<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="newOrganizationName"/>
        <button @click="updateOrganization">変更</button>
    </div>
</template>
<script>

export default {
    props: ["id"],
    computed: {
        newOrganizationName: {
            get() {
                return this.$store.state.newOrganizationName
            },
            set(value) {
                this.$store.commit('setNewOrganizationName', value)
            }
        }
    },
    methods: {
        updateOrganization() {
            this.$store.commit("updateOrganization", this.id)
            this.$router.push('/organizations')
        },
        getOrganization() {
            const organization = this.$store.state.organizations.find(organization => {
                return organization.id === Number(this.id)
            })
            this.$store.commit('setNewOrganizationName', organization.name)
        },
    },
    created() {
        this.getOrganization()
    }
}
</script>