<template>
    <div>
        <SearchField></SearchField>
        <CustomersTable></CustomersTable>
    </div>
</template>

<script>
import SearchField from './components/SearchField.vue'
import CustomersTable from './components/CustomersTable.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    components: {
        SearchField,
        CustomersTable
    },
    computed: mapState(["rawCustomers", "queryCustomers", "organizations"]),
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
            this.$store.dispatch('getCustomers')
            this.$store.dispatch('getOrganizations')
    }

}
</script>