<template>
    <div id="search-field">
        <span class="bold">氏名</span>
        <input type="text" name="name" v-model="queryCustomerParams.name">
        <span class="bold">性別</span>
        <input type="radio" name="gender" v-model="queryCustomerParams.gender" value=""><label for="gender">指定なし</label>
        <input type="radio" name="gender" v-model="queryCustomerParams.gender" value="男"><label for="gender">男性</label>
        <input type="radio" name="gender" v-model="queryCustomerParams.gender" value="女"><label for="gender">女性</label>
        <span class="bold">組織</span>
        <select id="test" v-model="queryCustomerParams.organizationId">
            <option value="" selected>選択なし</option>
            <option 
                v-for="organization in organizations" 
                :value="organization.id"
                :key="organization.id"
            >
                {{ organization.name }}
            </option>
        </select>
        <p>
            <button @click="queryCustomers">検索</button>
        </p>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    computed: mapState(["queryCustomerParams", "organizations"]),
    methods: {
        queryCustomers() {
            this.$store.commit('queryCustomers')
        }
    }    
}
</script>
<style scoped>
.bold {
    font-weight: bold;
}

select {
    width: 120px;
}

button {
    color: #fff;
    background-color: #3f51b5;
    outline: none;
    border: none;
    width: 100px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
