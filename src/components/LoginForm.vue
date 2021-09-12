<template>
    <div>
        <p>
            <input type="email" v-model="params.email"/>
        </p>
        <p>
            <input type="password" v-model="params.password"/>
        </p>
        <p>
            <button @click="login">Log in</button>
        </p>
    </div>
</template>

<script>
import axios from '../axios'
import { mapMutations, mapActions } from 'vuex'

export default {
    data: () => ({
        params: {
            email: "test-user+1@example.com",
            password: "password"
        }
    }),
    methods: {
        ...mapActions(["loginAndSetHeader"]),
        async login() {

            // const data_post = await axios.post('/login')
            this.loginAndSetHeader(this.params)

            // console.log(data_post.headers)
            // const access_token = data_post.headers["access-token"]
            // const client = data_post.headers.client
            // const expiry = data_post.headers.expiry
            // const uid = data_post.headers.uid



            // const data_get = await axios.get('/login')
            // const data_get = await axios({
            //     method: 'get',
            //     url: '/auth/validate_token',
            //     headers: {
            //         "access-token": access_token,
            //         "content-type": "application/json",
            //         "client": client,
            //         "expiry": expiry,
            //         "uid": uid
            //     }
            // })
            // console.log(data_get)
        }
    }
}
</script>