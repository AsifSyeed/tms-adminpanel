<template>
  <div class="px-2 py-2 sm:px-3 lg:px-4 w-full">
    <h2 class="text-2xl font-bold pb-4">Admin Dashboard</h2>

    <!-- Event Dropdown -->
    <div class="mb-4">
      <label for="eventDropdown" class="block text-lg font-semibold mb-2">Select Event</label>
      <select id="eventDropdown" v-model="selectedEvent" class="w-full p-2 border rounded shadow-sm">
        <option value="" disabled>Select an event</option>
        <option v-for="event in eventList" :key="event.eventId" :value="event.eventId">
          {{ event.eventName }}
        </option>
      </select>
    </div>

    <!-- Dashboard Stats -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
      <div class="bg-blue-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Tickets Purchased</h3>
        <p class="text-3xl mt-2">{{ totalTickets }}</p>
      </div>

      <div class="bg-green-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Revenue</h3>
        <p class="text-3xl mt-2">৳{{ totalRevenue }}</p>
      </div>

      <!-- Category Sales Info -->
      <div v-if="categorySalesInfoList.length > 0">
        <h3 class="text-xl font-bold mt-6 mb-2">Category Sales Info</h3>
        <div class="category-sales-container overflow-x-auto whitespace-nowrap">
          <div v-for="category in categorySalesInfoList" :key="category.categoryId"
            class="category-card inline-block bg-gray-100 p-4 m-2 rounded shadow-lg min-w-[200px]">
            <h4 class="font-semibold">{{ category.categoryName }}</h4>
            <p class="text-md">Purchased Tickets: {{ category.totalPurchasedTicket }}</p>
            <p class="text-md">Revenue: ৳{{ category.totalRevenue }}</p>
          </div>
        </div>
      </div>

      <div class="bg-purple-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Users</h3>
        <p class="text-3xl mt-2">{{ totalUsers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const userToken = useCookie('token');
const token = "Bearer " + userToken.value;

const totalTickets = ref(0);
const totalRevenue = ref(0);
const totalUsers = ref(0);
const eventList = ref([]);
const selectedEvent = ref("");
const categorySalesInfoList = ref([]); // New array to hold category sales data

// Fetch dashboard data from the API
const fetchDashboardData = async (eventId = '') => {
  try {
    const response = await $fetch(`https://api.countersbd.com/api/v1/admin/dashboard-info/${eventId}`, {
      headers: {
        "Authorization": token
      }
    });

    // Update the reactive variables with the fetched data
    totalTickets.value = response.data.totalPurchasedTicket;
    totalRevenue.value = response.data.totalRevenue;
    totalUsers.value = response.data.totalUser;
    categorySalesInfoList.value = response.data.categorySalesInfoList; // Update category sales list
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }
};

// Fetch event list data from the API
const fetchEventList = async () => {
  try {
    const response = await $fetch('https://api.countersbd.com/api/v1/event/admin/all', {
      headers: {
        "Authorization": token
      }
    });

    eventList.value = response.data; // Assuming the data structure returns a list of events
  } catch (error) {
    console.error('Error fetching event list data:', error);
  }
};

// Watch for changes in the selectedEvent variable and fetch new data when it changes
watch(selectedEvent, (newEventId) => {
  if (newEventId) {
    fetchDashboardData(newEventId);
  }
});

onMounted(() => {
  fetchDashboardData();
  fetchEventList();
});

definePageMeta({
  middleware: 'auth'
});
</script>

<style scoped>
.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, 1fr);
}

@media (min-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Styles for horizontal scrollable category sales info */
.category-sales-container {
  padding: 1rem 0;
}

.category-card {
  background-color: #f7f7f7;
  min-width: 200px;
  text-align: center;
}

.category-card h4 {
  margin-bottom: 0.5rem;
}

.category-card p {
  margin: 0.25rem 0;
}
</style>
