<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="updateParams.name"/>
        <button @click="updateOrganization">更新</button>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: ["id"],
    data: () => ({
        updateParams: {
            id: "",
            name: ""
        }
    }),
    computed: mapGetters('organizations', ["organizationName"]),
    methods: {
        ...mapMutations('organizations', ['update']),
        updateOrganization() {
            this.update(this.updateParams)
            this.$router.push('/organizations')
        }
    },
    mounted() {
        const initParams = {}
        initParams.id = this.id
        initParams.name = this.organizationName(this.id)

        this.updateParams = initParams
    }
}
</script>