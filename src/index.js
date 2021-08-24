import Vue from 'vue'
import axios from 'axios'

const app = new Vue({
    el: '#app',
    template: `
<div>
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
        <button @click="queryData">検索</button>
    </div>
    <div id="data-field">
        <table :style="tableStyles">
            <tr :styles="tableStyles">
                <th>ID</th>
                <th>氏名</th>
                <th>性別</th>
                <th>生年月日</th>
                <th>所属会社</th>
            </tr>
            <tr v-for="customer in queryCustomers" :styles="tableStyles">
                <td>{{ customer.id }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.gender }}</td>
                <td>{{ customer.birthday }}</td>
                <td>{{ getOrganizationName(customer.organizationId) }}</td>
            </tr>
        </table>
    </div>
</div>
    `,
    data() {
        return {
            inputParams: {
                name: "",
                gender: "",
                organizationId: ""
            },
            rawCustomers: [],
            queryCustomers: [],
            organizations: []
        }
    },
    methods: {
        queryData() {
            const reg = new RegExp(this.inputParams.name)
            const gender = this.inputParams.gender
            const organizationId = this.inputParams.organizationId
            const queryCustomers = this.rawCustomers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })

            this.queryCustomers = queryCustomers
        },
        getOrganizationName(id) {
            const targetOrganization = this.organizations.filter(organization => {
                return organization.id === id
            });
    
            return targetOrganization[0]["name"]
        },
    },
    computed: {
        tableStyles() {
            return {
                border: 'solid 1px black',
                borderCollapse: 'collapse'
            }
        }
    },
    beforeCreate() {
        axios
            .get('./customers.json')
            .then(res => {
                this.rawCustomers = res.data
                this.queryCustomers = this.rawCustomers
            })
        axios
            .get('./organizations.json')
            .then(res => {
                this.organizations = res.data
            })

    }
})

