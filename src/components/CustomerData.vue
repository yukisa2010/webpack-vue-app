<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ getOrganizationName(customer.organizationId) }}</td>
    </tr>
</template>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    props: ["customer"],
    computed: {
        ...mapState(["organizations"]),
        ...mapGetters(["getOrganizationName"])
    }    
}
</script>

