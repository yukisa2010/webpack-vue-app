<template>
    <div>
        <router-view name="header"></router-view>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    beforeCreate() {
        this.$store.dispatch('getCustomers')
        this.$store.dispatch('getOrganizations')
    }
}
</script>