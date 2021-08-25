<template>
    <tr>
        <td>{{ customer.id }}</td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.gender }}</td>
        <td>{{ customer.birthday }}</td>
        <td>{{ belongOrganization }}</td>
    </tr>
</template>
<script>
export default {
    props: ["customer", "organizations"],
    computed: {
        belongOrganization() {
            const targetOrganization =  this.organizations.find(organization => {
                return this.customer.organizationId === organization.id
            })
            return (targetOrganization == undefined ? "" : targetOrganization.name)
        }
    }    
}
</script>

