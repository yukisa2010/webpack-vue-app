<template>
    <div id="search-field">
        <span class="bold">氏名</span>
        <input type="text" name="name" v-model="params.name">
        <span class="bold">性別</span>
        <input 
            type="radio" 
            name="gender" 
            v-model="params.gender" 
            value=""
        ><label for="gender">指定なし</label>
        <input 
            type="radio" 
            name="gender" 
            v-model="params.gender" 
            value="男"
        ><label for="gender">男性</label>
        <input 
            type="radio" 
            name="gender" 
            v-model="params.gender" 
            value="女"
        ><label for="gender">女性</label>
        <span class="bold">組織</span>
        <select v-model="params.organizationId">
            <option value="" selected>選択なし</option>
            <option 
                v-for="organization in organizations" 
                :value="organization.id"
                :key="organization.name"
            >
                {{ organization.name }}
            </option>
        </select>
        <p>
            <button @click="search(params)">検索</button>
        </p>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
    data: () => ({
        params: {
            name: "",
            gender: "",
            organizationId: ""
        }
    }),
    computed: mapState('organizations', ["organizations"]),
    methods: mapMutations('customers', ["search"])
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
