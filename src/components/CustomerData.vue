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
import { mapState } from 'vuex'
export default {
    props: ["customer"],
    computed: {
        ...mapState(["organizations"]),
        belongOrganization() {
            const targetOrganization =  this.organizations.find(organization => {
                return this.customer.organizationId === organization.id
            })
            return (targetOrganization == undefined ? "" : targetOrganization.name)
        }
    }    
}
</script>

