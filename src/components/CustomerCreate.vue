<template>
    <div>
        <h1>顧客の追加</h1>
        <p>
            <label>氏名：</label><input type="text" v-model="params.name"/>
        </p>
        <p>
            <label>性別：</label>
            <input type="radio" name="gender" v-model="params.gender" value=""><label for="gender">指定なし</label>
            <input type="radio" name="gender" v-model="params.gender" value="男"><label for="gender">男性</label>
            <input type="radio" name="gender" v-model="params.gender" value="女"><label for="gender">女性</label>
        </p>
        <p>
            <label for="birthday">生年月日：</label>
            <input type="date" v-model="params.birthday"/>
        </p>
        <p>
            <label for="organization"></label>
            <select v-model="params.organizationId">
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
import { mapState, mapMutations } from 'vuex'
export default {
    data: () => ({
        params: {
            name: "",
            gender: "",
            birthday: "",
            organizationId: 0
        }
    }),
    computed: mapState('organizations', ["organizations"]),
    methods: {
        ...mapMutations('customers', ["insert"]),
        insertCustomer() {
            this.insert(this.params)
            this.$router.push('/')
        }
    }
}
</script>