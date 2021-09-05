<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="params.name"/>
        <button @click="updateOrganization">更新</button>{{params}}
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ["id"],
    data: () => ({
        params: {
            id: "",
            name: ""
        }
    }),
    computed: mapGetters('organizations', ["organizationName"]),
    methods: {
        ...mapActions('organizations', ['update']),
        updateOrganization() {
            this.update(this.params)
            this.$router.push('/organizations')
        }
    },
    mounted() {
        const initParams = {}
        initParams.id = this.id
        initParams.name = this.organizationName(this.id)

        this.params = initParams
    }
}
</script>