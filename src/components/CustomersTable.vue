<template>
    <div id="data-field">
        <table :style="tableStyles">
            <tr :styles="tableStyles">
                <th>ID</th>
                <th>氏名</th>
                <th>性別</th>
                <th>生年月日</th>
                <th>所属会社</th>
            </tr>
            <CustomerData
            v-for="customer in queryCustomers"
            :key="customer"
            :customer="customer"
            :organizations="organizations"
            :styles="tableStyles"
            >
            </CustomerData>
        </table>
    </div>
</template>
<script>
import CustomerData from './CustomerData.vue'

export default {
    props: ["rawCustomers", "organizations", "queryCustomers"],
    components: {
        CustomerData
    },
    computed: {
        tableStyles() {
            return {
                border: 'solid 1px black',
                borderCollapse: 'collapse',
                padding: '10px'
            }
        }
    }    
}
</script>



