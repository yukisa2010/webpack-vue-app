<template>
    <div class="wrapper">
        <div>
            <router-link to="/">顧客</router-link>
            <router-link to="/organizations">組織</router-link>
        </div>
        <div>
            <router-link class="right" to="/login">ログイン</router-link>
            <router-link @click.native="logout" to="/login">ログアウト</router-link>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
    methods: mapActions(["logout"]),
}

</script>
<style scoped>
.wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>

