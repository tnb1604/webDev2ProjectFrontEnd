<template>
    <div class="accoun">
        <h1>Account Details</h1>
        <div class="account-info">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
        </div>
        <button @click="editAccount">Edit Account</button>
    </div>
</template>

<script>


</script>

<style scoped>

</style>