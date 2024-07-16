<template>
    <div class="px-2 py-2 sm:px-3 lg:px-4 w-full">
        <h2 class="text-2xl font-bold">Create Event</h2>

        <h3 class="pl-1 pt-3">Event Details</h3>
        <div class="formgrid grid bg-white p-3 border-round pt-4 mx-1">
            <div class="field col-12 md:col-6">
                <label>Event Name</label>
                <GlobalInputText v-model="eventDetails.eventName" placeholder="Name" />
            </div>
            <div class="field col-12 md:col-2">
                <label>Capacity</label>
                <GlobalInputNumber v-model="eventDetails.eventCapacity" placeholder="Capacity" />
            </div>
            <div class="field col-12 md:col-2">
                <label>Start Date</label>
                <GlobalInputDate v-model="eventDetails.eventStartDate" placeholder="DD/MM/YYYY HH:MM"/>
            </div>
            <div class="field col-12 md:col-2">
                <label>End Date</label>
                <GlobalInputDate v-model="eventDetails.eventEndDate" placeholder="DD/MM/YYYY HH:MM"/>
            </div>
            
            
            <div class="field col-12 md:col-12">
                <h3>Category List</h3>
            </div>
            <template v-for="(category, index) in categoryDetails">
                <div class="field col-12 md:col-3">
                    <GlobalInputText placeholder="Category Name" v-model="category.categoryName" />
                </div>
                <div class="field col-12 md:col-3">
                    <GlobalInputText placeholder="Description" v-model="category.categoryDescription" />
                </div>
                <div class="field col-12 md:col-2">
                    <GlobalInputNumber placeholder="Capacity" v-model="category.categoryCapacity" />
                </div>
                <div class="field col-12 md:col-3">
                    <GlobalInputNumber mode="currency" currency="BDT" placeholder="Price"
                        v-model="category.categoryPrice" />
                </div>
                <div class="field col-12 md:col-1">
                    <GlobalButton icon="pi pi-trash" style="background-color: #EF4137;"
                        @buttonTapped="deleteCategoryType(index)" />
                </div>
            </template>
            <div class="field col-12 md:col-11"></div>
            <div class="field col-12 md:col-1">
                <GlobalButton class=""  icon="pi pi-plus" style="background-color: #2385B4;" @buttonTapped="addCategoryType" />
            </div>
            <div class="field col-12 md:col-10"></div>
            <div class="field col-12 md:col-2">
                <GlobalButton title="Add Event" class="mt-5" @buttonTapped="addEvent" />
            </div>

        </div>
        
    </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const eventDetails = ref({
    eventCapacity: null,
    eventEndDate: "",
    eventName: "",
    eventStartDate: ""
})
const categoryDetails = ref([
    {
        categoryCapacity: null,
        categoryDescription: "",
        categoryName: "",
        categoryPrice: null
    }
])

const deleteCategoryType = (index) => {
    if (index > -1) {
        categoryDetails.value.splice(index, 1);
    }
};

const addCategoryType = () => {
    const newCategory = {
        categoryCapacity: 0,
        categoryDescription: "",
        categoryName: "",
        categoryPrice: 0
    }
    categoryDetails.value.push(newCategory)
};

const addEvent = async () => {
    const eventData = {
        eventCapacity: eventDetails.value.eventCapacity,
        eventEndDate: eventDetails.value.eventEndDate,
        eventName: eventDetails.value.eventName,
        eventStartDate: eventDetails.value.eventStartDate,
        categoryList: categoryDetails.value
    }
    const userToken = useCookie('token')
    const token = "Bearer " + userToken.value
    console.log(token)
    console.log(eventData)
    const { data: responseData } = await useFetch('https://api.countersbd.com/api/v1/event/create', {
        headers: {
            "Authorization": token
        },
        method: 'post',
        body: eventData
    })
    console.log(responseData)
    //   if (responseData.value.responseCode === 200) {
    //     window.localStorage.setItem("token", responseData.value.data.token)
    //     const isAuthenticated = isAuthenticatedState()
    //     isAuthenticated.value = true
    //     navigateTo("/")
    //   }
};
</script>