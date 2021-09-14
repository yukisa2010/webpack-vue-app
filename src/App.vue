<template>
    <div>
        <Header></Header>
        <router-view></router-view>
    </div>
</template>

<script>
import Header from './components/Header.vue'
// import { mapActions } from 'vuex'

export default {
    components: {
        Header
    }
}
</script>