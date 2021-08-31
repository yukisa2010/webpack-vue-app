<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="organizationParams.name"/>
        <button @click="updateOrganization">更新</button>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: ["id"],
    data: () => ({
        organizationParams: {
            id: "",
            name: ""
        }
    }),
    computed: mapGetters('organizations', ["organizationName"]),
    methods: {
        ...mapMutations('organizations', ['update']),
        updateOrganization() {
            this.update(this.organizationParams)
            this.$router.push('/organizations')
        }
    },
    mounted() {
        const organizationParams = {}
        organizationParams.id = this.id
        organizationParams.name = this.organizationName(this.id)

        this.organizationParams = organizationParams
    }
}
</script>