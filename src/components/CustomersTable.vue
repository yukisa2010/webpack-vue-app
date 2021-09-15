<template>
    <div id="data-field">
        <table>
            <tr>
                <th>ID</th>
                <th>氏名</th>
                <th>性別</th>
                <th>生年月日</th>
                <th>所属会社</th>
            </tr>
            <CustomerData
                v-for="customer in customers"
                :key="customer.name"
                :customer="customer"
            >
            </CustomerData>
        </table>
    </div>
</template>
<script>
import CustomerData from './CustomerData.vue'
import { mapState, mapActions } from 'vuex'

export default {
    components: {
        CustomerData
    },
    computed: mapState('customers', ["customers"])
}
</script>

<style>
table, tr {
    border: solid 1px #eee;
    border-collapse: collapse;
}
th {
    background-color:#eef1ff;
}
th, td {
    padding: 10px 30px;
}

</style>

