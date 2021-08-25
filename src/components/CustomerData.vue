<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ belongOrganization.name }}</td>
    </tr>
</template>
<script>
export default {
    props: ["customer", "organizations"],
    computed: {
        belongOrganization() {
            return this.organizations.find(organization => {
                return this.customer.organizationId === organization.id
            })
        }
    }    
}
</script>

