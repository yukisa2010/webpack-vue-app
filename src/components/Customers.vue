<template>
    <div>
        <router-link to="/customers/create">顧客を追加</router-link>
        <SearchField></SearchField>
        <CustomersTable></CustomersTable>
    </div>
</template>

<script>
import SearchField from './SearchField.vue'
import CustomersTable from './CustomersTable.vue'

export default {
    components: {
        SearchField,
        CustomersTable
    }
}
</script>