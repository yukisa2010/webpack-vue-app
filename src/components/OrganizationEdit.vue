<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="params.name"/>
        <button @click="updateOrganization">更新</button>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['id'],
    data: () => ({
        params: {
            id: '',
            name: ''
        }
    }),
    computed: mapGetters('organizations', ['organization']),
    methods: {
        ...mapActions('organizations', ['update']),
        updateOrganization() {
            this.update(this.params)
            this.$router.push('/organizations')
        }
    },
    mounted() {
        this.params.id = this.id
        this.params.name = this.organization(this.id).name
    }
}
</script>