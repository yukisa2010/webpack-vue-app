import Vue from 'vue'
import axios from 'axios'

Vue.component('search-field', {
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
    template: `
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
    `,
    methods: {
        queryData() {
            this.$emit('query', this.inputParams)
        }
    }
})

Vue.component('customers-table', {
    props: ["rawCustomers", "queryCustomers", "organizations"],
    template: `
    <div id="data-field">
        <table :style="tableStyles">
            <tr :styles="tableStyles">
                <th>ID</th>
                <th>氏名</th>
                <th>性別</th>
                <th>生年月日</th>
                <th>所属会社</th>
            </tr>
            <customer-data 
                v-for="customer in queryCustomers" 
                :customer="customer"
                :organizations = "organizations"
                :styles="tableStyles"
            >
            </customer-data>
        </table>
    </div>

    `,
    computed: {
        tableStyles() {
            return {
                border: 'solid 1px black',
                borderCollapse: 'collapse',
                padding: '10px'
            }
        }
    }
})

Vue.component('customer-data', {
    props: ["customer", "organizations"],
    template: `
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ getOrganizationName(customer) }}</td>
    </tr>
    `,
    methods: {
        getOrganizationName(customer) {
            const targetOrganization = this.organizations.find(organization => {
                return organization.id === customer.id
            });
            return targetOrganization.name
        }
    }
})

const app = new Vue({
    el: '#app',
    template: `
    <div>
        <search-field 
            :organizations="organizations" 
            @query="queryData"
        ></search-field>
        <customers-table
            :rawCustomers = rawCustomers
            :queryCustomers = queryCustomers
            :organizations = organizations
        ></customers-table>
    </div>
    `,
    data() {
        return {
            rawCustomers: [],
            queryCustomers: [],
            organizations: []
        }
    },
    methods: {
        queryData(inputParams) {
            const reg = new RegExp(inputParams.name)
            const gender = inputParams.gender
            const organizationId = inputParams.organizationId
            this.rawCustomers = this.rawCustomers.filter(customer => {
                return (
                    reg.test(customer.name)
                    && (gender === "" ? true : customer.gender === gender )
                    && (organizationId === "" ? true: customer.organizationId === organizationId)
                )
            })
        }
    },
    beforeCreate() {
        axios
            .get('./customers.json')
            .then(res => {
                this.rawCustomers =  res.data
                this.queryCustomers = this.rawCustomers
                return res
            })
        axios
            .get('./organizations.json')
            .then(res => {
                this.organizations = res.data
            })                
    },
    mounted() {
        this.queryData(this.inputParams)

    }
})

