<template>
    <div class="px-2 py-2 sm:px-3 lg:px-4 w-full">
        <h2 class="text-2xl font-bold pb-2">Referral</h2>
        <div class="border-round" style="overflow: hidden;">
            <DataTable :value="transactions.data" tableStyle="min-width: 50rem" paginator :rows="20"
                :rowsPerPageOptions="[20, 50]">
                <Column field="userName" header="User Name"></Column>
                <Column field="userEmail" header="Email"></Column>
                <Column field="userPhone" header="Phone"></Column>
                <Column field="eventName" header="Event"></Column>
                <Column field="numberOfTickets" header="Quantity"></Column>
                <Column field="amount" header="Amount"></Column>
                <Column field="createdDate" header="Ticket Created"></Column>
                <Column field="transactionRefNo" header="Reference No"></Column>
                <!-- Add the button column here -->
                <!-- <Column header="Actions">
                    <template #body="slotProps">
                        <button @click="goToEditView(slotProps.data.id)" class="px-3 py-2 text-white bg-blue-500 rounded">
                            Edit
                        </button>
                    </template>
                </Column> -->
            </DataTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})

// Define the token and fetch data
const userToken = useCookie('token')
const token = "Bearer " + userToken.value

const { data: transactions } = await useFetch('https://api.countersbd.com/api/v1/transaction/admin/valid-transactions', {
    headers: {
        "Authorization": token
    },
    method: 'get'
})

// Mapping referralType
const referralTypeMap = {
    1: 'Default',
    2: 'Custom'
}

const mapReferralType = (rowData) => {
    return referralTypeMap[rowData.referralType] || 'Unknown';
}

// Function to handle navigation to edit view
// const goToEditView = (id) => {
//     navigateTo(`/referral/${id}`)
// }

</script>

<style scoped>
.p-component {
    border-radius: 0px !important;
}

button {
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: #3b82f6;
}
</style>
