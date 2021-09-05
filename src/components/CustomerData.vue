<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ customer.organization_name }}</td>
    </tr>
</template>
<script>

export default {
    props: ["customer"]
}
</script>

