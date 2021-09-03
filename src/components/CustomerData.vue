<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ organizationName(customer.organizationId) }}</td>
    </tr>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    props: ["customer"],
    computed: mapGetters('organizations',["organizationName"])
}
</script>

