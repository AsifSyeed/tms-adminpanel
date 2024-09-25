<template>
    <div class="px-2 py-2 sm:px-3 lg:px-4 w-full">
        <h2 class="text-2xl font-bold pb-2">Referral</h2>
        <div class="border-round" style="overflow: hidden;">
            <DataTable :value="referral.data" tableStyle="min-width: 50rem" paginator :rows="20"
                :rowsPerPageOptions="[20, 50]">
                <Column field="id" header="Referral ID"></Column>
                <Column field="referralCode" header="Referral Code"></Column>
                <Column field="referralDiscount" header="Referral Discount"></Column>
                <Column field="eventId" header="Event ID"></Column>
                <Column field="referralType" header="Referral Type" :body="mapReferralType"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth'
})
const userToken = useCookie('token')
const token = "Bearer " + userToken.value
console.log(token)

const { data: referral } = await useFetch('https://api.countersbd.com/api/v1/referral/admin-all', {
    headers: {
        "Authorization": token
    },
    method: 'get'
})

console.log("referralsssssss")
console.log(referral)

// Mapping for ReferralTypeEnum
const referralTypeMap = {
    1: 'Default',
    2: 'Custom'
}

// Method to map referralType
const mapReferralType = (rowData) => {
    return referralTypeMap[rowData.referralType] || 'Unknown';
}
</script>

<style scoped>
.p-component {
    border-radius: 0px !important;
}
</style>
