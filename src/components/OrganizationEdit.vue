<template>
    <div>
        <p>id: {{ id }}</p>
        <label>名前：</label><input type="text" v-model="newOrganizationName"/>
        <button @click="updateOrganization">更新</button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    props: ["id"],
    computed: {
        ...mapState(["organizations"]),
        ...mapGetters(["getOrganizationName"]),
        newOrganizationName: {
            get() {
                return this.$store.state.newOrganizationName
            },
            set(value) {
                this.$store.commit('changeNewOrganizationName', value)
            }
        }
    },
    methods: {
        updateOrganization() {
            this.$store.commit("updateOrganization", this.id)
            this.$router.push('/organizations')
        },
        getCurrentOrganization() {
            this.$store.commit('changeNewOrganizationName', this.getOrganizationName(this.id))
        },
    },
    created() {
        this.getCurrentOrganization()
    }
}
</script>