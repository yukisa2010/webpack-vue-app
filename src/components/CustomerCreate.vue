<template>
    <div>
        <h1>顧客の追加</h1>
        <p>
            <label>氏名：</label><input type="text" v-model="newCustomerParams.name"/>
        </p>
        <p>
            <label>性別：</label>
            <input type="radio" name="gender" v-model="newCustomerParams.gender" value=""><label for="gender">指定なし</label>
            <input type="radio" name="gender" v-model="newCustomerParams.gender" value="男"><label for="gender">男性</label>
            <input type="radio" name="gender" v-model="newCustomerParams.gender" value="女"><label for="gender">女性</label>
        </p>
        <p>
            <label for="birthday">生年月日：</label>
            <input type="date" v-model="newCustomerParams.birthday"/>
        </p>
        <p>
            <label for="organization"></label>
            <select v-model="newCustomerParams.organizationId">
                <option value="" selected>選択なし</option>
                <option 
                    v-for="organization in organizations"
                    :key="organization.name"
                    :value="organization.id"
                >{{ organization.name }}</option>
            </select>
        </p>
        <button @click="addCustomer">追加</button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(["organizations"]),
        newCustomerParams: {
            get() {
                return this.$store.state.newCustomerParams
            },
            set(value) {
                this.$store.commit('changeNewCustomerParams', value)
            }
        }
    },
    methods: {
        addCustomer() {
            this.$store.commit('addCustomer')
            this.$router.push('/')
        }
    }
}
</script>