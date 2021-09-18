<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer_gender(customer.gender) }}</td>
        <td>{{ customer_birthday(customer.birthday) }}</td>
        <td>{{ customer.organization_name }}</td>
    </tr>
</template>
<script>
import { formattedGender, formattedDate } from '../util/index'

export default {
    props: ['customer'],
    computed: {
        customer_gender:() => (gender) => {
            return formattedGender(gender)
        },
        customer_birthday:() => (day) => {
            return formattedDate(day)
        }
    }
}
</script>

