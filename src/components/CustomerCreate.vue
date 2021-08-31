<template>
    <div>
        <h1>顧客の追加</h1>
        <p>
            <label>氏名：</label><input type="text" v-model="_insertParams.name"/>
        </p>
        <p>
            <label>性別：</label>
            <input type="radio" name="gender" v-model="_insertParams.gender" value=""><label for="gender">指定なし</label>
            <input type="radio" name="gender" v-model="_insertParams.gender" value="男"><label for="gender">男性</label>
            <input type="radio" name="gender" v-model="_insertParams.gender" value="女"><label for="gender">女性</label>
        </p>
        <p>
            <label for="birthday">生年月日：</label>
            <input type="date" v-model="_insertParams.birthday"/>
        </p>
        <p>
            <label for="organization"></label>
            <select v-model="_insertParams.organizationId">
                <option value="" selected>選択なし</option>
                <option 
                    v-for="organization in organizations"
                    :key="organization.name"
                    :value="organization.id"
                >{{ organization.name }}</option>
            </select>
        </p>
        <button @click="insertCustomer">追加</button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('organizations', ["organizations"]),
        ...mapState('customers', ["insertParams"]),
        _insertParams: {
            get() {
                return this.insertParams
            },
            set(value) {
                this.$store.commit('changeInsertParams', value)
            }
        }
    },
    methods: {
        insertCustomer() {
            this.$store.commit('customers/insert')
            this.$router.push('/')
        }
    }
}
</script>