<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    components: {
        Header
    },
    beforeCreate() {
        this.$store.dispatch('getCustomers')
        this.$store.dispatch('getOrganizations')
    }
}
</script>