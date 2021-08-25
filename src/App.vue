<template>
    <div>
        <SearchField 
            :organizations="organizations" 
            @query="queryData"
        ></SearchField>
        <CustomersTable
            :rawCustomers = rawCustomers
            :queryCustomers = queryCustomers
            :organizations = organizations
        ></CustomersTable>
    </div>
</template>

<script>
import SearchField from './components/SearchField.vue'
import CustomersTable from './components/CustomersTable.vue'
import axios from 'axios'

export default {
    data() {
        return {
            rawCustomers: [],
            queryCustomers: [],
            organizations: []
        }
    },
    components: {
        SearchField,
        CustomersTable
    },
    methods: {
        queryData(inputParams) {
            const reg = new RegExp(inputParams.name)
            const gender = inputParams.gender
            const organizationId = inputParams.organizationId
            this.queryCustomers = this.rawCustomers.filter(customer => {
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
            })
        axios
            .get('./organizations.json')
            .then(res => {
                this.organizations = res.data
            })
    }
}
</script>