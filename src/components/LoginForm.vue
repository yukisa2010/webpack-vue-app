<template>
    <div>
        <p>
            <input type="email" v-model="params.email"/>
        </p>
        <p>
            <input type="password" v-model="params.password"/>
        </p>
        <p>
            <button @click="handleLogin">Log in</button>
        </p>
    </div>
</template>

<script>
import axios from '../axios'
import { mapMutations, mapActions } from 'vuex'

export default {
    data: () => ({
        params: {
            // email: "test-user+1@example.com",
            // password: "password"
        }
    }),
    methods: {
        ...mapActions(["login"]),
        handleLogin() {
            this.login(this.params)
            this.$router.push('/')
        }
    }
}
</script>