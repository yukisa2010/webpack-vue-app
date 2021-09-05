<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ to_jp(customer.gender) }}</td>
        <td>{{ formatted_date(customer.birthday) }}</td>
        <td>{{ customer.organization_name }}</td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ["customer"],
    computed: mapGetters('customers', ["to_jp", "formatted_date"])
}
</script>

