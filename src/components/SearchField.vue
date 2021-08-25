<template>
    <div id="search-field">
        <span>氏名</span>
        <input type="text" name="name" v-model="inputParams.name">
        <span>性別</span>
        <input type="radio" name="gender" v-model="inputParams.gender" value=""><label for="gender">指定なし</label>
        <input type="radio" name="gender" v-model="inputParams.gender" value="男"><label for="gender">男性</label>
        <input type="radio" name="gender" v-model="inputParams.gender" value="女"><label for="gender">女性</label>
        <span>組織</span>
        <select name="" v-model="inputParams.organizationId">
            <option></option>
            <option 
                v-for="organization in organizations" 
                :value="organization.id"
                :key="organization.id"
            >
                {{ organization.name }}
            </option>
        </select>
        <p>
            <button @click="queryData">検索</button>
        </p>
    </div>
</template>
<script>
export default {
    props: ["organizations"],
    data() {
        return {
            inputParams: {
                name: "",
                gender: "",
                organizationId: ""
            }
        }
    },
    methods: {
        queryData() {
            this.$emit('query', this.inputParams)
        }
    }
    
}
</script>

