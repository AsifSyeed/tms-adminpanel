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

    <div class="grid gap-4 grid-cols-1 md:grid-cols-3">
      <!-- Total Tickets Purchased -->
      <div class="bg-blue-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Tickets Purchased</h3>
        <p class="text-3xl mt-2">{{ totalTickets }}</p>
      </div>

      <!-- Total Revenue -->
      <div class="bg-green-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Revenue</h3>
        <p class="text-3xl mt-2">৳{{ totalRevenue }}</p>
      </div>

      <!-- Total Users -->
      <div class="bg-purple-500 text-white p-4 rounded shadow-lg">
        <h3 class="text-lg font-semibold">Total Users</h3>
        <p class="text-3xl mt-2">{{ totalUsers }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

// Add authorization token (use your actual token handling here)
const userToken = useCookie('token');
const token = "Bearer " + userToken.value;

// Reactive variables to hold data
const totalTickets = ref(0);
const totalRevenue = ref(0);
const totalUsers = ref(0);
const eventList = ref([]);
const selectedEvent = ref("");

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

    // Update the reactive variable with the fetched event list data
    eventList.value = response.data; // Assuming the data structure returns a list of events
    console.log(eventList.value);
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

// Fetch the data when the component is mounted
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
</style>
