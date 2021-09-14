<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ formattedGender(customer.gender) }}</td>
        <td>{{ formattedDate(customer.birthday) }}</td>
        <td>{{ customer.organization_name }}</td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ["customer"],
    computed: mapGetters('customers', ["formattedGender", "formattedDate"])
}
</script>

