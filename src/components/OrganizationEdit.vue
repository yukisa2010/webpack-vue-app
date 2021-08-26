<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" :value="getOrganization.name"/>
        <button @click="updateOrganization">変更</button>
    </div>
</template>
<script>

export default {
    props: ["id"],
    computed: {
        getOrganization() {
            return this.$store.state.organizations.find(organization => {
                return organization.id === Number(this.id)
            })
        }
    },
    methods: {
        updateOrganization() {
            this.$store.commit("updateOrganization", this.id, newValue)
        }
    }
}
</script>